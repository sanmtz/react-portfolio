import { useTranslation } from "../i18n/LanguageContext";
import SkillsCarousel from "./skills-carousel";

const Skills = () => {
    const { t } = useTranslation();

    return (
        <section className="relative py-28 bg-[#181818] overflow-hidden section-glow" id="skills">
            {/* Antigravity-style gradient orbs */}
            <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#673AB7]/20 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
            <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-[#FF5722]/20 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />

            <div className="container mx-auto px-6 lg:px-16 mb-14 text-center relative z-10" data-aos="fade-down">
                <p className="text-sm font-medium text-[#FFEB3B] tracking-widest uppercase mb-4">{t('skills.badge')}</p>
                <h2 className="text-[#F7F7F7] mb-4">{t('skills.title')}</h2>
                <p className="text-lg text-[#F7F7F7]/70 max-w-md mx-auto">{t('skills.description')}</p>
            </div>

            <SkillsCarousel />
        </section>
    );
};

export default Skills