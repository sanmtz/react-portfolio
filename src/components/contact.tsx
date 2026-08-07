import { useRef, useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import emailjs from '@emailjs/browser';
import { useTranslation } from "../i18n/LanguageContext";

const Contact = () => {
    const form = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const { t } = useTranslation();

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.current) return;

        setStatus('sending');

        // REEMPLAZA ESTOS VALORES EN EL ARCHIVO .env
        emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            form.current,
            {
                publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
            }
        )
            .then(
                () => {
                    setStatus('success');
                    if (form.current) form.current.reset();
                    setTimeout(() => setStatus('idle'), 5000);
                },
                (error) => {
                    console.log('FAILED...', error.text);
                    setStatus('error');
                    setTimeout(() => setStatus('idle'), 5000);
                },
            );
    };

    return (
        <section className="relative py-28 bg-white section-glow" id="contact">
            {/* Decorative gradient */}
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-glow-blue rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-16 relative z-10">
                <div className="text-center mb-16">
                    <p className="text-sm font-medium text-text-muted tracking-widest uppercase mb-4" data-aos="fade-up">{t('contact.badge')}</p>
                    <h2 className="text-text-primary" data-aos="fade-up" data-aos-delay="100">{t('contact.title')}</h2>
                </div>

                <div className="flex flex-col lg:flex-row gap-10 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <div className="lg:w-1/3 flex flex-col gap-6" data-aos="fade-right" data-aos-delay="200">
                        <div className="bg-surface p-8 rounded-3xl border border-border">
                            <h3 className="text-xl font-semibold mb-6 text-text-primary">{t('contact.info_title')}</h3>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white rounded-2xl border border-border text-accent">
                                        <FaEnvelope className="text-lg" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-text-muted uppercase tracking-wider">{t('contact.email_label')}</p>
                                        <a href="mailto:sansam252@gmail.com" className="text-sm font-medium text-text-primary hover:text-accent transition-colors">
                                            sansam252@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white rounded-2xl border border-border text-accent">
                                        <FaPhone className="text-lg" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-text-muted uppercase tracking-wider">{t('contact.phone_label')}</p>
                                        <p className="text-sm font-medium text-text-primary">+52 (77) 7209 5506</p>
                                    </div>
                                </div>

                                {/* <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white rounded-2xl border border-border text-accent">
                                        <FaMapMarkerAlt className="text-lg" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-text-muted uppercase tracking-wider">{t('contact.location_label')}</p>
                                        <p className="text-sm font-medium text-text-primary">{t('contact.location_value')}</p>
                                    </div>
                                </div> */}
                            </div>

                            <div className="mt-8 pt-8 border-t border-border">
                                <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-4">{t('contact.social_label')}</h4>
                                <div className="flex gap-3">
                                    <a href="https://www.linkedin.com/in/sandra-mtz-c/" className="p-3 bg-white rounded-2xl border border-border text-text-secondary hover:text-accent hover:border-accent/30 transition-all duration-300">
                                        <FaLinkedin className="text-lg" />
                                    </a>
                                    <a href="https://github.com/SanSam13/" className="p-3 bg-white rounded-2xl border border-border text-text-secondary hover:text-accent hover:border-accent/30 transition-all duration-300">
                                        <FaGithub className="text-lg" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:w-2/3" data-aos="fade-left" data-aos-delay="400">
                        <form ref={form} onSubmit={sendEmail} className="bg-surface p-8 md:p-10 rounded-3xl border border-border">
                            <h3 className="text-xl font-semibold mb-8 text-text-primary">{t('contact.form_title')}</h3>

                            {/* Feedback Messages */}
                            {status === 'success' && (
                                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700 text-sm">
                                    {t('contact.success')}
                                </div>
                            )}
                            {status === 'error' && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm">
                                    {t('contact.error')}
                                </div>
                            )}

                            <div className="grid md:grid-cols-2 gap-5 mb-5">
                                <div className="space-y-2">
                                    <label htmlFor="user_name" className="text-xs font-medium text-text-muted uppercase tracking-wider">{t('contact.name_label')}</label>
                                    <input
                                        type="text"
                                        name="user_name"
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-white border border-border focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all text-text-primary placeholder:text-text-muted/50"
                                        placeholder={t('contact.name_placeholder')}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="user_email" className="text-xs font-medium text-text-muted uppercase tracking-wider">{t('contact.email_input_label')}</label>
                                    <input
                                        type="email"
                                        name="user_email"
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-white border border-border focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all text-text-primary placeholder:text-text-muted/50"
                                        placeholder={t('contact.email_placeholder')}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 mb-5">
                                <label htmlFor="subject" className="text-xs font-medium text-text-muted uppercase tracking-wider">{t('contact.subject_label')}</label>
                                <input
                                    type="text"
                                    name="subject"
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-white border border-border focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all text-text-primary placeholder:text-text-muted/50"
                                    placeholder={t('contact.subject_placeholder')}
                                />
                            </div>

                            <div className="space-y-2 mb-8">
                                <label htmlFor="message" className="text-xs font-medium text-text-muted uppercase tracking-wider">{t('contact.message_label')}</label>
                                <textarea
                                    name="message"
                                    rows={5}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-white border border-border focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all text-text-primary placeholder:text-text-muted/50 resize-none"
                                    placeholder={t('contact.message_placeholder')}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className={`w-full md:w-auto px-8 py-3.5 bg-text-primary text-white rounded-full font-medium hover:bg-accent transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-accent/20 ${status === 'sending' ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {status === 'sending' ? t('contact.sending') : t('contact.submit')}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
