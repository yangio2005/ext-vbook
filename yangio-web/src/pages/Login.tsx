import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin');
    } catch {
      setError('Sai email hoặc mật khẩu');
    }
  };

  return (
    <form onSubmit={submit} className="max-w-sm mx-auto mt-16 space-y-3">
      <h1 className="text-xl font-bold">Đăng nhập quản trị</h1>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required
        className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 outline-none" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mật khẩu" required
        className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 outline-none" />
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button type="submit" className="w-full py-2 rounded bg-amber-500 text-slate-950 font-semibold">Đăng nhập</button>
    </form>
  );
}
