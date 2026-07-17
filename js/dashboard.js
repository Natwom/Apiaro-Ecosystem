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
});