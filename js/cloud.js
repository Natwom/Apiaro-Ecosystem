/* ============================================
   APIARO — Cloud JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Plan card selection
    const planCards = document.querySelectorAll('.plan-card');
    planCards.forEach(card => {
        const btn = card.querySelector('button');
        if (btn) {
            btn.addEventListener('click', () => {
                const planName = card.querySelector('h4').textContent;
                const price = card.querySelector('.plan-price span').textContent;
                
                if (btn.textContent.includes('Contact')) {
                    showToast('Our sales team will contact you shortly!');
                } else {
                    showToast(`Selected ${planName} plan (${price}/mo)`);
                    
                    // Highlight selected
                    planCards.forEach(c => c.style.borderColor = '');
                    card.style.borderColor = 'var(--primary)';
                    card.style.boxShadow = '0 0 0 2px rgba(245, 124, 0, 0.2)';
                }
            });
        }
    });

    // Server card interactions
    const serverCards = document.querySelectorAll('.server-card');
    serverCards.forEach(card => {
        const actions = card.querySelectorAll('.server-actions button');
        actions.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                const serverName = card.querySelector('h4').textContent;
                const icons = ['terminal', 'cog', 'ellipsis-v'];
                const action = icons[index];
                
                if (action === 'terminal') {
                    showToast(`Opening terminal for ${serverName}...`);
                } else if (action === 'cog') {
                    showToast(`Settings for ${serverName}`);
                } else {
                    showToast(`More options for ${serverName}`);
                }
            });
        });

        // Click on metrics to show details
        const metrics = card.querySelector('.server-metrics');
        if (metrics) {
            metrics.style.cursor = 'pointer';
            metrics.addEventListener('click', () => {
                const serverName = card.querySelector('h4').textContent;
                showToast(`Detailed metrics for ${serverName}`);
            });
        }
    });

    // Deploy buttons
    const deployButtons = document.querySelectorAll('.deploy-btn');
    deployButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.textContent.trim();
            showToast(`Deploying ${type}...`);
            
            // Simulate deployment
            btn.style.background = 'var(--primary)';
            btn.style.color = 'white';
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Deploying...';
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Deployed!';
                btn.style.background = 'var(--success)';
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.style.color = '';
                }, 2000);
            }, 2000);
        });
    });

    // Animate server metrics on load
    const metricBars = document.querySelectorAll('.metric-bar div');
    metricBars.forEach((bar, index) => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.transition = 'width 1.5s ease';
            bar.style.width = width;
        }, 300 + index * 100);
    });

    // Animate storage ring
    const storageRing = document.querySelector('.storage-ring');
    if (storageRing) {
        const percent = storageRing.style.getPropertyValue('--percent') || '65';
        storageRing.style.setProperty('--percent', '0');
        setTimeout(() => {
            storageRing.style.transition = 'background 1.5s ease';
            storageRing.style.setProperty('--percent', percent);
        }, 500);
    }

    // Cloud stat cards animation
    const cloudStatCards = document.querySelectorAll('.cloud-stat-card');
    cloudStatCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });

    // Status dot pulse
    const statusDot = document.querySelector('.status-dot.online');
    if (statusDot) {
        statusDot.style.animation = 'pulse-dot 2s infinite';
    }

    // Toast helper
    function showToast(message) {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            right: 24px;
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-left: 3px solid var(--primary);
            padding: 14px 24px;
            border-radius: var(--radius-sm);
            font-size: 14px;
            z-index: 9999;
            animation: slideInRight 0.3s ease;
            box-shadow: var(--shadow-lg);
        `;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }
});