/* ============================================
   APIARO — Dashboard JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Product Card Interactions
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });

        // Add click ripple effect
        card.addEventListener('click', function(e) {
            // Only trigger if not clicking a button/link inside
            if (e.target.closest('a, button')) return;
            
            const link = card.querySelector('a');
            if (link) {
                window.location.href = link.getAttribute('href');
            }
        });
    });

    // Status Badge Animation
    const statusBadges = document.querySelectorAll('.status-badge');
    statusBadges.forEach(badge => {
        if (badge.classList.contains('live')) {
            badge.style.animation = 'pulse 2s infinite';
        }
    });

    // Add pulse animation for live badges
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
    `;
    document.head.appendChild(style);

    // Animate product cards on load
    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Coming soon cards - subtle hover hint
    const comingSoonCards = document.querySelectorAll('.product-card[data-status="coming-soon"]');
    comingSoonCards.forEach(card => {
        const badge = card.querySelector('.status-badge');
        if (badge) {
            badge.style.cursor = 'help';
            badge.title = 'This feature is currently in development';
        }
    });

    // Dashboard search filter
    const globalSearch = document.getElementById('globalSearch');
    if (globalSearch) {
        globalSearch.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            productCards.forEach(card => {
                const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
                const desc = card.querySelector('p')?.textContent.toLowerCase() || '';
                if (title.includes(query) || desc.includes(query)) {
                    card.style.display = '';
                    card.style.opacity = '1';
                } else {
                    card.style.opacity = '0.3';
                }
                if (!query) {
                    card.style.opacity = '1';
                }
            });
        });
    }

    // Keyboard shortcut: press number keys 1-8 to navigate to products
    document.addEventListener('keydown', (e) => {
        if (document.activeElement.tagName === 'INPUT') return;
        const num = parseInt(e.key);
        if (num >= 1 && num <= 8) {
            const card = productCards[num - 1];
            if (card) {
                const link = card.querySelector('a');
                if (link) {
                    window.location.href = link.getAttribute('href');
                }
            }
        }
    });
});