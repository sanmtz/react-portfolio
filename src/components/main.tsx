import Header from "./header";
import Footer from "./footer";
import Hero from "./hero";
import About from "./about";
import Skills from "./skills";
import AISection from "./ai-section";
import WebAudit from "./web-audit";
import Projects from "./projects";
import Contact from "./contact";

const Main = () => {
    return (
        <div className="relative">
            <Header />
            <Hero />
            <About />
            <Skills />
            <AISection />
            <WebAudit />
            <Projects />
            <Contact />
            <Footer />
        </div>
    )
}

export default Main