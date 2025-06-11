import { Header } from "../components/header";
import { SocialFeed } from "../components/social-feed";
import { NewsSection } from "../components/news-section";
import { ProfileSidebar } from "../components/profile-sidebar";

export default function PublicFigureHub() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-8">
            {/* Social Media Feed - Aqua Theme */}
            <section>
              <h3 className="text-xl font-semibold text-slate-700 mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-cyan-500 rounded-full"></div>
                Social Media Updates
              </h3>
              <SocialFeed />
            </section>

            {/* News & Events - Purple Theme */}
            <section>
              <h3 className="text-xl font-semibold text-slate-700 mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
                News & Events
              </h3>
              <NewsSection />
            </section>
          </div>

          {/* Sidebar - Pink Theme */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h3 className="text-xl font-semibold text-slate-700 mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-pink-500 rounded-full"></div>
                Personal Information
              </h3>
              <ProfileSidebar />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-slate-200 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-600 text-sm">
            © 2025 Hab. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
