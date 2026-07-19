/* ============================================
   APIARO — Pay (Wallet) JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Payment card selection
    const paymentCards = document.querySelectorAll('.payment-card');
    paymentCards.forEach(card => {
        card.addEventListener('click', () => {
            paymentCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            const brand = card.querySelector('.card-brand i');
            const brandName = brand?.classList.contains('fa-cc-visa') ? 'Visa' : 
                              brand?.classList.contains('fa-cc-mastercard') ? 'Mastercard' : 'Card';
            showToast(`${brandName} card selected`);
        });
    });

    // Add card button
    const addCardBtn = document.querySelector('.add-card-btn');
    if (addCardBtn) {
        addCardBtn.addEventListener('click', () => {
            showToast('Add card feature coming soon!');
        });
    }

    // Wallet actions
    const walletActions = document.querySelectorAll('.wallet-actions .btn');
    walletActions.forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.textContent.trim();
            if (text.includes('Add')) {
                showToast('Add funds feature coming soon!');
            } else if (text.includes('Send')) {
                showToast('Send money feature coming soon!');
            }
        });
    });

    // Transaction item click
    const transactionItems = document.querySelectorAll('.transaction-item');
    transactionItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            const title = item.querySelector('h4').textContent;
            const amount = item.querySelector('.transaction-amount').textContent;
            showToast(`${title}: ${amount}`);
        });
    });

    // Animate chart bars
    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach((bar, index) => {
        const height = bar.style.height;
        bar.style.height = '0%';
        setTimeout(() => {
            bar.style.transition = 'height 1s ease';
            bar.style.height = height;
        }, 300 + index * 100);
    });

    // Animate balance amount
    const balanceAmount = document.querySelector('.balance-amount');
    if (balanceAmount) {
        const targetValue = 12450;
        let current = 0;
        const increment = targetValue / 60;
        
        const updateBalance = () => {
            current += increment;
            if (current < targetValue) {
                balanceAmount.textContent = '$' + current.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                requestAnimationFrame(updateBalance);
            } else {
                balanceAmount.textContent = '$12,450.00';
            }
        };
        
        setTimeout(updateBalance, 500);
    }

    // Analytics cards hover
    const analyticsCards = document.querySelectorAll('.analytics-card');
    analyticsCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px) scale(1.02)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // QR code click
    const qrCode = document.querySelector('.qr-code');
    if (qrCode) {
        qrCode.style.cursor = 'pointer';
        qrCode.addEventListener('click', () => {
            showToast('QR code refreshed!');
            // Simulate QR refresh
            qrCode.style.opacity = '0.5';
            setTimeout(() => qrCode.style.opacity = '1', 300);
        });
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