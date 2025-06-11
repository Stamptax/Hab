import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ExternalLink, Clock, Newspaper } from "lucide-react";

const news = [
  {
    id: 1,
    headline: "Tech Leader Announces Revolutionary AI Partnership",
    source: "TechCrunch",
    publishedAt: "2 hours ago",
    summary:
      "A groundbreaking collaboration that promises to reshape the industry landscape with innovative AI solutions...",
    category: "Technology",
    readTime: "3 min read",
  },
  {
    id: 2,
    headline: "Exclusive Interview: Vision for Sustainable Innovation",
    source: "Forbes",
    publishedAt: "1 day ago",
    summary:
      "In-depth discussion about the future of sustainable technology and its transformative impact on society...",
    category: "Interview",
    readTime: "8 min read",
  },
  {
    id: 3,
    headline: "Speaking at Global Innovation Summit 2024",
    source: "Innovation Weekly",
    publishedAt: "3 days ago",
    summary:
      "Keynote address focuses on emerging technologies and their profound societal implications for the future...",
    category: "Events",
    readTime: "5 min read",
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: "AI Ethics Panel Discussion",
    date: "March 15, 2024",
    time: "2:00 PM EST",
    type: "Panel",
    location: "Virtual Event",
  },
  {
    id: 2,
    title: "Innovation Leadership Workshop",
    date: "March 22, 2024",
    time: "10:00 AM PST",
    type: "Workshop",
    location: "San Francisco, CA",
  },
  {
    id: 3,
    title: "Tech Conference Keynote",
    date: "April 5, 2024",
    time: "9:00 AM EST",
    type: "Keynote",
    location: "New York, NY",
  },
];

export function NewsSection() {
  return (
    <div className="space-y-6">
      {/* News Feed - Purple Theme */}
      <Card className="backdrop-blur-sm bg-white/90 border border-purple-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 border-b border-purple-100">
          <CardTitle className="flex items-center gap-3 text-slate-700">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
              <Newspaper className="w-4 h-4 text-white" />
            </div>
            <span className="text-purple-700">Latest News</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {news.map((article) => (
            <div
              key={article.id}
              className="p-5 rounded-xl bg-purple-50/50 border border-purple-100 hover:bg-purple-50 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200">
                  {article.category}
                </Badge>
                <ExternalLink className="w-4 h-4 text-slate-400 hover:text-purple-500 cursor-pointer transition-colors" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-3 hover:text-purple-600 cursor-pointer transition-colors leading-tight">
                {article.headline}
              </h3>
              <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                {article.summary}
              </p>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-purple-600">
                    {article.source}
                  </span>
                  <span>{article.publishedAt}</span>
                </div>
                <span className="flex items-center gap-1 text-purple-500">
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
