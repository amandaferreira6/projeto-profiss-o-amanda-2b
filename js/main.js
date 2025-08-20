// Menu Mobile
document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('.menu');
    
    if (mobileMenuBtn && menu) {
        mobileMenuBtn.addEventListener('click', function() {
            menu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            mobileMenuBtn.setAttribute('aria-expanded', 
                mobileMenuBtn.classList.contains('active'));
        });
    }
    
    // Fechar menu ao clicar em um link
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Carrossel de Serviços
    initServicosCarrossel();
    
    // Carrossel de Equipe
    initEquipeCarrossel();
    
    // Sistema de Abas (Tabs)
    initTabsSystem();
    
    // Accordion FAQ
    initFAQAccordion();
    
    // Scroll Suave para Links Internos
    initSmoothScroll();
    
    // Animação de Reveal on Scroll
    initRevealOnScroll();
    
    // Header fixo com mudança de estilo no scroll
    initHeaderScroll();
});

// Carrossel de Serviços
function initServicosCarrossel() {
    const carrossel = document.querySelector('.servicos-carrossel');
    const slides = document.querySelectorAll('.servico-slide');
    const prevBtn = document.querySelector('.carrossel-prev');
    const nextBtn = document.querySelector('.carrossel-next');
    const indicadoresContainer = document.querySelector('.carrossel-indicadores');
    
    if (!carrossel || slides.length === 0) return;
    
    let currentIndex = 0;
    let autoPlayInterval;
    
    // Criar indicadores
    slides.forEach((_, index) => {
        const indicador = document.createElement('div');
        indicador.classList.add('carrossel-indicador');
        if (index === 0) indicador.classList.add('active');
        indicador.addEventListener('click', () => goToSlide(index));
        indicadoresContainer.appendChild(indicador);
    });
    
    const indicadores = document.querySelectorAll('.carrossel-indicador');
    
    // Função para ir para um slide específico
    function goToSlide(index) {
        currentIndex = index;
        
        // Atualizar posição do carrossel
        carrossel.scrollTo({
            left: slides[index].offsetLeft,
            behavior: 'smooth'
        });
        
        // Atualizar indicadores
        updateIndicadores();
        
        // Reiniciar autoplay
        restartAutoPlay();
    }
    
    // Atualizar indicadores ativos
    function updateIndicadores() {
        indicadores.forEach((indicador, index) => {
            indicador.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Navegação anterior
    function prevSlide() {
        currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
        goToSlide(currentIndex);
    }
    
    // Próximo slide
    function nextSlide() {
        currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
        goToSlide(currentIndex);
    }
    
    // Autoplay
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            nextSlide();
        }, 5000); // Mudar a cada 5 segundos
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    function restartAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }
    
    // Event Listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Pausar autoplay quando o mouse estiver sobre o carrossel
    carrossel.addEventListener('mouseenter', stopAutoPlay);
    carrossel.addEventListener('mouseleave', startAutoPlay);
    
    // Atualizar indicadores durante o scroll
    carrossel.addEventListener('scroll', () => {
        // Encontrar o slide mais visível
        let mostVisibleIndex = 0;
        let maxVisibility = 0;
        
        slides.forEach((slide, index) => {
            const rect = slide.getBoundingClientRect();
            const visibility = Math.min(rect.width, 
                Math.max(0, Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0))) / rect.width;
            
            if (visibility > maxVisibility) {
                maxVisibility = visibility;
                mostVisibleIndex = index;
            }
        });
        
        if (mostVisibleIndex !== currentIndex) {
            currentIndex = mostVisibleIndex;
            updateIndicadores();
        }
    });
    
    // Iniciar autoplay
    startAutoPlay();
}

// Carrossel de Equipe
function initEquipeCarrossel() {
    const carrossel = document.querySelector('.equipe-carrossel');
    if (!carrossel) return;
    
    // Configuração básica de scroll para o carrossel de equipe
    carrossel.addEventListener('wheel', (e) => {
        e.preventDefault();
        carrossel.scrollLeft += e.deltaY;
    });
}

// Sistema de Abas (Tabs)
function initTabsSystem() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length === 0 || tabContents.length === 0) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Remover classe active de todos os botões e conteúdos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Adicionar classe active ao botão e conteúdo clicado
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Accordion FAQ
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) return;
    
    faqItems.forEach(item => {
        const pergunta = item.querySelector('.faq-pergunta');
        
        pergunta.addEventListener('click', () => {
            // Fechar outros itens
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-pergunta').classList.remove('active');
                    otherItem.querySelector('.faq-resposta').classList.remove('active');
                }
            });
            
            // Alternar item atual
            pergunta.classList.toggle('active');
            const resposta = item.querySelector('.faq-resposta');
            resposta.classList.toggle('active');
            
            // Acessibilidade
            const isExpanded = pergunta.classList.contains('active');
            pergunta.setAttribute('aria-expanded', isExpanded);
        });
    });
}

// Scroll Suave para Links Internos
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Atualizar URL (opcional)
            if (history.pushState) {
                history.pushState(null, null, targetId);
            } else {
                location.hash = targetId;
            }
        });
    });
}

// Animação de Reveal on Scroll
function initRevealOnScroll() {
    const elementos = document.querySelectorAll('.destaque-card, .servico-slide, .depoimento-card, .pilar-card');
    
    function checkScroll() {
        elementos.forEach(elemento => {
            const elementoTop = elemento.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementoTop < windowHeight * 0.85) {
                elemento.style.opacity = '1';
                elemento.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Configurar estado inicial
    elementos.forEach(elemento => {
        elemento.style.opacity = '0';
        elemento.style.transform = 'translateY(30px)';
        elemento.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Verificar scroll inicial
    checkScroll();
    
    // Verificar scroll durante a rolagem
    window.addEventListener('scroll', checkScroll);
}

// Header fixo com mudança de estilo no scroll
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'var(--bg-white)';
            header.style.backdropFilter = 'none';
            header.style.boxShadow = 'var(--shadow-sm)';
        }
        
        // Esconder/mostrar header no scroll
        if (window.scrollY > lastScrollY && window.scrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = window.scrollY;
    });
}

// Loading Lazy para imagens
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Inicializar lazy loading quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Prevenir envio de formulários (para demonstração)
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form:not(#form-contato)');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Este é um site de demonstração. O formulário não foi enviado.');
        });
    });
});
