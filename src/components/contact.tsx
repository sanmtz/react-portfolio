import { useEffect, useRef, useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import emailjs from '@emailjs/browser';
import { useTranslation } from "../i18n/LanguageContext";

const Contact = () => {
    const form = useRef<HTMLFormElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errors, setErrors] = useState({ name: '', email: '', subject: '', message: '' });
    const { t } = useTranslation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const fieldName = name === 'user_name' ? 'name' : name === 'user_email' ? 'email' : name;
        
        // Only validate on change if there's already an error (to give immediate feedback)
        if (errors[fieldName as keyof typeof errors]) {
            let errorMsg = '';
            if (name === 'user_name' && (!value || value.trim().length < 2)) {
                errorMsg = t('contact.error_name') || 'El nombre debe tener al menos 2 caracteres';
            } else if (name === 'user_email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value || !emailRegex.test(value)) errorMsg = t('contact.error_email') || 'Ingresa un correo electrónico válido';
            } else if (name === 'subject' && (!value || value.trim().length < 3)) {
                errorMsg = t('contact.error_subject') || 'El asunto debe tener al menos 3 caracteres';
            } else if (name === 'message' && (!value || value.trim().length < 10)) {
                errorMsg = t('contact.error_message') || 'El mensaje debe tener al menos 10 caracteres';
            }
            
            setErrors(prev => ({ ...prev, [fieldName]: errorMsg }));
        }
    };

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.current) return;

        // Manual validation
        const formData = new FormData(form.current);
        const name = formData.get('user_name') as string;
        const email = formData.get('user_email') as string;
        const subject = formData.get('subject') as string;
        const message = formData.get('message') as string;

        let newErrors = { name: '', email: '', subject: '', message: '' };
        let isValid = true;

        if (!name || name.trim().length < 2) {
            newErrors.name = t('contact.error_name') || 'El nombre debe tener al menos 2 caracteres';
            isValid = false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            newErrors.email = t('contact.error_email') || 'Ingresa un correo electrónico válido';
            isValid = false;
        }

        if (!subject || subject.trim().length < 3) {
            newErrors.subject = t('contact.error_subject') || 'El asunto debe tener al menos 3 caracteres';
            isValid = false;
        }

        if (!message || message.trim().length < 10) {
            newErrors.message = t('contact.error_message') || 'El mensaje debe tener al menos 10 caracteres';
            isValid = false;
        }

        setErrors(newErrors);

        if (!isValid) return;

        setStatus('sending');

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

    // Particle canvas (same style as hero)
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

        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.6,
                vy: (Math.random() - 0.5) * 0.6,
                size: Math.random() * 2.5 + 0.5,
                color: colors[Math.floor(Math.random() * colors.length)],
                opacity: Math.random() * 0.4 + 0.1,
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
        <section className="relative py-28 overflow-hidden" id="contact" style={{ backgroundColor: '#181818' }}>
            {/* Particle canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

            {/* Decorative glows */}
            <div className="absolute top-10 right-10 w-[450px] h-[450px] rounded-full blur-[140px] pointer-events-none" style={{ background: 'rgba(103, 58, 183, 0.2)' }} />
            <div className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(255, 87, 34, 0.2)' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[160px] pointer-events-none" style={{ background: 'rgba(255, 235, 59, 0.1)' }} />

            {/* Top separator line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(103, 58, 183, 0.4), rgba(255, 87, 34, 0.4), transparent)' }} />

            <div className="container mx-auto px-6 lg:px-16 relative z-10">
                <div className="text-center mb-16">
                    <p className="text-sm font-medium tracking-widest uppercase mb-4" data-aos="fade-up" style={{ color: '#FFEB3B' }}>{t('contact.badge')}</p>
                    <h2 data-aos="fade-up" data-aos-delay="100">
                        <span className="bg-gradient-to-r from-[#FF5722] to-[#673AB7] bg-clip-text text-transparent">{t('contact.title')}</span>
                    </h2>
                </div>

                <div className="flex flex-col lg:flex-row gap-10 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <div className="lg:w-1/3 flex flex-col gap-6" data-aos="fade-right" data-aos-delay="200">
                        <div className="glass-card-dark p-8 rounded-3xl">
                            <h3 className="text-xl font-semibold mb-6 text-white">{t('contact.info_title')}</h3>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-2xl" style={{ background: 'rgba(103, 58, 183, 0.15)', border: '1px solid rgba(103, 58, 183, 0.25)' }}>
                                        <FaEnvelope className="text-lg" style={{ color: '#673AB7' }} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-wider" style={{ color: '#9393a8' }}>{t('contact.email_label')}</p>
                                        <a href="mailto:sansam252@gmail.com" className="text-sm font-medium text-white/90 hover:text-white transition-colors" style={{ color: '#e2e2ea' }}>
                                            sansam252@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-2xl" style={{ background: 'rgba(255, 87, 34, 0.15)', border: '1px solid rgba(255, 87, 34, 0.25)' }}>
                                        <FaPhone className="text-lg" style={{ color: '#FF5722' }} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-wider" style={{ color: '#9393a8' }}>{t('contact.phone_label')}</p>
                                        <p className="text-sm font-medium" style={{ color: '#e2e2ea' }}>+52 (77) 7209 5506</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-8" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                                <h4 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: '#9393a8' }}>{t('contact.social_label')}</h4>
                                <div className="flex gap-3">
                                    <a href="https://www.linkedin.com/in/sandra-mtz-c/" className="p-3 rounded-2xl transition-all duration-300 hover:-translate-y-0.5" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.08)', color: '#9393a8' }}
                                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 235, 59, 0.15)'; e.currentTarget.style.borderColor = 'rgba(255, 235, 59, 0.3)'; e.currentTarget.style.color = '#FFEB3B'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.color = '#9393a8'; }}
                                    >
                                        <FaLinkedin className="text-lg" />
                                    </a>
                                    <a href="https://github.com/SanSam13/" className="p-3 rounded-2xl transition-all duration-300 hover:-translate-y-0.5" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.08)', color: '#9393a8' }}
                                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 235, 59, 0.15)'; e.currentTarget.style.borderColor = 'rgba(255, 235, 59, 0.3)'; e.currentTarget.style.color = '#FFEB3B'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.color = '#9393a8'; }}
                                    >
                                        <FaGithub className="text-lg" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:w-2/3" data-aos="fade-left" data-aos-delay="400">
                        <form ref={form} onSubmit={sendEmail} className="glass-card-dark p-8 md:p-10 rounded-3xl">
                            <h3 className="text-xl font-semibold mb-8 text-white">{t('contact.form_title')}</h3>

                            {/* Feedback Messages */}
                            {status === 'success' && (
                                <div className="mb-6 p-4 rounded-2xl text-sm" style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', color: '#6ee7b7' }}>
                                    {t('contact.success')}
                                </div>
                            )}
                            {status === 'error' && (
                                <div className="mb-6 p-4 rounded-2xl text-sm" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#fca5a5' }}>
                                    {t('contact.error')}
                                </div>
                            )}

                            <div className="grid md:grid-cols-2 gap-5 mb-5">
                                <div className="space-y-2">
                                    <label htmlFor="user_name" className="text-xs font-medium uppercase tracking-wider" style={{ color: '#9393a8' }}>{t('contact.name_label')}</label>
                                    <input
                                        type="text"
                                        name="user_name"
                                        className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-300"
                                        style={{ background: 'rgba(255, 255, 255, 0.05)', border: `1px solid ${errors.name ? '#EF4444' : 'rgba(255, 255, 255, 0.08)'}`, color: '#e2e2ea' }}
                                        placeholder={t('contact.name_placeholder')}
                                        onFocus={(e) => { e.target.style.borderColor = '#FFEB3B'; e.target.style.boxShadow = '0 0 0 3px rgba(255, 235, 59, 0.1)'; }}
                                        onBlur={(e) => { e.target.style.borderColor = errors.name ? '#EF4444' : 'rgba(255, 255, 255, 0.08)'; e.target.style.boxShadow = 'none'; }}
                                        onChange={handleChange}
                                    />
                                    {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name}</span>}
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="user_email" className="text-xs font-medium uppercase tracking-wider" style={{ color: '#9393a8' }}>{t('contact.email_input_label')}</label>
                                    <input
                                        type="email"
                                        name="user_email"
                                        className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-300"
                                        style={{ background: 'rgba(255, 255, 255, 0.05)', border: `1px solid ${errors.email ? '#EF4444' : 'rgba(255, 255, 255, 0.08)'}`, color: '#e2e2ea' }}
                                        placeholder={t('contact.email_placeholder')}
                                        onFocus={(e) => { e.target.style.borderColor = '#FFEB3B'; e.target.style.boxShadow = '0 0 0 3px rgba(255, 235, 59, 0.1)'; }}
                                        onBlur={(e) => { e.target.style.borderColor = errors.email ? '#EF4444' : 'rgba(255, 255, 255, 0.08)'; e.target.style.boxShadow = 'none'; }}
                                        onChange={handleChange}
                                    />
                                    {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email}</span>}
                                </div>
                            </div>

                            <div className="space-y-2 mb-5">
                                <label htmlFor="subject" className="text-xs font-medium uppercase tracking-wider" style={{ color: '#9393a8' }}>{t('contact.subject_label')}</label>
                                <input
                                    type="text"
                                    name="subject"
                                    className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-300"
                                    style={{ background: 'rgba(255, 255, 255, 0.05)', border: `1px solid ${errors.subject ? '#EF4444' : 'rgba(255, 255, 255, 0.08)'}`, color: '#e2e2ea' }}
                                    placeholder={t('contact.subject_placeholder')}
                                    onFocus={(e) => { e.target.style.borderColor = '#FFEB3B'; e.target.style.boxShadow = '0 0 0 3px rgba(255, 235, 59, 0.1)'; }}
                                    onBlur={(e) => { e.target.style.borderColor = errors.subject ? '#EF4444' : 'rgba(255, 255, 255, 0.08)'; e.target.style.boxShadow = 'none'; }}
                                    onChange={handleChange}
                                />
                                {errors.subject && <span className="text-red-500 text-xs mt-1 block">{errors.subject}</span>}
                            </div>

                            <div className="space-y-2 mb-8">
                                <label htmlFor="message" className="text-xs font-medium uppercase tracking-wider" style={{ color: '#9393a8' }}>{t('contact.message_label')}</label>
                                <textarea
                                    name="message"
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-300 resize-none"
                                    style={{ background: 'rgba(255, 255, 255, 0.05)', border: `1px solid ${errors.message ? '#EF4444' : 'rgba(255, 255, 255, 0.08)'}`, color: '#e2e2ea' }}
                                    placeholder={t('contact.message_placeholder')}
                                    onFocus={(e) => { e.target.style.borderColor = '#FFEB3B'; e.target.style.boxShadow = '0 0 0 3px rgba(255, 235, 59, 0.1)'; }}
                                    onBlur={(e) => { e.target.style.borderColor = errors.message ? '#EF4444' : 'rgba(255, 255, 255, 0.08)'; e.target.style.boxShadow = 'none'; }}
                                    onChange={handleChange}
                                ></textarea>
                                {errors.message && <span className="text-red-500 text-xs mt-1 block">{errors.message}</span>}
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className={`w-full md:w-auto px-8 py-3.5 rounded-full font-medium transition-all duration-300 cursor-pointer hover:-translate-y-0.5 ${status === 'sending' ? 'opacity-70 cursor-not-allowed' : ''}`}
                                style={{
                                    background: '#FF5722',
                                    color: '#ffffff',
                                    boxShadow: '0 4px 20px rgba(255, 87, 34, 0.3)',
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(255, 235, 59, 0.45)'; e.currentTarget.style.background = '#FFEB3B'; e.currentTarget.style.color = '#181818'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(255, 87, 34, 0.3)'; e.currentTarget.style.background = '#FF5722'; e.currentTarget.style.color = '#ffffff'; }}
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
