document.addEventListener('DOMContentLoaded', () => {
    // Initialize Swiper
    if (typeof Swiper !== 'undefined') {
        try {
            const swiper = new Swiper('.swiper', {
                loop: true,
                autoplay: { delay: 2000, disableOnInteraction: false },
                pagination: { el: '.swiper-pagination', clickable: true },
                navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
                breakpoints: {
                    320: { slidesPerView: 1, spaceBetween: 10 },
                    640: { slidesPerView: 2, spaceBetween: 12 },
                    768: { slidesPerView: 3, spaceBetween: 15 },
                    1024: { slidesPerView: 5, spaceBetween: 20 },
                }
            });
        } catch (e) {
            console.error('Erro ao inicializar o Swiper:', e);
        }
    } else {
        console.warn('Swiper não carregado. Verifique a conexão com o CDN ou o arquivo local.');
    }

    // Music Control
    const music = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');
    if (music && musicToggle && playIcon && pauseIcon) {
        let isPlaying = false;
        musicToggle.addEventListener('click', () => {
            if (isPlaying) {
                music.pause();
                playIcon.classList.remove('hidden');
                pauseIcon.classList.add('hidden');
                isPlaying = false;
            } else {
                music.play().catch(() => alert('Por favor, permita áudio no navegador para reproduzir a música.'));
                playIcon.classList.add('hidden');
                pauseIcon.classList.remove('hidden');
                isPlaying = true;
            }
        });
    } else {
        console.warn('Elementos de áudio não encontrados.');
    }

    // Days Together Counter
    const daysTogether = document.getElementById('daysTogether');
    const daysTogetherFooter = document.getElementById('daysTogetherFooter');
    if (daysTogether && daysTogetherFooter) {
        const startDate = new Date('2024-11-09T00:00:00-03:00');
        function updateDaysTogether() {
            const today = new Date();
            const timeDiff = today - startDate;
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            daysTogether.textContent = `Dias Juntos: ${days} dias, ${hours} horas e ${minutes} minutos`;
            daysTogetherFooter.textContent = `Dias Juntos: ${days} dias, ${hours} horas e ${minutes} minutos`;
        }
        updateDaysTogether();
        setInterval(updateDaysTogether, 60000);
    } else {
        console.warn('Elementos do contador de dias não encontrados.');
    }

    // Secret Message
    const secretMessageButton = document.getElementById('secretMessageButton');
    const secretMessage = document.getElementById('secretMessage');
    const closeSecretMessage = document.getElementById('closeSecretMessage');
    if (secretMessageButton && secretMessage && closeSecretMessage) {
        secretMessageButton.addEventListener('click', () => {
            secretMessage.classList.toggle('hidden');
        });
        closeSecretMessage.addEventListener('click', () => {
            secretMessage.classList.add('hidden');
        });
    } else {
        console.warn('Elementos da mensagem secreta não encontrados.');
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Mobile Navigation
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('hidden');
        });
    } else {
        console.warn('Elementos de navegação mobile não encontrados.');
    }

    // Timeline Animation
    const timelineItems = document.querySelectorAll('.timeline__item');
    if (timelineItems.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.3 });
        timelineItems.forEach(item => observer.observe(item));
    } else {
        console.warn('IntersectionObserver não suportado ou itens da timeline não encontrados.');
        timelineItems.forEach(item => item.classList.add('visible')); // Fallback
    }
});