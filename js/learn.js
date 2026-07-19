/* ============================================
   APIARO — Learn (Courses) JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Category filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.textContent.trim();
            
            courseCards.forEach(card => {
                const title = card.querySelector('h4').textContent.toLowerCase();
                const desc = card.querySelector('.course-content > p').textContent.toLowerCase();
                
                let show = false;
                if (category === 'All') {
                    show = true;
                } else if (category === 'Development' && (title.includes('web') || title.includes('mobile') || title.includes('python') || desc.includes('development'))) {
                    show = true;
                } else if (category === 'Design' && (title.includes('design') || title.includes('ui') || title.includes('ux'))) {
                    show = true;
                } else if (category === 'Business' && (title.includes('marketing') || title.includes('business') || desc.includes('strategy'))) {
                    show = true;
                } else if (category === 'Marketing' && (title.includes('marketing') || title.includes('digital'))) {
                    show = true;
                }
                
                if (show) {
                    card.style.display = '';
                    card.style.animation = 'fadeInUp 0.4s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Course card click - enroll
    courseCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking instructor or price
            if (e.target.closest('.instructor, .course-price')) return;
            
            const title = card.querySelector('h4').textContent;
            const price = card.querySelector('.course-price').textContent;
            
            // Show enrollment modal (simplified as toast)
            showToast(`Enrolled in "${title}" for ${price}!`);
            
            // Add to progress if not already there
            addToProgress(title);
        });
    });

    // Add to progress helper
    function addToProgress(courseTitle) {
        const progressCards = document.querySelector('.progress-cards');
        if (!progressCards) return;
        
        // Check if already exists
        const existing = Array.from(progressCards.querySelectorAll('h4')).find(h => h.textContent === courseTitle);
        if (existing) return;
        
        // Create new progress card
        const newCard = document.createElement('div');
        newCard.className = 'progress-card';
        newCard.style.cssText = 'animation: fadeInUp 0.5s ease;';
        newCard.innerHTML = `
            <div class="progress-icon"><i class="fas fa-book"></i></div>
            <div class="progress-info">
                <h4>${courseTitle}</h4>
                <div class="progress-bar"><div class="progress-fill" style="width: 0%"></div></div>
                <span>0% Complete</span>
            </div>
        `;
        progressCards.appendChild(newCard);
    }

    // Animate progress bars on load
    const progressFills = document.querySelectorAll('.progress-card .progress-fill');
    progressFills.forEach((fill, index) => {
        const width = fill.style.width;
        fill.style.width = '0%';
        setTimeout(() => {
            fill.style.transition = 'width 1s ease';
            fill.style.width = width;
        }, 500 + index * 200);
    });

    // Instructor card click
    const instructorCards = document.querySelectorAll('.instructor-card');
    instructorCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const name = card.querySelector('h4').textContent;
            showToast(`Viewing ${name}'s profile`);
        });
    });

    // Search functionality
    const globalSearch = document.getElementById('globalSearch');
    if (globalSearch) {
        globalSearch.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            courseCards.forEach(card => {
                const title = card.querySelector('h4').textContent.toLowerCase();
                const desc = card.querySelector('.course-content > p').textContent.toLowerCase();
                const instructor = card.querySelector('.instructor span').textContent.toLowerCase();
                
                if (title.includes(query) || desc.includes(query) || instructor.includes(query)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Toast helper
    function showToast(message) {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-left: 3px solid var(--primary);
            padding: 14px 28px;
            border-radius: 50px;
            font-size: 14px;
            z-index: 9999;
            animation: fadeInUp 0.3s ease;
            box-shadow: var(--shadow-lg);
        `;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.animation = 'fadeInUp 0.3s ease reverse';
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }

    // Animate course cards on load
    courseCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});