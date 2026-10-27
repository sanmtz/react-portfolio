import { FaJs, FaCss3Alt, FaHtml5, FaReact, FaGitAlt, FaBootstrap, FaFigma, FaAngular, FaGithub, FaBitbucket, FaPlug } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiFirebase, SiWordpress, SiHubspot, SiOctobercms } from "react-icons/si";

const skills = [
    { name: "JavaScript", icon: <FaJs className="text-[#F7DF1E]" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
    { name: "HTML5", icon: <FaHtml5 className="text-[#E34F26]" /> },
    { name: "CSS3", icon: <FaCss3Alt className="text-[#1572B6]" /> },
    { name: "React", icon: <FaReact className="text-[#61DAFB]" /> },
    { name: "Angular", icon: <FaAngular className="text-[#DD0031]" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#06B6D4]" /> },
    { name: "Figma", icon: <FaFigma className="text-[#F24E1E]" /> },
    { name: "APIs REST", icon: <FaPlug className="text-[#FF5722]" /> },
    { name: "WordPress", icon: <SiWordpress className="text-[#21759B]" /> },
    { name: "HubSpot", icon: <SiHubspot className="text-[#FF7A59]" /> },
    { name: "October CMS", icon: <SiOctobercms className="text-[#E57300]" /> },
    { name: "Git", icon: <FaGitAlt className="text-[#F05032]" /> },
    { name: "GitHub", icon: <FaGithub className="text-[#181717]" /> },
    { name: "Bitbucket", icon: <FaBitbucket className="text-[#0052CC]" /> },
    { name: "Firebase", icon: <SiFirebase className="text-[#FFCA28]" /> },
    { name: "Bootstrap", icon: <FaBootstrap className="text-[#7952B3]" /> },
];

const SkillsCarousel = () => (
    <div className="relative w-full overflow-hidden" data-aos="zoom-in" data-aos-delay="200">
        <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
            {[1, 2].map((set) => (
                <div key={set} className="flex gap-6 mx-3" aria-hidden={set === 2}>
                    {skills.map((skill) => (
                        <div
                            key={`${set}-${skill.name}`}
                            className="group flex h-32 w-32 cursor-default flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:border-[#FFEB3B]/50 hover:shadow-lg hover:shadow-[#FFEB3B]/20"
                        >
                            <div className="mb-3 transform text-4xl transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110">
                                {skill.icon}
                            </div>
                            <span className="text-xs font-medium text-[#F7F7F7]/70 transition-colors group-hover:text-[#FFEB3B]">
                                {skill.name}
                            </span>
                        </div>
                    ))}
                </div>
            ))}
        </div>

        <div className="absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#181818] to-transparent" aria-hidden="true" />
        <div className="absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#181818] to-transparent" aria-hidden="true" />
    </div>
);

export default SkillsCarousel;
