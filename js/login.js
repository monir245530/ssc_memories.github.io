// Login Page JavaScript - Enhanced Version
(function() {
    'use strict';
    
    // Configuration
    const CONFIG = {
        MIN_PASSWORD_LENGTH: 6,
        MAX_PASSWORD_LENGTH: 128,
        MIN_NAME_LENGTH: 2,
        MAX_NAME_LENGTH: 50,
        API_DELAY: 1000,
        SUCCESS_MESSAGE_DURATION: 3000,
        REDIRECT_DELAY: 1500
    };
    
    // Utility Functions
    const Utils = {
        // Simple password hashing (for demo - use proper hashing in production)
        hashPassword: function(password) {
            return btoa(password + 'salt'); // Base64 encoding with salt
        },
        
        // Input sanitization
        sanitizeInput: function(input) {
            if (typeof input !== 'string') return '';
            return input.trim().replace(/[<>]/g, '');
        },
        
        // Debounce function
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },
        
        // Show notification
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
        
        // Validate email format
        isValidEmail: function(email) {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return emailRegex.test(email);
        },
        
        // Validate phone number (Bangladesh)
        isValidPhone: function(phone) {
            const phoneRegex = /^(\+880|880|0)?1[3-9]\d{8}$/;
            return phoneRegex.test(phone);
        },
        
        // Validate password strength
        isStrongPassword: function(password) {
            return password.length >= CONFIG.MIN_PASSWORD_LENGTH && 
                   password.length <= CONFIG.MAX_PASSWORD_LENGTH &&
                   /[A-Z]/.test(password) && 
                   /[a-z]/.test(password) && 
                   /\d/.test(password);
        }
    };
    
    // Error Handler
    const ErrorHandler = {
        showError: function(fieldId, message) {
            try {
                const field = document.getElementById(fieldId);
                if (!field) {
                    console.error(`Field with ID '${fieldId}' not found`);
                    return;
                }
                
                const formGroup = field.closest('.form-group');
                if (!formGroup) {
                    console.error(`Form group not found for field '${fieldId}'`);
                    return;
                }
                
                formGroup.classList.add('error');
                
                // Remove existing error message
                const existingError = formGroup.querySelector('.error-message');
                if (existingError) {
                    existingError.remove();
                }
                
                // Add new error message
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-message';
                errorDiv.textContent = message;
                formGroup.appendChild(errorDiv);
                
                // Focus on the field
                field.focus();
                
            } catch (error) {
                console.error('Error showing error message:', error);
                Utils.showNotification('একটি ত্রুটি ঘটেছে', 'error');
            }
        },
        
        clearErrors: function() {
            try {
                const errorGroups = document.querySelectorAll('.form-group.error');
                errorGroups.forEach(group => {
                    group.classList.remove('error');
                    const errorMessage = group.querySelector('.error-message');
                    if (errorMessage) {
                        errorMessage.remove();
                    }
                });
            } catch (error) {
                console.error('Error clearing errors:', error);
            }
        },
        
        clearForms: function() {
            try {
                const inputs = document.querySelectorAll('input');
                inputs.forEach(input => {
                    input.value = '';
                });
                this.clearErrors();
            } catch (error) {
                console.error('Error clearing forms:', error);
            }
        }
    };
    
    // Validation Handler
    const ValidationHandler = {
        validateLoginInputs: function(email, password) {
            ErrorHandler.clearErrors();
            
            let isValid = true;
            
            // Validate email
            if (!email) {
                ErrorHandler.showError('loginEmail', 'ইমেইল প্রয়োজন');
                isValid = false;
            } else if (!Utils.isValidEmail(email)) {
                ErrorHandler.showError('loginEmail', 'সঠিক ইমেইল ঠিকানা দিন');
                isValid = false;
            }
            
            // Validate password
            if (!password) {
                ErrorHandler.showError('loginPassword', 'পাসওয়ার্ড প্রয়োজন');
                isValid = false;
            } else if (password.length < CONFIG.MIN_PASSWORD_LENGTH) {
                ErrorHandler.showError('loginPassword', `পাসওয়ার্ড কমপক্ষে ${CONFIG.MIN_PASSWORD_LENGTH} অক্ষরের হতে হবে`);
                isValid = false;
            }
            
            return isValid;
        },
        
        validateRegisterInputs: function(name, email, phone, password, confirmPassword) {
            ErrorHandler.clearErrors();
            
            let isValid = true;
            
            // Validate name
            if (!name) {
                ErrorHandler.showError('registerName', 'নাম প্রয়োজন');
                isValid = false;
            } else if (name.length < CONFIG.MIN_NAME_LENGTH) {
                ErrorHandler.showError('registerName', `নাম কমপক্ষে ${CONFIG.MIN_NAME_LENGTH} অক্ষরের হতে হবে`);
                isValid = false;
            } else if (name.length > CONFIG.MAX_NAME_LENGTH) {
                ErrorHandler.showError('registerName', `নাম ${CONFIG.MAX_NAME_LENGTH} অক্ষরের বেশি হতে পারবে না`);
                isValid = false;
            }
            
            // Validate email
            if (!email) {
                ErrorHandler.showError('registerEmail', 'ইমেইল প্রয়োজন');
                isValid = false;
            } else if (!Utils.isValidEmail(email)) {
                ErrorHandler.showError('registerEmail', 'সঠিক ইমেইল ঠিকানা দিন');
                isValid = false;
            }
            
            // Validate phone
            if (!phone) {
                ErrorHandler.showError('registerPhone', 'ফোন নম্বর প্রয়োজন');
                isValid = false;
            } else if (!Utils.isValidPhone(phone)) {
                ErrorHandler.showError('registerPhone', 'সঠিক ফোন নম্বর দিন (বাংলাদেশের নম্বর)');
                isValid = false;
            }
            
            // Validate password
            if (!password) {
                ErrorHandler.showError('registerPassword', 'পাসওয়ার্ড প্রয়োজন');
                isValid = false;
            } else if (!Utils.isStrongPassword(password)) {
                ErrorHandler.showError('registerPassword', 'পাসওয়ার্ডে বড় হাতের অক্ষর, ছোট হাতের অক্ষর এবং সংখ্যা থাকতে হবে');
                isValid = false;
            }
            
            // Validate confirm password
            if (!confirmPassword) {
                ErrorHandler.showError('registerConfirmPassword', 'পাসওয়ার্ড নিশ্চিত করুন');
                isValid = false;
            } else if (password !== confirmPassword) {
                ErrorHandler.showError('registerConfirmPassword', 'পাসওয়ার্ড মিলছে না');
                isValid = false;
            }
            
            return isValid;
        }
    };
    
    // Data Manager
    const DataManager = {
        getUsersData: function() {
            try {
                const stored = localStorage.getItem('usersData');
                if (stored) {
                    return JSON.parse(stored);
                }
                
                // Return default users with hashed passwords
                return [
                    {
                        id: 1,
                        name: "আহমেদ হাসান",
                        email: "hasan@example.com",
                        phone: "01712345678",
                        password: Utils.hashPassword("123456"),
                        status: "active",
                        registrationDate: "2024-01-01T00:00:00.000Z",
                        lastLogin: "2024-01-15T10:30:00.000Z"
                    },
                    {
                        id: 2,
                        name: "ফাতেমা আক্তার",
                        email: "fatema@example.com",
                        phone: "01812345678",
                        password: Utils.hashPassword("123456"),
                        status: "active",
                        registrationDate: "2024-01-05T00:00:00.000Z",
                        lastLogin: "2024-01-14T15:20:00.000Z"
                    },
                    {
                        id: 3,
                        name: "মো: মনির হোসেন",
                        email: "monir@example.com",
                        phone: "+880 1712-345678",
                        password: Utils.hashPassword("monir123"),
                        status: "active",
                        registrationDate: "2024-01-01T00:00:00.000Z",
                        lastLogin: "2024-01-15T10:30:00.000Z",
                        isCreator: true
                    }
                ];
            } catch (error) {
                console.error('Error getting users data:', error);
                return [];
            }
        },
        
        saveUsersData: function(users) {
            try {
                localStorage.setItem('usersData', JSON.stringify(users));
            } catch (error) {
                console.error('Error saving users data:', error);
                Utils.showNotification('ডেটা সংরক্ষণে সমস্যা হয়েছে', 'error');
            }
        },
        
        getCurrentUser: function() {
            try {
                const user = localStorage.getItem('currentUser');
                return user ? JSON.parse(user) : null;
            } catch (error) {
                console.error('Error getting current user:', error);
                return null;
            }
        },
        
        setCurrentUser: function(user) {
            try {
                localStorage.setItem('currentUser', JSON.stringify(user));
            } catch (error) {
                console.error('Error setting current user:', error);
            }
        },
        
        clearCurrentUser: function() {
            try {
                localStorage.removeItem('currentUser');
            } catch (error) {
                console.error('Error clearing current user:', error);
            }
        }
    };
    
    // Authentication Manager
    const AuthManager = {
        attemptLogin: function(email, password) {
            const loginBtn = document.querySelector('.btn-login');
            if (!loginBtn) {
                console.error('Login button not found');
                return;
            }
            
            // Sanitize inputs
            email = Utils.sanitizeInput(email);
            password = Utils.sanitizeInput(password);
            
            // Show loading state
            loginBtn.classList.add('loading');
            loginBtn.textContent = 'লগইন হচ্ছে...';
            loginBtn.disabled = true;
            
            // Simulate API call with proper error handling
            setTimeout(() => {
                try {
                    const users = DataManager.getUsersData();
                    const hashedPassword = Utils.hashPassword(password);
                    const user = users.find(u => u.email === email && u.password === hashedPassword);
                    
                    if (user) {
                        // Update last login
                        user.lastLogin = new Date().toISOString();
                        DataManager.saveUsersData(users);
                        
                        // Set current user
                        DataManager.setCurrentUser(user);
                        
                        Utils.showNotification('সফলভাবে লগইন হয়েছে!', 'success');
                        
                        setTimeout(() => {
                            window.location.href = 'index.html';
                        }, CONFIG.REDIRECT_DELAY);
                    } else {
                        // Check which field is wrong for better error messages
                        const emailExists = users.find(u => u.email === email);
                        if (!emailExists) {
                            ErrorHandler.showError('loginEmail', 'ভুল ইমেইল ঠিকানা');
                        } else {
                            ErrorHandler.showError('loginPassword', 'ভুল পাসওয়ার্ড');
                        }
                    }
                } catch (error) {
                    console.error('Login error:', error);
                    Utils.showNotification('লগইনে সমস্যা হয়েছে', 'error');
                } finally {
                    // Reset button state
                    loginBtn.classList.remove('loading');
                    loginBtn.textContent = 'লগইন করুন';
                    loginBtn.disabled = false;
                }
            }, CONFIG.API_DELAY);
        },
        
        attemptRegister: function(name, email, phone, password) {
            const registerBtn = document.querySelector('.btn-register');
            if (!registerBtn) {
                console.error('Register button not found');
                return;
            }
            
            // Sanitize inputs
            name = Utils.sanitizeInput(name);
            email = Utils.sanitizeInput(email);
            phone = Utils.sanitizeInput(phone);
            password = Utils.sanitizeInput(password);
            
            // Show loading state
            registerBtn.classList.add('loading');
            registerBtn.textContent = 'নিবন্ধন হচ্ছে...';
            registerBtn.disabled = true;
            
            // Simulate API call with proper error handling
            setTimeout(() => {
                try {
                    const users = DataManager.getUsersData();
                    
                    // Check if email already exists
                    const existingUser = users.find(u => u.email === email);
                    if (existingUser) {
                        ErrorHandler.showError('registerEmail', 'এই ইমেইল ইতিমধ্যে ব্যবহৃত হয়েছে');
                        return;
                    }
                    
                    // Create new user
                    const newUser = {
                        id: Date.now(),
                        name: name,
                        email: email,
                        phone: phone,
                        password: Utils.hashPassword(password),
                        status: "active",
                        registrationDate: new Date().toISOString(),
                        lastLogin: new Date().toISOString()
                    };
                    
                    users.push(newUser);
                    DataManager.saveUsersData(users);
                    
                    // Auto login after registration
                    DataManager.setCurrentUser(newUser);
                    
                    Utils.showNotification('সফলভাবে নিবন্ধন হয়েছে!', 'success');
                    
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, CONFIG.REDIRECT_DELAY);
                    
                } catch (error) {
                    console.error('Registration error:', error);
                    Utils.showNotification('নিবন্ধনে সমস্যা হয়েছে', 'error');
                } finally {
                    // Reset button state
                    registerBtn.classList.remove('loading');
                    registerBtn.textContent = 'নিবন্ধন করুন';
                    registerBtn.disabled = false;
                }
            }, CONFIG.API_DELAY);
        },
        
        logout: function() {
            try {
                DataManager.clearCurrentUser();
                window.location.href = 'login.html';
            } catch (error) {
                console.error('Logout error:', error);
                window.location.href = 'login.html';
            }
        },
        
        isLoggedIn: function() {
            return DataManager.getCurrentUser() !== null;
        },
        
        checkLoginStatus: function() {
            if (this.isLoggedIn()) {
                window.location.href = 'index.html';
            }
        }
    };
    
    // UI Manager
    const UIManager = {
        initializeFormToggle: function() {
            const toggleBtn = document.getElementById('toggleForm');
            const toggleText = document.getElementById('toggleText');
            const loginForm = document.getElementById('loginForm');
            const registerForm = document.getElementById('registerForm');
            const loginHeader = document.querySelector('.login-header h2');
            const loginSubtitle = document.querySelector('.login-header p');
            
            if (!toggleBtn || !toggleText || !loginForm || !registerForm || !loginHeader || !loginSubtitle) {
                console.error('Required form elements not found');
                return;
            }
            
            let isLoginMode = true;
            
            toggleBtn.addEventListener('click', function() {
                isLoginMode = !isLoginMode;
                
                if (isLoginMode) {
                    // Switch to Login
                    loginForm.classList.add('active');
                    registerForm.classList.remove('active');
                    loginHeader.textContent = 'লগইন করুন';
                    loginSubtitle.textContent = 'আপনার অ্যাকাউন্টে প্রবেশ করুন';
                    toggleText.textContent = 'নতুন অ্যাকাউন্ট তৈরি করুন';
                } else {
                    // Switch to Register
                    loginForm.classList.remove('active');
                    registerForm.classList.add('active');
                    loginHeader.textContent = 'নিবন্ধন করুন';
                    loginSubtitle.textContent = 'নতুন অ্যাকাউন্ট তৈরি করুন';
                    toggleText.textContent = 'ইতিমধ্যে অ্যাকাউন্ট আছে?';
                }
                
                // Clear forms
                ErrorHandler.clearForms();
            });
            
            // Initially show login form
            loginForm.classList.add('active');
        },
        
        initializeLoginForm: function() {
            const loginForm = document.getElementById('loginForm');
            if (!loginForm) {
                console.error('Login form not found');
                return;
            }
            
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = document.getElementById('loginEmail')?.value || '';
                const password = document.getElementById('loginPassword')?.value || '';
                
                // Validate inputs
                if (!ValidationHandler.validateLoginInputs(email, password)) {
                    return;
                }
                
                // Attempt login
                AuthManager.attemptLogin(email, password);
            });
        },
        
        initializeRegisterForm: function() {
            const registerForm = document.getElementById('registerForm');
            if (!registerForm) {
                console.error('Register form not found');
                return;
            }
            
            registerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const name = document.getElementById('registerName')?.value || '';
                const email = document.getElementById('registerEmail')?.value || '';
                const phone = document.getElementById('registerPhone')?.value || '';
                const password = document.getElementById('registerPassword')?.value || '';
                const confirmPassword = document.getElementById('registerConfirmPassword')?.value || '';
                
                // Validate inputs
                if (!ValidationHandler.validateRegisterInputs(name, email, phone, password, confirmPassword)) {
                    return;
                }
                
                // Attempt registration
                AuthManager.attemptRegister(name, email, phone, password);
            });
        },
        
        addInputValidation: function() {
            // Add real-time validation for password strength
            const passwordField = document.getElementById('registerPassword');
            if (passwordField) {
                passwordField.addEventListener('input', Utils.debounce(function() {
                    const password = this.value;
                    const formGroup = this.closest('.form-group');
                    
                    if (password && !Utils.isStrongPassword(password)) {
                        formGroup.classList.add('weak-password');
                    } else {
                        formGroup.classList.remove('weak-password');
                    }
                }, 300));
            }
        }
    };
    
    // Main Application
    const LoginApp = {
        init: function() {
            try {
                // Check if user is already logged in
                AuthManager.checkLoginStatus();
                
                // Initialize UI components
                UIManager.initializeFormToggle();
                UIManager.initializeLoginForm();
                UIManager.initializeRegisterForm();
                UIManager.addInputValidation();
                
                console.log('Login application initialized successfully');
            } catch (error) {
                console.error('Error initializing login application:', error);
                Utils.showNotification('অ্যাপ্লিকেশন লোড করতে সমস্যা হয়েছে', 'error');
            }
        }
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', LoginApp.init);
    } else {
        LoginApp.init();
    }
    
    // Expose necessary functions globally
    window.LoginApp = {
        logout: AuthManager.logout.bind(AuthManager),
        isLoggedIn: AuthManager.isLoggedIn.bind(AuthManager),
        getCurrentUser: DataManager.getCurrentUser.bind(DataManager)
    };
    
})(); 