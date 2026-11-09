import { Link } from 'react-router-dom';
import type { Story } from '../lib/firestore';

export default function StoryCard({ story }: { story: Story }) {
  return (
    <Link to={`/story/${story.id}`} className="group block">
      <div className="aspect-[2/3] rounded bg-slate-800 overflow-hidden mb-2">
        {story.cover ? (
          <img src={story.cover} alt={story.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs p-2 text-center">{story.name}</div>
        )}
      </div>
      <div className="text-sm font-medium line-clamp-2">{story.name}</div>
      <div className="text-xs text-slate-400">
        {story.author} · {story.chapterCount ?? 0} chương{story.status === 'completed' ? ' · Hoàn' : ''}
      </div>
    </Link>
  );
}
