// Hamburger menu toggle functionality
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const orderBtn = document.getElementById('orderBtn');
const headerLogo = document.querySelector('.logo');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    if (orderBtn) orderBtn.classList.toggle('hidden');
    if (headerLogo) headerLogo.classList.toggle('logo-invisible');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        if (orderBtn) orderBtn.classList.remove('hidden');
        if (headerLogo) headerLogo.classList.remove('logo-invisible');
    }
});

// Close menu when clicking on a nav link
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        if (orderBtn) orderBtn.classList.remove('hidden');
        if (headerLogo) headerLogo.classList.remove('logo-invisible');
    });
});





//faq

const faqData = [
    {
        id: 1,
        question: "What's included in the Spartan Race kit?",
        answer: "The Spartan Race kit typically includes your race bib, a finisher medal, a race T-shirt, water, and bragging rights. It's everything you need to feel like a champion after conquering the course."
    },
    {
        id: 2,
        question: "How long does shipping take?",
        answer: "Shipping typically takes 3-5 business days within the US, and up to 10 business days for international orders."
    },
    {
        id: 3,
        question: "What's your return policy?",
        answer: "We accept returns for unworn merchandise within 30 days of purchase, provided the original tags are attached. Refunds are processed within 5-7 business days after the return is received and inspected."
    },
    {
        id: 4,
        question: "Are the supplements safe to use?",
        answer: "All our supplements are third-party tested and formulated with safe, non-GMO ingredients. Consult your doctor before starting any new regimen, especially if you have pre-existing health conditions."
    },
    {
        id: 5,
        question: "Do you offer discounts for bulk purchases?",
        answer: "Yes, we offer tiered discounts for orders over 10 units. Please contact our sales team at sales@example.com for a custom quote based on the volume and product mix of your order."
    }
];

// 2. DOM Elements
const questionList = document.getElementById('faq-question-list');
const displayQuestion = document.getElementById('faq-display-question');
const displayAnswer = document.getElementById('faq-display-answer');
const placeholder = document.getElementById('faq-placeholder');

// 3. Function to update the display card
function updateDisplayCard(question, answer) {
    displayQuestion.textContent = question;
    displayAnswer.textContent = answer;
    placeholder.style.display = 'none'; // Hide placeholder once content is loaded
}

// 4. Function to handle question clicks
function handleQuestionClick(event) {
    const clickedItem = event.currentTarget;
    const questionId = parseInt(clickedItem.dataset.id);

    // Remove 'active' class from all items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });

    // Add 'active' class to the clicked item
    clickedItem.classList.add('active');

    // Find the corresponding data
    const selectedFaq = faqData.find(faq => faq.id === questionId);

    if (selectedFaq) {
        updateDisplayCard(selectedFaq.question, selectedFaq.answer);
    }
}

// 5. Function to render the FAQ list
function renderFaqList() {
    faqData.forEach((faq, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'faq-item';
        listItem.dataset.id = faq.id; // Store the ID for retrieval
        listItem.addEventListener('click', handleQuestionClick);

        // Create the content structure
        listItem.innerHTML = `
            <div class="faq-icon-wrapper">
                <span class="faq-indicator-circle"></span>
                ${faq.question}
            </div>
            <span class="faq-arrow">
                <!-- SVG for right arrow (as seen in image) -->
                <svg class="faq-svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
            </span>
        `;

        questionList.appendChild(listItem);

        // Set the second item (index 1) as the default active item on load
        if (index === 1) {
            listItem.classList.add('active');
            updateDisplayCard(faq.question, faq.answer);
        }
    });
}

// 6. Initialize when DOM is ready (more robust than window.onload)
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Ensure required nodes exist before rendering
        if (questionList && displayQuestion && displayAnswer && placeholder) {
            renderFaqList();
        }

        // Testimonial carousel wiring
        const userEls = document.querySelectorAll('.testimonial-card .user-list .user');
        const userListEl = document.querySelector('.testimonial-card .user-list');
        const quoteEl = document.querySelector('.testimonial-card .quote');
        const avatarEl = document.querySelector('.testimonial-card .quote .avatar');
        const quoteTextEl = document.querySelector('.testimonial-card .quote .quote-text');

        // Only proceed if testimonial section exists
        if (userEls.length && userListEl && quoteEl && avatarEl && quoteTextEl) {
            // Map testimonials in the same visual order as the usernames
            const testimonials = [
                {
                    name: 'Andrew Daniel',
                    role: 'Gym Student',
                    quote: '“The kit kept me fueled through long sessions. Recovery felt faster and I hit new PRs.”',
                    avatar: 'assets/rugby-pl.jpg',
                },
                {
                    name: 'John D.',
                    role: 'Spartan Racer',
                    quote: '“The Spartan Race kit was a game changer! My endurance improved, and I felt stronger throughout the race!”',
                    avatar: 'assets/rugby-pl.jpg',
                },
                {
                    name: 'William Henry',
                    role: 'Enthusiast',
                    quote: '“Loved the simplicity: everything I needed in one kit. Great taste, great results.”',
                    avatar: 'assets/rugby-pl.jpg',
                },
            ];

            const users = Array.from(userEls);
            let activeIndex = users.findIndex(el => el.classList.contains('active'));
            if (activeIndex < 0) activeIndex = 1; // default to middle if none

            // helper to reorder DOM so active is centered [left, active, right]
            const reorderUsers = (centerIndex) => {
                const len = users.length;
                const leftIndex = (centerIndex - 1 + len) % len;
                const rightIndex = (centerIndex + 1) % len;

                // Clear container without destroying nodes
                while (userListEl.firstChild) userListEl.removeChild(userListEl.firstChild);

                // Append in desired visual order: left, center(active), right
                userListEl.appendChild(users[leftIndex]);
                userListEl.appendChild(users[centerIndex]);
                userListEl.appendChild(users[rightIndex]);
            };

            // ensure initial layout has the active user centered
            reorderUsers(activeIndex);

            // --- Lock quote container height to avoid title shifting ---
            const contentContainer = document.querySelector('.testimonial-card .testimonial-content');
            const calcAndLockContentHeight = () => {
                if (!contentContainer) return;

                // Ensure container can grow naturally (don't clip user list)
                contentContainer.style.height = '';

                // Create a measuring clone of the quote block within the same container
                const probe = quoteEl.cloneNode(true);
                // Keep same width context but take it out of normal flow
                probe.style.position = 'absolute';
                probe.style.left = '-9999px';
                probe.style.top = '0';
                probe.style.opacity = '0';
                probe.style.animation = 'none';
                // Ensure width matches actual quote width for accurate wrapping
                probe.style.width = getComputedStyle(quoteEl).width;
                contentContainer.appendChild(probe);

                let maxH = 0;
                const probeTextEl = probe.querySelector('.quote-text');
                if (!probeTextEl) {
                    // Fallback: use current quote height
                    maxH = quoteEl.clientHeight;
                } else {
                    testimonials.forEach(t => {
                        probeTextEl.textContent = t.quote;
                        // Measure after text update
                        const h = probe.offsetHeight;
                        if (h > maxH) maxH = h;
                    });
                }

                // Apply min-height on the quote only; this keeps the title and user list stable and visible
                quoteEl.style.minHeight = maxH + 'px';

                // Cleanup
                contentContainer.removeChild(probe);
            };

            // Initial lock after initial DOM arrangement
            calcAndLockContentHeight();

            // smoother animation config
            const ANIM_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'; // easeOutQuint-like
            const ANIM_MS = 520; // a bit longer for smoothness
            let isAnimating = false;

            const setActive = (nextIndex) => {
                if (nextIndex === activeIndex || isAnimating) return;
                isAnimating = true;

                // update active state in user list
                users.forEach((el, i) => el.classList.toggle('active', i === nextIndex));

                // reorder so the clicked user is centered
                reorderUsers(nextIndex);

                const next = testimonials[nextIndex];

                // animate out (override duration/ease for smoothness)
                quoteEl.style.animationDuration = ANIM_MS + 'ms';
                quoteEl.style.animationTimingFunction = ANIM_EASE;
                quoteEl.classList.remove('slide-in-right');
                quoteEl.classList.add('slide-out-left');

                const onOutEnd = () => {
                    // swap content while hidden
                    if (avatarEl && next.avatar) avatarEl.src = next.avatar;
                    if (quoteTextEl && next.quote) quoteTextEl.textContent = next.quote;

                    // animate in
                    quoteEl.classList.remove('slide-out-left');
                    quoteEl.style.animationDuration = ANIM_MS + 'ms';
                    quoteEl.style.animationTimingFunction = ANIM_EASE;
                    quoteEl.classList.add('slide-in-right');

                    const onInEnd = () => {
                        quoteEl.classList.remove('slide-in-right');
                        // cleanup inline overrides
                        quoteEl.style.animationDuration = '';
                        quoteEl.style.animationTimingFunction = '';
                        isAnimating = false;
                        // Make sure height remains correct even if fonts/wrap changed
                        calcAndLockContentHeight();
                    };
                    quoteEl.addEventListener('animationend', onInEnd, { once: true });
                };
                quoteEl.addEventListener('animationend', onOutEnd, { once: true });

                activeIndex = nextIndex;
            };

            userEls.forEach((el, i) => {
                el.addEventListener('click', () => setActive(i));
                el.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActive(i);
                    }
                });
                // add minimal a11y
                el.setAttribute('tabindex', '0');
                el.setAttribute('role', 'button');
                el.setAttribute('aria-pressed', el.classList.contains('active') ? 'true' : 'false');
            });

            // Keep aria-pressed in sync
            const observer = new MutationObserver(() => {
                userEls.forEach(el => el.setAttribute('aria-pressed', el.classList.contains('active') ? 'true' : 'false'));
            });
            userEls.forEach(el => observer.observe(el, { attributes: true, attributeFilter: ['class'] }));

            // --- Autoplay ---
            const AUTOPLAY_MS = 3800;
            let autoplayId = null;

            const nextIndex = () => (activeIndex + 1) % users.length;
            const startAutoplay = () => {
                if (autoplayId) clearInterval(autoplayId);
                autoplayId = setInterval(() => {
                    if (!isAnimating) setActive(nextIndex());
                }, AUTOPLAY_MS);
            };
            const stopAutoplay = () => {
                if (autoplayId) {
                    clearInterval(autoplayId);
                    autoplayId = null;
                }
            };

            // Pause on hover/touch
            const cardEl = document.querySelector('.testimonial-card');
            if (cardEl) {
                cardEl.addEventListener('mouseenter', stopAutoplay);
                cardEl.addEventListener('mouseleave', startAutoplay);
                cardEl.addEventListener('touchstart', stopAutoplay, { passive: true });
                cardEl.addEventListener('touchend', startAutoplay, { passive: true });
            }

            // Pause when tab is hidden
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) stopAutoplay(); else startAutoplay();
            });

            // Restart autoplay after manual interaction
            users.forEach(el => el.addEventListener('click', () => { stopAutoplay(); startAutoplay(); }));
            users.forEach(el => el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { stopAutoplay(); startAutoplay(); } }));

            // Respect reduced motion
            const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
            if (!prefersReduced.matches) startAutoplay();

            // Recalculate locked height on resize (debounced)
            let resizeTO = null;
            window.addEventListener('resize', () => {
                if (resizeTO) clearTimeout(resizeTO);
                resizeTO = setTimeout(() => {
                    calcAndLockContentHeight();
                }, 150);
            });
        }
    } catch (e) {
        // Fail-safe: keep placeholder visible if something goes wrong
        if (placeholder) {
            placeholder.style.display = '';
        }
        // Optional: log error for debugging in console
        console.error('Failed to initialize FAQ:', e);
    }
});