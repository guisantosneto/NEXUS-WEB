document.addEventListener('DOMContentLoaded', () => {

    /* =================================================================
       1. BASE DE DADOS DE ARTIGOS (ATUALIZADA COM AS IMAGENS CORRETAS)
       ================================================================= */
    const articlesDB = [
        { 
            id: 1, 
            title: "Digital Co-Creation", 
            subtitle: "The new engine.", 
            tags: ["GRAPHIC DESIGN", "DIGITAL ART"], 
            // Imagem igual ao news1.html
            img: "https://images.pexels.com/photos/31414506/pexels-photo-31414506.jpeg", 
            link: "news1.html" 
        },
        { 
            id: 2, 
            title: "Future Work", 
            subtitle: "The hybrid era.", 
            tags: ["WORK", "STRATEGY"], 
            // Imagem igual ao news2.html
            img: "https://images.unsplash.com/photo-1514281427873-10a6c9733091?q=80&w=800&auto=format&fit=crop", 
            link: "news2.html" 
        },
        { 
            id: 3, 
            title: "Digital Aesthetics", 
            subtitle: "The curator's role.", 
            tags: ["DESIGN", "ETHICS"], 
            // Imagem igual ao news3.html
            img: "https://images.pexels.com/photos/25626433/pexels-photo-25626433.jpeg", 
            link: "news3.html" 
        },
        { 
            id: 4, 
            title: "Disinformation", 
            subtitle: "Synthetic reality.", 
            tags: ["FAKE NEWS", "DEEPFAKE"], 
            // Imagem igual ao news4.html
            img: "https://images.pexels.com/photos/5062772/pexels-photo-5062772.jpeg", 
            link: "news4.html" 
        },
        { 
            id: 5, 
            title: "AI in Healthcare", 
            subtitle: "The new pulse.", 
            tags: ["HEALTHCARE", "MEDICAL AI"], 
            // Imagem igual ao news5.html
            img: "https://images.pexels.com/photos/18069423/pexels-photo-18069423.png", 
            link: "news5.html" 
        },
        { 
            id: 6, 
            title: "Autonomous Vehicles", 
            subtitle: "Sentient infrastructure.", 
            tags: ["AUTONOMOUS MOBILITY", "ETHICAL PROGRAMMING"], 
            // Imagem CORRIGIDA (igual ao news6.html)
            img: "https://images.unsplash.com/photo-1622178160738-f72bcb8723cb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
            link: "news6.html" 
        },
        { 
            id: 7, 
            title: "Cognitive Revolution", 
            subtitle: "Redefining mentorship.", 
            tags: ["DIGITAL EDUCATION", "ADAPTIVE LEARNING"], 
            // Imagem CORRIGIDA (igual ao news7.html)
            img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop", 
            link: "news7.html" 
        },
        { 
            id: 8, 
            title: "State and Silicon", 
            subtitle: "The Treaty of Silicon.", 
            tags: ["TECH POLICY", "DATA PRIVACY"], 
            // Imagem CORRIGIDA (igual ao news8.html)
            img: "https://images.unsplash.com/photo-1454923634634-bd1614719a7b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
            link: "news8.html" 
        },
        { 
            id: 9, 
            title: "The AI Economy", 
            subtitle: "Synthetic abundance.", 
            tags: ["NEW MARKETS", "PRODUCTIVITY"], 
            // Imagem CORRIGIDA (igual ao news9.html)
            img: "https://images.unsplash.com/photo-1688380692117-63178554d76d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
            link: "news9.html" 
        },
        { 
            id: 10, 
            title: "Cognitive Symbiosis", 
            subtitle: "The Great Alignment.", 
            tags: ["INFINITE HORIZONS", "FUTURE"], 
            // Imagem CORRIGIDA (igual ao news10.html)
            img: "https://images.unsplash.com/photo-1495234347927-15da3bd48ee6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
            link: "news10.html" 
        }
    ];

    /* =================================================================
       2. LÓGICA DO CARROSSEL (Geração e Navegação)
       ================================================================= */
    const track = document.getElementById('track');
    
    if (track) {
        // 1. Detetar em que página estamos
        const currentPageId = parseInt(track.getAttribute('data-current')) || 0;

        // 2. Ordenar artigos: Mostra os seguintes primeiro
        let sortedArticles = [];
        if (currentPageId > 0) {
            const nextArticles = articlesDB.filter(a => a.id > currentPageId);
            const prevArticles = articlesDB.filter(a => a.id < currentPageId);
            sortedArticles = [...nextArticles, ...prevArticles];
        } else {
            sortedArticles = articlesDB;
        }

        // 3. Injetar HTML no #track
        track.innerHTML = sortedArticles.map(article => `
            <a href="${article.link}" class="card carousel-card" style="min-width: 300px;">
                <img src="${article.img}" class="card-bg" alt="${article.title}">
                <div class="overlay">
                    <div class="card-tags">
                        ${article.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="card-content">
                        <h3>${article.title}</h3>
                        <p>${article.subtitle}</p>
                        <div class="arrow">&rarr;</div>
                    </div>
                </div>
            </a>
        `).join('');

        // 4. Lógica dos Botões (Next/Prev)
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (prevBtn && nextBtn) {
            const getScrollAmount = () => {
                const card = track.querySelector('.card') || track.querySelector('.carousel-card');
                return card ? card.offsetWidth + 20 : 320; 
            };

            nextBtn.addEventListener('click', () => {
                const distance = getScrollAmount();
                track.scrollBy({ left: distance, behavior: 'smooth' });
            });

            prevBtn.addEventListener('click', () => {
                const distance = getScrollAmount();
                track.scrollBy({ left: -distance, behavior: 'smooth' });
            });
        }
    }


    /* =================================================================
       3. ANIMAÇÕES VISUAIS (Scrollers, Reveals, ScrollSpy)
       ================================================================= */
    
    // --- Scroller Infinito (Topics) ---
    const scrollers = document.querySelectorAll(".scroller");
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        scrollers.forEach((scroller) => {
            scroller.setAttribute("data-animated", true);
            const scrollerInner = scroller.querySelector(".tag-list");
            
            // Verificação de segurança para evitar erro se não houver children
            if (scrollerInner && scrollerInner.children.length > 0) {
                const scrollerContent = Array.from(scrollerInner.children);
                scrollerContent.forEach((item) => {
                    const duplicatedItem = item.cloneNode(true);
                    duplicatedItem.setAttribute("aria-hidden", true);
                    scrollerInner.appendChild(duplicatedItem);
                });
            }
        });
    }

    // --- Fade In on Scroll (.hidden -> .show) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    });
    document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));


    // --- Text Reveal Sticky ---
    const textTrack = document.querySelector('.text-scroll-track');
    const textElement = document.querySelector('.reveal-text');

    if (textTrack && textElement) {
        const words = textElement.textContent.trim().split(/\s+/);
        textElement.innerHTML = '';
        words.forEach(word => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            textElement.appendChild(span);
        });
        const spans = textElement.querySelectorAll('span');

        function stickyReveal() {
            const trackTop = textTrack.getBoundingClientRect().top;
            const scrollableDistance = textTrack.offsetHeight - window.innerHeight;
            let scrolled = -trackTop;
            if (scrolled < 0) scrolled = 0;
            let progress = scrolled / scrollableDistance;
            progress = progress * 1.2; 
            progress = Math.max(0, Math.min(1, progress));
            const activeCount = Math.floor(progress * spans.length);
            spans.forEach((span, index) => {
                if (index < activeCount) span.classList.add('active');
                else span.classList.remove('active');
            });
        }
        window.addEventListener('scroll', stickyReveal);
        window.addEventListener('resize', stickyReveal);
        stickyReveal();
    }


    // --- Menu Scroll Spy (One Page Logic) ---
    const sections = document.querySelectorAll("section[id]");
    const navLi = document.querySelectorAll(".ark-pill-nav ul li a");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
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


    // --- Lógica Click-to-Read (Apenas para o Index OnePage se usares o expander) ---
    const articleCards = document.querySelectorAll('.clickable-card'); 
    const articleDisplay = document.getElementById('article-display');

    if (articleDisplay && articleCards.length > 0) {
        articleCards.forEach(card => {
            card.addEventListener('click', () => {
                articleDisplay.style.display = 'block';
                setTimeout(() => {
                    articleDisplay.classList.add('visible-content');
                }, 10);
                const yOffset = -80;
                const y = articleDisplay.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({top: y, behavior: 'smooth'});
            });
        });
    }

});



/* =================================================================
       MAGAZINE 3D FLIP LOGIC
       ================================================================= */
    const prevBtn = document.querySelector("#prev-page-btn");
    const nextBtn = document.querySelector("#next-page-btn");
    const book = document.querySelector("#book");

    const paper1 = document.querySelector("#p1");
    const paper2 = document.querySelector("#p2");
    const paper3 = document.querySelector("#p3");

    // Lógica de Estado
    let currentLocation = 1;
    const numOfPapers = 3;
    const maxLocation = numOfPapers + 1;

    function openBook() {
        book.style.transform = "translateX(50%)"; // Move o livro para a direita para centrar quando aberto
        prevBtn.style.transform = "translateX(-180px)";
        nextBtn.style.transform = "translateX(180px)";
    }

    function closeBook(isAtBeginning) {
        if(isAtBeginning) {
            book.style.transform = "translateX(0%)"; // Fecha e volta ao centro
        } else {
            book.style.transform = "translateX(100%)"; // Fecha no fim
        }
        prevBtn.style.transform = "translateX(0px)";
        nextBtn.style.transform = "translateX(0px)";
    }

    function goNextPage() {
        if(currentLocation < maxLocation) {
            switch(currentLocation) {
                case 1:
                    openBook();
                    paper1.classList.add("flipped");
                    paper1.style.zIndex = 1; // Envia para trás
                    break;
                case 2:
                    paper2.classList.add("flipped");
                    paper2.style.zIndex = 2;
                    break;
                case 3:
                    paper3.classList.add("flipped");
                    paper3.style.zIndex = 3;
                    closeBook(false); // Fecha o livro no fim
                    break;
                default:
                    throw new Error("unknown state");
            }
            currentLocation++;
        }
    }

    function goPrevPage() {
        if(currentLocation > 1) {
            switch(currentLocation) {
                case 2:
                    closeBook(true); // Fecha o livro no início
                    paper1.classList.remove("flipped");
                    paper1.style.zIndex = 3; // Traz para a frente
                    break;
                case 3:
                    paper2.classList.remove("flipped");
                    paper2.style.zIndex = 2;
                    break;
                case 4:
                    openBook();
                    paper3.classList.remove("flipped");
                    paper3.style.zIndex = 1;
                    break;
                default:
                    throw new Error("unknown state");
            }
            currentLocation--;
        }
    }

    // Event Listeners
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener("click", goNextPage);
        prevBtn.addEventListener("click", goPrevPage);
    }
    
    // Permitir clique nas próprias páginas para virar
    const papers = [paper1, paper2, paper3];
    papers.forEach(paper => {
        if(paper) {
            paper.addEventListener('click', () => {
                if (paper.classList.contains('flipped')) {
                   // Se já está virada, volta para trás (lógica simplificada, melhor usar os botões para controlo total)
                   // goPrevPage(); 
                } else {
                   goNextPage();
                }
            });
        }
    });