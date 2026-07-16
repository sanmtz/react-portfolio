import { useRef, useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useTranslation } from "../i18n/LanguageContext";

import image1 from "../assets/project_1.webp"
import image2 from "../assets/project_2.webp"
import image3 from "../assets/project_3.webp"
import image4 from "../assets/test.png"

const projectImages = [image1, image2, image3, image1, image2, image4];
const projectUrls = ["", "", "https://www.genera.cl/", "", "", "https://www.genera.cl/"];

const Projects = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const { t } = useTranslation();

    const projectItems = t('projects.items') as { name: string; description: string }[];

    useEffect(() => {
        const handleScroll = () => {
            const section = sectionRef.current;
            const track = trackRef.current;
            if (!section || !track) return;

            const rect = section.getBoundingClientRect();
            const sectionHeight = section.offsetHeight;
            const viewportHeight = window.innerHeight;

            const scrollableDistance = sectionHeight - viewportHeight;
            const scrolled = -rect.top;
            const progress = Math.min(Math.max(scrolled / scrollableDistance, 0), 1);

            setScrollProgress(progress);

            const trackWidth = track.scrollWidth;
            const visibleWidth = track.offsetWidth;
            const maxTranslate = trackWidth - visibleWidth;
            const translateX = progress * maxTranslate;

            track.style.transform = `translateX(-${translateX}px)`;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative bg-surface-dark"
            id="projects"
            style={{ height: `${(projectItems.length * 50) + 100}vh` }}
        >
            <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" />

                <div className="container mx-auto px-6 lg:px-16 mb-10 relative z-10">
                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-sm font-medium text-white/40 tracking-widest uppercase mb-3">{t('projects.badge')}</p>
                            <h2 className="text-white text-3xl lg:text-5xl">{t('projects.title')}</h2>
                        </div>
                        <div className="hidden md:flex items-center gap-4">
                            <span className="text-sm text-white/30 font-medium tabular-nums">
                                {String(Math.round(scrollProgress * projectItems.length) || 1).padStart(2, '0')} / {String(projectItems.length).padStart(2, '0')}
                            </span>
                            <div className="w-32 h-[2px] bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-white/60 rounded-full transition-all duration-150 ease-out"
                                    style={{ width: `${scrollProgress * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative w-full overflow-hidden px-6 lg:px-16">
                    <div
                        ref={trackRef}
                        className="flex gap-6 will-change-transform"
                        style={{ transition: 'transform 0.1s ease-out' }}
                    >
                        {projectItems.map((project, index) => (
                            <div key={index} className="flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[35vw]">
                                <div className="relative rounded-3xl overflow-hidden group bg-white/[0.03] border border-white/[0.06] hover:border-white/15 transition-all duration-500 h-full">
                                    <div className="aspect-[16/10] overflow-hidden">
                                        <img
                                            src={projectImages[index]}
                                            alt={project.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-5 flex items-center justify-between">
                                        <div>
                                            <h3 className="text-base font-semibold text-white mb-1">{project.name}</h3>
                                            <p className="text-sm text-white/40">{project.description}</p>
                                        </div>
                                        {projectUrls[index] && (
                                            <a
                                                href={projectUrls[index]}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-shrink-0 ml-4 p-3 bg-white/10 rounded-full text-white/60 hover:bg-white hover:text-surface-dark transition-all duration-300"
                                            >
                                                <FaExternalLinkAlt className="text-sm" />
                                            </a>
                                        )}
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                </div>
                            </div>
                        ))}

                        <div className="flex-shrink-0 w-[85vw] md:w-[35vw] lg:w-[25vw] flex items-center justify-center">
                            <div className="text-center">
                                <p className="text-white/30 text-lg mb-4">{t('projects.end_cta_title')}</p>
                                <a
                                    href="#contact"
                                    className="inline-block px-8 py-3.5 bg-white text-surface-dark rounded-full font-medium hover:bg-accent hover:text-white transition-all duration-300"
                                >
                                    {t('projects.end_cta_button')}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-500 ${scrollProgress > 0.05 ? 'opacity-0' : 'opacity-100'}`}>
                    <span className="text-xs text-white/20 uppercase tracking-widest">{t('projects.scroll')}</span>
                    <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
                        <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Projects