/* ============================================
   APIARO — AI Chat JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatMessages = document.getElementById('chatMessages');
    const promptChips = document.querySelectorAll('.prompt-chip');

    // AI Response Templates — expanded with multiple variations per topic
    const aiResponses = {
        default: [
            "I understand your question. Let me help you with that. Could you provide more details so I can give you a more accurate response?",
            "Great question! I'd be happy to help. Let me think through this for you...",
            "That's an interesting topic. Here's what I know about it:",
            "I'm on it! Let me gather the best information for you.",
            "Absolutely, I can help with that. Here's my take:"
        ],
        coding: [
            "Here's a code example that might help:\n\n```javascript\nfunction example() {\n  console.log('Hello from Apiaro AI!');\n  return true;\n}\n```\n\nLet me know if you need any modifications!",
            "I can help you debug that! Here's a cleaner approach:\n\n```python\ndef optimize(data):\n    return [x for x in data if x > 0]\n```\n\nThis uses list comprehension for better performance.",
            "For your use case, I'd recommend this pattern:\n\n```javascript\nconst fetchData = async () => {\n  try {\n    const res = await fetch('/api/data');\n    return await res.json();\n  } catch (err) {\n    console.error('Failed:', err);\n  }\n};\n```\n\nAsync/await makes error handling much cleaner.",
            "Looking at your code, here's a refactored version with better type safety:\n\n```typescript\ninterface User {\n  id: string;\n  name: string;\n}\n\nconst getUser = (id: string): Promise<User> => {\n  return api.get(`/users/${id}`);\n};\n```",
            "Here's a performance optimization tip:\n\n```javascript\n// Instead of this:\nconst result = array.filter(x => x > 5).map(x => x * 2);\n\n// Use a single reduce:\nconst result = array.reduce((acc, x) => {\n  if (x > 5) acc.push(x * 2);\n  return acc;\n}, []);\n```\n\nThis reduces iterations from 2n to n."
        ],
        creative: [
            "That's a fascinating creative direction! Here are some ideas to explore:\n\n1. Try experimenting with contrasting elements\n2. Consider the emotional impact on your audience\n3. Think about unique perspectives or angles\n\nWould you like me to expand on any of these?",
            "I love where you're going with this! Let's push it further:\n\n• **Visual Metaphor**: Use unexpected imagery to convey your message\n• **Color Psychology**: Warm tones evoke comfort, cool tones suggest innovation\n• **Narrative Arc**: Every piece should have a beginning, tension, and resolution\n\nWhat medium are you working in?",
            "Creative breakthrough incoming! Consider these approaches:\n\n**Rule of Thirds**: Break the grid intentionally\n**Negative Space**: Sometimes less is infinitely more\n**Texture Layering**: Combine digital and organic elements\n\nWant me to generate some specific concepts?",
            "Your creative instinct is spot on. Here's how I'd develop it:\n\n1. **Research Phase**: Gather 20 reference images that evoke the feeling\n2. **Sketch Phase**: Create 5 quick thumbnails, no perfectionism\n3. **Refine Phase**: Pick the strongest concept and iterate 3 versions\n4. **Final Phase**: Add the details that make it uniquely yours\n\nWhich phase are you in right now?",
            "Let's unlock some fresh creative energy:\n\n> \"Creativity is intelligence having fun.\" — Albert Einstein\n\nTry this exercise: Write down 10 words related to your project. Now combine the 3rd and 7th words into a new concept. Sometimes constraints breed the best creativity!"
        ],
        business: [
            "From a business perspective, here are the key considerations:\n\n- Market positioning and differentiation\n- Revenue model and monetization strategy\n- Scalability and growth potential\n- Risk assessment and mitigation\n\nShall we dive deeper into any specific area?",
            "Great business question! Here's my strategic analysis:\n\n**Market Opportunity**: The TAM for this space is growing 23% YoY\n**Competitive Moat**: Focus on user experience as your differentiator\n**Unit Economics**: Aim for LTV:CAC ratio of 3:1 minimum\n**Go-to-Market**: Start niche, then expand horizontally\n\nWant me to build a financial model?",
            "Let's talk business strategy:\n\n1. **Customer Segmentation**: Who pays the most with the least friction?\n2. **Pricing Psychology**: $9.99 feels cheaper than $10, but $10 feels more premium\n3. **Retention Loop**: How do you get users to come back daily?\n4. **Partnership Channels**: Who already has your audience?\n\nWhich of these is your biggest challenge right now?",
            "Here's a business framework that might help:\n\n```\nProblem → Solution → Market → Model → Channel\n```\n\nValidate each step before investing heavily. Most startups fail because they skip the 'Problem' validation and jump straight to 'Solution'.\n\nWhat's your current validation stage?",
            "Business insight: The companies that win aren't always first — they're the ones that execute best. Focus on:\n\n• **Speed of iteration**: Ship, learn, improve weekly\n• **Customer obsession**: Talk to 5 users every single day\n• **Metrics that matter**: One north star metric, not 20 vanity metrics\n• **Team alignment**: Everyone should know the #1 priority\n\nWhat's your current north star metric?"
        ],
        learning: [
            "Great learning goal! Here's a structured approach:\n\n**Phase 1:** Foundations and fundamentals\n**Phase 2:** Practical application and projects\n**Phase 3:** Advanced concepts and specialization\n\nI can recommend specific resources for each phase. Which phase are you most interested in?",
            "Learning is a journey, not a destination! Here's my recommended path:\n\n📚 **Week 1-2**: Core concepts and theory\n🛠️ **Week 3-4**: Hands-on projects (build 2 small things)\n🎯 **Week 5-6**: Deep dive into one advanced topic\n🏗️ **Week 7-8**: Build a portfolio piece\n\nWant me to suggest specific tutorials for your skill level?",
            "The best way to learn is by teaching. Here's my method:\n\n1. **Consume**: Read/watch about the topic (30%)\n2. **Practice**: Do exercises and mini-projects (50%)\n3. **Teach**: Explain it to someone else or write a blog post (20%)\n\nThat 20% teaching time is where real mastery happens. Want to try explaining your current topic back to me?",
            "Spaced repetition is key! Here's an optimal learning schedule:\n\n• **Day 1**: Learn the concept\n• **Day 2**: Review and practice\n• **Day 4**: Apply in a new context\n• **Day 7**: Teach someone else\n• **Day 14**: Build something with it\n• **Day 30**: Master project\n\nThis beats cramming every time. What are you learning this week?",
            "Let me curate some resources for you:\n\n**Free**: YouTube tutorials, documentation, GitHub repos\n**Affordable**: Udemy courses (wait for sales), Skillshare\n**Premium**: Bootcamps, mentorship, certification programs\n**Community**: Discord servers, Reddit, local meetups\n\nWhat's your budget and timeline? I can recommend the perfect mix."
        ],
        greeting: [
            "Hello! I'm Apiaro AI, your intelligent assistant. I can help you with writing, coding, analysis, brainstorming, and much more. What would you like to work on today?",
            "Hey there! Ready to build something amazing? I'm here to help with code, creative ideas, business strategy, or just a good conversation. What's on your mind?",
            "Welcome back! I'm Apiaro AI — your partner in productivity. Whether you need to debug code, draft content, or plan your next big move, I've got you covered. What are we working on?",
            "Greetings! I'm fully charged and ready to assist. From technical deep-dives to creative sparks, let's make something great together. What can I do for you?",
            "Hi! I'm Apiaro AI. Think of me as your Swiss Army knife for digital work — coding, writing, analyzing, creating. What tool should I pull out first?"
        ],
        thanks: [
            "You're very welcome! I'm glad I could help. Feel free to ask if anything else comes up!",
            "My pleasure! That's what I'm here for. Let me know if you need anything else.",
            "Happy to help! Don't hesitate to reach out if you need more assistance.",
            "Anytime! I really enjoyed working through that with you. What's next?",
            "You got it! I'm always here when you need a brain to pick. 🧠✨"
        ],
        joke: [
            "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
            "I told my computer I needed a break, and now it won't stop sending me Kit-Kats.",
            "Why did the developer go broke? Because he used up all his cache!",
            "What's a computer's favorite snack? Microchips!",
            "Why do Java developers wear glasses? Because they don't C#!"
        ],
        time: [
            "The current time is dynamic — but I'm always here, 24/7, ready to help!",
            "Time flies when you're coding! Speaking of which, have you taken a break recently? Your brain works better with rest.",
            "It's always a good time to learn something new or build something cool. What are you working on?"
        ],
        weather: [
            "I can't check the live weather (no windows in the cloud! ☁️), but I can help you build a weather app if you'd like!",
            "Whether it's sunny or rainy outside, it's always a perfect day to code. What's your indoor project today?",
            "I live in the cloud, so it's always partly cloudy with a chance of algorithms here! 🌤️"
        ],
        help: [
            "I can help you with a wide range of topics:\n\n💻 **Coding**: JavaScript, Python, CSS, debugging, architecture\n✍️ **Writing**: Essays, emails, creative content, editing\n📊 **Business**: Strategy, marketing, financial planning\n🎨 **Creative**: Design ideas, brainstorming, art direction\n📚 **Learning**: Study plans, explanations, resource curation\n\nJust tell me what you need!",
            "Here's what I'm good at:\n\n• Writing and editing content\n• Coding and debugging\n• Business strategy and analysis\n• Creative brainstorming\n• Learning path recommendations\n• General knowledge questions\n\nWhat would you like to explore?",
            "I'm your all-in-one assistant! Try asking me about:\n\n- Code review or writing\n- Content creation and editing\n- Business model analysis\n- Learning roadmaps\n- Creative project ideas\n- Or just chat about tech!\n\nWhat's your interest?"
        ]
    };

    // Context tracking for more natural conversation
    let messageHistory = [];
    let responseIndex = {};

    // Send Message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        // Add user message
        addMessage(message, 'user');
        chatInput.value = '';
        chatInput.style.height = 'auto';

        // Track history
        messageHistory.push({ role: 'user', text: message });

        // Simulate AI typing
        setTimeout(() => {
            showTypingIndicator();
            
            // Generate response based on message content
            setTimeout(() => {
                removeTypingIndicator();
                const response = generateResponse(message);
                addMessage(response, 'ai');
                messageHistory.push({ role: 'ai', text: response });
            }, 1500 + Math.random() * 1000); // Variable typing time
        }, 500);
    }

    // Add Message to Chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = sender === 'ai' 
            ? '<div class="message-avatar"><i class="fas fa-robot"></i></div>'
            : '<div class="message-avatar"><img src="https://ui-avatars.com/api/?name=User&background=F57C00&color=fff" alt="User"></div>';
        
        const content = `<div class="message-content"><p>${formatMessage(text)}</p><span class="message-time">${getTimeString()}</span></div>`;
        
        messageDiv.innerHTML = avatar + content;
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Format Message (markdown-like)
    function formatMessage(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>')
            .replace(/```([\s\S]*?)```/g, '<pre style="background: var(--bg-hover); padding: 12px; border-radius: 8px; overflow-x: auto; font-family: monospace; font-size: 13px; margin: 8px 0;">$1</pre>');
    }

    // Get current time string
    function getTimeString() {
        const now = new Date();
        return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }

    // Generate AI Response with variety
    function generateResponse(message) {
        const lowerMsg = message.toLowerCase();
        
        // Determine category
        let category = 'default';
        
        if (lowerMsg.match(/\b(hi|hello|hey|greetings|howdy|sup)\b/)) {
            category = 'greeting';
        } else if (lowerMsg.match(/\b(thanks|thank you|thx|appreciate|grateful)\b/)) {
            category = 'thanks';
        } else if (lowerMsg.match(/\b(joke|funny|humor|laugh|lol)\b/)) {
            category = 'joke';
        } else if (lowerMsg.match(/\b(time|clock|hour|what time)\b/)) {
            category = 'time';
        } else if (lowerMsg.match(/\b(weather|rain|sunny|temperature|forecast)\b/)) {
            category = 'weather';
        } else if (lowerMsg.match(/\b(help|what can you do|capabilities|features|assist)\b/)) {
            category = 'help';
        } else if (lowerMsg.match(/\b(code|program|function|bug|debug|error|syntax|algorithm|api|json|html|css|react|vue|angular|node|python|java|sql|database)\b/)) {
            category = 'coding';
        } else if (lowerMsg.match(/\b(creative|design|write|story|poem|art|music|draw|paint|imagine|brainstorm)\b/)) {
            category = 'creative';
        } else if (lowerMsg.match(/\b(business|money|startup|revenue|profit|market|strategy|invest|sales|marketing|customer)\b/)) {
            category = 'business';
        } else if (lowerMsg.match(/\b(learn|study|course|tutorial|education|school|university|degree|skill|knowledge)\b/)) {
            category = 'learning';
        }

        // Get responses for category
        const responses = aiResponses[category] || aiResponses.default;
        
        // Pick a response we haven't used recently (simple rotation)
        if (!responseIndex[category]) responseIndex[category] = 0;
        const response = responses[responseIndex[category] % responses.length];
        responseIndex[category]++;
        
        return response;
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
        
        // Add bounce animation if not already present
        if (!document.getElementById('bounceAnimation')) {
            const style = document.createElement('style');
            style.id = 'bounceAnimation';
            style.textContent = `
                @keyframes bounce {
                    0%, 80%, 100% { transform: scale(0); }
                    40% { transform: scale(1); }
                }
            `;
            document.head.appendChild(style);
        }
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
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
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
                // Auto-send after a brief delay for better UX
                setTimeout(() => sendMessage(), 300);
            }
        });
    });

    // Voice Button (UI only)
    const voiceBtn = document.querySelector('.voice-btn');
    if (voiceBtn) {
        voiceBtn.addEventListener('click', () => {
            voiceBtn.style.color = 'var(--primary)';
            showToast('Voice input activated! 🎤 (Coming soon)');
            setTimeout(() => {
                voiceBtn.style.color = '';
            }, 1000);
        });
    }

    // Attach Button (UI only)
    const attachBtn = document.querySelector('.attach-btn');
    if (attachBtn) {
        attachBtn.addEventListener('click', () => {
            showToast('File upload feature coming soon! 📎');
        });
    }

    // Chat History Items
    const chatHistoryItems = document.querySelectorAll('.chat-history-item');
    chatHistoryItems.forEach(item => {
        item.addEventListener('click', () => {
            chatHistoryItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // Clear messages and add contextual welcome
            const title = item.querySelector('.chat-title')?.textContent || 'Chat';
            if (chatMessages) {
                chatMessages.innerHTML = `
                    <div class="message ai-message">
                        <div class="message-avatar"><i class="fas fa-robot"></i></div>
                        <div class="message-content">
                            <p>I've loaded "<strong>${title}</strong>". Ready to continue where we left off! What would you like to discuss?</p>
                            <span class="message-time">${getTimeString()}</span>
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
                // Pick a random greeting
                const greetings = aiResponses.greeting;
                const greeting = greetings[Math.floor(Math.random() * greetings.length)];
                
                chatMessages.innerHTML = `
                    <div class="message ai-message">
                        <div class="message-avatar"><i class="fas fa-robot"></i></div>
                        <div class="message-content">
                            <p>${greeting}</p>
                            <span class="message-time">${getTimeString()}</span>
                        </div>
                    </div>
                `;
            }
            
            // Reset active chat history
            chatHistoryItems.forEach(i => i.classList.remove('active'));
            
            // Reset history tracking
            messageHistory = [];
            responseIndex = {};
        });
    }

    // AI Action Buttons (Voice, Image, Settings)
    const aiActions = document.querySelectorAll('.ai-actions button');
    aiActions.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const icons = ['microphone', 'image', 'cog'];
            const action = icons[index];
            
            if (action === 'microphone') {
                showToast('Voice input feature coming soon! 🎤');
            } else if (action === 'image') {
                showToast('Image upload feature coming soon! 🖼️');
            } else if (action === 'cog') {
                showToast('Settings panel coming soon! ⚙️');
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
});