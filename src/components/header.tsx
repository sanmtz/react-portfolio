import { useState, useEffect } from "react"
import { FiMenu, FiX, FiUser, FiSettings, FiBriefcase, FiCode, FiGlobe, FiCpu } from "react-icons/fi";
import { useTranslation } from "../i18n/LanguageContext";
import logo from "../assets/logo-white.png";

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

    ];

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetId = href.replace('#', '');
        const elem = document.getElementById(targetId);
        if (elem) {
            const headerOffset = 80;
            const elementPosition = elem.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
        setIsOpen(false);
    };

    const toggleLang = () => setLang(lang === 'es' ? 'en' : 'es');

    return (
        <header className={`fixed top-0 left-0 right-0 z-[60] w-full transition-all duration-500 ${scrolled ? 'bg-[#181818]/95 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.5)]' : 'bg-transparent'}`} data-aos="fade-down" data-aos-duration="500">
            <div className="container mx-auto px-6 lg:px-16">
                <div className="flex justify-between items-center py-5">
                    {/* Logo */}
                    {/* <a href="#" className="flex items-center gap-2 text-[#F7F7F7] hover:text-[#FFEB3B] transition-colors">
                        <FiCode className="text-2xl" />
                        <span className="font-semibold text-lg tracking-tight">Sandra</span>
                    </a> */}
                    <a href="#" className="flex items-center gap-2 text-[#F7F7F7] hover:text-[#FFEB3B] transition-colors">
                        <img src={logo} alt="Logo" className="w-16 h-auto" />
                    </a>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center gap-3">
                        {/* Mobile lang toggle */}
                        <button
                            onClick={toggleLang}
                            aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 text-xs font-semibold text-[#F7F7F7]/70 hover:text-[#FFEB3B] hover:border-[#FFEB3B]/30 transition-all"
                        >
                            <FiGlobe className="text-sm" />
                            {lang.toUpperCase()}
                        </button>
                        <button
                            className="focus:outline-none p-1"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Abrir menú de navegación"
                            aria-expanded={isOpen}
                        >
                            <FiMenu className="w-6 h-6 text-[#F7F7F7]" />
                        </button>
                    </div>

                    {/* Desktop menu */}
                    <nav className="hidden md:flex items-center">
                        <ul className="flex items-center gap-1">
                            {navLinks.map((link) => (
                                <li key={link.id}>
                                    <a
                                        className="px-4 py-2 rounded-full text-sm font-medium text-[#F7F7F7]/70 hover:text-[#FFEB3B] hover:bg-white/[0.04] transition-all duration-300 cursor-pointer"
                                        href={link.href}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        {/* Language toggle */}
                        <button
                            onClick={toggleLang}
                            className="ml-2 flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium text-[#F7F7F7]/70 hover:text-[#FFEB3B] hover:bg-[#FFEB3B]/10 transition-all duration-300 cursor-pointer"
                            aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
                        >
                            <FiGlobe className="text-base" />
                            <span className="text-xs font-semibold">{lang === 'es' ? 'EN' : 'ES'}</span>
                        </button>

                        <a
                            href="#contact"
                            onClick={(e) => handleNavClick(e, '#contact')}
                            className="ml-2 px-5 py-2.5 bg-[#FF5722] text-[#F7F7F7] rounded-full text-sm font-medium hover:bg-[#FFEB3B] hover:text-[#181818] transition-colors duration-300 cursor-pointer"
                        >
                            {t('header.cta')}
                        </a>
                    </nav>
                </div>

                {/* Mobile menu overlay */}
                <div
                    className={`fixed inset-0 bg-black/60 z-[90] transition-opacity duration-500 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    onClick={() => setIsOpen(false)}
                />

                {/* Mobile menu drawer */}
                <div className={`fixed inset-y-0 left-0 w-[85%] max-w-sm h-[100dvh] z-[100] bg-[#181818] shadow-2xl flex flex-col transition-transform duration-500 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FF5722]/5 to-[#673AB7]/10 pointer-events-none" />

                    <button
                        className="absolute top-6 right-6 z-50 p-2"
                        onClick={() => setIsOpen(false)}
                        aria-label="Cerrar menú de navegación"
                    >
                        <FiX className="w-7 h-7 text-[#F7F7F7]/70 hover:text-[#FFEB3B] transition-colors" />
                    </button>

                    <nav className="flex-1 overflow-y-auto pt-24 pb-8 px-10 relative z-10">
                        <ul className="flex flex-col gap-10">
                            {navLinks.map((link) => (
                                <li key={link.id}>
                                    <a
                                        className="flex items-center gap-6 text-sm font-semibold tracking-[0.15em] uppercase text-[#F7F7F7] hover:text-[#FFEB3B] transition-colors duration-300 group cursor-pointer"
                                        href={link.href}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                    >
                                        <span className="text-2xl text-[#F7F7F7]/50 group-hover:text-[#FFEB3B] transition-colors font-light">
                                            {link.icon}
                                        </span>
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="p-10 relative z-10">
                        <div className="w-full h-[1px] bg-white/10 mb-8" />
                        <div className="flex flex-col gap-4">
                            <p className="text-xs font-semibold tracking-widest uppercase text-[#F7F7F7] hover:text-[#FFEB3B] transition-colors">
                                <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="cursor-pointer">{t('header.cta')}</a>
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#FF5722] overflow-hidden">
                                    <div className="w-full h-full bg-[#FF5722] text-[#F7F7F7] flex items-center justify-center">
                                        <FiCode className="text-xl" />
                                    </div>
                                </div>
                                <span className="text-sm font-medium text-[#F7F7F7]/70">
                                    Sandra
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header