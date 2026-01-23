document.addEventListener('DOMContentLoaded', () => {

    /* ------------------------------------------------
       1. Scroller Infinito (Topics)
    ------------------------------------------------ */
    const scrollers = document.querySelectorAll(".scroller");

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        addAnimation();
    }

    function addAnimation() {
        scrollers.forEach((scroller) => {
            scroller.setAttribute("data-animated", true);
            const scrollerInner = scroller.querySelector(".tag-list");
            const scrollerContent = Array.from(scrollerInner.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                duplicatedItem.setAttribute("aria-hidden", true);
                scrollerInner.appendChild(duplicatedItem);
            });
        });
    }

    /* ------------------------------------------------
       2. Animação de Entrada (Fade In on Scroll)
    ------------------------------------------------ */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    /* ------------------------------------------------
       3. Text Reveal: Sticky & Centralized
    ------------------------------------------------ */
    const track = document.querySelector('.text-scroll-track');
    const textElement = document.querySelector('.reveal-text');

    if (track && textElement) {
        const words = textElement.textContent.trim().split(/\s+/);
        textElement.innerHTML = '';
        words.forEach(word => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            textElement.appendChild(span);
        });
        const spans = textElement.querySelectorAll('span');

        function stickyReveal() {
            const trackTop = track.getBoundingClientRect().top;
            const scrollableDistance = track.offsetHeight - window.innerHeight;
            let scrolled = -trackTop;
            if (scrolled < 0) scrolled = 0;
            let progress = scrolled / scrollableDistance;
            progress = progress * 1.2; 
            progress = Math.max(0, Math.min(1, progress));
            const activeCount = Math.floor(progress * spans.length);
            spans.forEach((span, index) => {
                if (index < activeCount) {
                    span.classList.add('active');
                } else {
                    span.classList.remove('active');
                }
            });
        }
        window.addEventListener('scroll', stickyReveal);
        window.addEventListener('resize', stickyReveal);
        stickyReveal();
    }

    /* ------------------------------------------------
       4. Lógica do Carrossel (Dinâmica)
    ------------------------------------------------ */
    const carouselTrack = document.getElementById('track');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (carouselTrack && prevBtn && nextBtn) {
        
        // Função para calcular a distância exata de scroll (Cartão + Gap)
        const getScrollAmount = () => {
            const card = carouselTrack.querySelector('.carousel-card');
            // Largura do cartão + 20px de gap (definido no CSS)
            return card.offsetWidth + 20; 
        };

        nextBtn.addEventListener('click', () => {
            const distance = getScrollAmount();
            carouselTrack.scrollBy({ left: distance, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            const distance = getScrollAmount();
            carouselTrack.scrollBy({ left: -distance, behavior: 'smooth' });
        });
    }

    /* ------------------------------------------------
       5. Menu Ativo no Scroll (One Page Logic)
    ------------------------------------------------ */
    const sections = document.querySelectorAll("section[id]");
    const navLi = document.querySelectorAll(".ark-pill-nav ul li a");

    window.addEventListener("scroll", () => {
        let current = "";
        
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            // Ajuste para ativar o menu um pouco antes de chegar à secção
            if (pageYOffset >= (sectionTop - 250)) {
                current = section.getAttribute("id");
            }
        });

        navLi.forEach((a) => {
            a.classList.remove("active");
            if (a.getAttribute("href").includes(current)) {
                a.classList.add("active");
            }
        });
    });

    /* ------------------------------------------------
       6. Mostrar Artigo ao Clicar no Carrossel
    ------------------------------------------------ */
    const articleCards = document.querySelectorAll('.clickable-card');
    const articleDisplay = document.getElementById('article-display');

    if (articleDisplay) {
        articleCards.forEach(card => {
            card.addEventListener('click', () => {
                // 1. Tornar visível (display block)
                articleDisplay.style.display = 'block';
                
                // 2. Pequeno delay para a transição CSS funcionar
                setTimeout(() => {
                    articleDisplay.classList.add('visible-content');
                }, 10);

                // 3. Scroll suave até ao início do artigo
                const yOffset = -80; // Compensar header fixo
                const y = articleDisplay.getBoundingClientRect().top + window.pageYOffset + yOffset;
                
                window.scrollTo({top: y, behavior: 'smooth'});
            });
        });
    }

});