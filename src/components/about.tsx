import photo from "../assets/san_programmer.png"
import { useTranslation } from "../i18n/LanguageContext";

const About = () => {
    const { t } = useTranslation();

    return (
        <section className="relative py-28 bg-white section-glow" id="about">
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-glow-blue rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-16">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-16 min-h-[70vh]">
                    {/* Image */}
                    <div className="w-full lg:w-1/3 flex justify-center" data-aos="fade-right" data-aos-duration="1000">
                        <div className="relative">
                            <div className="absolute -inset-6 bg-gradient-to-br from-indigo-100/50 to-violet-100/50 rounded-3xl blur-xl" />
                            <img
                                src={photo}
                                alt="Sandra Programmer"
                                className="relative w-56 lg:w-72 drop-shadow-2xl"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="w-full lg:w-1/2" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
                        <p className="text-sm font-medium text-text-muted tracking-widest uppercase mb-4">{t('about.badge')}</p>
                        <h2 className="text-text-primary mb-8">{t('about.title')}</h2>
                        <div className="space-y-5">
                            <p className="text-lg text-text-secondary leading-relaxed">
                                {t('about.p1')}
                            </p>
                            <p className="text-lg text-text-secondary leading-relaxed">
                                {t('about.p2')}
                            </p>
                        </div>

                        {/* Stats-like pills inspired by Antigravity's icon circles */}
                        <div className="flex flex-wrap gap-3 mt-10">
                            {['React', 'TypeScript', 'Node.js', 'Tailwind'].map((tech) => (
                                <span
                                    key={tech}
                                    className="px-4 py-2 bg-surface rounded-full text-sm font-medium text-text-secondary border border-border hover:border-accent/30 hover:text-accent transition-all duration-300"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About