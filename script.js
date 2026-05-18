/* script.js */
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. GESTIONE HEADER E MENU MOBILE ---
    const header = document.getElementById('main-header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Cambia lo stile dell'header allo scorrimento
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Toggle menu mobile
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Blocca lo scroll del body quando il menu è aperto
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // --- 2. SMOOTH SCROLLING ---
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Chiude il menu mobile se è aperto
            if (navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active'); 
                document.body.style.overflow = 'auto';
            }

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Calcola l'altezza dell'header per non coprire il titolo
                const headerHeight = header.offsetHeight;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 3. ANIMAZIONI ALLO SCORRIMENTO (INTERSECTION OBSERVER) ---
    // Definisce quali elementi dovranno apparire con un "fade-in"
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15, // L'elemento appare quando il 15% è visibile
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Ferma l'osservazione una volta animato
            }
        });
    }, appearOptions);

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    // --- 4. VALIDAZIONE E GESTIONE FORM DI CONTATTO ---
    const form = document.getElementById('info-form');
    const formMessages = document.getElementById('form-messages');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); 

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const messaggio = document.getElementById('messaggio').value.trim();

        // Stile base per il contenitore dei messaggi
        formMessages.style.marginTop = '20px';
        formMessages.style.fontSize = '0.9rem';
        formMessages.style.letterSpacing = '1px';

        // Validazione
        if (nome === '' || email === '' || messaggio === '') {
            formMessages.textContent = 'I campi Nome, Email e Messaggio sono obbligatori.';
            formMessages.style.color = '#ff4c4c'; // Rosso per errore
        } else {
            // Simulazione invio (Feedback visivo di lusso)
            const submitButton = form.querySelector('.btn-submit');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Elaborazione...';
            submitButton.style.opacity = '0.7';
            submitButton.disabled = true;

            setTimeout(() => {
                formMessages.innerHTML = `<span style="color: var(--gold);">Richiesta esclusiva inviata con successo.</span><br>Un nostro consulente la contatterà a breve, ${nome}.`;
                
                form.reset();
                submitButton.textContent = originalText;
                submitButton.style.opacity = '1';
                submitButton.disabled = false;

                setTimeout(() => {
                    formMessages.innerHTML = '';
                }, 7000);
            }, 2000);
        }
    });
});
