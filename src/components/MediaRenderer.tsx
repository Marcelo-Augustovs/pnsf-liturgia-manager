import Image from 'next/image';
import { MediaContent } from '@/types/ritos';

interface MediaRendererProps {
  media?: MediaContent;
  className?: string;
}

export function MediaRenderer({ media, className = '' }: MediaRendererProps) {
  if (!media || !media.url) return null;

  return (
    <figure className={`my-4 ${className}`}>
      {media.type === 'image' ? (
        <div className="overflow-hidden rounded-xl shadow-sm border border-slate-200">
          <Image
            src={media.url}
            alt={media.caption || 'Imagem explicativa do rito'}
            width={800}
            height={450}
            className="w-full h-auto object-cover rounded-xl transition-transform duration-300 hover:scale-[1.01]"
            unoptimized
          />
        </div>
      ) : (
        <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900">
          <iframe
            src={media.url}
            title={media.caption || 'Vídeo explicativo do rito'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>
      )}
      {media.caption && (
        <figcaption className="mt-2 text-xs font-medium text-slate-500 italic text-center flex items-center justify-center gap-1">
          <span>❖</span> {media.caption}
        </figcaption>
      )}
    </figure>
  );
}
