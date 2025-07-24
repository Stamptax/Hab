import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play } from "lucide-react";
import { TweetWrapper } from "./tweet-feed/tweet-grid";
import {
  fetchTweets,
  // fetchTikTokPosts,
  fetchYoutubeVideos,
} from "@/lib/actions";
import { BsFilm } from "react-icons/bs";
import { VideoWrapper } from "./video-feed";
const shorts = [
  {
    id: 1,
    title: "The Future of Innovation: A Deep Dive",
    description: "The Future of Innovation: A Deep Dive",
    thumbnail: "/placeholder.svg",
    createdAt: "2021-01-01T00:00:00Z",
  },
  {
    id: 2,
    title: "Leadership in the Digital Age",
    description: "Leadership in the Digital Age",
    thumbnail: "/placeholder.svg",
    createdAt: "2021-01-01T00:00:00Z",
  },
];
const videos = [
  {
    id: 1,
    title: "The Future of Innovation: A Deep Dive",
    snippet: {
      thumbnails: {
        medium: {
          url: "/placeholder.svg",
        },
      },
      publishedAt: "2021-01-01T00:00:00Z",
    },
  },
  {
    id: 2,
    title: "Leadership in the Digital Age",
    snippet: {
      thumbnails: {
        medium: {
          url: "/placeholder.svg",
        },
      },
      publishedAt: "2021-01-01T00:00:00Z",
    },
  },
];

const tweets = [
  { id: "1234567890" },
  { id: "1234567891" },
  { id: "1234567892" },
  { id: "1234567895" },
  { id: "1234567894" },
];

export async function SocialFeed() {
  const tweets = await fetchTweets();
  const videos = await fetchYoutubeVideos();
  // const shorts = await fetchTikTokPosts();
  return (
    <div className="space-y-6">
      {/* Twitter Feed */}
      <Card className="backdrop-blur-sm bg-white/90 border border-cyan-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="bg-gradient-to-r from-cyan-50 to-sky-50 border-b border-cyan-100">
          <CardTitle className="flex items-center gap-3 text-slate-700">
            <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <span className="text-cyan-700">Latest Tweets</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <TweetWrapper tweetIds={tweets.map((tweet: any) => tweet.id)} />
        </CardContent>
      </Card>

      {/* YouTube Videos */}
      <Card className="backdrop-blur-sm bg-white/90 border border-cyan-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="bg-gradient-to-r from-cyan-50 to-sky-50 border-b border-cyan-100">
          <CardTitle className="flex items-center gap-3 text-slate-700">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <Play className="w-4 h-4 text-white ml-0.5" />
            </div>
            <span className="text-cyan-700">Latest Videos</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <VideoWrapper videos={videos} category="youtube" />
        </CardContent>
      </Card>

      {/* Tiktok Videos */}
      {/* <Card className="backdrop-blur-sm bg-white/90 border border-cyan-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="bg-gradient-to-r from-cyan-50 to-sky-50 border-b border-cyan-100">
          <CardTitle className="flex items-center gap-3 text-slate-700">
            <div className="w-8 h-8 bg-fuchsia-500 rounded-full flex items-center justify-center">
              <BsFilm className="w-4 h-4 text-white" />
            </div>
            <span className="text-cyan-700">Latest Shorts</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <VideoWrapper videos={shorts} category="tiktok" />
        </CardContent>
      </Card> */}
    </div>
  );
}
