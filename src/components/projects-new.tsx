import { FaExternalLinkAlt, FaArrowRight } from "react-icons/fa";
import { useTranslation } from "../i18n/LanguageContext";

import image1 from "../assets/project_1.webp"
import image2 from "../assets/project_2.webp"
import image3 from "../assets/project_3.webp"
import image4 from "../assets/test.png"

const projectImages = [image1, image2, image3, image1, image2, image4];
const projectUrls = ["#", "#", "https://www.genera.cl/", "#", "#", "#"];

const ProjectsNew = () => {
    const { t } = useTranslation();
    const projectItems = t('projects.items') as { name: string; description: string; tags: string[] }[];

    return (
        <section className="relative py-28 bg-surface overflow-hidden" id="projects">
            {/* Background gradient orbs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-glow-violet rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-glow-blue rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-16 relative z-10">
                {/* Section header */}
                <div className="text-center mb-16" data-aos="fade-up">
                    <p className="text-sm font-medium text-text-muted tracking-widest uppercase mb-4">
                        {t('projects.badge')}
                    </p>
                    <h2 className="text-text-primary mb-4">{t('projects.title')}</h2>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
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
                            className="group relative bg-white rounded-2xl overflow-hidden border border-border hover:border-accent/20 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500 hover:-translate-y-2"
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
                                <h3 className="text-lg font-semibold text-text-primary mb-4 group-hover:text-accent transition-colors duration-300">
                                    {project.name}
                                </h3>

                                {/* Technology tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 bg-surface rounded-full text-xs font-medium text-text-muted border border-border group-hover:border-accent/15 group-hover:text-accent/70 group-hover:bg-accent/[0.04] transition-all duration-300"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* External Link */}
                                {projectUrls[index] && (
                                    <div className="mt-auto pt-2">
                                        <a
                                            href={projectUrls[index]}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:text-accent-light transition-colors"
                                        >
                                            {t('projects.view_project')}
                                            <FaExternalLinkAlt className="text-xs" />
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-20" data-aos="fade-up" data-aos-delay="400">
                    <p className="text-text-secondary mb-6 text-lg">{t('projects.end_cta_title')}</p>
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white rounded-full font-medium hover:bg-accent-light hover:shadow-xl hover:shadow-accent/20 hover:-translate-y-0.5 transition-all duration-300"
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
