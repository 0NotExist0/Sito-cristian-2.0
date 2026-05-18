/* script.js */
document.addEventListener('DOMContentLoaded', () => {
    
    // Gestione del menu mobile (Hamburger Menu)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Scorrimento fluido (Smooth Scrolling) per l'ancoraggio delle sezioni
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Chiude il menu mobile dopo il clic su un link
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active'); 
            }

            // Ottiene l'ID della sezione da raggiungere
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Esegue lo scroll compensando l'altezza dell'header fisso
                window.scrollTo({
                    top: targetSection.offsetTop - 65, 
                    behavior: 'smooth'
                });
            }
        });
    });

    // Validazione e gestione asincrona simulata del form di contatto
    const form = document.getElementById('info-form');
    const formMessages = document.getElementById('form-messages');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); 

        // Recupero e sanificazione di base dei valori immessi
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const messaggio = document.getElementById('messaggio').value.trim();

        // Controllo validità dei campi obbligatori
        if (nome === '' || email === '' || messaggio === '') {
            formMessages.textContent = 'Errore: Per favore compila tutti i campi contrassegnati da asterisco.';
            formMessages.style.color = '#ff4c4c';
            formMessages.style.marginTop = '15px';
            formMessages.style.fontWeight = 'bold';
        } else {
            // Simulazione di una fetch/chiamata API per l'invio dei dati
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Invio in corso...';
            submitButton.disabled = true;

            setTimeout(() => {
                // Successo dell'invio simulato
                formMessages.textContent = `Grazie ${nome}, la tua richiesta è stata inviata con successo. Ti ricontatteremo presto.`;
                formMessages.style.color = '#4caf50';
                formMessages.style.marginTop = '15px';
                formMessages.style.fontWeight = 'bold';
                
                form.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;

                // Rimuove la notifica dopo 6 secondi
                setTimeout(() => {
                    formMessages.textContent = '';
                }, 6000);
            }, 1500); // Ritardo simulato di 1.5s
        }
    });
});
