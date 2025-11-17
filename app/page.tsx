import {Header} from "@/core/components/Header";
import {Footer} from "@/core/components/Footer";
import {Hero} from "@/core/components/Hero";
import {ChatArea} from "@/core/components/ChatArea";

// Hardcoded config for MVP
const appConfig = {
  name: "kiroCore",
  icon: "👻",
  welcomeMessage: "Welcome to kiroCore!",
  footer: {
    attribution: "Built with Kiro 💀",
    links: [
      {label: "GitHub", href: "https://github.com"},
      {label: "Docs", href: "https://docs.example.com"},
    ],
  },
};

export default function Home() {
  return (
    <>
      <Header appName={appConfig.name} appIcon={appConfig.icon} />

      {/* Hero Section */}
      <Hero />

      {/* Chat Section */}
      <section id="chat" className="min-h-screen">
        <ChatArea
          welcomeMessage={appConfig.welcomeMessage}
          appIcon={appConfig.icon}
        />
      </section>

      <Footer
        attribution={appConfig.footer.attribution}
        links={appConfig.footer.links}
      />
    </>
  );
}
