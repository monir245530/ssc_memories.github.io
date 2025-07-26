// About Creator Page JavaScript
(function() {
    'use strict';
    
    // Configuration
    const CONFIG = {
        CREATOR_CREDENTIALS: {
            phone: '+880 1712-345678',
            email: 'monir@example.com',
            password: 'monir123'
        },
        API_DELAY: 1000,
        SUCCESS_MESSAGE_DURATION: 3000
    };
    
    // Add creator user to main login system
    function initializeCreatorUser() {
        try {
            const users = JSON.parse(localStorage.getItem('usersData') || '[]');
            
            // Check if creator user already exists
            const creatorExists = users.find(u => u.email === CONFIG.CREATOR_CREDENTIALS.email);
            
            if (!creatorExists) {
                // Add creator user to the main user database
                const creatorUser = {
                    id: Date.now(),
                    name: "মো: মনির হোসেন",
                    email: CONFIG.CREATOR_CREDENTIALS.email,
                    phone: CONFIG.CREATOR_CREDENTIALS.phone,
                    password: btoa(CONFIG.CREATOR_CREDENTIALS.password + 'salt'), // Same hashing as main system
                    status: "active",
                    registrationDate: new Date().toISOString(),
                    lastLogin: new Date().toISOString(),
                    isCreator: true // Special flag for creator
                };
                
                users.push(creatorUser);
                localStorage.setItem('usersData', JSON.stringify(users));
                console.log('Creator user added to main system');
            }
        } catch (error) {
            console.error('Error initializing creator user:', error);
        }
    }
    
    // Utility Functions
    const Utils = {
        showNotification: function(message, type = 'success') {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.textContent = message;
            
            // Remove existing notifications
            const existingNotifications = document.querySelectorAll('.notification');
            existingNotifications.forEach(n => n.remove());
            
            document.body.appendChild(notification);
            
            // Auto remove
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, CONFIG.SUCCESS_MESSAGE_DURATION);
        },
        
        validateInput: function(input, type) {
            switch(type) {
                case 'phone':
                    const phoneRegex = /^(\+880|880|0)?1[3-9]\d{8}$/;
                    return phoneRegex.test(input);
                case 'email':
                    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                    return emailRegex.test(input);
                case 'password':
                    return input.length >= 6;
                default:
                    return input.trim().length > 0;
            }
        },
        
        copyToClipboard: function(text) {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(() => {
                    Utils.showNotification('কপি করা হয়েছে!', 'success');
                }).catch(() => {
                    this.fallbackCopyToClipboard(text);
                });
            } else {
                this.fallbackCopyToClipboard(text);
            }
        },
        
        fallbackCopyToClipboard: function(text) {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                document.execCommand('copy');
                Utils.showNotification('কপি করা হয়েছে!', 'success');
            } catch (err) {
                Utils.showNotification('কপি করতে সমস্যা হয়েছে', 'error');
            }
            
            document.body.removeChild(textArea);
        }
    };
    
    // Authentication Manager (Simplified for Direct Access)
    const AuthManager = {
        isAuthenticated: function() {
            return true; // Always authenticated for direct access
        },
        
        authenticate: function(phone, email, password) {
            return new Promise((resolve) => {
                // Always succeed for direct access
                localStorage.setItem('creatorAuthenticated', 'true');
                resolve(true);
            });
        },
        
        logout: function() {
            // No logout needed for direct access
            console.log('Direct access - no logout required');
        },
        
        showLoginRequired: function() {
            // No login required for direct access
            console.log('Direct access - no login required');
        },
        
        showMainContent: function() {
            // Always show main content
            const mainContent = document.getElementById('mainContent');
            if (mainContent) {
                mainContent.style.display = 'block';
            }
        }
    };
    
    // Navigation Manager
    const NavigationManager = {
        init: function() {
            this.bindSidebarLinks();
            this.bindTabButtons();
        },
        
        bindSidebarLinks: function() {
            const sidebarLinks = document.querySelectorAll('.sidebar-link');
            sidebarLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showSection(link.dataset.section);
                    this.updateActiveLink(link);
                });
            });
        },
        
        bindTabButtons: function() {
            const tabButtons = document.querySelectorAll('.tab-btn');
            tabButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    this.showTab(btn.dataset.tab);
                    this.updateActiveTab(btn);
                });
            });
        },
        
        showSection: function(sectionId) {
            // Hide all sections
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Show target section
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
                targetSection.classList.add('fade-in');
                
                // Remove animation class after animation completes
                setTimeout(() => {
                    targetSection.classList.remove('fade-in');
                }, 500);
            }
        },
        
        updateActiveLink: function(activeLink) {
            document.querySelectorAll('.sidebar-link').forEach(link => {
                link.classList.remove('active');
            });
            activeLink.classList.add('active');
        },
        
        showTab: function(tabName) {
            const editorContent = document.querySelector('.editor-content');
            const htmlTextarea = document.getElementById('htmlCode');
            const cssTextarea = document.getElementById('cssCode');
            const previewArea = document.getElementById('previewArea');
            
            // Hide all content
            htmlTextarea.style.display = 'none';
            cssTextarea.style.display = 'none';
            previewArea.style.display = 'none';
            previewArea.classList.remove('active');
            
            // Show selected tab
            switch(tabName) {
                case 'html':
                    htmlTextarea.style.display = 'block';
                    break;
                case 'css':
                    cssTextarea.style.display = 'block';
                    break;
                case 'preview':
                    previewArea.style.display = 'block';
                    previewArea.classList.add('active');
                    this.updatePreview();
                    break;
            }
        },
        
        updateActiveTab: function(activeTab) {
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            activeTab.classList.add('active');
        },
        
        updatePreview: function() {
            const htmlCode = document.getElementById('htmlCode').value;
            const cssCode = document.getElementById('cssCode').value;
            const previewArea = document.getElementById('previewArea');
            
            previewArea.innerHTML = `
                <style>${cssCode}</style>
                ${htmlCode}
            `;
        }
    };
    
    // Interactive Features Manager
    const InteractiveManager = {
        init: function() {
            this.bindCopyButtons();
            this.bindDownloadButtons();
            this.bindCodeEditor();
            this.bindAPITester();
        },
        
        bindCopyButtons: function() {
            document.querySelectorAll('.copy-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const textToCopy = btn.dataset.copy;
                    Utils.copyToClipboard(textToCopy);
                });
            });
        },
        
        bindDownloadButtons: function() {
            document.querySelectorAll('.download-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    this.simulateDownload(btn);
                });
            });
        },
        
        simulateDownload: function(btn) {
            const card = btn.closest('.resource-card');
            const title = card.querySelector('h3').textContent;
            
            // Show loading state
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
            btn.disabled = true;
            
            // Simulate download
            setTimeout(() => {
                Utils.showNotification(`${title} ডাউনলোড শুরু হয়েছে!`, 'success');
                
                // Reset button
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 2000);
        },
        
        bindCodeEditor: function() {
            const htmlTextarea = document.getElementById('htmlCode');
            const cssTextarea = document.getElementById('cssCode');
            
            if (htmlTextarea && cssTextarea) {
                htmlTextarea.addEventListener('input', () => {
                    if (document.querySelector('.tab-btn[data-tab="preview"]').classList.contains('active')) {
                        this.updatePreview();
                    }
                });
                
                cssTextarea.addEventListener('input', () => {
                    if (document.querySelector('.tab-btn[data-tab="preview"]').classList.contains('active')) {
                        this.updatePreview();
                    }
                });
            }
        },
        
        updatePreview: function() {
            const htmlCode = document.getElementById('htmlCode').value;
            const cssCode = document.getElementById('cssCode').value;
            const previewArea = document.getElementById('previewArea');
            
            if (previewArea) {
                previewArea.innerHTML = `
                    <style>${cssCode}</style>
                    ${htmlCode}
                `;
            }
        },
        
        bindAPITester: function() {
            // API tester functionality will be implemented here
        }
    };
    
    // Code Runner
    window.runCode = function() {
        InteractiveManager.updatePreview();
        Utils.showNotification('কোড রান করা হয়েছে!', 'success');
    };
    
    // API Tester
    window.testAPI = function() {
        const url = document.getElementById('apiUrl').value;
        const method = document.getElementById('apiMethod').value;
        const body = document.getElementById('apiBody').value;
        const responseArea = document.getElementById('apiResponse');
        
        if (!url) {
            Utils.showNotification('API URL প্রয়োজন', 'error');
            return;
        }
        
        // Show loading
        responseArea.textContent = 'Loading...';
        
        // Simulate API call
        setTimeout(() => {
            try {
                // Simulate different responses based on method
                let response;
                switch(method) {
                    case 'GET':
                        response = {
                            id: 1,
                            title: 'Sample Post',
                            body: 'This is a sample response from the API',
                            userId: 1
                        };
                        break;
                    case 'POST':
                        response = {
                            id: 101,
                            title: 'New Post',
                            body: body || 'New post created',
                            userId: 1
                        };
                        break;
                    default:
                        response = { message: `${method} request successful` };
                }
                
                responseArea.textContent = JSON.stringify(response, null, 2);
                Utils.showNotification('API request successful!', 'success');
            } catch (error) {
                responseArea.textContent = `Error: ${error.message}`;
                Utils.showNotification('API request failed', 'error');
            }
        }, 1000);
    };
    
    // Login Form Handler
    const LoginHandler = {
        init: function() {
            const loginForm = document.getElementById('miniLoginForm');
            if (loginForm) {
                loginForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.handleLogin();
                });
            }
        },
        
        handleLogin: function() {
            const phone = document.getElementById('miniPhone').value;
            const email = document.getElementById('miniEmail').value;
            const password = document.getElementById('miniPassword').value;
            
            // Clear previous errors
            this.clearErrors();
            
            // Validate inputs
            let hasError = false;
            
            if (!Utils.validateInput(phone, 'phone')) {
                this.showError('miniPhone', 'সঠিক ফোন নম্বর দিন');
                hasError = true;
            }
            
            if (!Utils.validateInput(email, 'email')) {
                this.showError('miniEmail', 'সঠিক ইমেইল দিন');
                hasError = true;
            }
            
            if (!Utils.validateInput(password, 'password')) {
                this.showError('miniPassword', 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে');
                hasError = true;
            }
            
            if (hasError) {
                return;
            }
            
            // Show loading
            const submitBtn = document.querySelector('.btn-login-mini');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'লগইন হচ্ছে...';
            submitBtn.disabled = true;
            
            // Attempt authentication using main login system
            this.attemptLoginWithMainSystem(phone, email, password)
                .then(() => {
                    Utils.showNotification('সফলভাবে লগইন হয়েছে!', 'success');
                    AuthManager.showMainContent();
                    NavigationManager.init();
                    InteractiveManager.init();
                })
                .catch((error) => {
                    Utils.showNotification(error.message, 'error');
                })
                .finally(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        },
        
        attemptLoginWithMainSystem: function(phone, email, password) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        const users = JSON.parse(localStorage.getItem('usersData') || '[]');
                        const hashedPassword = btoa(password + 'salt'); // Same hashing as main system
                        
                        // Find user by email and password
                        const user = users.find(u => 
                            u.email === email && 
                            u.password === hashedPassword
                        );
                        
                        if (user) {
                            // Check if this is the creator user
                            if (user.isCreator || (user.email === CONFIG.CREATOR_CREDENTIALS.email)) {
                                // Update last login
                                user.lastLogin = new Date().toISOString();
                                localStorage.setItem('usersData', JSON.stringify(users));
                                
                                // Set current user
                                localStorage.setItem('currentUser', JSON.stringify(user));
                                localStorage.setItem('creatorAuthenticated', 'true');
                                
                                resolve();
                            } else {
                                reject(new Error('এই অ্যাকাউন্টে About Creator পেজে প্রবেশের অনুমতি নেই'));
                            }
                        } else {
                            // Check which field is wrong
                            const emailExists = users.find(u => u.email === email);
                            if (!emailExists) {
                                reject(new Error('ভুল ইমেইল ঠিকানা'));
                            } else {
                                reject(new Error('ভুল পাসওয়ার্ড'));
                            }
                        }
                    } catch (error) {
                        reject(new Error('লগইনে সমস্যা হয়েছে'));
                    }
                }, CONFIG.API_DELAY);
            });
        },
        
        showError: function(fieldId, message) {
            const field = document.getElementById(fieldId);
            if (field) {
                field.style.borderColor = '#ef4444';
                field.style.backgroundColor = '#fef2f2';
                
                // Add error message below the field
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-message';
                errorDiv.textContent = message;
                errorDiv.style.color = '#ef4444';
                errorDiv.style.fontSize = '0.8rem';
                errorDiv.style.marginTop = '0.25rem';
                
                // Remove existing error message
                const existingError = field.parentNode.querySelector('.error-message');
                if (existingError) {
                    existingError.remove();
                }
                
                field.parentNode.appendChild(errorDiv);
            }
        },
        
        clearErrors: function() {
            const fields = ['miniPhone', 'miniEmail', 'miniPassword'];
            fields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (field) {
                    field.style.borderColor = '';
                    field.style.backgroundColor = '';
                    
                    const errorDiv = field.parentNode.querySelector('.error-message');
                    if (errorDiv) {
                        errorDiv.remove();
                    }
                }
            });
        }
    };
    
    // Initialize the page (Direct Access)
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize creator user in main system
        initializeCreatorUser();
        
        // Always show main content for direct access
        AuthManager.showMainContent();
        NavigationManager.init();
        InteractiveManager.init();
        
        // Add some sample data to localStorage if not exists
        initializeSampleData();
    });
    
    // Initialize sample data
    function initializeSampleData() {
        // Add sample update logs if not exists
        if (!localStorage.getItem('updateLogs')) {
            const logs = [
                {
                    date: '2025-01-15',
                    title: 'Added About Creator Section',
                    description: 'নতুন About Creator পেজ যোগ করা হয়েছে যেখানে প্রোফাইল, প্রজেক্ট, আপডেট লগ ইত্যাদি দেখানো হবে'
                },
                {
                    date: '2025-01-10',
                    title: 'Improved Login System',
                    description: 'লগইন সিস্টেমে নতুন ফিচার যোগ করা হয়েছে - মোবাইল নাম্বার, ইমেইল, পাসওয়ার্ড'
                },
                {
                    date: '2025-01-05',
                    title: 'Enhanced Gallery Design',
                    description: 'গ্যালারি পেজের ডিজাইন আপডেট করা হয়েছে - নতুন ফিল্টার, সার্চ ফিচার যোগ করা হয়েছে'
                },
                {
                    date: '2025-01-01',
                    title: 'Website Launch',
                    description: 'SSC Memories Gallery ওয়েবসাইট লঞ্চ করা হয়েছে'
                }
            ];
            localStorage.setItem('updateLogs', JSON.stringify(logs));
        }
        
        // Add sample projects if not exists
        if (!localStorage.getItem('creatorProjects')) {
            const projects = [
                {
                    id: 1,
                    name: 'SSC Gallery',
                    description: 'ফ্রেন্ডসদের জন্য ফটো শেয়ারিং সাইট',
                    image: 'https://via.placeholder.com/300x200/4f46e5/ffffff?text=SSC+Gallery',
                    features: ['HTML/CSS', 'JavaScript', 'Responsive'],
                    liveUrl: '#',
                    demoUrl: '#'
                },
                {
                    id: 2,
                    name: 'Dictionary Pro',
                    description: 'এডভান্সড ইংরেজি-বাংলা ডিকশনারি',
                    image: 'https://via.placeholder.com/300x200/06b6d4/ffffff?text=Dictionary+Pro',
                    features: ['React', 'API', 'Search'],
                    liveUrl: '#',
                    demoUrl: '#'
                },
                {
                    id: 3,
                    name: 'E-Commerce Platform',
                    description: 'অনলাইন শপিং ওয়েবসাইট',
                    image: 'https://via.placeholder.com/300x200/f59e0b/ffffff?text=E-Commerce',
                    features: ['Node.js', 'MongoDB', 'Payment'],
                    liveUrl: '#',
                    demoUrl: '#'
                }
            ];
            localStorage.setItem('creatorProjects', JSON.stringify(projects));
        }
    }
    
    // Add logout function to global scope
    window.creatorLogout = function() {
        AuthManager.logout();
    };
    
})(); 