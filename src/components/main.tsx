import Header from "./header";
import Footer from "./footer";
import Hero from "./hero";
import About from "./about";
import Skills from "./skills";
import AISection from "./ai-section";
import WebAudit from "./web-audit";
import ProjectsNew from "./projects-new";
import Contact from "./contact";

const Main = () => {
    return (
        <div className="relative">
            <Header />
            <Hero />
            <About />
            <Skills />
            {/*  <WebAudit /> */}
            <AISection />
            <ProjectsNew />
            <Contact />
            <Footer />
        </div>
    )
}

export default Main