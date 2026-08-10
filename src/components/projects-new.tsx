import { FaExternalLinkAlt, FaArrowRight } from "react-icons/fa";
import { useTranslation } from "../i18n/LanguageContext";

import image1 from "../assets/project_1.webp"
import image2 from "../assets/project_2.webp"
import image3 from "../assets/project_3.webp"
import image4 from "../assets/project_4.webp"
import image5 from "../assets/project_5.webp"
import image6 from "../assets/project_6.webp"
import image7 from "../assets/project_7.webp"
import image8 from "../assets/project_8.webp"
import image9 from "../assets/project_9.webp"

const projectImages = [image1, image2, image3, image4, image5, image6, image7, image8, image9];
const projectUrls = ["https://capacitateparaelempleo.org/", "https://aprende.org/", "https://www.genera.cl/", "https://www.ekasa.mx/", "https://inbound.black-n-orange.com/growth-summit-mty-2026", "https://malekservice.com/", "https://universidad.tecmilenio.mx/tecmilenio-cdmx", "https://gtplastics.mx/es/", "https://madreceiba.mx/cotizador/map.html"];

const ProjectsNew = () => {
    const { t } = useTranslation();
    const projectItems = t('projects.items') as { name: string; description: string; tags: string[] }[];

    return (
        <section className="relative py-28 bg-[#181818] overflow-hidden" id="projects">
            {/* Background gradient orbs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#673AB7]/20 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FF5722]/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-16 relative z-10">
                {/* Section header */}
                <div className="text-center mb-16" data-aos="fade-up">
                    <p className="text-sm font-medium text-[#FFEB3B] tracking-widest uppercase mb-4">
                        {t('projects.badge')}
                    </p>
                    <h2 className="text-[#F7F7F7] mb-4">{t('projects.title')}</h2>
                    <p className="text-lg text-[#F7F7F7]/70 max-w-2xl mx-auto leading-relaxed">
                        {t('projects.description')}
                    </p>
                </div>

                {/* Projects grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectItems.map((project, index) => (
                        <div
                            key={index}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            className="group relative bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-[#FFEB3B]/50 hover:shadow-2xl hover:shadow-[#FFEB3B]/20 transition-all duration-500 hover:-translate-y-2"
                        >
                            {/* Image container */}
                            <div className="relative aspect-[16/10] overflow-hidden">
                                <img
                                    src={projectImages[index]}
                                    alt={project.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Hover overlay with gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                                {/* External link button (shown on hover) */}
                                {projectUrls[index] && (
                                    <a
                                        href={projectUrls[index]}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-xl text-text-primary opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-accent hover:text-white shadow-lg"
                                    >
                                        <FaExternalLinkAlt className="text-sm" />
                                    </a>
                                )}

                                {/* View project text (shown on hover) */}
                                {projectUrls[index] && (
                                    <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75">
                                        <a
                                            href={projectUrls[index]}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-white text-sm font-medium hover:gap-3 transition-all duration-300"
                                        >
                                            {t('projects.view_project')}
                                            <FaArrowRight className="text-xs" />
                                        </a>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col h-full">
                                <h3 className="text-lg font-semibold text-[#F7F7F7] mb-4 group-hover:text-[#FFEB3B] transition-colors duration-300">
                                    {project.name}
                                </h3>

                                {/* Technology tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 bg-black/20 rounded-full text-xs font-medium text-[#F7F7F7]/70 border border-white/10 group-hover:border-[#FFEB3B]/30 group-hover:text-[#FFEB3B] group-hover:bg-[#FFEB3B]/10 transition-all duration-300"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* 
                                {projectUrls[index] && (
                                    <div className="mt-auto pt-2">
                                        <a
                                            href={projectUrls[index]}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-[#FF5722] text-sm font-medium hover:text-[#FFEB3B] transition-colors"
                                        >
                                            {t('projects.view_project')}
                                            <FaExternalLinkAlt className="text-xs" />
                                        </a>
                                    </div>
                                )} */}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-20" data-aos="fade-up" data-aos-delay="400">
                    <p className="text-[#F7F7F7]/70 mb-6 text-lg">{t('projects.end_cta_title')}</p>
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-[#FF5722] text-[#F7F7F7] rounded-full font-medium hover:bg-[#FFEB3B] hover:text-[#181818] hover:shadow-xl hover:shadow-[#FFEB3B]/20 hover:-translate-y-0.5 transition-all duration-300"
                    >
                        {t('projects.end_cta_button')}
                        <FaArrowRight className="text-sm" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ProjectsNew;
