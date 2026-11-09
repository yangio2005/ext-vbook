import { initializeApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';

const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID as string;

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? `${projectId}.firebaseapp.com`,
  projectId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);

// Firestore transport order: SDK long-polling first (fast path when allowed),
// plain REST fallback when the network blocks Firestore's WebChannel endpoints.
async function resolveDb(): Promise<'sdk' | 'rest'> {
  try {
    await sdkProbe(true);
    return 'sdk';
  } catch {
    console.warn('long-polling blocked, trying webchannel');
  }
  try {
    await sdkProbe(false);
    return 'sdk';
  } catch {
    console.warn('webchannel blocked, falling back to REST');
    return 'rest';
  }
}

async function sdkProbe(forceLongPolling: boolean): Promise<void> {
  const { initializeFirestore, getDocs, collection } = await import('firebase/firestore');
  const db = forceLongPolling
    ? initializeFirestore(app, { experimentalForceLongPolling: true })
    : initializeFirestore(app, { experimentalAutoDetectLongPolling: true });
  await Promise.race([
    getDocs(collection(db, 'stories')),
    new Promise((_, reject) => setTimeout(() => reject(new Error('probe timeout')), 4000)),
  ]);
}

export const mode: Promise<'sdk' | 'rest'> = resolveDb();
