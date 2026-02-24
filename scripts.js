        // Newsletter Modal Functionality
        (function() {
            const modal = document.getElementById('newsletterModal');
            const trigger = document.getElementById('newsletterTrigger');
            const close = document.getElementById('newsletterClose');
            const form = document.getElementById('newsletterForm');
            const successMessage = document.getElementById('newsletterSuccess');
            
            // Show modal after 15 seconds (first visit)
            let modalShown = sessionStorage.getItem('newsletterModalShown');
            if (!modalShown) {
                setTimeout(() => {
                    openModal();
                    sessionStorage.setItem('newsletterModalShown', 'true');
                }, 15000);
            }
            
            // Open modal
            function openModal() {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
            
            // Close modal
            function closeModal() {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            // Event listeners
            trigger.addEventListener('click', openModal);
            
            close.addEventListener('click', closeModal);
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });
            
            // Handle form submission
            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                const submitBtn = form.querySelector('.newsletter-submit');
                if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Subscribing…'; }

                const formData = {
                    name: document.getElementById('newsletter-name').value,
                    email: document.getElementById('newsletter-email').value,
                    role: document.getElementById('newsletter-role').value
                };

                try {
                    const res = await fetch('/api/newsletter', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData)
                    });
                    if (!res.ok) {
                        const errData = await res.json().catch(() => ({}));
                        throw new Error(errData.error || 'Signup failed. Please try again.');
                    }
                } catch (err) {
                    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Join the Movement'; }
                    alert(err.message || 'Something went wrong. Please try again.');
                    return;
                }

                // Show success message
                form.style.display = 'none';
                successMessage.classList.add('active');

                // Hide trigger button
                trigger.classList.add('hidden');

                const SUCCESS_DISPLAY_TIME = 3000;
                const FORM_RESET_DELAY = 500;

                setTimeout(() => {
                    closeModal();
                    setTimeout(() => {
                        form.style.display = 'flex';
                        successMessage.classList.remove('active');
                        form.reset();
                        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Join the Movement'; }
                    }, FORM_RESET_DELAY);
                }, SUCCESS_DISPLAY_TIME);
            });
            
            // Close on ESC key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.classList.contains('active')) {
                    closeModal();
                }
            });
        })();


        // Consultation Modal Functionality
        (function() {
            const modal = document.getElementById('consultationModal');
            const close = document.getElementById('consultationClose');
            const form = document.getElementById('consultationForm');
            const successMessage = document.getElementById('consultationSuccess');
            
            // Make openConsultationModal available globally
            window.openConsultationModal = function() {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            };
            
            // Close modal
            function closeModal() {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            // Event listeners
            close.addEventListener('click', closeModal);
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });
            
            // Handle form submission
            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                const submitBtn = form.querySelector('.consultation-submit');
                if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Submitting…'; }

                const formData = {
                    name: document.getElementById('consultation-name').value,
                    email: document.getElementById('consultation-email').value,
                    phone: document.getElementById('consultation-phone').value,
                    organization: document.getElementById('consultation-organization').value,
                    interest: document.getElementById('consultation-interest').value,
                    message: document.getElementById('consultation-message').value
                };

                try {
                    const res = await fetch('/api/consultation', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData)
                    });
                    if (!res.ok) {
                        const errData = await res.json().catch(() => ({}));
                        throw new Error(errData.error || 'Submission failed. Please try again.');
                    }
                } catch (err) {
                    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Request Consultation'; }
                    alert(err.message || 'Something went wrong. Please try again.');
                    return;
                }

                // Show success message
                form.style.display = 'none';
                successMessage.classList.add('active');
                
                // Constants for timing
                const SUCCESS_DISPLAY_TIME = 3000; // Show success message for 3 seconds
                const FORM_RESET_DELAY = 500; // Wait for modal close animation before resetting
                
                // Close modal after showing success message
                setTimeout(() => {
                    closeModal();
                    // Reset form after modal close animation completes
                    setTimeout(() => {
                        form.style.display = 'flex';
                        successMessage.classList.remove('active');
                        form.reset();
                        const submitBtn = form.querySelector('.consultation-submit');
                        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Request Consultation'; }
                    }, FORM_RESET_DELAY);
                }, SUCCESS_DISPLAY_TIME);
            });

            // Close on ESC key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.classList.contains('active')) {
                    closeModal();
                }
            });
        })();


// Rooty Chatbot Widget
        (function () {
            const toggle   = document.getElementById('rooty-toggle');
            const win      = document.getElementById('rooty-window');
            const messages = document.getElementById('rooty-messages');
            const input    = document.getElementById('rooty-input');
            const sendBtn  = document.getElementById('rooty-send');
            const muteBtn  = document.getElementById('rooty-mute');
            const typing   = document.getElementById('rooty-typing');

            // Conversation history sent to the API (keeps last 10 turns)
            const history = [];
            const MAX_HISTORY = 10;

            // ── Speech ────────────────────────────────────────────────────────
            let muted = false;
            let preferredVoice = null;

            function loadVoice() {
                const voices = window.speechSynthesis.getVoices();
                // Priority: Microsoft/Google neural voices first (most natural),
                // then macOS high-quality voices, then any en-US fallback
                preferredVoice =
                    voices.find(v => v.name === 'Microsoft Aria Online (Natural) - English (United States)') ||
                    voices.find(v => v.name === 'Microsoft Jenny Online (Natural) - English (United States)') ||
                    voices.find(v => v.name === 'Microsoft Aria - English (United States)')  ||
                    voices.find(v => v.name === 'Google US English')                         ||
                    voices.find(v => v.name.includes('Samantha'))                            ||
                    voices.find(v => v.name.includes('Karen'))                               ||
                    voices.find(v => v.name.includes('Moira'))                               ||
                    voices.find(v => /en[-_]US/i.test(v.lang) && /natural|neural|online/i.test(v.name)) ||
                    voices.find(v => /en[-_]US/i.test(v.lang))                              ||
                    voices.find(v => /en/i.test(v.lang))                                     ||
                    null;
            }

            if (window.speechSynthesis) {
                loadVoice();
                window.speechSynthesis.onvoiceschanged = loadVoice;
            }

            function cleanForSpeech(text) {
                return text
                    .replace(/\*\*(.*?)\*\*/g, '$1')   // strip **bold**
                    .replace(/\*(.*?)\*/g, '$1')        // strip *italic*
                    .replace(/`[^`]*`/g, '')            // strip `code`
                    .replace(/#+\s/g, '')               // strip ## headings
                    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links → label only
                    .replace(/\s{2,}/g, ' ')
                    .trim();
            }

            function speak(text) {
                if (muted || !window.speechSynthesis) return;
                window.speechSynthesis.cancel();
                const utt = new SpeechSynthesisUtterance(cleanForSpeech(text));
                utt.rate  = 0.88;
                utt.pitch = 1.0;
                utt.volume = 1.0;
                if (preferredVoice) utt.voice = preferredVoice;
                window.speechSynthesis.speak(utt);
            }

            muteBtn.addEventListener('click', () => {
                muted = !muted;
                muteBtn.textContent = muted ? '🔇' : '🔊';
                muteBtn.classList.toggle('muted', muted);
                muteBtn.title = muted ? 'Unmute voice' : 'Mute voice';
                if (muted) window.speechSynthesis && window.speechSynthesis.cancel();
            });
            // ─────────────────────────────────────────────────────────────────

            // Open / close the chat window
            const labelEl = document.getElementById('rooty-label');
            toggle.addEventListener('click', () => {
                const isOpen = win.classList.toggle('open');
                toggle.classList.toggle('open', isOpen);
                toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
                if (isOpen && labelEl) labelEl.classList.add('hidden');
                if (isOpen) {
                    input.focus();
                    scrollToBottom();
                    // Speak the greeting on first open
                    if (history.length === 0) {
                        speak("Hi! I'm Rooty — your Root Work Framework guide. Ask me anything!");
                    }
                } else {
                    window.speechSynthesis && window.speechSynthesis.cancel();
                }
            });

            // Send on Enter (not Shift+Enter)
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                }
            });

            sendBtn.addEventListener('click', sendMessage);

            function scrollToBottom() {
                messages.scrollTop = messages.scrollHeight;
            }

            function appendBubble(text, role) {
                const div = document.createElement('div');
                div.className = 'rooty-bubble ' + role;
                div.textContent = text;
                messages.appendChild(div);
                scrollToBottom();
                return div;
            }

            function setLoading(loading) {
                sendBtn.disabled = loading;
                input.disabled   = loading;
                typing.classList.toggle('visible', loading);
                if (loading) messages.appendChild(typing);
                scrollToBottom();
            }

            async function sendMessage() {
                const text = input.value.trim();
                if (!text) return;

                input.value = '';
                appendBubble(text, 'user');
                setLoading(true);

                try {
                    const res = await fetch('/api/chat', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ message: text, history })
                    });

                    const data = await res.json();
                    const rawReply = data.reply || data.error || 'Sorry, something went wrong. Please try again.';

                    // Check for scheduling trigger token
                    const schedulerToken = '[OPEN_SCHEDULER]';
                    const hasScheduler = rawReply.includes(schedulerToken);
                    const cleanReply = rawReply.replace(schedulerToken, '').trim();

                    // Update history (trim to last MAX_HISTORY pairs)
                    history.push({ role: 'user', content: text });
                    history.push({ role: 'assistant', content: cleanReply });
                    if (history.length > MAX_HISTORY * 2) {
                        history.splice(0, history.length - MAX_HISTORY * 2);
                    }

                    setLoading(false);
                    appendBubble(cleanReply, 'bot');
                    speak(cleanReply);

                    if (hasScheduler && typeof window.openConsultationModal === 'function') {
                        window.openConsultationModal();
                    }
                } catch (err) {
                    setLoading(false);
                    const errMsg = 'I\'m having trouble connecting right now. Please try again or email hearn.sa@gmail.com.';
                    appendBubble(errMsg, 'bot');
                    speak(errMsg);
                }
            }

            // ── Voice Input (Speech-to-Text) ─────────────────────────────────
            const micBtn = document.getElementById('rooty-mic');
            const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

            if (!SpeechRecognitionAPI) {
                micBtn.style.display = 'none';
            } else {
                const recognition = new SpeechRecognitionAPI();
                recognition.lang = 'en-US';
                recognition.interimResults = true;
                recognition.maxAlternatives = 1;
                let listening = false;

                micBtn.addEventListener('click', () => {
                    if (listening) {
                        recognition.stop();
                    } else {
                        recognition.start();
                    }
                });

                recognition.addEventListener('start', () => {
                    listening = true;
                    micBtn.classList.add('listening');
                    micBtn.title = 'Listening… click to stop';
                    input.placeholder = 'Listening…';
                });

                recognition.addEventListener('result', (e) => {
                    const transcript = Array.from(e.results)
                        .map(r => r[0].transcript)
                        .join('');
                    input.value = transcript;
                    if (e.results[e.results.length - 1].isFinal) {
                        recognition.stop();
                        setTimeout(sendMessage, 300);
                    }
                });

                recognition.addEventListener('end', () => {
                    listening = false;
                    micBtn.classList.remove('listening');
                    micBtn.title = 'Speak your message';
                    input.placeholder = 'Ask me anything…';
                });

                recognition.addEventListener('error', (e) => {
                    listening = false;
                    micBtn.classList.remove('listening');
                    input.placeholder = 'Ask me anything…';
                    if (e.error !== 'aborted') {
                        console.warn('Speech recognition error:', e.error);
                    }
                });
            }
            // ─────────────────────────────────────────────────────────────────
        })();


// Logo coin back-sync
        (function() {
            var front = document.querySelector('.logo-emblem:not(.logo-emblem-back)');
            var back  = document.querySelector('.logo-emblem-back');
            if (front && back) back.src = front.src;
        })();


// Cookie Consent + Analytics Loader
      (function() {
        var consent = localStorage.getItem('rwfw_cookie_consent');
        var banner = document.getElementById('cookie-banner');
        var acceptBtn = document.getElementById('cookie-accept');
        var declineBtn = document.getElementById('cookie-decline');

        function loadAnalytics() {
          var s = document.createElement('script');
          s.defer = true;
          s.src = '/_vercel/insights/script.js';
          document.head.appendChild(s);
        }

        function setConsent(value) {
          localStorage.setItem('rwfw_cookie_consent', value);
          if (banner) banner.style.display = 'none';
          if (value === 'accepted') loadAnalytics();
        }

        if (acceptBtn) acceptBtn.addEventListener('click', function() { setConsent('accepted'); });
        if (declineBtn) declineBtn.addEventListener('click', function() { setConsent('declined'); });

        if (consent === 'accepted') {
          loadAnalytics();
        } else if (!consent) {
          if (banner) banner.style.display = 'block';
        }
      })();

// PWA: Service Worker Registration
// Progressive enhancement — site works without SW support.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
      .catch(function (err) {
        console.warn('[RWF] Service worker registration failed:', err);
      });
  });
}
