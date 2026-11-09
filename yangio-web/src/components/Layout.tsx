import { Link, Outlet, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../lib/firebase';

export default function Layout() {
  const [email, setEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => onAuthStateChanged(auth, (u) => setEmail(u?.email ?? null)), []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 px-4 py-3 flex items-center gap-4 sticky top-0 bg-slate-950/95 z-10">
        <Link to="/" className="font-bold text-lg text-amber-400">Yangio Truyện</Link>
        <nav className="flex-1 flex gap-4 text-sm">
          <Link to="/">Danh mục</Link>
          {email && <Link to="/admin">Quản lý</Link>}
        </nav>
        {email ? (
          <button
            className="text-sm text-slate-400 hover:text-white"
            onClick={async () => { await signOut(auth); navigate('/'); }}
          >
            Đăng xuất ({email})
          </button>
        ) : (
          <Link to="/login" className="text-sm text-slate-400 hover:text-white">Đăng nhập</Link>
        )}
      </header>
      <main className="max-w-5xl mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}
