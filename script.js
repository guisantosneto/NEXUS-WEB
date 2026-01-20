document.addEventListener('DOMContentLoaded', () => {
    
   

    /* ------------------------------------------------
       2. Lógica do Scroller Infinito (Topics)
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
       3. Animação de Entrada (Fade In on Scroll)
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
});

/* ------------------------------------------------
       4. Text Reveal: Sticky & Centralized
    ------------------------------------------------ */
    const track = document.querySelector('.text-scroll-track');
    const textElement = document.querySelector('.reveal-text');

    if (track && textElement) {
        // 1. Preparar as palavras
        const words = textElement.textContent.trim().split(/\s+/);
        textElement.innerHTML = '';
        words.forEach(word => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            textElement.appendChild(span);
        });
        const spans = textElement.querySelectorAll('span');

        // 2. Lógica de Scroll baseada no Container Pai
        function stickyReveal() {
            // Distância do topo do container até ao topo da janela
            const trackTop = track.getBoundingClientRect().top;
            
            // Altura total do container (300vh) menos a altura da janela
            // Isto dá-nos o "espaço scrollável" efetivo
            const scrollableDistance = track.offsetHeight - window.innerHeight;

            // Como o getBoundingClientRect().top fica negativo à medida que descemos:
            // Multiplicamos por -1 para saber quantos pixels já "comemos" do topo.
            let scrolled = -trackTop;

            // Garantir que não começa antes do tempo (se o topo ainda for positivo)
            if (scrolled < 0) scrolled = 0;

            // Calcular percentagem (0.0 a 1.0)
            let progress = scrolled / scrollableDistance;

            // Ajuste fino: Queremos que acabe de ler um pouco antes de o container acabar
            // para o utilizador ver a frase completa parada por um instante.
            progress = progress * 1.2; 

            // Limites (Clamp)
            progress = Math.max(0, Math.min(1, progress));

            // Ativar palavras
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
        stickyReveal(); // Iniciar
    }