/* ============================================
   APIARO — Shop JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Shopping Cart
    let cart = [];
    const cartIcon = document.getElementById('cartIcon');
    const cartModal = document.getElementById('cartModal');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCart = document.getElementById('closeCart');
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');

    // Open Cart
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            cartModal.classList.add('active');
        });
    }

    // Close Cart
    if (closeCart) {
        closeCart.addEventListener('click', () => {
            cartModal.classList.remove('active');
        });
    }

    if (cartOverlay) {
        cartOverlay.addEventListener('click', () => {
            cartModal.classList.remove('active');
        });
    }

    // Add to Cart
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            
            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name, price, quantity: 1 });
            }
            
            updateCart();
            showNotification(`${name} added to cart!`);
            
            // Button animation
            button.innerHTML = '<i class="fas fa-check"></i> Added';
            button.style.background = 'var(--success)';
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';
                button.style.background = '';
            }, 1500);
        });
    });

    // Update Cart UI
    function updateCart() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        if (cartCount) cartCount.textContent = totalItems;
        if (cartTotal) cartTotal.textContent = '$' + totalPrice.toFixed(2);
        
        if (cartItems) {
            if (cart.length === 0) {
                cartItems.innerHTML = `
                    <div class="empty-cart">
                        <i class="fas fa-shopping-basket"></i>
                        <p>Your cart is empty</p>
                        <span>Add items to get started</span>
                    </div>
                `;
            } else {
                cartItems.innerHTML = cart.map(item => `
                    <div class="cart-item" style="display: flex; align-items: center; gap: 12px; padding: 12px; border-bottom: 1px solid var(--border);">
                        <div style="flex: 1;">
                            <h5 style="font-size: 14px; font-weight: 600;">${item.name}</h5>
                            <p style="font-size: 12px; color: var(--text-muted);">Qty: ${item.quantity}</p>
                        </div>
                        <span style="font-weight: 700; color: var(--primary);">$${(item.price * item.quantity).toFixed(2)}</span>
                        <button class="remove-item" data-name="${item.name}" style="background: none; border: none; color: var(--danger); cursor: pointer;">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `).join('');
                
                // Add remove functionality
                document.querySelectorAll('.remove-item').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const name = btn.getAttribute('data-name');
                        cart = cart.filter(item => item.name !== name);
                        updateCart();
                    });
                });
            }
        }
    }

    // Wishlist Toggle
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    wishlistButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const icon = button.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = '#f5576c';
                showNotification('Added to wishlist!');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = '';
                showNotification('Removed from wishlist!');
            }
        });
    });

    // Category Filtering
    const categoryList = document.getElementById('categoryList');
    const productCards = document.querySelectorAll('.product-card-shop');
    const resultCount = document.getElementById('resultCount');

    if (categoryList) {
        const categoryItems = categoryList.querySelectorAll('li');
        categoryItems.forEach(item => {
            item.addEventListener('click', () => {
                // Update active state
                categoryItems.forEach(c => c.classList.remove('active'));
                item.classList.add('active');
                
                const category = item.getAttribute('data-category');
                let visibleCount = 0;
                
                productCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = '';
                        visibleCount++;
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                if (resultCount) {
                    resultCount.textContent = `Showing ${visibleCount} products`;
                }
            });
        });
    }

    // Price Range Filter
    const priceRange = document.getElementById('priceRange');
    if (priceRange) {
        priceRange.addEventListener('input', (e) => {
            const maxPrice = parseInt(e.target.value);
            
            productCards.forEach(card => {
                const price = parseFloat(card.getAttribute('data-price'));
                if (price <= maxPrice) {
                    card.style.opacity = '1';
                } else {
                    card.style.opacity = '0.3';
                }
            });
        });
    }

    // Sort Functionality
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            const sortType = e.target.value;
            const productsGrid = document.getElementById('productsGrid');
            const cards = Array.from(productCards);
            
            cards.sort((a, b) => {
                if (sortType === 'price-low') {
                    return parseFloat(a.getAttribute('data-price')) - parseFloat(b.getAttribute('data-price'));
                } else if (sortType === 'price-high') {
                    return parseFloat(b.getAttribute('data-price')) - parseFloat(a.getAttribute('data-price'));
                } else if (sortType === 'rating') {
                    return parseFloat(b.getAttribute('data-rating')) - parseFloat(a.getAttribute('data-rating'));
                }
                return 0;
            });
            
            cards.forEach(card => productsGrid.appendChild(card));
        });
    }

    // Shop Search
    const shopSearch = document.getElementById('shopSearch');
    if (shopSearch) {
        shopSearch.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            let visibleCount = 0;
            
            productCards.forEach(card => {
                const name = card.querySelector('h4').textContent.toLowerCase();
                const brand = card.querySelector('.product-brand').textContent.toLowerCase();
                
                if (name.includes(query) || brand.includes(query)) {
                    card.style.display = '';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            if (resultCount) {
                resultCount.textContent = `Showing ${visibleCount} products`;
            }
        });
    }

    // Notification Helper
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 24px;
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-left: 3px solid var(--primary);
            padding: 16px 24px;
            border-radius: var(--radius-sm);
            box-shadow: var(--shadow-lg);
            z-index: 9999;
            animation: slideInRight 0.3s ease;
            font-size: 14px;
            max-width: 300px;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
});