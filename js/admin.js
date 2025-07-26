// Admin Panel JavaScript

// Global Variables
let isAuthenticated = false;
let currentEditingFriend = null;
let currentEditingGallery = null;
let currentEditingMemory = null;

// Default Admin Credentials (In production, this should be server-side)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

// Initialize Admin Panel
document.addEventListener('DOMContentLoaded', function() {
    initializeAdminPanel();
});

function initializeAdminPanel() {
    // Check if user is already logged in
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
        isAuthenticated = true;
        showDashboard();
    } else {
        showLogin();
    }

    // Initialize event listeners
    initializeLoginForm();
    initializeNavigation();
    initializeSearchAndFilters();
    initializeModals();
}

// Authentication Functions
function initializeLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        isAuthenticated = true;
        localStorage.setItem('adminToken', 'authenticated');
        showDashboard();
        showNotification('সফলভাবে লগইন হয়েছে!', 'success');
    } else {
        showNotification('ভুল ইউজারনেম বা পাসওয়ার্ড!', 'error');
    }
}

function logout() {
    isAuthenticated = false;
    localStorage.removeItem('adminToken');
    showLogin();
    showNotification('সফলভাবে লগআউট হয়েছে!', 'info');
}

function showLogin() {
    document.getElementById('adminLogin').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
}

function showDashboard() {
    document.getElementById('adminLogin').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'block';
    loadAllData();
}

// Navigation Functions
function initializeNavigation() {
    const navItems = document.querySelectorAll('.admin-nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
}

function switchTab(tabName) {
    // Remove active class from all tabs and nav items
    document.querySelectorAll('.admin-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.admin-nav-item').forEach(item => item.classList.remove('active'));
    
    // Add active class to selected tab and nav item
    document.getElementById(`${tabName}-tab`).classList.add('active');
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Load data for the selected tab
    switch(tabName) {
        case 'friends':
            loadFriendsData();
            break;
        case 'gallery':
            loadGalleryData();
            break;
        case 'memories':
            loadMemoriesData();
            break;
        case 'users':
            loadUsersData();
            break;
        case 'settings':
            loadSettings();
            break;
    }
}

// Data Loading Functions
function loadAllData() {
    loadFriendsData();
    loadGalleryData();
    loadMemoriesData();
    loadUsersData();
    loadSettings();
}

function loadFriendsData() {
    const friends = getFriendsData();
    renderFriendsTable(friends);
}

function loadGalleryData() {
    const gallery = getGalleryData();
    renderGalleryGrid(gallery);
}

function loadMemoriesData() {
    const memories = getMemoriesData();
    renderMemoriesList(memories);
}

function loadSettings() {
    const settings = getSiteSettings();
    document.getElementById('siteName').value = settings.siteName || 'SSC Memories Gallery';
    document.getElementById('siteDescription').value = settings.siteDescription || 'আমাদের স্কুল জীবনের স্মৃতিগুলো চিরকালের জন্য সংরক্ষণ';
}

// Friends Management
function renderFriendsTable(friends) {
    const tbody = document.getElementById('friendsTableBody');
    tbody.innerHTML = '';
    
    friends.forEach(friend => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${friend.image}" alt="${friend.name}" class="friend-avatar">
            </td>
            <td>${friend.name}</td>
            <td>${friend.nickname || '-'}</td>
            <td>${getProfessionName(friend.profession)}</td>
            <td>${friend.location || '-'}</td>
            <td class="action-buttons">
                <button class="btn-edit" onclick="editFriend(${friend.id})">
                    <i class="fas fa-edit"></i> সম্পাদনা
                </button>
                <button class="btn-delete" onclick="deleteFriend(${friend.id})">
                    <i class="fas fa-trash"></i> মুছুন
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function openAddFriendModal() {
    currentEditingFriend = null;
    document.getElementById('friendModalTitle').textContent = 'নতুন বন্ধু যোগ করুন';
    document.getElementById('friendForm').reset();
    document.getElementById('friendModal').classList.add('active');
}

function editFriend(friendId) {
    const friends = getFriendsData();
    currentEditingFriend = friends.find(f => f.id === friendId);
    
    if (currentEditingFriend) {
        document.getElementById('friendModalTitle').textContent = 'বন্ধুর তথ্য সম্পাদনা করুন';
        populateFriendForm(currentEditingFriend);
        document.getElementById('friendModal').classList.add('active');
    }
}

function populateFriendForm(friend) {
    document.getElementById('friendName').value = friend.name;
    document.getElementById('friendNickname').value = friend.nickname || '';
    document.getElementById('friendProfession').value = friend.profession;
    document.getElementById('friendLocation').value = friend.location || '';
    document.getElementById('friendEducation').value = friend.education || '';
    document.getElementById('friendImage').value = friend.image;
    document.getElementById('friendBio').value = friend.bio || '';
    document.getElementById('friendFacebook').value = friend.social?.facebook || '';
    document.getElementById('friendInstagram').value = friend.social?.instagram || '';
    document.getElementById('friendTwitter').value = friend.social?.twitter || '';
}

function closeFriendModal() {
    document.getElementById('friendModal').classList.remove('active');
    currentEditingFriend = null;
}

function saveFriend(formData) {
    const friends = getFriendsData();
    
    if (currentEditingFriend) {
        // Update existing friend
        const index = friends.findIndex(f => f.id === currentEditingFriend.id);
        if (index !== -1) {
            friends[index] = {
                ...currentEditingFriend,
                ...formData,
                social: {
                    facebook: formData.facebook || '',
                    instagram: formData.instagram || '',
                    twitter: formData.twitter || ''
                }
            };
        }
    } else {
        // Add new friend
        const newFriend = {
            id: Date.now(),
            ...formData,
            social: {
                facebook: formData.facebook || '',
                instagram: formData.instagram || '',
                twitter: formData.twitter || ''
            }
        };
        friends.push(newFriend);
    }
    
    saveFriendsData(friends);
    loadFriendsData();
    closeFriendModal();
    showNotification(currentEditingFriend ? 'বন্ধুর তথ্য আপডেট হয়েছে!' : 'নতুন বন্ধু যোগ হয়েছে!', 'success');
}

function deleteFriend(friendId) {
    showConfirmModal(
        'আপনি কি নিশ্চিত যে আপনি এই বন্ধুর তথ্য মুছে ফেলতে চান?',
        () => {
            const friends = getFriendsData();
            const filteredFriends = friends.filter(f => f.id !== friendId);
            saveFriendsData(filteredFriends);
            loadFriendsData();
            showNotification('বন্ধুর তথ্য মুছে ফেলা হয়েছে!', 'success');
        }
    );
}

// Gallery Management
function renderGalleryGrid(gallery) {
    const grid = document.getElementById('adminGalleryGrid');
    grid.innerHTML = '';
    
    gallery.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="gallery-item-content">
                <h3>${item.name}</h3>
                <p>${item.description || ''}</p>
                <div class="gallery-item-actions">
                    <button class="btn-edit" onclick="editGallery(${item.id})">
                        <i class="fas fa-edit"></i> সম্পাদনা
                    </button>
                    <button class="btn-delete" onclick="deleteGallery(${item.id})">
                        <i class="fas fa-trash"></i> মুছুন
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(galleryItem);
    });
}

function openAddGalleryModal() {
    currentEditingGallery = null;
    document.getElementById('galleryModalTitle').textContent = 'নতুন ছবি যোগ করুন';
    document.getElementById('galleryForm').reset();
    document.getElementById('galleryModal').classList.add('active');
}

function editGallery(galleryId) {
    const gallery = getGalleryData();
    currentEditingGallery = gallery.find(g => g.id === galleryId);
    
    if (currentEditingGallery) {
        document.getElementById('galleryModalTitle').textContent = 'ছবির তথ্য সম্পাদনা করুন';
        populateGalleryForm(currentEditingGallery);
        document.getElementById('galleryModal').classList.add('active');
    }
}

function populateGalleryForm(gallery) {
    document.getElementById('galleryName').value = gallery.name;
    document.getElementById('galleryCategory').value = gallery.category;
    document.getElementById('galleryImage').value = gallery.image;
    document.getElementById('galleryDescription').value = gallery.description || '';
}

function closeGalleryModal() {
    document.getElementById('galleryModal').classList.remove('active');
    currentEditingGallery = null;
}

function saveGallery(formData) {
    const gallery = getGalleryData();
    
    if (currentEditingGallery) {
        // Update existing gallery item
        const index = gallery.findIndex(g => g.id === currentEditingGallery.id);
        if (index !== -1) {
            gallery[index] = {
                ...currentEditingGallery,
                ...formData
            };
        }
    } else {
        // Add new gallery item
        const newGalleryItem = {
            id: Date.now(),
            ...formData
        };
        gallery.push(newGalleryItem);
    }
    
    saveGalleryData(gallery);
    loadGalleryData();
    closeGalleryModal();
    showNotification(currentEditingGallery ? 'ছবির তথ্য আপডেট হয়েছে!' : 'নতুন ছবি যোগ হয়েছে!', 'success');
}

function deleteGallery(galleryId) {
    showConfirmModal(
        'আপনি কি নিশ্চিত যে আপনি এই ছবি মুছে ফেলতে চান?',
        () => {
            const gallery = getGalleryData();
            const filteredGallery = gallery.filter(g => g.id !== galleryId);
            saveGalleryData(filteredGallery);
            loadGalleryData();
            showNotification('ছবি মুছে ফেলা হয়েছে!', 'success');
        }
    );
}

// Memories Management
function renderMemoriesList(memories) {
    const list = document.getElementById('adminMemoriesList');
    list.innerHTML = '';
    
    memories.forEach(memory => {
        const memoryItem = document.createElement('div');
        memoryItem.className = 'memory-item';
        memoryItem.innerHTML = `
            <div class="memory-header">
                <div>
                    <div class="memory-title">${memory.title}</div>
                    <div class="memory-meta">
                        ${memory.category} • ${memory.date || 'তারিখ নেই'} • ${memory.author || 'অজানা লেখক'}
                    </div>
                </div>
                <div class="memory-actions">
                    <button class="btn-edit" onclick="editMemory(${memory.id})">
                        <i class="fas fa-edit"></i> সম্পাদনা
                    </button>
                    <button class="btn-delete" onclick="deleteMemory(${memory.id})">
                        <i class="fas fa-trash"></i> মুছুন
                    </button>
                </div>
            </div>
            <div class="memory-content">${memory.content}</div>
        `;
        list.appendChild(memoryItem);
    });
}

function openAddMemoryModal() {
    currentEditingMemory = null;
    document.getElementById('memoryModalTitle').textContent = 'নতুন স্মৃতি যোগ করুন';
    document.getElementById('memoryForm').reset();
    document.getElementById('memoryModal').classList.add('active');
}

function editMemory(memoryId) {
    const memories = getMemoriesData();
    currentEditingMemory = memories.find(m => m.id === memoryId);
    
    if (currentEditingMemory) {
        document.getElementById('memoryModalTitle').textContent = 'স্মৃতির তথ্য সম্পাদনা করুন';
        populateMemoryForm(currentEditingMemory);
        document.getElementById('memoryModal').classList.add('active');
    }
}

function populateMemoryForm(memory) {
    document.getElementById('memoryTitle').value = memory.title;
    document.getElementById('memoryCategory').value = memory.category;
    document.getElementById('memoryDate').value = memory.date || '';
    document.getElementById('memoryContent').value = memory.content;
    document.getElementById('memoryAuthor').value = memory.author || '';
}

function closeMemoryModal() {
    document.getElementById('memoryModal').classList.remove('active');
    currentEditingMemory = null;
}

function saveMemory(formData) {
    const memories = getMemoriesData();
    
    if (currentEditingMemory) {
        // Update existing memory
        const index = memories.findIndex(m => m.id === currentEditingMemory.id);
        if (index !== -1) {
            memories[index] = {
                ...currentEditingMemory,
                ...formData
            };
        }
    } else {
        // Add new memory
        const newMemory = {
            id: Date.now(),
            ...formData
        };
        memories.push(newMemory);
    }
    
    saveMemoriesData(memories);
    loadMemoriesData();
    closeMemoryModal();
    showNotification(currentEditingMemory ? 'স্মৃতির তথ্য আপডেট হয়েছে!' : 'নতুন স্মৃতি যোগ হয়েছে!', 'success');
}

function deleteMemory(memoryId) {
    showConfirmModal(
        'আপনি কি নিশ্চিত যে আপনি এই স্মৃতি মুছে ফেলতে চান?',
        () => {
            const memories = getMemoriesData();
            const filteredMemories = memories.filter(m => m.id !== memoryId);
            saveMemoriesData(filteredMemories);
            loadMemoriesData();
            showNotification('স্মৃতি মুছে ফেলা হয়েছে!', 'success');
        }
    );
}

// Settings Management
function saveSiteSettings() {
    const siteName = document.getElementById('siteName').value;
    const siteDescription = document.getElementById('siteDescription').value;
    
    const settings = {
        siteName,
        siteDescription
    };
    
    localStorage.setItem('siteSettings', JSON.stringify(settings));
    showNotification('সাইট সেটিংস সংরক্ষণ হয়েছে!', 'success');
}

function changePassword() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (currentPassword !== ADMIN_CREDENTIALS.password) {
        showNotification('বর্তমান পাসওয়ার্ড ভুল!', 'error');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showNotification('নতুন পাসওয়ার্ড মিলছে না!', 'error');
        return;
    }
    
    if (newPassword.length < 6) {
        showNotification('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে!', 'error');
        return;
    }
    
    // In a real application, this would be sent to the server
    ADMIN_CREDENTIALS.password = newPassword;
    showNotification('পাসওয়ার্ড পরিবর্তন হয়েছে!', 'success');
    
    // Clear form
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
}

// Search and Filter Functions
function initializeSearchAndFilters() {
    // Friends search and filter
    const friendSearch = document.getElementById('adminFriendSearch');
    const professionFilter = document.getElementById('adminProfessionFilter');
    
    if (friendSearch) {
        friendSearch.addEventListener('input', filterFriends);
    }
    if (professionFilter) {
        professionFilter.addEventListener('change', filterFriends);
    }
    
    // Gallery search and filter
    const gallerySearch = document.getElementById('adminGallerySearch');
    const categoryFilter = document.getElementById('adminCategoryFilter');
    
    if (gallerySearch) {
        gallerySearch.addEventListener('input', filterGallery);
    }
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterGallery);
    }
    
    // Memories search and filter
    const memoriesSearch = document.getElementById('adminMemoriesSearch');
    const memoriesFilter = document.getElementById('adminMemoriesFilter');
    
    if (memoriesSearch) {
        memoriesSearch.addEventListener('input', filterMemories);
    }
    if (memoriesFilter) {
        memoriesFilter.addEventListener('change', filterMemories);
    }
    
    // Users search and filter
    const usersSearch = document.getElementById('adminUserSearch');
    const usersFilter = document.getElementById('adminUserStatusFilter');
    
    if (usersSearch) {
        usersSearch.addEventListener('input', filterUsers);
    }
    if (usersFilter) {
        usersFilter.addEventListener('change', filterUsers);
    }
}

function filterFriends() {
    const searchTerm = document.getElementById('adminFriendSearch').value.toLowerCase();
    const professionFilter = document.getElementById('adminProfessionFilter').value;
    
    const friends = getFriendsData();
    const filteredFriends = friends.filter(friend => {
        const matchesSearch = friend.name.toLowerCase().includes(searchTerm) ||
                             (friend.nickname && friend.nickname.toLowerCase().includes(searchTerm));
        const matchesProfession = professionFilter === 'all' || friend.profession === professionFilter;
        
        return matchesSearch && matchesProfession;
    });
    
    renderFriendsTable(filteredFriends);
}

function filterGallery() {
    const searchTerm = document.getElementById('adminGallerySearch').value.toLowerCase();
    const categoryFilter = document.getElementById('adminCategoryFilter').value;
    
    const gallery = getGalleryData();
    const filteredGallery = gallery.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm) ||
                             (item.description && item.description.toLowerCase().includes(searchTerm));
        const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
        
        return matchesSearch && matchesCategory;
    });
    
    renderGalleryGrid(filteredGallery);
}

function filterMemories() {
    const searchTerm = document.getElementById('adminMemoriesSearch').value.toLowerCase();
    const categoryFilter = document.getElementById('adminMemoriesFilter').value;
    
    const memories = getMemoriesData();
    const filteredMemories = memories.filter(memory => {
        const matchesSearch = memory.title.toLowerCase().includes(searchTerm) ||
                             memory.content.toLowerCase().includes(searchTerm);
        const matchesCategory = categoryFilter === 'all' || memory.category === categoryFilter;
        
        return matchesSearch && matchesCategory;
    });
    
    renderMemoriesList(filteredMemories);
}

function filterUsers() {
    const searchTerm = document.getElementById('adminUserSearch').value.toLowerCase();
    const statusFilter = document.getElementById('adminUserStatusFilter').value;
    
    const users = getUsersData();
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm) ||
                             user.email.toLowerCase().includes(searchTerm) ||
                             user.phone.includes(searchTerm);
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });
    
    renderUsersTable(filteredUsers);
}

// Modal Functions
function initializeModals() {
    // Friend form
    const friendForm = document.getElementById('friendForm');
    if (friendForm) {
        friendForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            saveFriend(data);
        });
    }
    
    // Gallery form
    const galleryForm = document.getElementById('galleryForm');
    if (galleryForm) {
        galleryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            saveGallery(data);
        });
    }
    
    // Memory form
    const memoryForm = document.getElementById('memoryForm');
    if (memoryForm) {
        memoryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            saveMemory(data);
        });
    }
    
    // User form
    const userForm = document.getElementById('userForm');
    if (userForm) {
        userForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            saveUser(formData);
        });
    }
    
    // Close modals when clicking outside
    document.querySelectorAll('.admin-modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
}

function showConfirmModal(message, onConfirm) {
    document.getElementById('confirmMessage').textContent = message;
    document.getElementById('confirmModal').classList.add('active');
    
    const confirmBtn = document.getElementById('confirmDeleteBtn');
    confirmBtn.onclick = function() {
        onConfirm();
        closeConfirmModal();
    };
}

function closeConfirmModal() {
    document.getElementById('confirmModal').classList.remove('active');
}

// Data Storage Functions
function fixImagePath(path) {
    if (typeof path === 'string' && path.startsWith('images/')) {
        return '../' + path;
    }
    return path;
}

function getFriendsData() {
    const stored = localStorage.getItem('friendsData');
    let data;
    if (stored) {
        data = JSON.parse(stored);
    } else {
        data = [
            {
                id: 1,
                name: "MD MONIRUZZAMAN",
                nickname: "MONIR",
                image: "images/friends/monir.jpg",
                profession: "Computer_engineer",
                location: "Dinajpur",
                education: "Dinajpur polytechnic Institute",
                bio: "সবসময় নতুন কিছু শিখতে আগ্রহী। প্রোগ্রামিং এবং টেকনোলজি নিয়ে কাজ করি।",
                social: {
                    facebook: "https://www.facebook.com/mjmonir.islam.1",
                    instagram: "#",
                    twitter: "#"
                }
            },
            {
                id: 2,
                name: "Arono Roy Kaushik",
                nickname: "Arono",
                image: "images/friends/aronno.jpg",
                profession: "Computer_engineer",
                location: "Kurigram",
                education: "Kurigram Polytechnic Institute",
                bio: "সবসময় নতুন কিছু শিখতে আগ্রহী। প্রোগ্রামিং এবং টেকনোলজি নিয়ে কাজ করি।",
                social: {
                    facebook: "https://www.facebook.com/arono.roy.363956",
                    instagram: "#"
                }
            },
            {
                id: 3,
                name: "MD Nahid Sarker",
                nickname: "Nahid",
                image: "images/friends/nahid.jpg",
                profession: "Mechanical_enginneer",
                location: "munshiganj",
                education: "munshiganj Polytechnic Institute",
                bio: "প্রযুক্তি ও ইঞ্জিনিয়ারিংয়ের মাধ্যমে বাস্তব সমস্যার সমাধান খুঁজে বের করাই আমার প্যাশন।",
                social: {
                    facebook: "https://www.facebook.com/md.nahid.sarker.39963",
                    twitter: "#"
                }
            },
            {
                id: 4,
                name: "Md Jobayer Sarker (জোবায়ের)",
                nickname: "জোবায়ের",
                image: "images/friends/jobayer.jpg",
                profession: "Mechanical_engineer",
                location: "Rangpur",
                education: "Rangpur Polytechnic Institute",
                bio: "উদ্যোক্তা হিসেবে দেশের অর্থনীতিতে অবদান রাখতে চাই।",
                social: {
                    facebook: "https://www.facebook.com/md.jobayer.sarker62887052",
                    instagram: "#"
                }
            },
            {
                id: 5,
                name: "Md Nasirullah Sarkar (নাসির)",
                nickname: "নাসির",
                image: "images/friends/nasirullah.jpg",
                profession: "Textile_engineer",
                location: "Sirajganj",
                education: "Sirajganj Polytechnic Institute",
                bio: "টেক্সটাইল প্রযুক্তি, ফ্যাশন ডিজাইন এবং উৎপাদন প্রক্রিয়া নিয়ে কাজ করতে আমার ভালো লাগে।",
                social: {
                    facebook: "https://www.facebook.com/md.nasirullah.sarkar.2025",
                    instagram: "#",
                },
            },
            {
                id: 6,
                name: "MD Naim Islam (নাঈম)",
                nickname: "নাঈম",
                image: "images/friends/naim.jpg",
                profession: "Electrical_engineer",
                location: "rangpur",
                education: "Rangpur Polytechnic Institute",
                bio: "সমস্যা বিশ্লেষণ, বাস্তব জীবনের চ্যালেঞ্জ মোকাবিলা এবং উদ্ভাবনী চিন্তার মাধ্যমে সমাজে কিছু ইতিবাচক পরিবর্তন আনার লক্ষ্য নিয়ে আমি এগিয়ে চলছি।",
                social: {
                    facebook: "https://www.facebook.com/md.naim.islam.875150",
                    instagram: "#",
                },
            },
            {
                id: 7,
                name: "Baizid Islam (বাইজিদ)",
                nickname: "বাইজিদ",
                image: "images/friends/baizid.jpg",
                profession: "Electrical_engineer",
                location: "jossore",
                education: "jossore polytechnic institute",
                bio: "সমস্যা বিশ্লেষণ, বাস্তব জীবনের চ্যালেঞ্জ মোকাবিলা এবং উদ্ভাবনী চিন্তার মাধ্যমে সমাজে কিছু ইতিবাচক পরিবর্তন আনার লক্ষ্য নিয়ে আমি এগিয়ে চলছি।",
                social: {
                    facebook: "https://www.facebook.com/baizid.islam.390582",
                    instagram: "#",
                },
            },
            {
                id: 8,
                name: "Fârhâñ Riyad (ফারহান)",
                nickname: "ফারহান",
                image: "images/friends/farhan.jpg",
                profession: "Civil_engineer",
                location: "kurigram",
                education: "Kurigram polytechnic institute",
                bio: " স্থাপত্য নির্মাণ, স্ট্রাকচারাল ডিজাইন, পরিবেশবান্ধব অবকাঠামো এবং আধুনিক টেকনোলজির মাধ্যমে টেকসই উন্নয়নে অবদান রাখার লক্ষ্য নিয়ে আমি এগিয়ে যাচ্ছি।",
                social: {
                    facebook: "https://www.facebook.com/farhanriyad91",
                    instagram: "#",
                },
            },
            {
                id: 9,
                name: "Md Siyam Mondol (সিয়াম)",
                nickname: "সিয়াম",
                image: "images/friends/siyam.jpg",
                profession: "Mechanical_engineer",
                location: "jossore",
                education: "jossore polytechnic institute",
                bio: "যন্ত্রপাতি ডিজাইন, থার্মোডাইনামিক্স, অটোমেশন এবং ম্যানুফ্যাকচারিং সিস্টেম নিয়ে কাজ করতে আমি আগ্রহী।",
                social: {
                    facebook: "https://www.facebook.com/md.siyam.mondol.594377",
                    instagram: "#",
                },
            },
            {
                id: 10,
                name: "Alomgir Haque",
                nickname: "Apple",
                image: "images/friends/apple.jpg",
                profession: "Civil_engineer",
                location: "Dhaka",
                education: "Dhaka polytechnic institute",
                bio: "সমস্যা বিশ্লেষণ, বাস্তব জীবনের চ্যালেঞ্জ মোকাবিলা এবং উদ্ভাবনী চিন্তার মাধ্যমে সমাজে কিছু ইতিবাচক পরিবর্তন আনার লক্ষ্য নিয়ে আমি এগিয়ে চলছি।",
                social: {
                    facebook: "https://www.facebook.com/alomgir.apple.2025",
                    instagram: "#",
                },
            }
        ];
    }
    return data.map(item => ({ ...item, image: fixImagePath(item.image) }));
}

function saveFriendsData(friends) {
    localStorage.setItem('friendsData', JSON.stringify(friends));
}

function getGalleryData() {
    const stored = localStorage.getItem('galleryData');
    let data;
    if (stored) {
        data = JSON.parse(stored);
    } else {
        data = [
            // পিকনিক ক্যাটাগরির ছবি
            { id: 2, name: "পিকনিক", category: "picnic", image: "images/gallery/picknik/IMG-20250328-WA0021.jpg", description: "স্কুলের বার্ষিক পিকনিকে সবাই মিলে আনন্দ করছি" },
            { id: 2001, name: "পিকনিক মুহূর্ত ১", category: "picnic", image: "images/gallery/picknik/IMG-20250630-WA0132.jpg", description: "পিকনিকের স্মরণীয় মুহূর্ত ১" },
            { id: 2002, name: "পিকনিক মুহূর্ত ২", category: "picnic", image: "images/gallery/picknik/IMG-20250630-WA0134.jpg", description: "পিকনিকের স্মরণীয় মুহূর্ত ২" },
            { id: 2003, name: "পিকনিক মুহূর্ত ৩", category: "picnic", image: "images/gallery/picknik/IMG-20250328-WA0020.jpg", description: "পিকনিকের স্মরণীয় মুহূর্ত ৩" },
            { id: 2004, name: "পিকনিক মুহূর্ত ৪", category: "picnic", image: "images/gallery/picknik/IMG-20250328-WA0014.jpg", description: "পিকনিকের স্মরণীয় মুহূর্ত ৪" },
            { id: 2005, name: "পিকনিক মুহূর্ত ৫", category: "picnic", image: "images/gallery/picknik/IMG-20250328-WA0018.jpg", description: "পিকনিকের স্মরণীয় মুহূর্ত ৫" },
            { id: 2014, name: "পিকনিক মুহূর্ত ১৪", category: "picnic", image: "images/gallery/picknik/IMG-20250328-WA0011.jpg", description: "পিকনিকের স্মরণীয় মুহূর্ত ১৪" },
            { id: 2015, name: "পিকনিক মুহূর্ত ১৫", category: "picnic", image: "images/gallery/picknik/IMG-20250328-WA0012.jpg", description: "পিকনিকের স্মরণীয় মুহূর্ত ১৫" },
            { id: 2016, name: "পিকনিক মুহূর্ত ১৬", category: "picnic", image: "images/gallery/picknik/IMG-20250328-WA0010.jpg", description: "পিকনিকের স্মরণীয় মুহূর্ত ১৬" },
            { id: 2017, name: "পিকনিক মুহূর্ত ১৭", category: "picnic", image: "images/gallery/picknik/IMG-20250328-WA0008.jpg", description: "পিকনিকের স্মরণীয় মুহূর্ত ১৭" },
            // ফেয়ারওয়েল ক্যাটাগরির ছবি
            { id: 1001, name: "ফেয়ারওয়েল মুহূর্ত ১", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0125.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ১" },
            { id: 1002, name: "ফেয়ারওয়েল মুহূর্ত ২", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0126.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ২" },
            { id: 1003, name: "ফেয়ারওয়েল মুহূর্ত ৩", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0127.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৩" },
            { id: 1004, name: "ফেয়ারওয়েল মুহূর্ত ৪", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0128.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৪" },
            { id: 1005, name: "ফেয়ারওয়েল মুহূর্ত ৫", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0129.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৫" },
            // ... (এভাবে সব ফেয়ারওয়েল ছবি যুক্ত করুন js/script.js থেকে)
            // ক্লাসরুম ক্যাটাগরির ছবি
            { id: 11, name: "ক্লাসরুম মুহূর্ত ১", category: "classroom", image: "images/gallery/classrome/496008845_122231768696204469_6048026083196361754_n.jpg", description: "ক্লাসরুমে বন্ধুদের সাথে স্মরণীয় মুহূর্ত ১" },
            { id: 12, name: "ক্লাসরুম মুহূর্ত ২", category: "classroom", image: "images/gallery/classrome/497473803_122231768594204469_4714297916633693801_n.jpg", description: "ক্লাসরুমে বন্ধুদের সাথে স্মরণীয় মুহূর্ত ২" }
        ];
    }
    return data.map(item => ({ ...item, image: fixImagePath(item.image) }));
}

function saveGalleryData(gallery) {
    localStorage.setItem('galleryData', JSON.stringify(gallery));
}

function getMemoriesData() {
    const stored = localStorage.getItem('memoriesData');
    let data;
    if (stored) {
        data = JSON.parse(stored);
    } else {
        data = [
            {
                id: 1,
                title: "প্রথম দিনের স্মৃতি",
                category: "personal",
                date: "2024-01-15",
                content: "স্কুলে প্রথম দিনের স্মৃতি আজও মনে আছে। সবাই নতুন নতুন বন্ধু বানিয়েছিলাম।",
                author: "আহমেদ হাসান"
            }
        ];
    }
    return data.map(item => ({ ...item, image: fixImagePath(item.image) }));
}

function saveMemoriesData(memories) {
    localStorage.setItem('memoriesData', JSON.stringify(memories));
}

function getSiteSettings() {
    const stored = localStorage.getItem('siteSettings');
    if (stored) {
        return JSON.parse(stored);
    }
    return {
        siteName: "SSC Memories Gallery",
        siteDescription: "আমাদের স্কুল জীবনের স্মৃতিগুলো চিরকালের জন্য সংরক্ষণ"
    };
}

// Utility Functions
function getProfessionName(profession) {
    const professionNames = {
        'student': 'ছাত্র',
        'engineer': 'ইঞ্জিনিয়ার',
        'doctor': 'ডাক্তার',
        'teacher': 'শিক্ষক',
        'business': 'ব্যবসায়ী',
        'other': 'অন্যান্য'
    };
    return professionNames[profession] || profession;
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        'success': '#10b981',
        'error': '#ef4444',
        'warning': '#f59e0b',
        'info': '#3b82f6'
    };
    return colors[type] || '#3b82f6';
}

// Users Management Functions
function loadUsersData() {
    const users = getUsersData();
    renderUsersTable(users);
}

function renderUsersTable(users) {
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = '';
    
    users.forEach(user => {
        const registrationDate = new Date(user.registrationDate).toLocaleDateString('bn-BD');
        const lastLogin = user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('bn-BD') : 'কখনও লগইন করেনি';
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${registrationDate}</td>
            <td>${lastLogin}</td>
            <td>
                <span class="user-status ${user.status || 'active'}">
                    ${user.status === 'inactive' ? 'নিষ্ক্রিয়' : 'সক্রিয়'}
                </span>
            </td>
            <td class="action-buttons">
                <button class="btn-edit" onclick="editUser(${user.id})">
                    <i class="fas fa-edit"></i> সম্পাদনা
                </button>
                <button class="btn-delete" onclick="deleteUser(${user.id})">
                    <i class="fas fa-trash"></i> মুছুন
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function openAddUserModal() {
    currentEditingUser = null;
    document.getElementById('userModalTitle').textContent = 'নতুন ইউজার যোগ করুন';
    document.getElementById('userForm').reset();
    document.getElementById('userModal').classList.add('active');
}

function editUser(userId) {
    const users = getUsersData();
    currentEditingUser = users.find(u => u.id === userId);
    
    if (currentEditingUser) {
        document.getElementById('userModalTitle').textContent = 'ইউজারের তথ্য সম্পাদনা করুন';
        populateUserForm(currentEditingUser);
        document.getElementById('userModal').classList.add('active');
    }
}

function populateUserForm(user) {
    document.getElementById('userName').value = user.name;
    document.getElementById('userEmail').value = user.email;
    document.getElementById('userPhone').value = user.phone;
    document.getElementById('userPassword').value = ''; // Don't show password
    document.getElementById('userStatus').value = user.status || 'active';
}

function closeUserModal() {
    document.getElementById('userModal').classList.remove('active');
    currentEditingUser = null;
}

function saveUser(formData) {
    const users = getUsersData();
    
    if (currentEditingUser) {
        // Update existing user
        const index = users.findIndex(u => u.id === currentEditingUser.id);
        if (index !== -1) {
            users[index] = {
                ...currentEditingUser,
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                status: formData.get('status')
            };
            
            // Update password only if provided
            if (formData.get('password')) {
                users[index].password = formData.get('password');
            }
        }
    } else {
        // Add new user
        const newUser = {
            id: Date.now(),
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            password: formData.get('password'),
            status: formData.get('status') || 'active',
            registrationDate: new Date().toISOString(),
            lastLogin: null
        };
        users.push(newUser);
    }
    
    localStorage.setItem('usersData', JSON.stringify(users));
    renderUsersTable(users);
    closeUserModal();
    showNotification(currentEditingUser ? 'ইউজার আপডেট হয়েছে!' : 'নতুন ইউজার যোগ হয়েছে!', 'success');
}

function deleteUser(userId) {
    showConfirmModal('আপনি কি নিশ্চিত যে আপনি এই ইউজারকে মুছে ফেলতে চান?', () => {
        const users = getUsersData();
        const filteredUsers = users.filter(u => u.id !== userId);
        localStorage.setItem('usersData', JSON.stringify(filteredUsers));
        renderUsersTable(filteredUsers);
        showNotification('ইউজার মুছে ফেলা হয়েছে!', 'success');
    });
}

function exportUsersData() {
    const users = getUsersData();
    const csvContent = convertUsersToCSV(users);
    downloadCSV(csvContent, 'users_data.csv');
    showNotification('ইউজার ডেটা এক্সপোর্ট হয়েছে!', 'success');
}

function convertUsersToCSV(users) {
    const headers = ['নাম', 'ইমেইল', 'ফোন', 'নিবন্ধনের তারিখ', 'শেষ লগইন', 'স্ট্যাটাস'];
    const rows = users.map(user => [
        user.name,
        user.email,
        user.phone,
        new Date(user.registrationDate).toLocaleDateString('bn-BD'),
        user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('bn-BD') : 'কখনও লগইন করেনি',
        user.status === 'inactive' ? 'নিষ্ক্রিয়' : 'সক্রিয়'
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
}

function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Get users data from localStorage
function getUsersData() {
    const stored = localStorage.getItem('usersData');
    if (stored) {
        return JSON.parse(stored);
    }
    return [];
}

// Global variable for current editing user
let currentEditingUser = null; 