import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper } from "lucide-react";
import { getLatestNews } from "@/lib/actions";

const mockNotifications = [
  {
    id: 1,
    headline: "Test",
    publishedAt: "2025-01-01",
    link: "https://google.com",
  },
];

export async function NewsSection() {
  const notifications = await getLatestNews();

  return (
    <div className="space-y-6">
      {/* News Feed - Purple Theme */}
      <Card className="backdrop-blur-sm bg-white/90 border border-purple-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 border-b border-purple-100">
          <CardTitle className="flex items-center gap-3 text-slate-700">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
              <Newspaper className="w-4 h-4 text-white" />
            </div>
            <span className="text-purple-700">Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {notifications.map((notification) => (
            <a
              key={notification.id}
              href={notification.link}
              target="_blank"
              className="p-5 rounded-xl block no-underline text-inherit bg-purple-50/50 border border-purple-100 hover:bg-purple-50 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3"></div>
              <h3 className="font-semibold text-slate-800 mb-3 hover:text-purple-600 cursor-pointer transition-colors leading-tight">
                {notification.headline}
              </h3>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-3">
                  <span>{notification.publishedAt}</span>
                </div>
              </div>
            </a>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
