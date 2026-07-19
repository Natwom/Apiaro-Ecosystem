/* ============================================
   APIARO — Connect (Social) JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Like button functionality
    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const countSpan = this.querySelector('span');
            let count = parseInt(countSpan.textContent.replace(/[^0-9]/g, ''));
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = '#f5576c';
                count++;
                showToast('Liked!');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = '';
                count--;
            }
            
            // Format count
            if (count >= 1000) {
                countSpan.textContent = (count / 1000).toFixed(1) + 'K';
            } else {
                countSpan.textContent = count;
            }
        });
    });

    // Comment button - show comment input
    const commentButtons = document.querySelectorAll('.post-actions button:nth-child(2)');
    commentButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const postCard = this.closest('.post-card');
            let commentSection = postCard.querySelector('.comment-section');
            
            if (!commentSection) {
                commentSection = document.createElement('div');
                commentSection.className = 'comment-section';
                commentSection.style.cssText = 'padding: 0 20px 16px; border-top: 1px solid var(--border);';
                commentSection.innerHTML = `
                    <div style="display: flex; gap: 12px; margin-top: 12px;">
                        <img src="https://ui-avatars.com/api/?name=User&background=F57C00&color=fff" style="width: 32px; height: 32px; border-radius: 50%;" alt="User">
                        <div style="flex: 1; display: flex; gap: 8px;">
                            <input type="text" placeholder="Write a comment..." style="flex: 1; background: var(--bg-hover); border: 1px solid var(--border); border-radius: 20px; padding: 8px 16px; color: var(--text-primary); font-size: 14px;">
                            <button class="btn btn-primary btn-sm" style="padding: 8px 16px;">Post</button>
                        </div>
                    </div>
                `;
                postCard.appendChild(commentSection);
                
                // Focus the input
                const input = commentSection.querySelector('input');
                input.focus();
                
                // Handle comment post
                const postBtn = commentSection.querySelector('button');
                postBtn.addEventListener('click', () => {
                    if (input.value.trim()) {
                        showToast('Comment posted!');
                        input.value = '';
                        // Update comment count
                        const countSpan = btn.querySelector('span');
                        let count = parseInt(countSpan.textContent.replace(/[^0-9]/g, '')) + 1;
                        countSpan.textContent = count;
                    }
                });
                
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') postBtn.click();
                });
            } else {
                commentSection.remove();
            }
        });
    });

    // Share button functionality
    const shareButtons = document.querySelectorAll('.post-actions button:nth-child(3)');
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const postCard = this.closest('.post-card');
            const author = postCard.querySelector('h4').textContent;
            
            if (navigator.share) {
                navigator.share({
                    title: `Post by ${author} on Apiaro Connect`,
                    text: postCard.querySelector('.post-content p').textContent,
                    url: window.location.href
                });
            } else {
                // Show share options
                showToast('Link copied to clipboard!');
            }
            
            // Update share count
            const countSpan = this.querySelector('span');
            let count = parseInt(countSpan.textContent.replace(/[^0-9]/g, '')) + 1;
            countSpan.textContent = count;
        });
    });

    // Create post functionality
    const createPostInput = document.querySelector('.create-post-input input');
    const postButton = document.querySelector('.create-post-actions .btn');
    
    if (createPostInput && postButton) {
        postButton.addEventListener('click', () => {
            const text = createPostInput.value.trim();
            if (!text) {
                createPostInput.style.borderColor = 'var(--danger)';
                setTimeout(() => createPostInput.style.borderColor = '', 1000);
                return;
            }
            
            // Create new post
            const postsFeed = document.querySelector('.posts-feed');
            const newPost = document.createElement('div');
            newPost.className = 'post-card';
            newPost.style.cssText = 'animation: fadeInUp 0.5s ease;';
            newPost.innerHTML = `
                <div class="post-header">
                    <img src="https://ui-avatars.com/api/?name=User&background=F57C00&color=fff" alt="User">
                    <div><h4>Your Name</h4><span>Just now</span></div>
                    <button class="post-more"><i class="fas fa-ellipsis-h"></i></button>
                </div>
                <div class="post-content">
                    <p>${escapeHtml(text)}</p>
                </div>
                <div class="post-actions">
                    <button class="like-btn"><i class="far fa-heart"></i> <span>0</span></button>
                    <button><i class="far fa-comment"></i> <span>0</span></button>
                    <button><i class="fas fa-share"></i> <span>0</span></button>
                </div>
            `;
            
            postsFeed.insertBefore(newPost, postsFeed.firstChild);
            createPostInput.value = '';
            showToast('Post published!');
            
            // Re-attach like handler to new post
            const newLikeBtn = newPost.querySelector('.like-btn');
            newLikeBtn.addEventListener('click', function() {
                const icon = this.querySelector('i');
                const countSpan = this.querySelector('span');
                if (icon.classList.contains('far')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    icon.style.color = '#f5576c';
                    countSpan.textContent = '1';
                    showToast('Liked!');
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    icon.style.color = '';
                    countSpan.textContent = '0';
                }
            });
        });
        
        createPostInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                postButton.click();
            }
        });
    }

    // Story click
    const stories = document.querySelectorAll('.story:not(.add-story)');
    stories.forEach(story => {
        story.addEventListener('click', () => {
            const name = story.querySelector('span:last-child')?.textContent || 'Story';
            showToast(`Viewing ${name}'s story`);
        });
    });

    // Add story
    const addStory = document.querySelector('.add-story');
    if (addStory) {
        addStory.addEventListener('click', () => {
            showToast('Story upload coming soon!');
        });
    }

    // Friend suggestion - add friend
    const friendButtons = document.querySelectorAll('.friend-suggestion button');
    friendButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const name = this.closest('.friend-suggestion').querySelector('h5').textContent;
            this.innerHTML = '<i class="fas fa-check"></i>';
            this.style.background = 'var(--success)';
            this.style.color = 'white';
            this.style.borderColor = 'var(--success)';
            showToast(`Friend request sent to ${name}!`);
        });
    });

    // Sidebar nav active state
    const sidebarNavLinks = document.querySelectorAll('.sidebar-nav a');
    sidebarNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            sidebarNavLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            const text = link.textContent.trim();
            showToast(`Navigated to ${text}`);
        });
    });

    // Post more options
    const postMoreButtons = document.querySelectorAll('.post-more');
    postMoreButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            showToast('More options: Save, Report, Hide');
        });
    });

    // Helper: Show toast notification
    function showToast(message) {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--bg-card);
            border: 1px solid var(--border);
            padding: 12px 24px;
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
        }, 2000);
    }

    // Helper: Escape HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});