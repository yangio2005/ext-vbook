import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getStory, listChapters, type ChapterMeta, type Story } from '../lib/firestore';

export default function StoryDetail() {
  const { id } = useParams<{ id: string }>();
  const [story, setStory] = useState<Story | null>(null);
  const [chapters, setChapters] = useState<ChapterMeta[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    getStory(id).then((s) => {
      if (!s) { setError('Không tìm thấy truyện'); return; }
      setStory(s);
      return listChapters(id).then(setChapters);
    });
  }, [id]);

  if (error) return <p className="text-red-400">{error}</p>;
  if (!story) return <p className="text-slate-400">Đang tải...</p>;

  return (
    <div className="flex gap-6 flex-col md:flex-row">
      <div className="w-48 shrink-0">
        {story.cover ? (
          <img src={story.cover} alt={story.name} className="w-full rounded" />
        ) : (
          <div className="w-full aspect-[2/3] rounded bg-slate-800 flex items-center justify-center text-slate-500 text-sm p-2 text-center">{story.name}</div>
        )}
      </div>
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-1">{story.name}</h1>
        <p className="text-slate-400 text-sm mb-3">{story.author} · {story.status === 'completed' ? 'Hoàn thành' : 'Đang tiến hành'}</p>
        <div className="flex gap-2 flex-wrap mb-4">
          {story.genres?.map((g) => (
            <span key={g} className="text-xs px-2 py-1 rounded bg-slate-800 text-amber-300">{g}</span>
          ))}
        </div>
        <p className="whitespace-pre-line text-sm text-slate-300 mb-6">{story.description}</p>
        <h2 className="font-semibold mb-2">Chương ({chapters.length})</h2>
        <ul className="space-y-1 max-h-96 overflow-y-auto">
          {chapters.map((c) => (
            <li key={c.id}>
              <Link to={`/story/${id}/chapter/${c.id}`} className="text-sm text-sky-400 hover:underline">
                {c.title || `Chương ${c.number}`}
              </Link>
            </li>
          ))}
        </ul>
        {chapters.length > 0 && (
          <Link to={`/story/${id}/chapter/${chapters[0].id}`} className="inline-block mt-4 px-4 py-2 rounded bg-amber-500 text-slate-950 font-semibold text-sm">
            Đọc từ đầu
          </Link>
        )}
      </div>
    </div>
  );
}
