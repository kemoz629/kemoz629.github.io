// Funcionalidad del menú móvil
document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');
    const logoLink = document.querySelector('.nav-logo a');

    // Toggle menú móvil
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll para navegación
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');

            // Manejar casos especiales
            if (targetId === '#home') {
                // Para inicio, ir al top de la página
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                console.log('Navegando a: Inicio (top)');
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Usar offsetTop simplificado para todas las secciones
                let offsetPosition = targetElement.offsetTop;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                console.log(`Navegando a: ${targetId}, Posición: ${offsetPosition}`);
            } else {
                console.log(`Elemento no encontrado: ${targetId}`);
            }
        });
    });

    // Manejo del click en el logo
    if (logoLink) {
        logoLink.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = logoLink.getAttribute('href');

            if (targetId === '#home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                console.log('Navegando a: Inicio desde logo (top)');
            }
        });
    }

    // Animación de barras de habilidades
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillsSection = document.getElementById('skills');

    const animateSkills = () => {
        const sectionTop = skillsSection.offsetTop;
        const sectionHeight = skillsSection.offsetHeight;
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;

        if (scrollTop > sectionTop - windowHeight / 2 &&
            scrollTop < sectionTop + sectionHeight) {
            skillBars.forEach(bar => {
                const targetWidth = bar.getAttribute('data-width');
                bar.style.width = targetWidth + '%';
            });
        }
    };

    // Ejecutar animación de habilidades en scroll
    window.addEventListener('scroll', animateSkills);

    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Obtener datos del formulario
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Validación básica
        if (!name || !email || !subject || !message) {
            showNotification('Por favor, completa todos los campos', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Por favor, ingresa un email válido', 'error');
            return;
        }

        // Simular envío del formulario
        showNotification('¡Mensaje enviado correctamente! Te contactaré pronto.', 'success');
        contactForm.reset();
    });

    // Función para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Función para mostrar notificaciones
    function showNotification(message, type) {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Estilos de la notificación
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: 500;
            z-index: 9999;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            ${type === 'success' ? 'background-color: #28a745;' : 'background-color: #dc3545;'}
        `;

        document.body.appendChild(notification);

        // Mostrar notificación
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Ocultar notificación después de 4 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }

    // Efecto de escritura para el título principal
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid #ffd700';

        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        };

        setTimeout(typeWriter, 1000);
    }

    // Intersection Observer para animaciones
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animaciones (excluyendo about-text)
    const animatedElements = document.querySelectorAll('.project-card, .stat, .tech-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Asegurar que el texto de "Sobre mí" sea visible desde el inicio
    const aboutText = document.querySelector('.about-text');
    if (aboutText) {
        aboutText.style.opacity = '1';
        aboutText.style.transform = 'translateY(0)';
    }

    // Efecto parallax suave para el hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Agregar efecto hover a las tarjetas de proyecto
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Contador animado para las estadísticas
    const stats = document.querySelectorAll('.stat h3');
    const aboutSection = document.getElementById('about');
    let hasAnimated = false;

    const animateNumbers = () => {
        if (hasAnimated) return;

        const sectionTop = aboutSection.offsetTop;
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;

        if (scrollTop > sectionTop - windowHeight / 2) {
            hasAnimated = true;

            stats.forEach(stat => {
                const text = stat.textContent;
                if (text.includes('+')) {
                    const number = parseInt(text.replace('+', ''));
                    if (!isNaN(number)) {
                        animateNumber(stat, 0, number, '+');
                    }
                }
            });
        }
    };

    function animateNumber(element, start, end, suffix = '') {
        const duration = 2000;
        const increment = (end - start) / (duration / 50);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 50);
    }

    window.addEventListener('scroll', animateNumbers);

    // Verificar que todos los elementos de navegación existen
    const navItems = ['#home', '#about', '#skills', '#projects', '#contact'];
    navItems.forEach(id => {
        const element = document.querySelector(id);
        if (!element) {
            console.error(`Elemento no encontrado: ${id}`);
        } else {
            console.log(`Elemento encontrado: ${id}`, element);
        }
    });

    // Mostrar mensaje de bienvenida
    setTimeout(() => {
        showNotification('¡Bienvenido a mi portfolio! 👋', 'success');
    }, 2000);
});