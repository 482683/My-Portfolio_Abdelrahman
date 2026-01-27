document.addEventListener('DOMContentLoaded', () => {
    // --- Initialize Particles.js ---
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#00d2ff'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00d2ff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }

    // --- Tab Switching Logic ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section-content');

    // Function to show a section
    const showSection = (sectionId) => {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active-section');
        });

        // Show the selected section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active-section');
        }

        // Update active state in navbar
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });

        // Scroll to the top of the page
        window.scrollTo(0, 0);
    };

    // Add click event listeners to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor behavior
            const sectionId = link.getAttribute('href').substring(1); // Get section ID from href
            showSection(sectionId);
        });
    });

    // Show the 'home' section by default on page load
    showSection('home');

    // --- Enhanced Animation Effects ---
    // Add hover effect listeners to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.05}s`;
        
        item.addEventListener('mouseenter', () => {
            // Add extra glow effect
            item.style.filter = 'brightness(1.2)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.filter = 'brightness(1)';
        });
    });

    // Animate service cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card-new').forEach((card) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });

    // Add ripple effect to buttons
    document.querySelectorAll('.btn-featured-primary-new, .btn-featured-secondary-new').forEach(button => {
        button.addEventListener('click', (e) => {
            const rect = button.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            button.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // --- Lightbox Logic ---
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const lightboxImg = document.getElementById('lightbox-img');
        const closeBtn = document.querySelector('.close-lightbox');
        const certImageBoxes = document.querySelectorAll('.cert-img-box');

        certImageBoxes.forEach(box => {
            box.addEventListener('click', () => {
                const img = box.querySelector('img');
                if (img) {
                    lightbox.style.display = "flex";
                    lightboxImg.src = img.src;
                    // Add entrance animation
                    lightboxImg.style.animation = 'none';
                    setTimeout(() => {
                        lightboxImg.style.animation = 'scaleAndRotate 0.4s ease-out';
                    }, 10);
                }
            });
        });

        const closeLightbox = () => {
            lightbox.style.display = "none";
        };

        if(closeBtn) {
            closeBtn.addEventListener('click', closeLightbox);
        }

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // --- Smooth Scroll for Anchors ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // --- Add Parallax Effect ---
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            heroImage.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        });
    }

    // --- Smart Attendance Card Special Effects ---
    const smartAttendanceCard = document.querySelector('.featured-project-standalone:nth-of-type(2) .featured-project-card-new');
    if (smartAttendanceCard) {
        smartAttendanceCard.addEventListener('mouseenter', () => {
            const img = smartAttendanceCard.querySelector('img');
            if (img) {
                img.style.filter = 'drop-shadow(0 0 25px rgba(0, 200, 255, 0.8))';
            }
        });

        smartAttendanceCard.addEventListener('mouseleave', () => {
            const img = smartAttendanceCard.querySelector('img');
            if (img) {
                img.style.filter = 'drop-shadow(0 0 10px rgba(0, 150, 255, 0.3))';
            }
        });
    }

    // --- Page Load Animation ---
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
});
