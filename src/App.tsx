import './App.css'
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { LanguageProvider } from './i18n/LanguageContext';
/* Componentes */
import Main from './components/main';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false
    });
  }, []);
  return (
    <LanguageProvider>
      <Main />
    </LanguageProvider>
  )
}

export default App
