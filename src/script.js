/**
 * Full Page Scroll - Navigation Logic
 * Uses Intersection Observer API to detect visible sections
 * and update the side navigation accordingly.
 */

document.addEventListener('DOMContentLoaded', function () {
    'use strict';


    const scrollContainer = document.querySelector('.scroll-container');
    const sections = document.querySelectorAll('.section');

    const navDots = document.querySelectorAll('.timeline-dot');
    const currentSectionDisplay = document.querySelector('.nav-current-section');

    let currentSectionIndex = 0;

    /**
     * Initialize the Intersection Observer
     * Threshold at 0.5 means the section must be at least 50% visible
     */
    const observerOptions = {
        root: scrollContainer,
        rootMargin: '0px',
        threshold: 0.5
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get section index from ID
                const sectionId = entry.target.id;
                const index = parseInt(sectionId.replace('section-', '')) - 1;

                // Update current section
                updateCurrentSection(index);

                // Add visible class for animations
                entry.target.classList.add('visible');
            } else {
                // Remove visible class when section leaves viewport
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    /**
     * Update the current section in navigation
     * @param {number} index - The index of the current section (0-based)
     */
    function updateCurrentSection(index) {
        if (index === currentSectionIndex) return;

        currentSectionIndex = index;

        // Update nav dots state
        navDots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Update Top Element: Current Section Number
        if (currentSectionDisplay) {
            const displayIndex = (index + 1).toString().padStart(2, '0');
            currentSectionDisplay.textContent = displayIndex;
        }
    }

    /**
     * Handle navigation dot clicks
     * Smooth scroll to the target section
     */
    function handleNavClick(event) {
        event.preventDefault();

        const targetId = event.currentTarget.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            // Calculate indices
            const targetIndex = parseInt(targetId.replace('#section-', ''), 10) - 1;
            const currentIndex = currentSectionIndex;

            // Determine intermediate range
            const start = Math.min(currentIndex, targetIndex) + 1;
            const end = Math.max(currentIndex, targetIndex) - 1;

            // If adjacent or same, just scroll normally
            if (start > end) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
            }

            // FOLD SPACE: Hide intermediate sections
            const intermediates = [];
            for (let i = start; i <= end; i++) {
                if (sections[i]) {
                    sections[i].classList.add('folded');
                    intermediates.push(sections[i]);
                }
            }

            // Perform short smooth scroll
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Update navigation immediately
            updateCurrentSection(targetIndex);

            // Wait for scroll to finish, then unfold
            setTimeout(() => {
                // UNFOLD: Show sections again
                intermediates.forEach(s => s.classList.remove('folded'));

                // CRITICAL: Correct scroll position instantly
                targetSection.scrollIntoView({ behavior: 'auto', block: 'start' });

            }, 600);
        }
    }

    /**
     * Handle keyboard navigation
     * Arrow keys for section navigation
     */
    function handleKeyboard(event) {
        const key = event.key;

        if (key === 'ArrowDown' || key === 'ArrowRight') {
            event.preventDefault();
            navigateToSection(currentSectionIndex + 1);
        } else if (key === 'ArrowUp' || key === 'ArrowLeft') {
            event.preventDefault();
            navigateToSection(currentSectionIndex - 1);
        } else if (key === 'Home') {
            event.preventDefault();
            navigateToSection(0);
        } else if (key === 'End') {
            event.preventDefault();
            navigateToSection(sections.length - 1);
        }
    }

    /**
     * Navigate to a specific section
     * @param {number} index - Target section index
     */
    function navigateToSection(index) {
        // Clamp index to valid range
        const targetIndex = Math.max(0, Math.min(index, sections.length - 1));

        if (sections[targetIndex]) {
            sections[targetIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    /**
     * Initialize everything
     */
    function init() {
        sections.forEach(section => {
            sectionObserver.observe(section);
        });

        navDots.forEach(dot => {
            dot.addEventListener('click', handleNavClick);
        });

        document.addEventListener('keydown', handleKeyboard);

        if (sections[0]) {
            sections[0].classList.add('visible');
        }

        // Touch/swipe support for mobile
        let touchStartY = 0;
        let touchEndY = 0;

        scrollContainer.addEventListener('touchstart', (e) => {
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        scrollContainer.addEventListener('touchend', (e) => {
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartY - touchEndY;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe up - next section
                    navigateToSection(currentSectionIndex + 1);
                } else {
                    // Swipe down - previous section
                    navigateToSection(currentSectionIndex - 1);
                }
            }
        }
    }

    // ============================================
    // Metronomy Spacebar - PRESS ONLY Interaction
    // ============================================
    // ============================================
    // Metronomy Spacebar - PRESS TO COMPLETE
    // ============================================
    const btn = document.getElementById('spaceBtn');
    let pressTimer = null;
    const ANIMATION_DURATION = 1000; // Must match CSS transition (1.0s)

    function startPress(e) {
        if (!btn || btn.classList.contains('is-pressed')) return;

        e.preventDefault();
        btn.classList.add('is-pressed');

        // Start timer to auto-navigate when animation completes
        pressTimer = setTimeout(() => {
            completeAction();
        }, ANIMATION_DURATION);
    }

    function cancelPress() {
        if (!btn) return;

        // If released early, cancel everything
        if (pressTimer) {
            clearTimeout(pressTimer);
            pressTimer = null;
        }
        btn.classList.remove('is-pressed');
        // NOTE: No navigation triggers here since animation didn't complete
    }

    function completeAction() {
        if (pressTimer) {
            clearTimeout(pressTimer);
            pressTimer = null;
        }

        // Navigate immediately
        navigateToSection(currentSectionIndex + 1);

        // Reset button state
        btn.classList.remove('is-pressed');
    }

    // Keyboard Events
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space' && !event.repeat) {
            startPress(event);
        }
    });

    document.addEventListener('keyup', (event) => {
        if (event.code === 'Space') {
            cancelPress();
        }
    });

    // Mouse Events
    if (btn) {
        btn.addEventListener('mousedown', startPress);
        btn.addEventListener('mouseup', cancelPress);
        btn.addEventListener('mouseleave', cancelPress);

        // Touch support for mobile
        btn.addEventListener('touchstart', startPress, { passive: false });
        btn.addEventListener('touchend', cancelPress);
    }

    // ============================================
    // Bento Grid Interaction (Section 14)
    // ============================================
    const bentoCards = document.querySelectorAll('.bento-container .card');

    bentoCards.forEach(card => {
        card.addEventListener('click', () => {
            if (card.classList.contains('expanded')) return;

            // Close others
            bentoCards.forEach(c => {
                c.classList.remove('expanded');
                c.classList.add('collapsed');
            });

            // Open clicked
            card.classList.remove('collapsed');
            card.classList.add('expanded');
        });
    });

    init();
});

