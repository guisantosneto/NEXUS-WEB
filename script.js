document.addEventListener('DOMContentLoaded', () => {
    
    /* ------------------------------------------------
       1. Fundo Reativo (Mouse Glow)
    ------------------------------------------------ */
    const body = document.body;

    document.addEventListener('mousemove', (e) => {
        // Atualiza as variáveis CSS com a posição X e Y do rato
        body.style.setProperty('--mouse-x', `${e.clientX}px`);
        body.style.setProperty('--mouse-y', `${e.clientY}px`);
    });

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