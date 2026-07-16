import { useEffect, useRef, useState } from "react";
import { FaSearch, FaTachometerAlt, FaMobileAlt, FaUniversalAccess, FaChartLine, FaCheckCircle } from "react-icons/fa";
import { FiZap, FiEye, FiShield } from "react-icons/fi";
import { useTranslation } from "../i18n/LanguageContext";

const metricKeys = ['performance', 'accessibility', 'best_practices', 'seo'] as const;
const metricValues = [98, 95, 100, 97];
const metricIcons = [<FaTachometerAlt />, <FaUniversalAccess />, <FiShield />, <FaSearch />];
const metricColors = [
    { stop1: '#34d399', stop2: '#22c55e' },
    { stop1: '#818cf8', stop2: '#3b82f6' },
    { stop1: '#a78bfa', stop2: '#a855f7' },
    { stop1: '#fbbf24', stop2: '#f97316' },
];

const serviceIcons = [
    <FaTachometerAlt className="text-2xl" />,
    <FiEye className="text-2xl" />,
    <FaSearch className="text-2xl" />,
    <FaMobileAlt className="text-2xl" />,
    <FiZap className="text-2xl" />,
    <FaChartLine className="text-2xl" />,
];

const CircularScore = ({ value, label, icon, colors, delay }: { value: number; label: string; icon: React.ReactNode; colors: { stop1: string; stop2: string }; delay: number }) => {
    const [animatedValue, setAnimatedValue] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    const duration = 1500;
                    const start = performance.now();
                    const animate = (now: number) => {
                        const elapsed = now - start;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setAnimatedValue(Math.round(eased * value));
                        if (progress < 1) requestAnimationFrame(animate);
                    };
                    setTimeout(() => requestAnimationFrame(animate), delay);
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [value, delay]);

    const circumference = 2 * Math.PI * 54;
    const strokeDashoffset = circumference - (animatedValue / 100) * circumference;
    const gradientId = `gradient-${label.replace(/\s/g, '-')}`;

    return (
        <div ref={ref} className="flex flex-col items-center gap-3 group">
            <div className="relative w-32 h-32">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" stroke="currentColor" strokeWidth="6" fill="none" className="text-white/[0.06]" />
                    <circle
                        cx="60" cy="60" r="54"
                        strokeWidth="6"
                        fill="none"
                        strokeLinecap="round"
                        style={{
                            strokeDasharray: circumference,
                            strokeDashoffset,
                            stroke: `url(#${gradientId})`,
                            transition: 'stroke-dashoffset 0.1s ease-out',
                        }}
                    />
                    <defs>
                        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor={colors.stop1} />
                            <stop offset="100%" stopColor={colors.stop2} />
                        </linearGradient>
                    </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-white tabular-nums">{animatedValue}</span>
                </div>
            </div>
            <div className="flex items-center gap-2 text-white/40 group-hover:text-white/70 transition-colors">
                {icon}
                <span className="text-sm font-medium">{label}</span>
            </div>
        </div>
    );
};

const WebAudit = () => {
    const { t } = useTranslation();
    const services = t('audit.services') as { title: string; description: string; tags: string[] }[];

    return (
        <section className="relative py-28 overflow-hidden bg-white" id="audit">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-50 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-50 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-16 relative z-10">
                <div className="text-center mb-20" data-aos="fade-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full mb-6">
                        <FaCheckCircle className="text-emerald-500 text-xs" />
                        <span className="text-xs font-medium text-emerald-600 tracking-wider uppercase">{t('audit.badge')}</span>
                    </div>
                    <h2 className="text-text-primary text-4xl lg:text-5xl font-bold mb-6">
                        {t('audit.title_before')}{' '}
                        <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">{t('audit.title_highlight')}</span>
                    </h2>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
                        {t('audit.description')}
                    </p>
                </div>

                <div className="mb-24" data-aos="zoom-in" data-aos-delay="200">
                    <div className="relative bg-surface-dark rounded-3xl p-10 md:p-14 overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.03]"
                            style={{
                                backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                                backgroundSize: '40px 40px',
                            }}
                        />
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-emerald-500/10 rounded-full blur-[100px]" />

                        <div className="relative z-10">
                            <div className="flex items-center justify-center gap-2 mb-10">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                <p className="text-sm text-white/30 font-medium tracking-wider uppercase">{t('audit.lighthouse_label')}</p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
                                {metricKeys.map((key, index) => (
                                    <CircularScore
                                        key={key}
                                        value={metricValues[index]}
                                        label={t(`audit.metrics.${key}`)}
                                        icon={metricIcons[index]}
                                        colors={metricColors[index]}
                                        delay={index * 200}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            data-aos="fade-up"
                            data-aos-delay={index * 80}
                            className="group relative p-7 rounded-2xl bg-surface border border-border hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-500 hover:-translate-y-1"
                        >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-5 group-hover:from-emerald-100 group-hover:to-teal-100 transition-all duration-300">
                                {serviceIcons[index]}
                            </div>

                            <h3 className="text-lg font-semibold text-text-primary mb-3 group-hover:text-emerald-700 transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-sm text-text-secondary leading-relaxed mb-5">
                                {service.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {service.tags.map((tag) => (
                                    <span key={tag} className="px-3 py-1 bg-white rounded-full text-xs font-medium text-text-muted border border-border group-hover:border-emerald-200 group-hover:text-emerald-600 transition-all">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-16" data-aos="fade-up" data-aos-delay="400">
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-medium hover:shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-0.5 transition-all duration-300"
                    >
                        <FaSearch className="text-sm" />
                        {t('audit.cta')}
                    </a>
                </div>
            </div>
        </section>
    );
};

export default WebAudit;
