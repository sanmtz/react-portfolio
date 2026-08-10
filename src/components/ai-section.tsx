import { useEffect, useRef } from "react";
import { FaRobot, FaMagic, FaLightbulb, FaCode, FaBolt } from "react-icons/fa";
import aiBrain from "../assets/ai_brain.png";
import { useTranslation } from "../i18n/LanguageContext";

const iconMap = [<FaRobot />, <FaMagic />, <FaCode />, <FaLightbulb />];

const AISection = () => {
    const orbRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();

    const aiSkills = (t('ai.skills') as { title: string; description: string }[]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!orbRef.current) return;
            const rect = orbRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const moveX = (e.clientX - centerX) * 0.02;
            const moveY = (e.clientY - centerY) * 0.02;
            orbRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="relative py-28 overflow-hidden bg-[#181818] section-glow" id="ai">
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#FF5722]/20 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-[#673AB7]/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-16 relative z-10">
                {/* <div className="flex justify-center mb-6" data-aos="fade-down">
                    <div className="flex items-center gap-2 px-4 py-2 bg-accent/[0.06] border border-accent/10 rounded-full">
                        <FaBolt className="text-accent text-xs" />
                        <span className="text-xs font-medium text-accent/70 tracking-wider uppercase">{t('ai.badge')}</span>
                    </div>
                </div> */}

                <div className="text-center mb-20" data-aos="fade-up">
                    <h2 className="text-4xl lg:text-5xl font-bold text-[#F7F7F7] mb-6 leading-tight">
                        {t('ai.title_before')}{' '}
                        <span className="relative inline-block">
                            <span className="relative z-10 bg-gradient-to-r from-[#FF5722] to-[#673AB7] bg-clip-text text-transparent">{t('ai.title_highlight')}</span>
                            <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-[#FF5722] to-[#673AB7] rounded-full opacity-40" />
                        </span>
                    </h2>
                    <p className="text-lg text-[#F7F7F7]/70 max-w-2xl mx-auto leading-relaxed">
                        {t('ai.description')}
                    </p>
                </div>

                {/* <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="w-full lg:w-2/5 flex justify-center" data-aos="zoom-in" data-aos-delay="200">
                        <div ref={orbRef} className="relative transition-transform duration-300 ease-out">
                            <div className="absolute -inset-8 rounded-full border border-accent/15 animate-[spin_20s_linear_infinite]">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-accent rounded-full shadow-[0_0_15px_var(--color-accent-glow)]" />
                            </div>
                            <div className="absolute -inset-16 rounded-full border border-text-muted/10 animate-[spin_30s_linear_infinite_reverse]">
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-text-muted/40 rounded-full" />
                            </div>
                            <div className="relative w-64 h-64 lg:w-80 lg:h-80">
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-glow-violet rounded-full blur-3xl" />
                                <div className="relative w-full h-full rounded-3xl overflow-hidden bg-surface-dark shadow-2xl shadow-accent/10 border border-border">
                                    <img src={aiBrain} alt="AI Neural Network" className="w-full h-full object-contain" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-5">
                        {aiSkills.map((skill, index) => (
                            <div
                                key={index}
                                data-aos="fade-up"
                                data-aos-delay={index * 100 + 300}
                                className="group relative p-6 rounded-2xl bg-white border border-border hover:border-accent/20 hover:shadow-xl hover:shadow-accent/5 transition-all duration-500 cursor-default hover:-translate-y-1"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center text-accent text-xl mb-4 group-hover:from-accent/20 group-hover:to-accent/10 transition-all duration-500">
                                    {iconMap[index]}
                                </div>
                                <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                                    {skill.title}
                                </h3>
                                <p className="text-sm text-text-secondary leading-relaxed">
                                    {skill.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div> */}

                <div className="mt-24 relative" data-aos="fade-up" data-aos-delay="600">
                    <p className="text-center text-xs text-[#FFEB3B] uppercase tracking-[0.3em] mb-8">{t('ai.tools_label')}</p>
                    <div className="flex items-center justify-center flex-wrap gap-3 md:gap-4">
                        {['OpenAI', 'Gemini', 'Codex', 'Antigravity', 'Cursor', 'GitHub Copilot', 'Claude', 'ChatGPT'].map((tool) => (
                            <span
                                key={tool}
                                className="px-5 py-2.5 rounded-full border border-white/10 text-sm font-medium text-[#F7F7F7]/70 hover:text-[#FFEB3B] hover:border-[#FFEB3B]/30 hover:bg-[#FFEB3B]/10 transition-all duration-300 cursor-default"
                            >
                                {tool}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AISection;
