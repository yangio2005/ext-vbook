import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../lib/firebase';
import {
  deleteChapter,
  deleteStory,
  getChapter,
  listChapters,
  listStories,
  rebuildGenresIndex,
  upsertChapter,
  upsertStory,
  type ChapterMeta,
  type Story,
} from '../lib/firestore';

export default function Admin() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  useEffect(() => onAuthStateChanged(auth, (u) => setAuthed(!!u)), []);
  if (authed === null) return <p className="text-slate-400">Đang kiểm tra đăng nhập...</p>;
  if (!authed) return <Navigate to="/login" replace />;
  return <AdminPanel />;
}

function slugify(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function AdminPanel() {
  const [stories, setStories] = useState<Story[]>([]);
  const [selected, setSelected] = useState<Story | null>(null);
  const [chapters, setChapters] = useState<ChapterMeta[]>([]);
  const [form, setForm] = useState({ name: '', author: '', description: '', cover: '', genres: '', status: 'ongoing' });
  const [chapForm, setChapForm] = useState({ number: '1', title: '', content: '' });
  const [message, setMessage] = useState('');

  const refresh = async () => {
    const res = await listStories();
    setStories(res.stories);
  };
  useEffect(() => { refresh(); }, []);

  const selectStory = async (s: Story) => {
    setSelected(s);
    setForm({ ...form, name: s.name, author: s.author, description: s.description, cover: s.cover, genres: s.genres.join(', '), status: s.status });
    setChapters(await listChapters(s.id));
  };

  const saveStory = async () => {
    const id = selected?.id ?? slugify(form.name) ?? `story-${Date.now()}`;
    await upsertStory(id, {
      name: form.name,
      author: form.author,
      description: form.description,
      cover: form.cover,
      genres: form.genres.split(',').map((g) => g.trim()).filter(Boolean),
      status: form.status as Story['status'],
    });
    setMessage(`Đã lưu truyện "${form.name}" (id: ${id})`);
    setSelected(null);
    refresh();
  };

  const removeStory = async () => {
    if (!selected || !confirm(`Xóa "${selected.name}" và toàn bộ chương?`)) return;
    await deleteStory(selected.id);
    setSelected(null);
    setChapters([]);
    setMessage('Đã xóa truyện');
    refresh();
  };

  const saveChapter = async () => {
    if (!selected) return;
    const number = parseInt(chapForm.number, 10);
    if (!number || number < 1) { setMessage('Số chương không hợp lệ'); return; }
    await upsertChapter(selected.id, number, chapForm.title, chapForm.content);
    setChapters(await listChapters(selected.id));
    setChapForm({ number: String(number + 1), title: '', content: '' });
    setMessage(`Đã lưu Chương ${number}`);
    refresh();
  };

  const editChapter = async (c: ChapterMeta) => {
    if (!selected) return;
    const full = await getChapter(selected.id, c.id);
    if (full) setChapForm({ number: String(full.number), title: full.title, content: full.content });
  };

  const removeChapter = async (c: ChapterMeta) => {
    if (!selected || !confirm(`Xóa "${c.title}"?`)) return;
    await deleteChapter(selected.id, c.id);
    setChapters(await listChapters(selected.id));
    refresh();
  };

  const input = 'w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 outline-none text-sm';

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <section>
        <h2 className="font-bold mb-3">Truyện ({stories.length})</h2>
        <ul className="space-y-1 max-h-64 overflow-y-auto mb-4">
          {stories.map((s) => (
            <li key={s.id}>
              <button onClick={() => selectStory(s)}
                className={`w-full text-left text-sm px-2 py-1 rounded ${selected?.id === s.id ? 'bg-slate-700' : 'hover:bg-slate-800'}`}>
                {s.name} <span className="text-slate-500">({s.chapterCount ?? 0})</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="space-y-2">
          <input className={input} placeholder="Tên truyện" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className={input} placeholder="Tác giả" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
          <textarea className={input} rows={3} placeholder="Mô tả" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <input className={input} placeholder="Cover URL" value={form.cover} onChange={(e) => setForm({ ...form, cover: e.target.value })} />
          <input className={input} placeholder="Thể loại (phẩy-separated)" value={form.genres} onChange={(e) => setForm({ ...form, genres: e.target.value })} />
          <select className={input} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
            <option value="ongoing">Đang tiến hành</option>
            <option value="completed">Hoàn thành</option>
          </select>
          <div className="flex gap-2">
            <button onClick={saveStory} className="px-4 py-2 rounded bg-amber-500 text-slate-950 text-sm font-semibold">
              {selected ? 'Cập nhật' : 'Tạo mới'}
            </button>
            {selected && <button onClick={removeStory} className="px-4 py-2 rounded bg-red-600 text-sm">Xóa</button>}
            <button onClick={async () => { await rebuildGenresIndex(); setMessage('Đã dựng lại index thể loại'); }}
              className="px-4 py-2 rounded bg-slate-700 text-sm">Reindex genres</button>
          </div>
          {message && <p className="text-emerald-400 text-sm">{message}</p>}
        </div>
      </section>

      <section>
        <h2 className="font-bold mb-3">{selected ? `Chương của "${selected.name}"` : 'Chọn một truyện để thêm chương'}</h2>
        {selected && (
          <>
            <ul className="space-y-1 max-h-48 overflow-y-auto mb-4">
              {chapters.map((c) => (
                <li key={c.id} className="flex items-center gap-2 text-sm">
                  <button onClick={() => editChapter(c)} className="flex-1 text-left hover:text-amber-300">{c.title || `Chương ${c.number}`}</button>
                  <button onClick={() => removeChapter(c)} className="text-red-400 text-xs">xóa</button>
                </li>
              ))}
            </ul>
            <div className="space-y-2">
              <input className={input} type="number" min={1} placeholder="Số thứ tự chương" value={chapForm.number}
                onChange={(e) => setChapForm({ ...chapForm, number: e.target.value })} />
              <input className={input} placeholder="Tiêu đề chương" value={chapForm.title}
                onChange={(e) => setChapForm({ ...chapForm, title: e.target.value })} />
              <textarea className={input} rows={10} placeholder="Nội dung (HTML hoặc text, dòng mới thành <br>)" value={chapForm.content}
                onChange={(e) => setChapForm({ ...chapForm, content: e.target.value })} />
              <button onClick={saveChapter} className="px-4 py-2 rounded bg-amber-500 text-slate-950 text-sm font-semibold">Lưu chương</button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
