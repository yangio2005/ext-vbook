import { useEffect, useState } from 'react';
import { listStories, searchStories, type Story } from '../lib/firestore';
import StoryCard from '../components/StoryCard';

export default function Home() {
  const [stories, setStories] = useState<Story[]>([]);
  const [next, setNext] = useState<string | null>(null);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    const run = async () => {
      try {
        if (keyword.trim()) {
          const res = await searchStories(keyword.trim());
          if (alive) { setStories(res); setNext(null); }
        } else {
          const res = await listStories();
          if (alive) { setStories(res.stories); setNext(res.next); }
        }
      } catch (e) {
        console.error('load stories failed', e);
      }
      if (alive) setLoading(false);
    };
    const t = setTimeout(run, keyword ? 300 : 0);
    return () => { alive = false; clearTimeout(t); };
  }, [keyword]);

  const loadMore = async () => {
    if (!next) return;
    const res = await listStories(next);
    setStories((s) => [...s, ...res.stories]);
    setNext(res.next);
  };

  return (
    <div>
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Tìm truyện..."
        className="w-full mb-4 px-3 py-2 rounded bg-slate-800 border border-slate-700 focus:border-amber-400 outline-none"
      />
      {loading && <p className="text-slate-400">Đang tải...</p>}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {stories.map((s) => <StoryCard key={s.id} story={s} />)}
      </div>
      {!stories.length && !loading && <p className="text-slate-500">Chưa có truyện. AI agent có thể đăng qua API — xem docs/AGENT_API.md</p>}
      {next && !keyword && (
        <button onClick={loadMore} className="mt-4 w-full py-2 rounded bg-slate-800 hover:bg-slate-700">Tải thêm</button>
      )}
    </div>
  );
}
