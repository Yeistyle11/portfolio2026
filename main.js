// main.js

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Animación del Hero (Staggering con Anime.js)
    var textWrapper = document.querySelector('.ml11 .letters');
    textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");

    anime.timeline({loop: false})
    .add({
        targets: '.hero-content .greeting, .hero-content .subtitle, .hero-content .description, .hero-content .cta-button',
        opacity: [0,1],
        translateY: [20, 0],
        easing: "easeOutExpo",
        duration: 1200,
        delay: (el, i) => 100 * i,
        offset: '-=500' 
    })
    .add({
        targets: '.hero-image',
        opacity: [0,1],
        scale: [0.5, 1],
        rotate: [-10, 0],
        easing: "easeOutElastic(1, .6)",
        duration: 1500,
        offset: '-=1000'
    });

    // 2. Animación de Scroll Reveal para secciones y Timeline
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                
                // Si la sección es la de Educación, animar la timeline
                if (entry.target.id === 'education') {
                    anime({
                        targets: '.timeline-item',
                        translateX: [-50, 0],
                        opacity: [0, 1],
                        easing: 'easeOutExpo',
                        delay: anime.stagger(200)
                    });
                }
                
                // Si la sección es Certificaciones
                if (entry.target.id === 'certifications') {
                    anime({
                        targets: '.cert-card',
                        scale: [0.8, 1],
                        opacity: [0, 1],
                        easing: 'easeOutElastic(1, .8)',
                        delay: anime.stagger(100)
                    });
                }

                // Animación Genérica para el resto
                anime({
                    targets: entry.target.querySelectorAll('.section-title, .about-text, .project-card, .contact-section > *'),
                    translateY: [50, 0],
                    opacity: [0, 1],
                    duration: 1000,
                    easing: 'easeOutCubic',
                    delay: anime.stagger(200) 
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // 3. Efecto Hover sutil en tarjetas de proyecto
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                scale: 1.02,
                boxShadow: '0 10px 30px -15px rgba(2, 12, 27, 0.7)',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                scale: 1,
                boxShadow: 'none', 
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });

    // 4. Efecto Hover en tarjetas de certificaciones
    const certCards = document.querySelectorAll('.cert-card');
    certCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
             anime({
                targets: card.querySelector('.cert-icon'),
                rotate: '1turn',
                duration: 800
             });
        });
    });
    
    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mobile Menu Logic
    const burger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            navLinks.forEach((l) => { l.style.animation = ''; });
        });
    });

});