/* ==========================================================================
   FARHAN PORTFOLIO INTERACTIVE JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Theme Toggle (Dark & Light Mode) ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // --- 2. Mobile Navigation Toggle ---
    const mobileToggleBtn = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-item');

    if (mobileToggleBtn && navMenu) {
        mobileToggleBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggleBtn.classList.toggle('active');
        });

        // Close menu when link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggleBtn.classList.remove('active');
            });
        });
    }

    // --- 3. Hero Section Typing Effect ---
    const typingTextElement = document.getElementById('typing-text');
    const roles = [
        'Full-Stack Web Developer',
        'Frontend UI/UX Specialist',
        'React & Node.js Engineer',
        'Creative Web Innovator'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        if (!typingTextElement) return;

        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before typing next phrase
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();

    // --- 4. Scroll Reveal Animations (IntersectionObserver) ---
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: unobserve after reveal
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 5. Number Counters Animation ---
    const statNumbers = document.querySelectorAll('.stat-number');
    let counted = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'), 10);
                    let count = 0;
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16);

                    const updateCount = () => {
                        count += increment;
                        if (count < target) {
                            stat.textContent = Math.ceil(count) + (target === 100 ? '%' : '+');
                            requestAnimationFrame(updateCount);
                        } else {
                            stat.textContent = target + (target === 100 ? '%' : '+');
                        }
                    };

                    updateCount();
                });
                counted = true;
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // --- 6. Navigation Scrollspy & Header Sticky Glow ---
    const sections = document.querySelectorAll('section[id]');
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        // Sticky Navbar shadow
        if (scrollY > 50) {
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        // Back to top button visibility
        if (scrollY > 500) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }

        // Section highlighting
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navItem = document.querySelector(`.nav-links a[href*=${sectionId}]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                if (navItem) navItem.classList.add('active');
            } else {
                if (navItem) navItem.classList.remove('active');
            }
        });
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- 7. Project Portfolio Filtering ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // --- 8. Project Details Modal ---
    const projectData = {
        '1': {
            title: 'NovaShop E-Commerce Store',
            category: 'Full-Stack Platform',
            description: 'NovaShop is a state-of-the-art e-commerce portal built to handle thousands of product listings with real-time stock management. Features robust customer authentication, shopping cart state management via Redux Toolkit, integrated Stripe payment gateway, and an administrative dashboard for inventory and orders.',
            tech: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Redux', 'Stripe API', 'Tailwind CSS'],
            features: [
                'Secure JWT Authentication & Password Hashing',
                'Seamless Credit Card Checkout Integration',
                'Admin Management Panel for Product CRUD & Orders',
                'Responsive Design with Instant Search & Filters'
            ]
        },
        '2': {
            title: 'TaskFlow Project Management App',
            category: 'Web Application',
            description: 'TaskFlow is an interactive team collaboration workspace designed to increase productivity. Inspired by Kanban methodologies, it empowers users to organize projects into boards, drag-and-drop cards between custom status columns, assign task deadlines, and receive real-time notifications.',
            tech: ['JavaScript ES6+', 'React', 'HTML5 Drag & Drop API', 'Tailwind CSS', 'REST API'],
            features: [
                'Smooth Drag & Drop Task Organization',
                'Custom Board Creation & Member Tagging',
                'Color Coded Priority Badges & Deadline Countdowns',
                'Persistent Local & Cloud Storage Sync'
            ]
        },
        '3': {
            title: 'Apex Analytics SaaS Dashboard',
            category: 'Frontend Dashboard',
            description: 'A data visualization platform crafted for SaaS businesses. Apex Analytics aggregates complex business metrics into intuitive real-time interactive charts, user conversion funnels, and revenue metrics.',
            tech: ['Next.js', 'TypeScript', 'Chart.js / Recharts', 'CSS Grid', 'Tailwind'],
            features: [
                'Interactive Dynamic Line & Bar Analytics Charts',
                'Dark Mode / Light Mode Data Visualization Toggle',
                'Export Reports to PDF & CSV Formats',
                'Optimized Light Speed Rendering Performance'
            ]
        },
        '4': {
            title: 'AI Copywriting & Generator Platform',
            category: 'AI Powered Web App',
            description: 'An AI-powered content generation app leveraging OpenAI API endpoints to generate blog content, marketing headlines, email templates, and code snippets in seconds.',
            tech: ['React', 'Node.js', 'Express', 'OpenAI API', 'CSS Glassmorphism'],
            features: [
                'Multiple AI Generation Templates (Blogs, Emails, Code)',
                'Token Usage Counter & Rate Limiting',
                'One-Click Code & Text Copying',
                'Sleek Dark Glassmorphic Modern Interface'
            ]
        }
    };

    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const modalCloseBtn = document.getElementById('modal-close');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const openModalBtns = document.querySelectorAll('.open-modal-btn');

    function openModal(projectId) {
        const data = projectData[projectId];
        if (!data || !modal || !modalBody) return;

        modalBody.innerHTML = `
            <span class="project-category" style="color: var(--accent-primary); font-weight:700;">${data.category}</span>
            <h2 style="font-size:1.8rem; margin:0.4rem 0 1rem;">${data.title}</h2>
            <p style="color:var(--text-secondary); margin-bottom:1.5rem;">${data.description}</p>
            
            <h4 style="font-size:1.1rem; margin-bottom:0.6rem;">Key Features</h4>
            <ul style="list-style:disc; margin-left:1.2rem; color:var(--text-secondary); margin-bottom:1.5rem;">
                ${data.features.map(f => `<li style="margin-bottom:0.3rem;">${f}</li>`).join('')}
            </ul>

            <h4 style="font-size:1.1rem; margin-bottom:0.6rem;">Technologies Used</h4>
            <div class="project-tags" style="margin-bottom:2rem;">
                ${data.tech.map(t => `<span class="tag" style="background:var(--accent-glow); color:var(--accent-primary); border-color:rgba(6,182,212,0.3);">${t}</span>`).join('')}
            </div>

            <div style="display:flex; gap:1rem;">
                <a href="https://github.com" target="_blank" rel="noopener" class="btn btn-primary" style="flex:1;">
                    <i class="fa-brands fa-github"></i> View Repository
                </a>
                <button class="btn btn-outline close-modal-action" style="flex:1;">
                    Close Window
                </button>
            </div>
        `;

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // Add close event for inside button
        const innerCloseBtn = modalBody.querySelector('.close-modal-action');
        if (innerCloseBtn) {
            innerCloseBtn.addEventListener('click', closeModal);
        }
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projId = btn.getAttribute('data-project');
            openModal(projId);
        });
    });

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

    // --- 9. Contact Form Validation & Toast Notification ---
    const contactForm = document.getElementById('contact-form');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    function showToast(message) {
        if (!toast || !toastMessage) return;
        toastMessage.textContent = message;
        toast.classList.add('active');

        setTimeout(() => {
            toast.classList.remove('active');
        }, 4000);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submit-btn');
            const originalBtnText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;

            // Simulate form submission delay
            setTimeout(() => {
                showToast("Thank you, Farhan has received your message! He will get back to you shortly.");
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }, 1200);
        });
    }

    // Dynamically set current year in footer
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }
});
