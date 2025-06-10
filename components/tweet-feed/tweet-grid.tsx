import { Suspense } from "react";
import { TweetSkeleton } from "react-tweet";
import { TweetGridClient } from "@/components/tweet-feed/tweet-grid-client";
import { getTweet } from "react-tweet/api";

export function TweetGrid({ tweetIds }: { tweetIds: string[] }) {
  const TweetDataLoader = async ({ tweetIds }: { tweetIds: string[] }) => {
    const tweetPromises = tweetIds.map(async (id) => {
      try {
        const tweet = await getTweet(id);
        return tweet;
      } catch (error) {
        console.error(`fetch tweet ${id} error:`, error);
        return null;
      }
    });

    const tweets = await Promise.all(tweetPromises);
    return <TweetGridClient tweets={tweets} />;
  };

  return (
    <Suspense
      fallback={
        <div className="grid gap-4 md:grid-cols-2">
          {tweetIds.map((id) => (
            <div
              key={id}
              className="flex rounded-xl flex-col gap-2 overflow-hidden"
            >
              <TweetSkeleton />
            </div>
          ))}
        </div>
      }
    >
      <TweetDataLoader tweetIds={tweetIds} />
    </Suspense>
  );
}
