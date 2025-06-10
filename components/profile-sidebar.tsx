import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Twitter, Youtube, Globe, User, Instagram } from "lucide-react";

const socialStats = [
  {
    platform: "Twitter",
    icon: Twitter,
    color: "text-blue-500",
    bg: "bg-blue-50",
    link: "https://twitter.com/tanda_hazuki?",
  },
  {
    platform: "YouTube",
    icon: Youtube,
    color: "text-red-500",
    bg: "bg-red-50",
    link: "https://youtube.com/channel/UCOLL3KDzhqu-CQ_uXZUQ7XA?si=2k6kGbRMTFbQ89am",
  },
  {
    platform: "Instagram",
    icon: Instagram,
    color: "text-blue-600",
    bg: "bg-blue-50",
    link: "https://www.instagram.com/tandahazuki_/",
  },
];

export function ProfileSidebar() {
  return (
    <div className="space-y-6">
      {/* Profile Card - Pink Theme */}
      <Card className="backdrop-blur-sm bg-white/90 border border-pink-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50 border-b border-pink-100">
          <CardTitle className="flex items-center gap-3 text-slate-700">
            <div className="w-8 h-8 bg-pink-300 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-pink-300">Profile</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-center mb-6">
            <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-pink-100">
              <AvatarImage src="/hachan.jpg" alt="Profile" />
              <AvatarFallback className="bg-gradient-to-br from-pink-400 to-rose-500 text-white text-2xl">
                JD
              </AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold text-slate-800 mb-1">
              Tanda Hazuki
            </h2>
            <p className="text-slate-600 mb-3">Singer, Idol, Actress</p>
            <Badge className="bg-pink-100 text-pink-700 border-pink-200">
              Verified
            </Badge>
          </div>

          <p className="text-sm text-slate-600 text-center mb-6 leading-relaxed">
            Tanda Hazuki is a singer, idol, and actress.
          </p>

          <div className="flex justify-center gap-2 mb-6">
            <a href="https://moony.club/" target="_blank">
              <Button className="bg-pink-500 hover:bg-pink-600 text-white">
                <Globe className="w-4 h-4 mr-2" />
                Website
              </Button>
            </a>
          </div>

          {/* Social Media Links */}
          <div className="space-y-3">
            {socialStats.map((social) => (
              <div
                key={social.platform}
                className={`flex items-center justify-between p-3 rounded-lg ${social.bg} border border-pink-100 hover:shadow-md transition-shadow duration-200`}
              >
                <a href={social.link} target="_blank">
                  <div className="flex items-center gap-3">
                    <social.icon className={`w-5 h-5 ${social.color}`} />
                    <span className="font-medium text-slate-700">
                      {social.platform}
                    </span>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
