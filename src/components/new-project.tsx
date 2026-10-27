import { useTranslation } from "../i18n/LanguageContext";

import sitemapImage from "../assets/1_sitemap.png";
import wireframeImage from "../assets/2_wireframe.png";
import designImage from "../assets/3_design.png";

const projectImages = [sitemapImage, wireframeImage, designImage];
const githubUrl = "https://github.com/sanmtz/performance-analyzer";

const NewProject = () => {
    const { t } = useTranslation();
    const steps = t('new_project.steps') as { title: string; alt: string; description: string }[];

    return (
        <section className="relative overflow-hidden bg-[#181818] py-28 section-glow" id="new-project">
            <div className="absolute -top-20 left-0 h-[360px] w-[360px] rounded-full bg-[#673AB7]/20 blur-[130px] pointer-events-none" aria-hidden="true" />
            <div className="absolute -bottom-20 right-0 h-[360px] w-[360px] rounded-full bg-[#FF5722]/15 blur-[130px] pointer-events-none" aria-hidden="true" />

            <div className="container relative z-10 mx-auto px-6 lg:px-16">
                <div className="mb-16 text-center" data-aos="fade-up">
                    <p className="mb-4 text-sm font-medium uppercase tracking-widest text-[#FFEB3B]">
                        {t('new_project.badge')}
                    </p>
                    <h2 className="mb-4 text-[#F7F7F7]">{t('new_project.title')}</h2>
                    <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[#F7F7F7]/70">
                        {t('new_project.description')}
                    </p>
                    <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-[#F7F7F7]/60">
                        {t('new_project.details')}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {steps.map((step, index) => (
                        <article
                            key={step.title}
                            className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-[#FFEB3B]/40 hover:shadow-2xl hover:shadow-[#FFEB3B]/10"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className="flex items-center gap-4 border-b border-white/10 px-6 py-5">
                                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF5722]/15 text-sm font-semibold text-[#FFEB3B]">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <h3 className="text-lg font-semibold text-[#F7F7F7] transition-colors group-hover:text-[#FFEB3B]">
                                    {step.title}
                                </h3>
                            </div>
                            <div className="flex h-[360px] items-center justify-center bg-white p-4 sm:h-[440px]">
                                <img
                                    src={projectImages[index]}
                                    alt={step.alt}
                                    loading="lazy"
                                    className="h-full w-full object-contain"
                                />
                            </div>
                            <p className="min-h-24 px-6 py-5 text-sm leading-relaxed text-[#F7F7F7]/60">
                                {step.description}
                            </p>
                        </article>
                    ))}
                </div>

                <div className="mt-12 text-center" data-aos="fade-up">
                    <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 rounded-full bg-[#FF5722] px-8 py-4 font-medium text-[#F7F7F7] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FFEB3B] hover:text-[#181818] hover:shadow-xl hover:shadow-[#FFEB3B]/20"
                    >
                        {t('new_project.github_button')}
                    </a>
                </div>
            </div>
        </section>
    );
};

export default NewProject;
