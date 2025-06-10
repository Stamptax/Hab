import Image from "next/image";
import type { Tweet } from "react-tweet/api";
import { TweetHeader, enrichTweet } from "react-tweet";
import { Heart, MessageCircle, Repeat2, Share } from "lucide-react";

type TweetFullViewProps = {
  tweet: Tweet;
};

export const TweetFullView = ({ tweet: t }: TweetFullViewProps) => {
  const tweet = enrichTweet(t);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hour}:${minute}`;
  };

  return (
    <div className="w-full max-w-2xl">
      {/* header */}
      <div className="mb-4">
        <TweetHeader tweet={tweet} />
      </div>

      {/* tweet content */}
      <div className="mb-4">
        <div className="text-gray-900 text-lg leading-7 whitespace-pre-wrap break-words">
          {tweet.text}
        </div>

        {/* media content */}
        {tweet.mediaDetails?.length ? (
          <div className="mt-4 space-y-3">
            {tweet.mediaDetails.map((media, index) => (
              <div key={index} className="relative w-full">
                <Image
                  src={media.media_url_https}
                  alt="Tweet media"
                  width={media.original_info?.width || 600}
                  height={media.original_info?.height || 400}
                  className="object-contain rounded-lg w-full h-auto max-h-96"
                  unoptimized
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {/* time */}
      <div className="mb-4 text-sm text-slate-500 border-b pb-4">
        {formatDate(tweet.created_at)}
      </div>

      {/* statistics */}
      <div className="flex items-center justify-around py-3 border-b">
        <div className="flex items-center gap-2 text-slate-600">
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-medium">
            {tweet.conversation_count || 0}
          </span>
        </div>

        <div className="flex items-center gap-2 text-slate-600">
          <Heart className="w-5 h-5" />
          <span className="text-sm font-medium">
            {tweet.favorite_count || 0}
          </span>
        </div>
      </div>
    </div>
  );
};
