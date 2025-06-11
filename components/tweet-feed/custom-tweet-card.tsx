import Image from "next/image";
import type { Tweet } from "react-tweet/api";
import { type TwitterComponents, TweetHeader, enrichTweet } from "react-tweet";
import { Heart } from "lucide-react";

type CustomTweetCardProps = {
  tweet: Tweet;
  components?: TwitterComponents;
  maxHeight?: number;
};

export const CustomTweetCard = ({
  tweet: t,
  components,
  maxHeight = 220,
}: CustomTweetCardProps) => {
  const tweet = enrichTweet(t);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div
      className="relative overflow-hidden"
      style={{ height: `${maxHeight}px` }}
    >
      {/* main content */}
      <div className="h-full flex flex-col">
        {/* header */}
        <div className="flex-shrink-0 p-4 pb-2">
          <TweetHeader tweet={tweet} components={components} />
        </div>

        {/* tweet content */}
        <div className="flex-1 relative overflow-hidden px-4">
          <div
            className="overflow-hidden text-gray-900 text-base leading-6 whitespace-pre-wrap break-words"
            style={{
              maxHeight: `${maxHeight - 140}px`,
              maskImage:
                "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
            }}
          >
            {tweet.text}

            {/* media content */}
            {tweet.mediaDetails?.length ? (
              <div className="mt-3 rounded-lg overflow-hidden">
                {tweet.mediaDetails.map((media, index) => (
                  <div key={index} className="relative aspect-video max-h-32">
                    <Image
                      src={media.media_url_https}
                      alt="Tweet media"
                      fill
                      className="object-cover rounded-lg"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {/* footer */}
        <div className="flex-shrink-0 px-4" style={{ marginTop: "10px" }}>
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>{formatDate(tweet.created_at)}</span>
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3" />
              {tweet.favorite_count || 0} likes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Next.js Image component config
export const components: TwitterComponents = {
  AvatarImg: (props) => <Image {...props} />,
  MediaImg: (props) => <Image {...props} fill unoptimized />,
};
