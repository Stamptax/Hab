import Image from "next/image";
import type { Tweet } from "react-tweet/api";
import { type TwitterComponents, TweetHeader, enrichTweet } from "react-tweet";
import { Heart, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

type TweetDialogProps = {
  tweet: Tweet;
  components?: TwitterComponents;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export const TweetDialog = ({
  tweet: t,
  components,
  isOpen,
  onOpenChange,
}: TweetDialogProps) => {
  const tweet = enrichTweet(t);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">关闭</span>
          </button>
        </DialogHeader>

        <div className="space-y-4">
          {/* 推文头部 */}
          <div className="px-2">
            <TweetHeader tweet={tweet} components={components} />
          </div>

          {/* 推文内容 */}
          <div className="px-2">
            <div className="text-gray-900 text-lg leading-7 whitespace-pre-wrap break-words">
              {tweet.text}
            </div>

            {/* 媒体内容 */}
            {tweet.mediaDetails?.length ? (
              <div className="mt-4 space-y-3">
                {tweet.mediaDetails.map((media, index) => (
                  <div
                    key={index}
                    className="relative rounded-lg overflow-hidden"
                  >
                    <Image
                      src={media.media_url_https}
                      alt="推文媒体"
                      width={media.sizes?.large?.w || 600}
                      height={media.sizes?.large?.h || 400}
                      className="w-full h-auto rounded-lg"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {/* 推文底部 */}
          <div className="px-2 pt-4 border-t">
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                {tweet.favorite_count || 0} 点赞
              </span>
              <span>{formatDate(tweet.created_at)}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
