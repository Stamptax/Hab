import { Suspense } from "react";
import { getTweet } from "react-tweet/api";
import { TweetNotFound, TweetSkeleton } from "react-tweet";
import { CustomTweetCard, components } from "./custom-tweet-card";

const TweetCardWrapper = async ({ id }: { id: string }) => {
  try {
    const tweet = await getTweet(id);

    if (!tweet) {
      return <TweetNotFound />;
    }

    return (
      <CustomTweetCard tweet={tweet} components={components} maxHeight={240} />
    );
  } catch (error) {
    console.error("fetch tweet error:", error);
    return <TweetNotFound />;
  }
};

export function TweetGrid({ tweetIds }: { tweetIds: string[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {tweetIds.map((id) => (
        <div
          key={id}
          data-tweet-id={id}
          className="flex rounded-xl flex-col gap-2 cursor-pointer overflow-hidden"
        >
          <Suspense fallback={<TweetSkeleton />}>
            <TweetCardWrapper id={id} />
          </Suspense>
        </div>
      ))}
    </div>
  );
}
