import Header from "./header";
import Footer from "./footer";
import Hero from "./hero";
import About from "./about";
import Skills from "./skills";
import AISection from "./ai-section";
// import WebAudit from "./web-audit";
import NewProject from "./new-project";
import ProjectsNew from "./projects-new";
import Contact from "./contact";

const Main = () => {
    return (
        <main className="relative overflow-x-hidden">
            <Header />
            <Hero />
            <About />
            <Skills />
            {/*  <WebAudit /> */}
            <AISection />
            <NewProject />
            <ProjectsNew />
            <Contact />
            <Footer />
        </main>
    )
}

export default Main