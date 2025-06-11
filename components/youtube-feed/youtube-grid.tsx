import { Play } from "lucide-react";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
}

export function YoutubeWrapper({ videos }: { videos: any[] }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {videos.map((video: any) => (
        <a
          key={video.id}
          className="flex-shrink-0 group cursor-pointer"
          href={`https://www.youtube.com/watch?v=${video.id}`}
          target="_blank"
        >
          <div className="relative rounded-xl overflow-hidden mb-3 border border-cyan-100">
            <img
              src={video.snippet.thumbnails.medium.url || "/placeholder.svg"}
              alt={video.snippet.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Play className="w-5 h-5 text-slate-700 ml-0.5" />
              </div>
            </div>
          </div>
          <h3 className="font-semibold text-slate-700 mb-2 group-hover:text-cyan-600 transition-colors">
            {video.snippet.title}
          </h3>
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <span>{formatDate(video.snippet.publishedAt)}</span>
          </div>
        </a>
      ))}
    </div>
  );
}
