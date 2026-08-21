import { FaLinkedin, FaGithub } from "react-icons/fa";
import { useTranslation } from "../i18n/LanguageContext";
import logo from "../assets/logo-white.png";

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-surface-dark text-white/60 py-0">
            <div className="container mx-auto px-6 lg:px-16">
                <div className="flex flex-col md:flex-row items-center justify-between py-10 gap-6">
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="Logo" className="w-16 h-auto opacity-70" />
                    </div>

                    <div className="flex items-center gap-4">
                        <a
                            href="https://www.linkedin.com/in/sandra-mtz-c/"
                            aria-label="Perfil de LinkedIn de Sandra Martínez"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/40 hover:text-white transition-colors duration-300"
                        >
                            <FaLinkedin className="text-lg" aria-hidden="true" />
                        </a>
                        <a
                            href="https://github.com/SanSam13/"
                            aria-label="Perfil de GitHub de Sandra Martínez"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/40 hover:text-white transition-colors duration-300"
                        >
                            <FaGithub className="text-lg" aria-hidden="true" />
                        </a>
                    </div>

                    <div className="text-center md:text-right max-w-64">
                        <p className="text-xs text-white/30">{t('footer.copyright')}</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer