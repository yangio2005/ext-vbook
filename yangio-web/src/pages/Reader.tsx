import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getChapter, getStory, listChapters, type Chapter, type ChapterMeta, type Story } from '../lib/firestore';

export default function Reader() {
  const { id, chapId } = useParams<{ id: string; chapId: string }>();
  const [story, setStory] = useState<Story | null>(null);
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [chapters, setChapters] = useState<ChapterMeta[]>([]);

  useEffect(() => {
    if (!id || !chapId) return;
    Promise.all([getStory(id), getChapter(id, chapId), listChapters(id)]).then(([s, c, list]) => {
      setStory(s);
      setChapter(c);
      setChapters(list);
    });
  }, [id, chapId]);

  if (!chapter || !story || !id) return <p className="text-slate-400">Đang tải...</p>;

  const index = chapters.findIndex((c) => c.id === chapId);
  const prev = index > 0 ? chapters[index - 1] : null;
  const next = index >= 0 && index < chapters.length - 1 ? chapters[index + 1] : null;

  return (
    <article className="max-w-2xl mx-auto">
      <p className="text-sm text-slate-400 mb-1"><Link to={`/story/${id}`} className="hover:underline">{story.name}</Link></p>
      <h1 className="text-xl font-bold mb-6">{chapter.title}</h1>
      <div
        className="leading-relaxed whitespace-pre-line [&_p]:mb-3"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(chapter.content) }}
      />
      <nav className="flex justify-between gap-4 mt-8 pb-8">
        {prev ? (
          <Link to={`/story/${id}/chapter/${prev.id}`} className="px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-sm">← Trước</Link>
        ) : <span />}
        {next ? (
          <Link to={`/story/${id}/chapter/${next.id}`} className="px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-sm">Sau →</Link>
        ) : <span />}
      </nav>
    </article>
  );
}
