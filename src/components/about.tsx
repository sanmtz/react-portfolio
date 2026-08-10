import photo from "../assets/photo.webp"
import { useTranslation } from "../i18n/LanguageContext";

const About = () => {
    const { t } = useTranslation();

    return (
        <section className="relative py-28 bg-[#181818] section-glow" id="about">
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#673AB7]/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-16">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-16 min-h-[70vh]">
                    {/* Image */}
                    <div className="w-full lg:w-1/3 flex justify-center" data-aos="fade-right" data-aos-duration="1000">
                        <div className="relative">
                            <div className="absolute -inset-6 bg-gradient-to-br from-[#FF5722]/30 to-[#673AB7]/30 rounded-3xl blur-xl" />
                            <img
                                src={photo}
                                alt="Sandra Programmer"
                                className="relative w-56 lg:w-72 drop-shadow-2xl"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="w-full lg:w-1/2" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
                        <p className="text-sm font-medium text-[#FFEB3B] tracking-widest uppercase mb-4">{t('about.badge')}</p>
                        <h2 className="text-[#F7F7F7] mb-8">{t('about.title')}</h2>
                        <div className="space-y-5">
                            <p className="text-lg text-[#F7F7F7]/70 leading-relaxed">
                                {t('about.p1')}
                            </p>
                            <p className="text-lg text-[#F7F7F7]/70 leading-relaxed">
                                {t('about.p2')}
                            </p>
                        </div>


                    </div>
                </div>
            </div>
        </section>
    )
}

export default About