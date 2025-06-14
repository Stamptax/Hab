import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Youtube, Twitter, User, Instagram, Moon } from "lucide-react";
import { AiFillTikTok } from "react-icons/ai";

const socialStats = [
  {
    platform: "Fan Club",
    icon: Moon,
    color: "text-yellow-500",
    bg: "bg-yellow-50",
    link: "https://moony.club/",
  },
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
    platform: "TikTok",
    icon: AiFillTikTok,
    color: "text-black",
    bg: "bg-purple-50",
    link: "https://www.tiktok.com/@tandachan_28",
  },
  {
    platform: "Instagram",
    icon: Instagram,
    color: "text-pink-600",
    bg: "bg-pink-50",
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
              <AvatarImage
                src="/hachan.jpg"
                alt="Profile"
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-pink-400 to-rose-500 text-white text-2xl">
                TH
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

          {/* Social Media Links */}
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 rounded-xl p-4">
            <div className="grid grid-cols-5 gap-3 justify-items-center">
              {socialStats.map((social) => (
                <a
                  key={social.platform}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 ${social.bg} rounded-full flex items-center justify-center border border-pink-100 hover:shadow-md hover:scale-110 transition-all duration-200 group`}
                  title={social.platform}
                >
                  <social.icon
                    className={`w-6 h-6 ${social.color} group-hover:scale-110 transition-transform duration-200`}
                  />
                </a>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
