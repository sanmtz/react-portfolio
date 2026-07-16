import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import es from './es.json';
import en from './en.json';

type Language = 'es' | 'en';

const translations = { es, en } as const;

interface LanguageContextType {
    lang: Language;
    setLang: (lang: Language) => void;
    t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [lang, setLangState] = useState<Language>(() => {
        // Check localStorage or browser language
        const stored = localStorage.getItem('portfolio-lang') as Language;
        if (stored && (stored === 'es' || stored === 'en')) return stored;
        const browserLang = navigator.language.slice(0, 2);
        return browserLang === 'en' ? 'en' : 'es';
    });

    const setLang = useCallback((newLang: Language) => {
        setLangState(newLang);
        localStorage.setItem('portfolio-lang', newLang);
        document.documentElement.lang = newLang;
    }, []);

    // Access nested keys like "hero.greeting"
    const t = useCallback((key: string): any => {
        const keys = key.split('.');
        let result: any = translations[lang];
        for (const k of keys) {
            if (result && typeof result === 'object' && k in result) {
                result = result[k];
            } else {
                console.warn(`Translation missing: ${key} [${lang}]`);
                return key;
            }
        }
        return result;
    }, [lang]);

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useTranslation = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error('useTranslation must be used within LanguageProvider');
    return context;
};
