// Global Variables
let currentTheme = localStorage.getItem('theme') || 'light';
let currentPage = window.location.pathname.split('/').pop() || 'index.html';

// Data Loading Functions
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
                profession: "Mechanical_engineer",
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
                education: "Anjuman Mokhlesur Rahman polytechnic institute",
                bio: "সমস্যা বিশ্লেষণ, বাস্তব জীবনের চ্যালেঞ্জ মোকাবিলা এবং উদ্ভাবনী চিন্তার মাধ্যমে সমাজে কিছু ইতিবাচক পরিবর্তন আনার লক্ষ্য নিয়ে আমি এগিয়ে চলছি।",
                social: {
                    facebook: "https://www.facebook.com/alomgir.apple.2025",
                    instagram: "#",
                },
                
            }
        ];
    }
    // Fix image paths
    return data.map(item => ({ ...item, image: fixImagePath(item.image) }));
}

function getGalleryData() {
    const stored = localStorage.getItem('galleryData');
    let data;
    if (stored) {
        data = JSON.parse(stored);
    } else {
        data = [
            {
                id: 2,
                name: "পিকনিক",
                category: "picnic",
                image: "images/gallery/picknik/IMG-20250328-WA0021.jpg",
                description: "স্কুলের বার্ষিক পিকনিকে সবাই মিলে আনন্দ করছি"
            },
            // পিকনিক ক্যাটাগরির নতুন ছবি
            { id: 2001, name: "পিকনিক মুহূর্ত ১", category: "picnic", image: "images/gallery/picknik/IMG-20250630-WA0132.jpg", description: "পিকনিকের স্মরণীয় মুহূর্ত ১" },
            { id: 2002, name: "পিকনিক মুহূর্ত ২", category: "picnic", image: "images/gallery/picknik/IMG-20250630-WA0134.jpg", description: "পিকনিকের স্মরণীয় মুহূর্ত ২" },
            { id: 2003, name: "পিকনিক মুহূর্ত ৩", category: "picnic", image: "images/gallery/picknik/IMG-20250328-WA0020.jpg", description: "পিকনিকের স্মরণীয় মুহূর্ত ৩" },
            { id: 2004, name: "পিকনিক মুহূর্ত ৪", category: "picnic", image: "images/gallery/picknik/IMG-20250328-WA0014.jpg", description: "পিকনিকের স্মরণীয় মুহূর্ত ৪" },
            { id: 2005, name: "পিকনিক মুহূর্ত ৫", category: "picnic", image: "images/gallery/picknik/IMG-20250328-WA0018.jpg", description: "পিকনিকের স্মরণীয় মুহূর্ত ৫" },
            { id: 2006, name: "পিকনিক মুহূর্ত ৬", category: "picnic", image: "images/gallery/picknik/IMG-20250328-WA0021.jpg", description: "পিকনিকের স্মরণীয় মুহূর্ত ৬" },
            { id: 2007, name: "পিকনিক মুহূর্ত ৭", category: "picnic", image: "images/gallery/picknik/IMG-20250328-WA0015.jpg", description: "পিকনিকের স্মরণীয় মুহূর্ত ৭" },
            { id: 2008, name: "পিকনিক মুহূর্ত ৮", category: "picnic", image: "images/gallery/picknik/IMG-20250328-WA0022.jpg", description: "পিকনিকের স্মরণীয় মুহূর্ত ৮" },
            { id: 2009, name: "পিকনিক মুহূর্ত ৯", category: "picnic", image: "images/gallery/picknik/IMG-20250328-WA0023.jpg", description: "পিকনিকের স্মরণীয় মুহূর্ত ৯" },
            { id: 2010, name: "পিকনিক মুহূর্ত ১০", category: "picnic", image: "images/gallery/picknik/IMG-20250328-WA0019.jpg", description: "পিকনিকের স্মরণীয় মুহূর্ত ১০" },
            { id: 2011, name: "পিকনিক মুহূর্ত ১১", category: "picnic", image: "images/gallery/picknik/IMG-20250328-WA0017.jpg", description: "পিকনিকের স্মরণীয় মুহূর্ত ১১" },
            { id: 2012, name: "পিকনিক মুহূর্ত ১২", category: "picnic", image: "images/gallery/picknik/IMG-20250328-WA0016.jpg", description: "পিকনিকের স্মরণীয় মুহূর্ত ১২" },
            { id: 2013, name: "পিকনিক মুহূর্ত ১৩", category: "picnic", image: "images/gallery/picknik/IMG-20250328-WA0013.jpg", description: "পিকনিকের স্মরণীয় মুহূর্ত ১৩" },
            { id: 2014, name: "পিকনিক মুহূর্ত ১৪", category: "picnic", image: "images/gallery/picknik/IMG-20250328-WA0011.jpg", description: "পিকনিকের স্মরণীয় মুহূর্ত ১৪" },
            { id: 2015, name: "পিকনিক মুহূর্ত ১৫", category: "picnic", image: "images/gallery/picknik/IMG-20250328-WA0012.jpg", description: "পিকনিকের স্মরণীয় মুহূর্ত ১৫" },
            { id: 2016, name: "পিকনিক মুহূর্ত ১৬", category: "picnic", image: "images/gallery/picknik/IMG-20250328-WA0010.jpg", description: "পিকনিকের স্মরণীয় মুহূর্ত ১৬" },
            { id: 2017, name: "পিকনিক মুহূর্ত ১৭", category: "picnic", image: "images/gallery/picknik/IMG-20250328-WA0008.jpg", description: "পিকনিকের স্মরণীয় মুহূর্ত ১৭" },
            // ফেয়ারওয়েল ক্যাটাগরির সব ছবি (স্বয়ংক্রিয়ভাবে যুক্ত)
            { id: 1001, name: "ফেয়ারওয়েল মুহূর্ত ১", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0125.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ১" },
            { id: 1002, name: "ফেয়ারওয়েল মুহূর্ত ২", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0126.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ২" },
            { id: 1003, name: "ফেয়ারওয়েল মুহূর্ত ৩", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0127.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৩" },
            { id: 1004, name: "ফেয়ারওয়েল মুহূর্ত ৪", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0128.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৪" },
            { id: 1005, name: "ফেয়ারওয়েল মুহূর্ত ৫", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0129.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৫" },
            { id: 1006, name: "ফেয়ারওয়েল মুহূর্ত ৬", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0130.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৬" },
            { id: 1007, name: "ফেয়ারওয়েল মুহূর্ত ৭", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0131.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৭" },
            { id: 1008, name: "ফেয়ারওয়েল মুহূর্ত ৮", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0133.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৮" },
  
            { id: 1010, name: "ফেয়ারওয়েল মুহূর্ত ১০", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0118.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ১০" },
            { id: 1011, name: "ফেয়ারওয়েল মুহূর্ত ১১", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0119.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ১১" },
            { id: 1012, name: "ফেয়ারওয়েল মুহূর্ত ১২", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0120.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ১২" },
            { id: 1013, name: "ফেয়ারওয়েল মুহূর্ত ১৩", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0121.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ১৩" },
            { id: 1014, name: "ফেয়ারওয়েল মুহূর্ত ১৪", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0122.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ১৪" },
            { id: 1015, name: "ফেয়ারওয়েল মুহূর্ত ১৫", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0123.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ১৫" },
            { id: 1016, name: "ফেয়ারওয়েল মুহূর্ত ১৬", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0124.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ১৬" },
            { id: 1017, name: "ফেয়ারওয়েল মুহূর্ত ১৭", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0115.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ১৭" },
            { id: 1018, name: "ফেয়ারওয়েল মুহূর্ত ১৮", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0116.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ১৮" },
            { id: 1019, name: "ফেয়ারওয়েল মুহূর্ত ১৯", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0114.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ১৯" },
            { id: 1020, name: "ফেয়ারওয়েল মুহূর্ত ২০", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0105.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ২০" },
            { id: 1021, name: "ফেয়ারওয়েল মুহূর্ত ২১", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0106.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ২১" },
            { id: 1022, name: "ফেয়ারওয়েল মুহূর্ত ২২", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0107.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ২২" },
            { id: 1023, name: "ফেয়ারওয়েল মুহূর্ত ২৩", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0108.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ২৩" },
            { id: 1024, name: "ফেয়ারওয়েল মুহূর্ত ২৪", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0109.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ২৪" },
            { id: 1025, name: "ফেয়ারওয়েল মুহূর্ত ২৫", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0110.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ২৫" },
            { id: 1026, name: "ফেয়ারওয়েল মুহূর্ত ২৬", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0111.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ২৬" },
            { id: 1027, name: "ফেয়ারওয়েল মুহূর্ত ২৭", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0112.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ২৭" },
            { id: 1028, name: "ফেয়ারওয়েল মুহূর্ত ২৮", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0113.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ২৮" },
            { id: 1029, name: "ফেয়ারওয়েল মুহূর্ত ২৯", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0102.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ২৯" },
            { id: 1030, name: "ফেয়ারওয়েল মুহূর্ত ৩০", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0103.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৩০" },
            { id: 1031, name: "ফেয়ারওয়েল মুহূর্ত ৩১", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0104.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৩১" },
            { id: 1032, name: "ফেয়ারওয়েল মুহূর্ত ৩২", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0089.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৩২" },
           
            { id: 1034, name: "ফেয়ারওয়েল মুহূর্ত ৩৪", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0096.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৩৪" },
            { id: 1035, name: "ফেয়ারওয়েল মুহূর্ত ৩৫", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0097.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৩৫" },
            { id: 1036, name: "ফেয়ারওয়েল মুহূর্ত ৩৬", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0098.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৩৬" },
            { id: 1037, name: "ফেয়ারওয়েল মুহূর্ত ৩৭", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0100.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৩৭" },
            { id: 1038, name: "ফেয়ারওয়েল মুহূর্ত ৩৮", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0074.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৩৮" },
            { id: 1039, name: "ফেয়ারওয়েল মুহূর্ত ৩৯", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0078.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৩৯" },
            { id: 1040, name: "ফেয়ারওয়েল মুহূর্ত ৪০", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0079.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৪০" },
            { id: 1041, name: "ফেয়ারওয়েল মুহূর্ত ৪১", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0080.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৪১" },
            { id: 1042, name: "ফেয়ারওয়েল মুহূর্ত ৪২", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0081.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৪২" },
            { id: 1043, name: "ফেয়ারওয়েল মুহূর্ত ৪৩", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0082.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৪৩" },
            { id: 1044, name: "ফেয়ারওয়েল মুহূর্ত ৪৪", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0083.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৪৪" },
            { id: 1045, name: "ফেয়ারওয়েল মুহূর্ত ৪৫", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0084.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৪৫" },
            { id: 1046, name: "ফেয়ারওয়েল মুহূর্ত ৪৬", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0085.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৪৬" },
            { id: 1047, name: "ফেয়ারওয়েল মুহূর্ত ৪৭", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0086.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৪৭" },
            { id: 1048, name: "ফেয়ারওয়েল মুহূর্ত ৪৮", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0090.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৪৮" },
            { id: 1049, name: "ফেয়ারওয়েল মুহূর্ত ৪৯", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0091.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৪৯" },
            { id: 1050, name: "ফেয়ারওয়েল মুহূর্ত ৫০", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0092.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৫০" },
            { id: 1051, name: "ফেয়ারওয়েল মুহূর্ত ৫১", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0093.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৫১" },
            { id: 1052, name: "ফেয়ারওয়েল মুহূর্ত ৫২", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0094.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৫২" },
            { id: 1053, name: "ফেয়ারওয়েল মুহূর্ত ৫৩", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0058.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৫৩" },
            { id: 1054, name: "ফেয়ারওয়েল মুহূর্ত ৫৪", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0059.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৫৪" },
            { id: 1055, name: "ফেয়ারওয়েল মুহূর্ত ৫৫", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0060.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৫৫" },
            { id: 1056, name: "ফেয়ারওয়েল মুহূর্ত ৫৬", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0063.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৫৬" },
            { id: 1057, name: "ফেয়ারওয়েল মুহূর্ত ৫৭", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0064.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৫৭" },
            { id: 1058, name: "ফেয়ারওয়েল মুহূর্ত ৫৮", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0065.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৫৮" },
            { id: 1059, name: "ফেয়ারওয়েল মুহূর্ত ৫৯", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0067.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৫৯" },
            { id: 1060, name: "ফেয়ারওয়েল মুহূর্ত ৬০", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0068.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৬০" },
            { id: 1061, name: "ফেয়ারওয়েল মুহূর্ত ৬১", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0069.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৬১" },
            { id: 1062, name: "ফেয়ারওয়েল মুহূর্ত ৬২", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0070.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৬২" },
            { id: 1063, name: "ফেয়ারওয়েল মুহূর্ত ৬৩", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0071.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৬৩" },
            { id: 1064, name: "ফেয়ারওয়েল মুহূর্ত ৬৪", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0073.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৬৪" },
            { id: 1065, name: "ফেয়ারওয়েল মুহূর্ত ৬৫", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0075.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৬৫" },
            { id: 1066, name: "ফেয়ারওয়েল মুহূর্ত ৬৬", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0076.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৬৬" },
            { id: 1067, name: "ফেয়ারওয়েল মুহূর্ত ৬৭", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0077.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৬৭" },
            { id: 1068, name: "ফেয়ারওয়েল মুহূর্ত ৬৮", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0088.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৬৮" },
            { id: 1069, name: "ফেয়ারওয়েল মুহূর্ত ৬৯", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0049.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৬৯" },
            { id: 1070, name: "ফেয়ারওয়েল মুহূর্ত ৭০", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0050.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৭০" },
            { id: 1071, name: "ফেয়ারওয়েল মুহূর্ত ৭১", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0051.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৭১" },
            { id: 1072, name: "ফেয়ারওয়েল মুহূর্ত ৭২", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0052.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৭২" },
            { id: 1073, name: "ফেয়ারওয়েল মুহূর্ত ৭৩", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0053.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৭৩" },
            { id: 1074, name: "ফেয়ারওয়েল মুহূর্ত ৭৪", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0054.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৭৪" },
            { id: 1075, name: "ফেয়ারওয়েল মুহূর্ত ৭৫", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0055.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৭৫" },
            { id: 1076, name: "ফেয়ারওয়েল মুহূর্ত ৭৬", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0057.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৭৬" },
            { id: 1077, name: "ফেয়ারওয়েল মুহূর্ত ৭৭", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0061.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৭৭" },
            { id: 1078, name: "ফেয়ারওয়েল মুহূর্ত ৭৮", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0066.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৭৮" },
            { id: 1079, name: "ফেয়ারওয়েল মুহূর্ত ৭৯", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0047.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৭৯" },
            { id: 1080, name: "ফেয়ারওয়েল মুহূর্ত ৮০", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0048.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৮০" },
            { id: 1081, name: "ফেয়ারওয়েল মুহূর্ত ৮১", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0046.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৮১" },
            { id: 1082, name: "ফেয়ারওয়েল মুহূর্ত ৮২", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0043.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৮২" },
            { id: 1083, name: "ফেয়ারওয়েল মুহূর্ত ৮৩", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0045.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৮৩" },
            { id: 1084, name: "ফেয়ারওয়েল মুহূর্ত ৮৪", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0039.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৮৪" },
            { id: 1085, name: "ফেয়ারওয়েল মুহূর্ত ৮৫", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0040.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৮৫" },
            { id: 1086, name: "ফেয়ারওয়েল মুহূর্ত ৮৬", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0041.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৮৬" },
            { id: 1087, name: "ফেয়ারওয়েল মুহূর্ত ৮৭", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0031.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৮৭" },
            { id: 1088, name: "ফেয়ারওয়েল মুহূর্ত ৮৮", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0032.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৮৮" },
            { id: 1089, name: "ফেয়ারওয়েল মুহূর্ত ৮৯", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0033.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৮৯" },
            { id: 1090, name: "ফেয়ারওয়েল মুহূর্ত ৯০", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0034.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৯০" },
            { id: 1091, name: "ফেয়ারওয়েল মুহূর্ত ৯১", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0035.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৯১" },
            { id: 1092, name: "ফেয়ারওয়েল মুহূর্ত ৯২", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0036.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৯২" },
            { id: 1093, name: "ফেয়ারওয়েল মুহূর্ত ৯৩", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0037.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৯৩" },
            { id: 1094, name: "ফেয়ারওয়েল মুহূর্ত ৯৪", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0038.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৯৪" },
            { id: 1095, name: "ফেয়ারওয়েল মুহূর্ত ৯৫", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0020.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৯৫" },
            { id: 1096, name: "ফেয়ারওয়েল মুহূর্ত ৯৬", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0024.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৯৬" },
            { id: 1097, name: "ফেয়ারওয়েল মুহূর্ত ৯৭", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0025.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৯৭" },
            { id: 1098, name: "ফেয়ারওয়েল মুহূর্ত ৯৮", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0026.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৯৮" },
            { id: 1099, name: "ফেয়ারওয়েল মুহূর্ত ৯৯", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0027.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ৯৯" },
            { id: 1100, name: "ফেয়ারওয়েল মুহূর্ত ১০০", category: "farewell", image: "images/gallery/farewell/IMG-20250630-WA0028.jpg", description: "ফেয়ারওয়েল অনুষ্ঠানের স্মরণীয় মুহূর্ত ১০০" },


            //ক্লাসরুমের ক্যাটাগরির সব ছবি
            {
                id: 11,
                name: "ক্লাসরুম মুহূর্ত ১",
                category: "classroom",
                image: "images/gallery/classrome/496008845_122231768696204469_6048026083196361754_n.jpg",
                description: "ক্লাসরুমে বন্ধুদের সাথে স্মরণীয় মুহূর্ত ১"
            },
            {
                id: 12,
                name: "ক্লাসরুম মুহূর্ত ২",
                category: "classroom",
                image: "images/gallery/classrome/497473803_122231768594204469_4714297916633693801_n.jpg",
                description: "ক্লাসরুমে বন্ধুদের সাথে স্মরণীয় মুহূর্ত ২"
            },


            // অন্যান্য ক্যাটাগরির ছবি

            {
                id: 3001, name: "অন্যান্য মুহূর্ত ১", category: "random", image: "images/gallery/others/326217131_1234841260777164_5709428650090742719_n.jpg", description: "অন্যান্য স্মরণীয় মুহূর্ত ১"
            },
            {
                id: 3002, name: "অন্যান্য মুহূর্ত ২", category: "random", image: "images/gallery/others/473005805_546589051703029_5386056114283473072_n.jpg", description: "অন্যান্য স্মরণীয় মুহূর্ত ২"
            },
            {
                id: 3003, name: "অন্যান্য মুহূর্ত ৩", category: "random", image: "images/gallery/others/473963468_610831421903799_8445691866929744548_n.jpg", description: "অন্যান্য স্মরণীয় মুহূর্ত ৩"
            },
            {
                id: 3004, name: "অন্যান্য মুহূর্ত ৪", category: "random", image: "images/gallery/others/474876091_653445887356584_8800897250120707910_n.jpg", description: "অন্যান্য স্মরণীয় মুহূর্ত ৪"
            },
            {
                id: 3005, name: "অন্যান্য মুহূর্ত ৫", category: "random", image: "images/gallery/others/475906738_647987424325690_7599152663241046765_n.jpg", description: "অন্যান্য স্মরণীয় মুহূর্ত ৫"
            },
            {
                id: 3006, name: "অন্যান্য মুহূর্ত ৬", category: "random", image: "images/gallery/others/476372369_647987127659053_419347517681779990_n.jpg", description: "অন্যান্য স্মরণীয় মুহূর্ত ৬"
            },
            {
                id: 3007, name: "অন্যান্য মুহূর্ত ৭", category: "random", image: "images/gallery/others/476648291_647987124325720_8876152415632155180_n.jpg", description: "অন্যান্য স্মরণীয় মুহূর্ত ৭"
            },
            {
                id: 3008, name: "অন্যান্য মুহূর্ত ৮", category: "random", image: "images/gallery/others/476805397_647987430992356_4424653235667902930_n.jpg", description: "অন্যান্য স্মরণীয় মুহূর্ত ৮"
            },
            {
                id: 3009, name: "অন্যান্য মুহূর্ত ৯", category: "random", image: "images/gallery/others/476806739_647987437659022_7951863328135301769_n.jpg", description: "অন্যান্য স্মরণীয় মুহূর্ত ৯"
            },
            {
                id: 3010, name: "অন্যান্য মুহূর্ত ১০", category: "random", image: "images/gallery/others/477445873_639680461936657_3001822614235204531_n.jpg", description: "অন্যান্য স্মরণীয় মুহূর্ত ১০"
            },
            {
                id: 3011, name: "অন্যান্য মুহূর্ত ১১", category: "random", image: "images/gallery/others/477541766_639347005303336_5778169968470773078_n.jpg", description: "অন্যান্য স্মরণীয় মুহূর্ত ১১"
            },
            {
                id: 3012, name: "অন্যান্য মুহূর্ত ১২", category: "random", image: "images/gallery/others/477992450_639346975303339_7624814061843259414_n.jpg", description: "অন্যান্য স্মরণীয় মুহূর্ত ১২"
            },
            {
                id: 3013, name: "অন্যান্য মুহূর্ত ১৩", category: "random", image: "images/gallery/others/478539234_639346968636673_7359627834211674448_n.jpg", description: "অন্যান্য স্মরণীয় মুহূর্ত ১৩"
            },
            {
                id: 3014, name: "অন্যান্য মুহূর্ত ১৪", category: "random", image: "images/gallery/others/479544471_639346981970005_4233874389715404753_n.jpg", description: "অন্যান্য স্মরণীয় মুহূর্ত ১৪"
            },
            {
                id: 3015, name: "অন্যান্য মুহূর্ত ১৫", category: "random", image: "images/gallery/others/480921690_650320770872626_1639418452543145912_n.jpg", description: "অন্যান্য স্মরণীয় মুহূর্ত ১৫"
            },
            {
                id: 3016, name: "অন্যান্য মুহূর্ত ১৬", category: "random", image: "images/gallery/others/481298203_650321137539256_5131306995388875324_n.jpg", description: "অন্যান্য স্মরণীয় মুহূর্ত ১৬"
            },
            {
                id: 3017, name: "অন্যান্য মুহূর্ত ১৭", category: "random", image: "images/gallery/others/482323775_659028663335170_4604095927152973688_n.jpg", description: "অন্যান্য স্মরণীয় মুহূর্ত ১৭"
            },
            {
                id: 3018, name: "অন্যান্য মুহূর্ত ১৮", category: "random", image: "images/gallery/others/482323974_659028480001855_8900490307898070492_n.jpg", description: "অন্যান্য স্মরণীয় মুহূর্ত ১৮"
            },
            {
                id: 3019, name: "অন্যান্য মুহূর্ত ১৯", category: "random", image: "images/gallery/others/489567897_23907992125469872_3424671054220464339_n.jpg", description: "অন্যান্য স্মরণীয় মুহূর্ত ১৯"
            },
            {
                id: 3020, name: "অন্যান্য মুহূর্ত ২০", category: "random", image: "images/gallery/others/503887982_4236918066530986_1335590677317854069_n.jpg", description: "অন্যান্য স্মরণীয় মুহূর্ত ২০"
            },
            {
                id: 3021, name: "অন্যান্য মুহূর্ত ২১", category: "random", image: "images/gallery/others/504098617_4236918296530963_949747966965182172_n.jpg", description: "অন্যান্য স্মরণীয় মুহূর্ত ২১"
            },
            {
                id: 3022, name: "অন্যান্য মুহূর্ত ২২", category: "random", image: "images/gallery/others/504666431_4236918003197659_10084606855916015_n.jpg", description: "অন্যান্য স্মরণীয় মুহূর্ত ২২"
            },
            {
                id: 3023, name: "অন্যান্য মুহূর্ত ২৩", category: "random", image: "images/gallery/others/504927060_4236918033197656_7200701218949757309_n.jpg", description: "অন্যান্য স্মরণীয় মুহূর্ত ২৩"
            },
        ];
    }
    // Fix image paths
    return data.map(item => ({ ...item, image: fixImagePath(item.image) }));
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
                author: "MD MONIR"
            },
            {
                id: 2,
                title: "পরীক্ষার দিনগুলো",
                category: "academic",
                date: "2024-02-20",
                content: "পরীক্ষার আগের রাতগুলোতে সবাই মিলে গ্রুপ স্টাডি করতাম। সেই দিনগুলোর কথা মনে পড়লে এখনও গা শিউরে ওঠে।",
                author: "Aronno Roy"
            },
            {
                id: 3,
                title: "স্কুলের বার্ষিক ক্রীড়া প্রতিযোগিতা",
                category: "social",
                date: "2024-03-10",
                content: "স্কুলের বার্ষিক ক্রীড়া প্রতিযোগিতায় আমাদের ক্লাস প্রথম হয়েছিল। সেই আনন্দের দিনের কথা আজও মনে আছে।",
                author: "MD Nahid Hasan"
            }
        ];
    }
    // Fix image paths
    return data.map(item => ({ ...item, image: fixImagePath(item.image) }));
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeNavigation();
    initializeLoginStatus();
    initializePageSpecific();
    initializeAnimations();
});

// Theme Management
function initializeTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
    
    // Add event listeners to both desktop and mobile theme toggles
    const themeToggles = document.querySelectorAll('.theme-toggle');
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', toggleTheme);
    });
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
}

function updateThemeIcon() {
    // Update all theme toggle icons (both desktop and mobile)
    const themeIcons = document.querySelectorAll('.theme-toggle i');
    themeIcons.forEach(icon => {
        icon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    });
}

// Navigation Management
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active'); // This triggers the hamburger/cross animation
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        });
    });
}

// Page Specific Initialization
function initializePageSpecific() {
    switch(currentPage) {
        case 'index.html':
        case '':
            initializeHomePage();
            break;
        case 'gallery.html':
            initializeGalleryPage();
            break;
        case 'friends.html':
            initializeFriendsPage();
            break;
        case 'memories.html':
            initializeMemoriesPage();
            break;
    }
}

// Home Page Functions
function initializeHomePage() {
    initializeStats();
    // initializeScrollAnimations(); // Error fix: function not defined
    initializeHeroSlideshow();
}

function initializeStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.getAttribute('data-target'));
                animateNumber(target, 0, finalValue, 1000);
                observer.unobserve(target);
            }
        });
    });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

function initializeHeroSlideshow() {
    const slideshowContainer = document.querySelector('.hero-slideshow');
    if (!slideshowContainer) {
        console.error('Slideshow container not found!');
        return;
    }

    const backgroundImages = [
        '../images/backgrounds/MONIR6 copy.jpg',
        '../images/backgrounds/background1.jpg',
        '../images/backgrounds/background2.jpg',
        '../images/backgrounds/background3.jpg',
        '../images/backgrounds/background4.jpg',
        '../images/backgrounds/background5.jpg',
        '../images/backgrounds/background6.jpg',
        '../images/backgrounds/background7.jpg',
        '../images/backgrounds/background8.jpg',
        '../images/backgrounds/background9.jpg',
        '../images/backgrounds/background10.jpg',
        '../images/backgrounds/background11.jpg',
        '../images/backgrounds/background12.jpg',
        '../images/backgrounds/background13.jpg'
    ];

    slideshowContainer.innerHTML = '';
    let loadedCount = 0;
    let slides = [];

    backgroundImages.forEach((src, idx) => {
        const img = document.createElement('img');
        img.src = src;
        img.className = 'hero-slideshow-image';
        img.alt = 'Background Image';
        img.loading = 'lazy';
        img.style.opacity = '0';

        img.onload = () => {
            loadedCount++;
            console.log('Loaded:', src);
            if (loadedCount === 1) {
                img.classList.add('active');
                img.style.opacity = '1';
            }
            if (loadedCount === backgroundImages.length) {
                slides = Array.from(slideshowContainer.querySelectorAll('.hero-slideshow-image'));
                let current = 0;
                setInterval(() => {
                    slides[current].classList.remove('active');
                    slides[current].style.opacity = '0';
                    current = (current + 1) % slides.length;
                    slides[current].classList.add('active');
                    slides[current].style.opacity = '1';
                }, 3500);
            }
        };
        img.onerror = () => {
            console.error('Failed to load:', src);
            img.alt = 'Image not found';
        };
        slideshowContainer.appendChild(img);
    });

    // Diagnostic: show how many images are in the DOM after setup
    setTimeout(() => {
        const imgs = slideshowContainer.querySelectorAll('img');
        console.log('Total slideshow images in DOM:', imgs.length);
        imgs.forEach((img, i) => {
            console.log(`Image ${i + 1}:`, img.src, 'opacity:', img.style.opacity, 'class:', img.className);
        });
    }, 2000);
}

// Gallery Page Functions
function initializeGalleryPage() {
    renderGallery();
    initializeGalleryFilters();
    initializeLightbox();
    initializeGallerySearch();
}

function renderGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    
    galleryGrid.innerHTML = '';
    
    const galleryData = getGalleryData();
    galleryData.forEach(item => {
        const galleryItem = createGalleryItem(item);
        galleryGrid.appendChild(galleryItem);
    });
}

function createGalleryItem(item) {
    const div = document.createElement('div');
    div.className = 'gallery-item fade-in-up';
    div.setAttribute('data-category', item.category);
    div.setAttribute('data-name', item.name.toLowerCase());
    
    div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" loading="lazy" oncontextmenu="return false;" ondragstart="return false;">
        <div class="gallery-item-info">
            <div class="gallery-item-name">${item.name}</div>
            <div class="gallery-item-category">${getCategoryName(item.category)}</div>
        </div>
    `;
    
    div.addEventListener('click', () => openLightbox(item));
    return div;
}

function getCategoryName(category) {
    const categories = {
        'classroom': 'ক্লাসরুম',
        'picnic': 'পিকনিক',
        'farewell': 'ফেয়ারওয়েল',
        'random': 'র‍্যান্ডম',
        'academic': 'একাডেমিক',
        'social': 'সামাজিক',
        'personal': 'ব্যক্তিগত'
    };
    return categories[category] || category;
}

function initializeGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            filterGalleryItems(filter);
        });
    });
}

function filterGalleryItems(category) {
    const items = document.querySelectorAll('.gallery-item');
    
    items.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
            item.classList.add('fade-in');
        } else {
            item.style.display = 'none';
        }
    });
}

function initializeGallerySearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const items = document.querySelectorAll('.gallery-item');
        
        items.forEach(item => {
            const name = item.getAttribute('data-name');
            if (name.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// Lightbox Functions
function initializeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }
    
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox && lightbox.classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
            if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
        }
    });
}

let currentLightboxIndex = 0;
let currentLightboxItems = [];

function openLightbox(item) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    
    if (!lightbox || !lightboxImage || !lightboxCaption) return;
    
    // Get all visible gallery items
    const visibleItems = Array.from(document.querySelectorAll('.gallery-item[style*="block"], .gallery-item:not([style*="none"])'));
    currentLightboxItems = visibleItems.map(item => ({
        image: item.querySelector('img').src,
        name: item.querySelector('.gallery-item-name').textContent,
        category: item.querySelector('.gallery-item-category').textContent
    }));
    
    currentLightboxIndex = currentLightboxItems.findIndex(i => i.name === item.name);
    
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function updateLightboxContent() {
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    
    if (currentLightboxItems.length === 0) return;
    
    const currentItem = currentLightboxItems[currentLightboxIndex];
    
    if (lightboxImage) lightboxImage.src = currentItem.image;
    if (lightboxCaption) lightboxCaption.textContent = `${currentItem.name} - ${currentItem.category}`;
    
    // Update navigation buttons
    if (prevBtn) {
        prevBtn.style.display = currentLightboxIndex > 0 ? 'block' : 'none';
        prevBtn.onclick = () => navigateLightbox(-1);
    }
    
    if (nextBtn) {
        nextBtn.style.display = currentLightboxIndex < currentLightboxItems.length - 1 ? 'block' : 'none';
        nextBtn.onclick = () => navigateLightbox(1);
    }
}

function navigateLightbox(direction) {
    currentLightboxIndex += direction;
    
    if (currentLightboxIndex < 0) {
        currentLightboxIndex = currentLightboxItems.length - 1;
    } else if (currentLightboxIndex >= currentLightboxItems.length) {
        currentLightboxIndex = 0;
    }
    
    updateLightboxContent();
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Friends Page Functions
function initializeFriendsPage() {
    renderFriends();
    initializeFriendsSearch();
    initializeFriendsFilter();
    initializeFriendModal();
}

function renderFriends() {
    const friendsGrid = document.getElementById('friendsGrid');
    if (!friendsGrid) return;
    
    friendsGrid.innerHTML = '';
    
    const friendsData = getFriendsData();
    friendsData.forEach(friend => {
        const friendCard = createFriendCard(friend);
        friendsGrid.appendChild(friendCard);
    });
}

function createFriendCard(friend) {
    const div = document.createElement('div');
    div.className = 'friend-card fade-in-up';
    div.setAttribute('data-profession', friend.profession);
    div.setAttribute('data-name', friend.name.toLowerCase());
    
    div.innerHTML = `
        <div class="friend-image">
            <img src="${friend.image}" alt="${friend.name}" loading="lazy" oncontextmenu="return false;" ondragstart="return false;">
        </div>
        <div class="friend-info">
            <h3 class="friend-name">${friend.name}</h3>
            <p class="friend-nickname">${friend.nickname}</p>
            <div class="friend-details">
                <div class="detail-item">
                    <i class="fas fa-briefcase"></i>
                    <span>${getProfessionName(friend.profession)}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${friend.location}</span>
                </div>
            </div>
            <div class="friend-social">
                ${Object.entries(friend.social || {}).map(([platform, url]) => 
                    `<a href="${url}" target="_blank"><i class="fab fa-${platform}"></i></a>`
                ).join('')}
                ${friend.id === 1 ? `<a href="../My_Love/My_first_Love.html" target="_blank" title="My First Love" style="margin-left:8px;vertical-align:middle;"><svg xmlns='http://www.w3.org/2000/svg' height='24' width='24' viewBox='0 0 24 24' fill='red' style='vertical-align:middle;'><path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35zm0-2.1c4.28-3.94 7-6.44 7-9.75 0-2.21-1.79-4-4-4-1.54 0-3.04 1.04-3.55 2.36C9.04 5.29 7.54 4.25 6 4.25c-2.21 0-4 1.79-4 4 0 3.31 2.72 5.81 7 9.75z'/><polyline points='8,8 12,12 16,8' style='fill:none;stroke:black;stroke-width:2'/></svg></a>` : ''}
            </div>
        </div>
    `;
    
    div.addEventListener('click', () => openFriendModal(friend));
    return div;
}

function initializeFriendsSearch() {
    const searchInput = document.getElementById('friendSearchInput');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const cards = document.querySelectorAll('.friend-card');
        
        cards.forEach(card => {
            const name = card.getAttribute('data-name');
            if (name.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

function initializeFriendsFilter() {
    const professionFilter = document.getElementById('professionFilter');
    if (!professionFilter) return;
    
    professionFilter.addEventListener('change', function() {
        const selectedProfession = this.value;
        const cards = document.querySelectorAll('.friend-card');
        
        cards.forEach(card => {
            const profession = card.getAttribute('data-profession');
            if (
                selectedProfession === 'all' || 
                profession === selectedProfession ||
                (selectedProfession === 'engineer' && profession.endsWith('_engineer'))
            ) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

function initializeFriendModal() {
    const modal = document.getElementById('friendModal');
    const closeBtn = document.getElementById('modalClose');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeFriendModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeFriendModal();
            }
        });
    }
}

function openFriendModal(friend) {
    const modal = document.getElementById('friendModal');
    const modalImage = document.getElementById('modalFriendImage');
    const modalName = document.getElementById('modalFriendName');
    const modalNickname = document.getElementById('modalFriendNickname');
    const modalProfession = document.getElementById('modalFriendProfession');
    const modalLocation = document.getElementById('modalFriendLocation');
    const modalEducation = document.getElementById('modalFriendEducation');
    const modalBio = document.getElementById('modalFriendBio');
    const modalSocial = document.getElementById('modalFriendSocial');
    
    if (!modal) return;
    
    if (modalImage) modalImage.src = friend.image;
    if (modalName) modalName.textContent = friend.name;
    if (modalNickname) modalNickname.textContent = friend.nickname;
    if (modalProfession) modalProfession.textContent = getProfessionName(friend.profession);
    if (modalLocation) modalLocation.textContent = friend.location;
    if (modalEducation) modalEducation.textContent = friend.education;
    if (modalBio) modalBio.textContent = friend.bio;
    
    if (modalSocial) {
        modalSocial.innerHTML = Object.entries(friend.social || {}).map(([platform, url]) => 
            `<a href="${url}" target="_blank"><i class="fab fa-${platform}"></i></a>`
        ).join('');



        // শুধু MD MONIRUZZAMAN (id: 1) এর জন্য ব্রোকেন হার্ট আইকন দেখাও
        if (friend.id === 1) {
            modalSocial.innerHTML += `<a href="../My_Love/My_first_Love.html" target="_blank" title="My First Love" style="margin-left:8px;vertical-align:middle;">
                <svg xmlns='http://www.w3.org/2000/svg' height='24' width='24' viewBox='0 0 24 24' fill='red' style='vertical-align:middle;'>
                    <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35zm0-2.1c4.28-3.94 7-6.44 7-9.75 0-2.21-1.79-4-4-4-1.54 0-3.04 1.04-3.55 2.36C9.04 5.29 7.54 4.25 6 4.25c-2.21 0-4 1.79-4 4 0 3.31 2.72 5.81 7 9.75z'/>
                    <polyline points='8,8 12,12 16,8' style='fill:none;stroke:black;stroke-width:2'/>
                </svg>
            </a>`;
        }
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeFriendModal() {
    const modal = document.getElementById('friendModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

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

// Memories Page Functions
function initializeMemoriesPage() {
    loadMemories();
    initializeMemoryForm();
    initializeMemoriesSearch();
    initializeMemoriesFilter();
    initializeMemoryModal();
}

function loadMemories() {
    const memories = getMemoriesData();
    renderMemories(memories);
}

function renderMemories(memories) {
    const memoriesGrid = document.getElementById('memoriesGrid');
    if (!memoriesGrid) return;
    
    memoriesGrid.innerHTML = '';
    
    memories.forEach(memory => {
        const memoryCard = createMemoryCard(memory);
        memoriesGrid.appendChild(memoryCard);
    });
}

function createMemoryCard(memory) {
    const div = document.createElement('div');
    div.className = 'memory-card fade-in-up';
    div.setAttribute('data-category', memory.category);
    div.setAttribute('data-title', memory.title.toLowerCase());
    
    const date = new Date(memory.date).toLocaleDateString('bn-BD');
    
    div.innerHTML = `
        <div class="memory-header">
            <h3 class="memory-title">${memory.title}</h3>
            <div class="memory-meta">
                <span class="author"><i class="fas fa-user"></i> ${memory.author}</span>
                <span class="date"><i class="fas fa-calendar"></i> ${date}</span>
                <span class="memory-category">${getCategoryName(memory.category)}</span>
            </div>
        </div>
        <div class="memory-content">
            <p>${memory.content.substring(0, 150)}${memory.content.length > 150 ? '...' : ''}</p>
        </div>
    `;
    
    div.addEventListener('click', () => openMemoryModal(memory));
    return div;
}

function initializeMemoryForm() {
    const form = document.getElementById('memoryForm');
    if (!form) return;
    
    // Set default date to today
    const dateInput = document.getElementById('memoryDate');
    if (dateInput) {
        dateInput.value = new Date().toISOString().split('T')[0];
    }
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const memory = {
            id: Date.now(),
            title: formData.get('title'),
            author: formData.get('author'),
            category: formData.get('category'),
            content: formData.get('content'),
            date: formData.get('date')
        };
        
        saveMemory(memory);
        form.reset();
        
        // Show success message
        showNotification('স্মৃতি সফলভাবে সংরক্ষণ করা হয়েছে!', 'success');
    });
}

function saveMemory(memory) {
    const memories = getMemoriesData();
    memories.unshift(memory);
    localStorage.setItem('memoriesData', JSON.stringify(memories));
    renderMemories(memories);
}

function initializeMemoriesSearch() {
    const searchInput = document.getElementById('memorySearchInput');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const cards = document.querySelectorAll('.memory-card');
        
        cards.forEach(card => {
            const title = card.getAttribute('data-title');
            const content = card.querySelector('.memory-content p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || content.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

function initializeMemoriesFilter() {
    const filterButtons = document.querySelectorAll('.memories-filter .filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter memory cards
            const cards = document.querySelectorAll('.memory-card');
            
            cards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

function initializeMemoryModal() {
    const modal = document.getElementById('memoryModal');
    const closeBtn = document.getElementById('memoryModalClose');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeMemoryModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeMemoryModal();
            }
        });
    }
}

function openMemoryModal(memory) {
    const modal = document.getElementById('memoryModal');
    const modalTitle = document.getElementById('modalMemoryTitle');
    const modalAuthor = document.getElementById('modalMemoryAuthor');
    const modalDate = document.getElementById('modalMemoryDate');
    const modalCategory = document.getElementById('modalMemoryCategory');
    const modalContent = document.getElementById('modalMemoryContent');
    
    if (!modal) return;
    
    const date = new Date(memory.date).toLocaleDateString('bn-BD');
    
    if (modalTitle) modalTitle.textContent = memory.title;
    if (modalAuthor) modalAuthor.textContent = memory.author;
    if (modalDate) modalDate.textContent = date;
    if (modalCategory) modalCategory.textContent = getCategoryName(memory.category);
    if (modalContent) modalContent.textContent = memory.content;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMemoryModal() {
    const modal = document.getElementById('memoryModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Animation Functions
function initializeAnimations() {
    initializeScrollReveal();
    initializeHoverEffects();
}

function initializeScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    });
    
    const elements = document.querySelectorAll('.scroll-reveal, .fade-in-up');
    elements.forEach(el => observer.observe(el));
}

function initializeHoverEffects() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.feature-card, .friend-card, .memory-card, .gallery-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
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

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Login Status Management
function initializeLoginStatus() {
    const currentUser = getCurrentUser();
    const loginNavItem = document.getElementById('loginNavItem');
    const userNavItem = document.getElementById('userNavItem');
    const userName = document.getElementById('userName');
    
    if (currentUser) {
        // User is logged in
        if (loginNavItem) loginNavItem.style.display = 'none';
        if (userNavItem) {
            userNavItem.style.display = 'block';
            if (userName) {
                userName.textContent = currentUser.name;
            }
        }
    } else {
        // User is not logged in
        if (loginNavItem) loginNavItem.style.display = 'block';
        if (userNavItem) userNavItem.style.display = 'none';
    }
}

// Get current user from localStorage
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    showNotification('সফলভাবে লগআউট হয়েছে', 'success');
    
    // Redirect to home page
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('currentUser') !== null;
}

function fixImagePath(path) {
    if (typeof path === 'string' && path.startsWith('images/')) {
        return '../' + path;
    }
    return path;
}

localStorage.removeItem('friendsData');
localStorage.removeItem('galleryData');
localStorage.removeItem('memoriesData'); 
