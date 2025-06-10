"use client";

import React, { useState } from "react";
import type { Tweet } from "react-tweet/api";
import { CustomTweetCard, components } from "../custom-tweet-card";
import { TweetFullView } from "./tweet-full-view";
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

const CustomDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      onOpenAutoFocus={(event) => event.preventDefault()}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
));
CustomDialogContent.displayName = "CustomDialogContent";

type TweetGridClientProps = {
  tweets: (Tweet | null | undefined)[];
};

export function TweetGridClient({ tweets }: TweetGridClientProps) {
  const [selectedTweet, setSelectedTweet] = useState<Tweet | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCardClick = (tweet: Tweet) => {
    setSelectedTweet(tweet);
    setIsDialogOpen(true);
  };

  return (
    <>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {tweets.map((tweet, index) => (
          <div
            key={tweet?.id_str || index}
            className="flex-shrink-0 w-[calc(50%-8px)] min-w-[280px] rounded-xl flex-col gap-2 overflow-hidden"
          >
            {tweet ? (
              <div
                onClick={() => handleCardClick(tweet)}
                className="cursor-pointer"
              >
                <CustomTweetCard
                  tweet={tweet}
                  components={components}
                  maxHeight={240}
                />
              </div>
            ) : (
              <div className="h-60 bg-gray-100 rounded-xl flex items-center justify-center">
                <span className="text-gray-500">loading...</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <CustomDialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogTitle className="sr-only">Tweet Details</DialogTitle>
          {selectedTweet && <TweetFullView tweet={selectedTweet} />}
        </CustomDialogContent>
      </Dialog>
    </>
  );
}
