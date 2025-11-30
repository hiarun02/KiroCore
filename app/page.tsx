import {About, Footer, Header, Hero, ScrollToTop} from "@/core/components";
import {AppShowcase} from "@/core/components/sections/AppShowcase";

// Hardcoded config for MVP
const appConfig = {
  name: "kiroCore",
  icon: "👻",
  footer: {
    attribution: "Built with Kiro 💀",
    links: [
      {label: "GitHub", href: "https://github.com"},
      {label: "Browse Apps", href: "/apps"},
    ],
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 overflow-x-hidden">
      <Header appName={appConfig.name} appIcon={appConfig.icon} />

      {/* Hero Section */}
      <Hero />

      {/* App Showcase */}
      <AppShowcase />

      {/* About Section */}
      <About />

      <Footer
        attribution={appConfig.footer.attribution}
        links={appConfig.footer.links}
        fixed={false}
      />

      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  );
}
