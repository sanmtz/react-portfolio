import { useState, useEffect } from "react"
import { FiMenu, FiX, FiUser, FiSettings, FiBriefcase, FiPhone, FiCode, FiGlobe, FiCpu } from "react-icons/fi";
import { useTranslation } from "../i18n/LanguageContext";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { lang, setLang, t } = useTranslation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { id: 2, name: t('header.about'), href: "#about", icon: <FiUser /> },
        { id: 3, name: t('header.skills'), href: "#skills", icon: <FiSettings /> },
        { id: 4, name: t('header.ai'), href: "#ai", icon: <FiCpu /> },
        { id: 5, name: t('header.projects'), href: "#projects", icon: <FiBriefcase /> },
        { id: 6, name: t('header.contact'), href: "#contact", icon: <FiPhone /> },
    ];

    const toggleLang = () => setLang(lang === 'es' ? 'en' : 'es');

    return (
        <header className={`fixed top-0 left-0 right-0 z-[60] w-full transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]' : 'bg-transparent'}`} data-aos="fade-down" data-aos-duration="500">
            <div className="container mx-auto px-6 lg:px-16">
                <div className="flex justify-between items-center py-5">
                    {/* Logo */}
                    <a href="#" className="flex items-center gap-2 text-text-primary hover:text-accent transition-colors">
                        <FiCode className="text-2xl" />
                        <span className="font-semibold text-lg tracking-tight">Sandra</span>
                    </a>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center gap-3">
                        {/* Mobile lang toggle */}
                        <button
                            onClick={toggleLang}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-xs font-semibold text-text-secondary hover:text-accent hover:border-accent/30 transition-all"
                        >
                            <FiGlobe className="text-sm" />
                            {lang.toUpperCase()}
                        </button>
                        <button className="focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
                            <FiMenu className="w-6 h-6 text-text-primary" />
                        </button>
                    </div>

                    {/* Desktop menu */}
                    <nav className="hidden md:flex items-center">
                        <ul className="flex items-center gap-1">
                            {navLinks.map((link) => (
                                <li key={link.id}>
                                    <a
                                        className="px-4 py-2 rounded-full text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-black/[0.04] transition-all duration-300"
                                        href={link.href}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        {/* Language toggle */}
                        <button
                            onClick={toggleLang}
                            className="ml-2 flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium text-text-secondary hover:text-accent hover:bg-accent/[0.04] transition-all duration-300 cursor-pointer"
                            title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
                        >
                            <FiGlobe className="text-base" />
                            <span className="text-xs font-semibold">{lang === 'es' ? 'EN' : 'ES'}</span>
                        </button>

                        <a
                            href="#contact"
                            className="ml-2 px-5 py-2.5 bg-text-primary text-white rounded-full text-sm font-medium hover:bg-accent transition-colors duration-300"
                        >
                            {t('header.cta')}
                        </a>
                    </nav>
                </div>

                {/* Mobile menu */}
                <div className={`fixed inset-0 z-50 bg-white/95 backdrop-blur-2xl flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                    <button className="absolute top-6 right-6" onClick={() => setIsOpen(false)}>
                        <FiX className="w-7 h-7 text-text-primary hover:text-accent transition-colors" />
                    </button>

                    <nav>
                        <ul className="flex flex-col gap-4 text-center">
                            {navLinks.map((link) => (
                                <li key={link.id}>
                                    <a
                                        className="flex items-center justify-center gap-3 text-xl font-medium text-text-primary hover:text-accent transition-all duration-300"
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <span className="text-text-muted">{link.icon}</span>
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header