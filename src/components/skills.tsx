import { FaJs, FaCss3Alt, FaHtml5, FaReact, FaNodeJs, FaJava, FaPython, FaGitAlt, FaBootstrap } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiMysql, SiFirebase, SiMongodb } from "react-icons/si";
import { useTranslation } from "../i18n/LanguageContext";

const skills = [
    { name: "JavaScript", icon: <FaJs className="text-[#F7DF1E]" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
    { name: "HTML5", icon: <FaHtml5 className="text-[#E34F26]" /> },
    { name: "CSS3", icon: <FaCss3Alt className="text-[#1572B6]" /> },
    { name: "React", icon: <FaReact className="text-[#61DAFB]" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#06B6D4]" /> },
    { name: "Node.js", icon: <FaNodeJs className="text-[#339933]" /> },
    { name: "Java", icon: <FaJava className="text-[#007396]" /> },
    { name: "Python", icon: <FaPython className="text-[#3776AB]" /> },
    { name: "Git", icon: <FaGitAlt className="text-[#F05032]" /> },
    { name: "MySQL", icon: <SiMysql className="text-[#4479A1]" /> },
    { name: "Firebase", icon: <SiFirebase className="text-[#FFCA28]" /> },
    { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" /> },
    { name: "Bootstrap", icon: <FaBootstrap className="text-[#7952B3]" /> },
];

const Skills = () => {
    const { t } = useTranslation();

    return (
        <section className="relative py-28 bg-surface overflow-hidden section-glow" id="skills">
            {/* Antigravity-style gradient orbs */}
            <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-glow-violet rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
            <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-glow-blue rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />

            <div className="container mx-auto px-6 lg:px-16 mb-14 text-center relative z-10" data-aos="fade-down">
                <p className="text-sm font-medium text-text-muted tracking-widest uppercase mb-4">{t('skills.badge')}</p>
                <h2 className="text-text-primary mb-4">{t('skills.title')}</h2>
                <p className="text-lg text-text-secondary max-w-md mx-auto">{t('skills.description')}</p>
            </div>

            {/* Scrolling carousel like Antigravity's icon row */}
            <div className="relative w-full overflow-hidden" data-aos="zoom-in" data-aos-delay="200">
                <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
                    {/* First set */}
                    <div className="flex gap-6 mx-3">
                        {skills.map((skill, index) => (
                            <div
                                key={`skill-1-${index}`}
                                className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-border hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 w-32 h-32 group cursor-default"
                            >
                                <div className="text-4xl mb-3 transform group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
                                    {skill.icon}
                                </div>
                                <span className="text-xs font-medium text-text-muted group-hover:text-text-primary transition-colors">{skill.name}</span>
                            </div>
                        ))}
                    </div>
                    {/* Duplicate */}
                    <div className="flex gap-6 mx-3">
                        {skills.map((skill, index) => (
                            <div
                                key={`skill-2-${index}`}
                                className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-border hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 w-32 h-32 group cursor-default"
                            >
                                <div className="text-4xl mb-3 transform group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
                                    {skill.icon}
                                </div>
                                <span className="text-xs font-medium text-text-muted group-hover:text-text-primary transition-colors">{skill.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Gradient overlays for smooth edges */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-surface to-transparent z-10"></div>
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-surface to-transparent z-10"></div>
            </div>
        </section>
    );
};

export default Skills