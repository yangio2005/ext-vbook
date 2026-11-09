import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  initializeFirestore,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  where,
  writeBatch,
} from 'firebase/firestore';
import { app, mode } from './firebase';

export interface ChapterMeta {
  id: string;
  title: string;
  number: number;
  updatedAt?: string;
}

export interface Chapter extends ChapterMeta {
  content: string;
}

export interface Story {
  id: string;
  name: string;
  author: string;
  description: string;
  cover: string;
  genres: string[];
  status: 'ongoing' | 'completed';
  chapterCount: number;
  updatedAt: string;
  createdAt: string;
}

export const STORY_PAGE_SIZE = 20;

type Raw = Record<string, unknown>;

const FIRESTORE_API = `https://firestore.googleapis.com/v1/projects/${app.options.projectId}/databases/(default)/documents`;
const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY as string;

let _db: ReturnType<typeof initializeFirestore> | null = null;
async function sdkDb() {
  if (!_db) {
    const m = await mode;
    _db = m === 'sdk'
      ? initializeFirestore(app, { experimentalForceLongPolling: true })
      : initializeFirestore(app, { ignoreUndefinedProperties: true });
  }
  return _db;
}

function padChapterId(number: number): string {
  return String(number).padStart(4, '0');
}

async function storyDoc(id: string) {
  return doc(await sdkDb(), 'stories', id);
}

async function chaptersCol(storyId: string) {
  return collection(await sdkDb(), 'stories', storyId, 'chapters');
}

async function rest(path: string, init?: RequestInit): Promise<Raw> {
  const sep = path.includes('?') ? '&' : '?';
  const res = await fetch(`${FIRESTORE_API}/${path}${sep}key=${API_KEY}`, init);
  if (!res.ok) throw new Error(`Firestore REST ${res.status}`);
  return res.json() as Promise<Raw>;
}

function decodeValue(v: Raw): unknown {
  if (v.stringValue !== undefined) return v.stringValue;
  if (v.booleanValue !== undefined) return v.booleanValue;
  if (v.integerValue !== undefined) return parseInt(v.integerValue as string, 10);
  if (v.doubleValue !== undefined) return v.doubleValue;
  if (v.timestampValue !== undefined) return v.timestampValue;
  if (v.arrayValue !== undefined) return (((v.arrayValue as Raw).values as Raw[]) ?? []).map(decodeValue);
  if (v.mapValue !== undefined) return decodeFields((v.mapValue as Raw).fields as Raw ?? {});
  return null;
}

function decodeFields(fields: Raw): Raw {
  const out: Raw = {};
  for (const k of Object.keys(fields)) out[k] = decodeValue(fields[k] as Raw);
  return out;
}

function docToStory(d: Raw): Story {
  const id = String(d.name).split('/').pop()!;
  return { id, ...(decodeFields(d.fields as Raw) as Omit<Story, 'id'>) };
}

function encodeFields(obj: Raw): Raw {
  const fields: Raw = {};
  for (const k of Object.keys(obj)) {
    const v = obj[k];
    if (typeof v === 'string') fields[k] = { stringValue: v };
    else if (typeof v === 'number') fields[k] = Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
    else if (typeof v === 'boolean') fields[k] = { booleanValue: v };
    else if (Array.isArray(v)) fields[k] = { arrayValue: { values: v.map((x) => ({ stringValue: String(x) })) } };
    else if (v == null) fields[k] = { nullValue: null };
    else fields[k] = { mapValue: { fields: encodeFields(v as Raw) } };
  }
  return { fields };
}

export async function listStories(after?: string): Promise<{ stories: Story[]; next: string | null }> {
  if (await mode === 'rest') {
    const params = new URLSearchParams({ pageSize: String(STORY_PAGE_SIZE) });
    if (after) params.set('pageToken', after);
    const json = await rest(`stories?${params.toString()}`);
    const docs = ((json.documents as Raw[]) ?? []).map(docToStory)
      .sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)));
    return { stories: docs, next: (json.nextPageToken as string) || null };
  }
  const db = await sdkDb();
  let q = query(collection(db, 'stories'), orderBy('updatedAt', 'desc'), limit(STORY_PAGE_SIZE));
  if (after) {
    const cursor = await getDoc(await storyDoc(after));
    if (cursor.exists()) q = query(collection(db, 'stories'), orderBy('updatedAt', 'desc'), startAfter(cursor), limit(STORY_PAGE_SIZE));
  }
  const snap = await getDocs(q);
  const stories = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Story, 'id'>) }));
  return { stories, next: snap.size === STORY_PAGE_SIZE ? snap.docs[snap.docs.length - 1].id : null };
}

export async function searchStories(keyword: string): Promise<Story[]> {
  if (await mode === 'rest') {
    const all = await rest('stories');
    return ((all.documents as Raw[]) ?? [])
      .map(docToStory)
      .filter((s) => s.name?.toLowerCase().includes(keyword.toLowerCase()))
      .slice(0, 50);
  }
  const db = await sdkDb();
  const snap = await getDocs(query(collection(db, 'stories'), where('name', '>=', keyword), where('name', '<=', keyword + '\uf8ff'), limit(50)));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Story, 'id'>) }));
}

export async function listStoriesByGenre(genre: string): Promise<Story[]> {
  if (await mode === 'rest') {
    const all = await rest('stories');
    return ((all.documents as Raw[]) ?? [])
      .map(docToStory)
      .filter((s) => s.genres?.includes(genre))
      .sort((a, b) => (String(b.updatedAt) > String(a.updatedAt) ? -1 : 1))
      .slice(0, 100);
  }
  const db = await sdkDb();
  const snap = await getDocs(query(collection(db, 'stories'), where('genres', 'array-contains', genre), orderBy('updatedAt', 'desc'), limit(100)));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Story, 'id'>) }));
}

export async function getStory(id: string): Promise<Story | null> {
  if (await mode === 'rest') {
    try {
      const d = await rest(`stories/${encodeURIComponent(id)}`);
      d.name = `x/${id}`;
      return docToStory(d);
    } catch {
      return null;
    }
  }
  const snap = await getDoc(await storyDoc(id));
  return snap.exists() ? { id: snap.id, ...(snap.data() as Omit<Story, 'id'>) } : null;
}

export type StoryInput = Pick<Story, 'name' | 'author' | 'description' | 'cover' | 'genres' | 'status'>;

export async function upsertStory(id: string, input: StoryInput): Promise<void> {
  const now = new Date().toISOString();
  const existing = await getStory(id);
  const merged = { ...input, updatedAt: now, createdAt: existing?.createdAt ?? now };
  if (await mode === 'rest') {
    const mask = Object.keys(merged).map((k) => `&updateMask.fieldPaths=${k}`).join('');
    await rest(`stories/${encodeURIComponent(id)}?${mask.slice(1)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(encodeFields(merged as unknown as Raw)),
    });
    return;
  }
  await setDoc(await storyDoc(id), merged, { merge: true });
}

export async function deleteStory(id: string): Promise<void> {
  if (await mode === 'rest') {
    const chapters = await rest(`stories/${encodeURIComponent(id)}/chapters`);
    for (const d of (chapters.documents as Raw[]) ?? []) {
      const rel = String(d.name).replace(/^projects\/[^/]+\/databases\/\(default\)\/documents\//, '');
      await rest(rel, { method: 'DELETE' });
    }
    await rest(`stories/${encodeURIComponent(id)}`, { method: 'DELETE' });
    return;
  }
  const db = await sdkDb();
  const chapterSnaps = await getDocs(await chaptersCol(id));
  const batch = writeBatch(db);
  chapterSnaps.docs.forEach((d) => batch.delete(d.ref));
  batch.delete(await storyDoc(id));
  await batch.commit();
}

export async function listChapters(storyId: string): Promise<ChapterMeta[]> {
  if (await mode === 'rest') {
    const json = await rest(`stories/${encodeURIComponent(storyId)}/chapters`);
    return ((json.documents as Raw[]) ?? []).map((d) => {
      const f = decodeFields(d.fields as Raw);
      return { id: String(d.name).split('/').pop()!, title: f.title as string, number: f.number as number, updatedAt: f.updatedAt as string };
    }).sort((a, b) => a.id.localeCompare(b.id));
  }
  const snap = await getDocs(query(await chaptersCol(storyId), orderBy('__name__')));
  return snap.docs.map((d) => {
    const data = d.data() as Omit<Chapter, 'id'>;
    return { id: d.id, title: data.title, number: data.number, updatedAt: data.updatedAt };
  });
}

export async function getChapter(storyId: string, chapterId: string): Promise<Chapter | null> {
  if (await mode === 'rest') {
    try {
      const d = await rest(`stories/${encodeURIComponent(storyId)}/chapters/${encodeURIComponent(chapterId)}`);
      const f = decodeFields(d.fields as Raw);
      return { id: chapterId, title: f.title as string, number: f.number as number, content: f.content as string, updatedAt: f.updatedAt as string };
    } catch {
      return null;
    }
  }
  const db = await sdkDb();
  const snap = await getDoc(doc(db, 'stories', storyId, 'chapters', chapterId));
  return snap.exists() ? { id: snap.id, ...(snap.data() as Omit<Chapter, 'id'>) } : null;
}

export async function upsertChapter(storyId: string, number: number, title: string, content: string): Promise<string> {
  const id = padChapterId(number);
  const payload = { title, number, content, updatedAt: new Date().toISOString() };
  if (await mode === 'rest') {
    await rest(`stories/${encodeURIComponent(storyId)}/chapters?documentId=${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(encodeFields(payload as unknown as Raw)),
    });
    const count = await rest(`stories/${encodeURIComponent(storyId)}/chapters`);
    const mask = '&updateMask.fieldPaths=chapterCount&updateMask.fieldPaths=updatedAt';
    await rest(`stories/${encodeURIComponent(storyId)}?${mask.slice(1)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(encodeFields({ chapterCount: ((count.documents as Raw[]) ?? []).length, updatedAt: payload.updatedAt })),
    });
    return id;
  }
  const db = await sdkDb();
  await setDoc(doc(db, 'stories', storyId, 'chapters', id), payload);
  const countSnap = await getDocs(await chaptersCol(storyId));
  await setDoc(await storyDoc(storyId), { chapterCount: countSnap.size, updatedAt: payload.updatedAt }, { merge: true });
  return id;
}

export async function deleteChapter(storyId: string, chapterId: string): Promise<void> {
  if (await mode === 'rest') {
    await rest(`stories/${encodeURIComponent(storyId)}/chapters/${encodeURIComponent(chapterId)}`, { method: 'DELETE' });
    return;
  }
  const db = await sdkDb();
  await deleteDoc(doc(db, 'stories', storyId, 'chapters', chapterId));
  const countSnap = await getDocs(await chaptersCol(storyId));
  await setDoc(await storyDoc(storyId), { chapterCount: countSnap.size, updatedAt: new Date().toISOString() }, { merge: true });
}

export async function rebuildGenresIndex(): Promise<void> {
  const stories = await listAllStories();
  const counts = new Map<string, number>();
  stories.forEach((s) => s.genres?.forEach((g) => counts.set(g, (counts.get(g) ?? 0) + 1)));
  const genres = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));
  if (await mode === 'rest') {
    await rest('meta/genres', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: {
          genres: {
            arrayValue: {
              values: genres.map((g) => ({ mapValue: { fields: { name: { stringValue: g.name }, count: { integerValue: String(g.count) } } } })),
            },
          },
        },
      }),
    });
    return;
  }
  const db = await sdkDb();
  await setDoc(doc(db, 'meta', 'genres'), { genres });
}

async function listAllStories(): Promise<Story[]> {
  const all: Story[] = [];
  let next: string | null = null;
  do {
    const page = await listStories(next ?? undefined);
    all.push(...page.stories);
    next = page.next;
  } while (next);
  return all;
}
