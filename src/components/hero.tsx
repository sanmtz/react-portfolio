import { useEffect, useRef, useState } from "react";
import photo from "../assets/san_programmer.webp"
import { useTranslation } from "../i18n/LanguageContext";

const Hero = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { t } = useTranslation();
    const roles: string[] = t('hero.roles');

    const [displayedText, setDisplayedText] = useState("");
    const [roleIndex, setRoleIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    // Reset typewriter when language changes
    useEffect(() => {
        setDisplayedText("");
        setRoleIndex(0);
        setCharIndex(0);
        setIsDeleting(false);
    }, [roles]);

    // Typewriter effect
    useEffect(() => {
        const currentRole = roles[roleIndex];
        if (!currentRole) return;
        let timeout: ReturnType<typeof setTimeout>;

        if (!isDeleting && charIndex < currentRole.length) {
            timeout = setTimeout(() => {
                setDisplayedText(currentRole.slice(0, charIndex + 1));
                setCharIndex(charIndex + 1);
            }, 80);
        } else if (!isDeleting && charIndex === currentRole.length) {
            timeout = setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && charIndex > 0) {
            timeout = setTimeout(() => {
                setDisplayedText(currentRole.slice(0, charIndex - 1));
                setCharIndex(charIndex - 1);
            }, 40);
        } else if (isDeleting && charIndex === 0) {
            setIsDeleting(false);
            setRoleIndex((roleIndex + 1) % roles.length);
        }

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, roleIndex, roles]);

    // Particle canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const particles: { x: number; y: number; vx: number; vy: number; size: number; color: string; opacity: number }[] = [];
        const colors = ['#FF5722', '#673AB7', '#FFEB3B', '#F7F7F7'];

        for (let i = 0; i < 60; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                size: Math.random() * 3 + 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                opacity: Math.random() * 0.5 + 0.1,
            });
        }

        let animationId: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.opacity;
                ctx.fill();
            });
            ctx.globalAlpha = 1;
            animationId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-[#181818]" id="home">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
            <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-[#673AB7]/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-[#FF5722]/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-16 py-20 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16 min-h-[80vh]">
                    <div className="flex flex-col items-center lg:items-start w-full lg:w-1/2">
                        <p className="text-sm font-medium text-[#FFEB3B] tracking-widest uppercase mb-6" data-aos="fade-up" data-aos-delay="100">
                            {t('hero.badge')}
                        </p>
                        <h1 className="text-[#F7F7F7] text-center lg:text-left mb-4" data-aos="fade-up" data-aos-delay="200">
                            {t('hero.greeting')}{' '}
                            <span className="bg-gradient-to-r from-[#FF5722] to-[#673AB7] bg-clip-text text-transparent">Sandra</span>
                        </h1>

                        <div className="h-12 flex items-center mb-8" data-aos="fade-up" data-aos-delay="300">
                            <span className="text-2xl lg:text-3xl font-medium text-[#F7F7F7]/80">
                                {displayedText}
                            </span>
                            <span className="inline-block w-[3px] h-8 bg-[#FF5722] ml-1 animate-[blink_1s_step-end_infinite]" />
                        </div>

                        <p className="text-lg lg:text-xl text-[#F7F7F7]/70 text-center lg:text-left max-w-lg leading-relaxed mb-10" data-aos="fade-up" data-aos-delay="400">
                            {t('hero.description')}
                        </p>
                        <div className="flex flex-wrap gap-4" data-aos="fade-up" data-aos-delay="500">
                            <a href="#projects" className="px-8 py-3.5 bg-[#FF5722] text-[#F7F7F7] rounded-full font-medium hover:bg-[#FFEB3B] hover:text-[#181818] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFEB3B]/20 hover:-translate-y-0.5">
                                {t('hero.cta_projects')}
                            </a>
                            <a href="#about" className="px-8 py-3.5 bg-transparent text-[#F7F7F7] rounded-full font-medium border border-white/20 hover:border-[#FFEB3B] hover:text-[#FFEB3B] transition-all duration-300 hover:-translate-y-0.5">
                                {t('hero.cta_about')}
                            </a>
                        </div>
                    </div>

                    <div className="flex items-center justify-center w-full lg:w-1/2" data-aos="zoom-in" data-aos-delay="600">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-br from-[#FF5722]/40 via-transparent to-[#673AB7]/40 rounded-full blur-2xl animate-[pulse-glow_4s_ease-in-out_infinite]" />
                            <figure className="relative rounded-full overflow-hidden h-64 w-64 lg:h-96 lg:w-96 ring-2 ring-[#FFEB3B]/50 shadow-2xl shadow-[#673AB7]/20">
                                <img src={photo} alt="Sandra - Web Developer" className="w-full h-full object-cover" />
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero