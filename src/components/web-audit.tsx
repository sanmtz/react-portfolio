import { FaSearch, FaTachometerAlt, FaMobileAlt, FaCheckCircle } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { useTranslation } from "../i18n/LanguageContext";

const serviceIcons = [
    <FaTachometerAlt className="text-2xl" />,
    <FiEye className="text-2xl" />,
    <FaSearch className="text-2xl" />,
    <FaMobileAlt className="text-2xl" />,
];

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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                            <p className="text-sm text-text-secondary leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WebAudit;
