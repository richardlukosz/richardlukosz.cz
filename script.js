function setLanguage(lang, save = false) {
    const htmlTag = document.documentElement;
    const langBtn = document.getElementById('langToggleBtn');

    if (lang === 'en') {
        htmlTag.classList.add('lang-en-active');
        htmlTag.setAttribute('lang', 'en');
        if (htmlTag.dataset.titleEn) document.title = htmlTag.dataset.titleEn;
        if (langBtn) langBtn.textContent = 'CZ';
    } else {
        htmlTag.classList.remove('lang-en-active');
        htmlTag.setAttribute('lang', 'cs');
        if (htmlTag.dataset.titleCs) document.title = htmlTag.dataset.titleCs;
        if (langBtn) langBtn.textContent = 'EN';
    }

    if (save) {
        localStorage.setItem('preferredLang', lang);
    }
}

const browserLang = navigator.language && (navigator.language.startsWith('cs') || navigator.language.startsWith('sk')) ? 'cs' : 'en';
const savedLang = localStorage.getItem('preferredLang') || browserLang;
setLanguage(savedLang, false);

const langToggleBtn = document.getElementById('langToggleBtn');
if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
        const currentLang = document.documentElement.getAttribute('lang');
        setLanguage(currentLang === 'cs' ? 'en' : 'cs', true);
    });
}

const menuToggleBtn = document.getElementById('menuToggleBtn');
const menu = document.getElementById('mobileMenu');

function toggleMenu(forceClose = false) {
    const isOpen = forceClose ? false : !menu.classList.contains('open');
    menu.classList.toggle('open', isOpen);
    menuToggleBtn.setAttribute('aria-expanded', isOpen);
}

if (menuToggleBtn && menu) {
    menuToggleBtn.addEventListener('click', () => toggleMenu());

    document.addEventListener('click', (event) => {
        if (menu.classList.contains('open') && !menu.contains(event.target) && !menuToggleBtn.contains(event.target)) {
            toggleMenu(true);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && menu.classList.contains('open')) {
            toggleMenu(true);
            menuToggleBtn.focus();
        }
    });
}