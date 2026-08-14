import { useTranslation } from "../i18n/LanguageContext";

const AISection = () => {
    const { t } = useTranslation();

    const aiSkills = (t('ai.skills') as { title: string; description: string }[]);

    return (
        <section className="relative py-28 overflow-hidden bg-[#181818] section-glow" id="ai">
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#FF5722]/20 rounded-full blur-[150px] pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-[#673AB7]/20 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

            <div className="container mx-auto px-6 lg:px-16 relative z-10">
                <div className="text-center mb-20" data-aos="fade-up">
                    <h2 className="text-4xl lg:text-5xl font-bold text-[#F7F7F7] mb-6 leading-tight">
                        {t('ai.title_before')}{' '}
                        <span className="relative inline-block">
                            <span className="relative z-10 bg-gradient-to-r from-[#FF5722] to-[#673AB7] bg-clip-text text-transparent">{t('ai.title_highlight')}</span>
                            <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-[#FF5722] to-[#673AB7] rounded-full opacity-40" aria-hidden="true" />
                        </span>
                    </h2>
                    <p className="text-lg text-[#F7F7F7]/70 max-w-2xl mx-auto leading-relaxed">
                        {t('ai.description')}
                    </p>
                </div>

                <div className="mt-24 relative" data-aos="fade-up" data-aos-delay="600">
                    <p className="text-center text-xs text-[#FFEB3B] uppercase tracking-[0.3em] mb-8">{t('ai.tools_label')}</p>
                    <ul className="flex items-center justify-center flex-wrap gap-3 md:gap-4" aria-label="Herramientas de IA utilizadas">
                        {['OpenAI', 'Gemini', 'Codex', 'Antigravity', 'Cursor', 'GitHub Copilot', 'Claude', 'ChatGPT'].map((tool) => (
                            <li
                                key={tool}
                                className="px-5 py-2.5 rounded-full border border-white/10 text-sm font-medium text-[#F7F7F7]/70 hover:text-[#FFEB3B] hover:border-[#FFEB3B]/30 hover:bg-[#FFEB3B]/10 transition-all duration-300 cursor-default"
                            >
                                {tool}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default AISection;
