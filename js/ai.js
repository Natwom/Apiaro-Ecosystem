/* ============================================
   APIARO — AI Chat JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatMessages = document.getElementById('chatMessages');
    const promptChips = document.querySelectorAll('.prompt-chip');

    // AI Response Templates
    const aiResponses = {
        default: "I understand your question. Let me help you with that. Could you provide more details so I can give you a more accurate response?",
        coding: "Here's a code example that might help:\n\n```javascript\nfunction example() {\n  console.log('Hello from Apiaro AI!');\n  return true;\n}\n```\n\nLet me know if you need any modifications!",
        creative: "That's a fascinating creative direction! Here are some ideas to explore:\n\n1. Try experimenting with contrasting elements\n2. Consider the emotional impact on your audience\n3. Think about unique perspectives or angles\n\nWould you like me to expand on any of these?",
        business: "From a business perspective, here are the key considerations:\n\n- Market positioning and differentiation\n- Revenue model and monetization strategy\n- Scalability and growth potential\n- Risk assessment and mitigation\n\nShall we dive deeper into any specific area?",
        learning: "Great learning goal! Here's a structured approach:\n\n**Phase 1:** Foundations and fundamentals\n**Phase 2:** Practical application and projects\n**Phase 3:** Advanced concepts and specialization\n\nI can recommend specific resources for each phase. Which phase are you most interested in?"
    };

    // Send Message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        // Add user message
        addMessage(message, 'user');
        chatInput.value = '';

        // Simulate AI typing
        setTimeout(() => {
            showTypingIndicator();
            
            // Generate response based on message content
            setTimeout(() => {
                removeTypingIndicator();
                const response = generateResponse(message);
                addMessage(response, 'ai');
            }, 1500);
        }, 500);
    }

    // Add Message to Chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = sender === 'ai' 
            ? '<div class="message-avatar"><i class="fas fa-robot"></i></div>'
            : '<div class="message-avatar"><img src="https://ui-avatars.com/api/?name=User&background=F57C00&color=fff" alt="User"></div>';
        
        const content = `<div class="message-content"><p>${formatMessage(text)}</p><span class="message-time">Just now</span></div>`;
        
        messageDiv.innerHTML = avatar + content;
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Format Message (simple markdown-like)
    function formatMessage(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>')
            .replace(/```([\s\S]*?)```/g, '<pre style="background: var(--bg-hover); padding: 12px; border-radius: 8px; overflow-x: auto; font-family: monospace; font-size: 13px; margin: 8px 0;">$1</pre>');
    }

    // Generate AI Response
    function generateResponse(message) {
        const lowerMsg = message.toLowerCase();
        
        if (lowerMsg.includes('code') || lowerMsg.includes('program') || lowerMsg.includes('function')) {
            return aiResponses.coding;
        } else if (lowerMsg.includes('creative') || lowerMsg.includes('design') || lowerMsg.includes('write')) {
            return aiResponses.creative;
        } else if (lowerMsg.includes('business') || lowerMsg.includes('money') || lowerMsg.includes('startup')) {
            return aiResponses.business;
        } else if (lowerMsg.includes('learn') || lowerMsg.includes('study') || lowerMsg.includes('course')) {
            return aiResponses.learning;
        }
        
        return aiResponses.default;
    }

    // Show Typing Indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai-message typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-avatar"><i class="fas fa-robot"></i></div>
            <div class="message-content" style="padding: 16px 20px;">
                <div class="wave" style="display: inline-flex; gap: 4px; align-items: center; height: 20px;">
                    <span style="width: 8px; height: 8px; background: var(--primary); border-radius: 50%; animation: bounce 1.4s ease-in-out infinite;"></span>
                    <span style="width: 8px; height: 8px; background: var(--primary); border-radius: 50%; animation: bounce 1.4s ease-in-out infinite 0.2s;"></span>
                    <span style="width: 8px; height: 8px; background: var(--primary); border-radius: 50%; animation: bounce 1.4s ease-in-out infinite 0.4s;"></span>
                </div>
            </div>
        `;
        typingDiv.id = 'typingIndicator';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Add bounce animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes bounce {
                0%, 80%, 100% { transform: scale(0); }
                40% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }

    // Remove Typing Indicator
    function removeTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }

    // Event Listeners
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Prompt Chips
    promptChips.forEach(chip => {
        chip.addEventListener('click', () => {
            if (chatInput) {
                chatInput.value = chip.textContent;
                chatInput.focus();
            }
        });
    });

    // Voice Button (UI only)
    const voiceBtn = document.querySelector('.voice-btn');
    if (voiceBtn) {
        voiceBtn.addEventListener('click', () => {
            voiceBtn.style.color = 'var(--primary)';
            setTimeout(() => {
                voiceBtn.style.color = '';
            }, 1000);
        });
    }

    // Attach Button (UI only)
    const attachBtn = document.querySelector('.attach-btn');
    if (attachBtn) {
        attachBtn.addEventListener('click', () => {
            alert('File upload feature coming soon!');
        });
    }

    // Chat History Items
    const chatHistoryItems = document.querySelectorAll('.chat-history-item');
    chatHistoryItems.forEach(item => {
        item.addEventListener('click', () => {
            chatHistoryItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // Clear messages and add welcome
            if (chatMessages) {
                chatMessages.innerHTML = `
                    <div class="message ai-message">
                        <div class="message-avatar"><i class="fas fa-robot"></i></div>
                        <div class="message-content">
                            <p>I've loaded this conversation. How can I help you continue?</p>
                            <span class="message-time">Just now</span>
                        </div>
                    </div>
                `;
            }
        });
    });

    // New Chat Button
    const newChatBtn = document.querySelector('.new-chat-btn');
    if (newChatBtn) {
        newChatBtn.addEventListener('click', () => {
            if (chatMessages) {
                chatMessages.innerHTML = `
                    <div class="message ai-message">
                        <div class="message-avatar"><i class="fas fa-robot"></i></div>
                        <div class="message-content">
                            <p>Hello! I'm Apiaro AI, your intelligent assistant. I can help you with writing, coding, analysis, brainstorming, and much more. What would you like to work on today?</p>
                            <span class="message-time">Just now
                                                    </span>
                        </div>
                    </div>
                `;
            }
            
            // Reset active chat history
            chatHistoryItems.forEach(i => i.classList.remove('active'));
        });
    }

    // AI Action Buttons (Voice, Image, Settings)
    const aiActions = document.querySelectorAll('.ai-actions button');
    aiActions.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const icons = ['microphone', 'image', 'cog'];
            const action = icons[index];
            
            if (action === 'microphone') {
                alert('Voice input feature coming soon! 🎤');
            } else if (action === 'image') {
                alert('Image upload feature coming soon! 🖼️');
            } else if (action === 'cog') {
                alert('Settings panel coming soon! ⚙️');
            }
        });
    });

    // Auto-resize chat input
    if (chatInput) {
        chatInput.addEventListener('input', () => {
            chatInput.style.height = 'auto';
            chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + 'px';
        });
    }

    // Scroll to bottom on load
    if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});