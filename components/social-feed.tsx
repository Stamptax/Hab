import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Eye, Instagram, Heart } from "lucide-react";
import { Tweet } from "react-tweet";

const videos = [
  {
    id: 1,
    title: "The Future of Innovation: A Deep Dive",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "15:42",
    views: "125K",
    publishedAt: "3 days ago",
  },
  {
    id: 2,
    title: "Leadership in the Digital Age",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "22:18",
    views: "89K",
    publishedAt: "1 week ago",
  },
];

const instagramPosts = [
  {
    id: 1,
    image: "/placeholder.svg?height=200&width=200",
    likes: 2341,
    caption: "Behind the scenes at today's innovation workshop...",
    timestamp: "4h ago",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=200&width=200",
    likes: 1876,
    caption: "Grateful for the amazing team collaboration!",
    timestamp: "1d ago",
  },
];

const tweetData = [
  {
    id: "1931698356218438096",
  },
  {
    id: "1931680350901846415",
  },
];

export function SocialFeed() {
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
          <div className="grid gap-4 md:grid-cols-2">
            {tweetData.map((tweet) => (
              <div
                key={tweet.id}
                className="flex rounded-xl h-64 flex-col gap-2 cursor-pointer overflow-hidden"
              >
                <div className="custom-tweet-wrapper" data-theme="light">
                  <Tweet id={tweet.id} />
                </div>
                <div className="flex justify-between items-center custom-tweet-footer text-sm text-slate-500 px-4">
                  <span>100 likes</span>
                  <span>2025-06-09</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* YouTube Videos - Aqua Theme */}
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
          <div className="grid gap-6 md:grid-cols-2">
            {videos.map((video) => (
              <div key={video.id} className="group cursor-pointer">
                <div className="relative rounded-xl overflow-hidden mb-3 border border-cyan-100">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Play className="w-5 h-5 text-slate-700 ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <h3 className="font-semibold text-slate-700 mb-2 group-hover:text-cyan-600 transition-colors">
                  {video.title}
                </h3>
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {video.views} views
                  </span>
                  <span>{video.publishedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Instagram Posts - Aqua Theme */}
      <Card className="backdrop-blur-sm bg-white/90 border border-cyan-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="bg-gradient-to-r from-cyan-50 to-sky-50 border-b border-cyan-100">
          <CardTitle className="flex items-center gap-3 text-slate-700">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center">
              <Instagram className="w-4 h-4 text-white" />
            </div>
            <span className="text-cyan-700">Instagram Posts</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-2">
            {instagramPosts.map((post) => (
              <div key={post.id} className="group cursor-pointer">
                <div className="relative rounded-xl overflow-hidden mb-3 border border-cyan-100">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt="Instagram post"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
                <p className="text-sm text-slate-600 mb-2">{post.caption}</p>
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {post.likes} likes
                  </span>
                  <span>{post.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
