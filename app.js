
// ১. ফায়ারবেস কনফিগারেশন (আপনার আসল প্রজেক্টের ক্রেডেনশিয়ালস)
const firebaseConfig = {
    apiKey: "AIzaSyA0bsgnNC34npeOYd_2vIYHsussNaj8_Ls",
    authDomain: "policeacademyapp.firebaseapp.com",
    databaseURL: "https://policeacademyapp-default-rtdb.firebaseio.com",
    projectId: "policeacademyapp",
    storageBucket: "policeacademyapp.firebasestorage.app",
    messagingSenderId: "1095805653552",
    appId: "1:1095805653552:web:770d4668b8704a66253f5"
};

// ফায়ারবেস ইনিশিয়ালাইজেশন
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// ফায়ারবেস ইনিশিয়ালাইজেশন
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// ২. বাংলা এবং ইংরেজি ভাষার ডিকশনারি (Translations)
const translations = {
    bn: {
        nav_title: "বাংলাদেশ পুলিশ একাডেমি",
        nav_subtitle: "সারদা, রাজশাহী",
        hero_welcome: "বাংলাদেশ পুলিশ একাডেমি সারদা-তে স্বাগতম",
        hero_desc: "দক্ষ, পেশাদার এবং জনবান্ধব পুলিশ বাহিনী গড়ার লক্ষে শতবর্ষের গৌরবময় ঐতিহ্যবাহী প্রশিক্ষণ প্রতিষ্ঠান।",
        sec_history_title: "একাডেমির ইতিহাস",
        sec_history_text: "১৯১২ সালে ব্রিটিশ আমলে পদ্মা নদীর তীরবর্তী ঐতিহাসিক সারদা নামক স্থানে এই একাডেমি প্রতিষ্ঠিত হয়। এটি বাংলাদেশ পুলিশের প্রধান এবং প্রাচীনতম প্রশিক্ষণ কেন্দ্র। যুগের সাথে তাল মিলিয়ে আধুনিক अपराध দমন এবং মানবিক পুলিশিং নিশ্চিত করতে এই প্রতিষ্ঠান নিরলস কাজ করে যাচ্ছে।",
        sec_principal_title: "প্রিন্সিপাল প্রোফাইল",
        principal_name: "খন্দকার গোলাম ফারুক বিপিএম (বার), পিপিএম",
        principal_rank: "প্রিন্সিপাল (অতিরিক্ত আইজিপি), বাংলাদেশ পুলিশ একাডেমি",
        principal_msg: '"শৃঙ্খলা, নিরাপত্তা এবং প্রগতির মূলমন্ত্রে দীক্ষিত করে আমরা তৈরি করছি ভবিষ্যৎ পুলিশ বাহিনীকে।"',
        sec_training_title: "ট্রেনিং এর বিষয়সমূহ",
        sec_trainees_title: "কারা ট্রেনিং করেন",
        sec_facilities_title: "একাডেমির সুযোগ-সুবিধা",
        sec_directory_title: "অফিসার ও ফোর্স তালিকা",
        search_placeholder: "খুঁজুন...",
        table_name: "নাম",
        table_rank: "পদবী",
        table_phone: "ফোন নাম্বার",
        table_loading: "লোড হচ্ছে...",
        table_no_data: "কোনো তথ্য পাওয়া যায়নি",
        footer_text: "© ২০২৬ বাংলাদেশ পুলিশ একাডেমি, সারদা, রাজশাহী। সর্বস্বত্ব সংরক্ষিত।"
    },
    en: {
        nav_title: "Bangladesh Police Academy",
        nav_subtitle: "Sarda, Rajshahi",
        hero_welcome: "Welcome to Bangladesh Police Academy, Sarda",
        hero_desc: "A centenary-old glorious training institution dedicated to building a skilled, professional, and people-friendly police force.",
        sec_history_title: "Academy History",
        sec_history_text: "Established in 1912 during the British era on the banks of the river Padma, this academy is the premier and oldest training center of Bangladesh Police. It works tirelessly to ensure modern crime prevention and humane policing in line with the changing times.",
        sec_principal_title: "Principal Profile",
        principal_name: "Khandaker Golam Faruq BPM (Bar), PPM",
        principal_rank: "Principal (Additional IGP), Bangladesh Police Academy",
        principal_msg: '"Guided by Discipline, Security, and Progress, we are shaping the police force of tomorrow."',
        sec_training_title: "Training Courses",
        sec_trainees_title: "Who Undergoes Training",
        sec_facilities_title: "Academy Facilities",
        sec_directory_title: "Officer & Force Directory",
        search_placeholder: "Search...",
        table_name: "Name",
        table_rank: "Designation",
        table_phone: "Phone Number",
        table_loading: "Loading data...",
        table_no_data: "No records found",
        footer_text: "© 2026 Bangladesh Police Academy, Sarda, Rajshahi. All Rights Reserved."
    }
};

// স্ট্যাটিক ডেটা (ট্রেনিং, ট্রেইনি এবং ফেসিলিটিজ) যা ভাষা পরিবর্তনের সাথে বদলে যাবে
const staticLists = {
    bn: {
        training: ["মৌলিক প্রশিক্ষণ (আইন, ট্যাকটিক্স ও ড্রিল)", "সাইবার ক্রাইম ও ডিজিটাল ফরেনসিক", "মানবাধিকার ও জেন্ডার সচেতনতা", "তদন্ত এবং গোয়েন্দা তথ্য সংগ্রহ"],
        trainees: ["সহকারী পুলিশ সুপার (ASP Probationers)", "ক্যাডেট সাব-ইন্সপেক্টর (SI)", "রিক্রুট কনস্টেবল (RC)", "ইন-সার্ভিস বিভিন্ন পদমর্যাদার অফিসার"],
        facilities: ["ফায়ারিং রেঞ্জ", "রাইডিং স্কুল", "কম্পিউটার ল্যাব", "ফরেনসিক ল্যাব", "জিমনেশিয়াম", "অডিটোরিয়াম", "লাইব্রেরি", "প্যারেড গ্রাউন্ড"]
    },
    en: {
        training: ["Basic Training (Law, Tactics & Drill)", "Cyber Crime & Digital Forensics", "Human Rights & Gender Awareness", "Investigation & Intelligence Gathering"],
        trainees: ["Assistant Superintendent of Police (ASP)", "Cadet Sub-Inspector (SI)", "Recruit Constable (RC)", "In-Service Officers of Various Ranks"],
        facilities: ["Firing Range", "Riding School", "Computer Lab", "Forensic Lab", "Gymnasium", "Auditorium", "Library", "Parade Ground"]
    }
};

let currentLang = 'bn'; // ডিফল্ট ভাষা বাংলা
let allOfficers = [];  // ফায়ারবেস থেকে আসা অফিসারদের ডেটা রাখার গ্লোবাল ভেরিয়েবল

// ৩. ভাষা পরিবর্তন করার মূল ফাংশন
function updateLanguage(lang) {
    currentLang = lang;
    
    // সাধারণ টেক্সট পরিবর্তন
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // সার্চবারের প্লেসহোল্ডার পরিবর্তন
    document.getElementById('searchBar').placeholder = translations[lang]['search_placeholder'];

    // বাটন টেক্সট আপডেট
    document.getElementById('langText').textContent = lang === 'bn' ? 'English' : 'বাংলা';

    // লিস্ট এবং গ্রিড আপডেট
    populateStaticLists(lang);
    
    // টেবিল ডেটা রি-রেন্ডার (নতুন ভাষার হেডার অনুযায়ী)
    renderTable(allOfficers);
}

// লিস্ট এবং ফেসিলিটিজ গ্রিড তৈরি করা
function populateStaticLists(lang) {
    const data = staticLists[lang];
    
    // Training List
    document.getElementById('trainingList').innerHTML = data.training.map(item => `<li class="flex items-center gap-2"><i class="fa-solid fa-circle-check text-policeGold text-xs"></i> ${item}</li>`).join('');
    
    // Trainee List
    document.getElementById('traineeList').innerHTML = data.trainees.map(item => `<li class="flex items-center gap-2"><i class="fa-solid fa-user-check text-policeNavy text-xs"></i> ${item}</li>`).join('');
    
    // Facilities Grid
    document.getElementById('facilitiesGrid').innerHTML = data.facilities.map(item => `
        <div class="bg-policeSilver text-policeNavy p-4 rounded-xl text-center font-semibold text-sm hover:bg-policeGold hover:text-policeNavy transition-all duration-300 shadow-sm flex flex-col items-center justify-center gap-2">
            <i class="fa-solid fa-shield-halved text-lg"></i>
            <span>${item}</span>
        </div>
    `).join('');
}

// ৪. ফায়ারবেস থেকে অফিসারদের তালিকা নিয়ে আসা
function fetchDirectory() {
    const dbRef = database.ref('officers');
    
    dbRef.on('value', (snapshot) => {
        allOfficers = [];
        if (snapshot.exists()) {
            const data = snapshot.val();
            // অবজেক্টকে অ্যারেতে রূপান্তর
            for (let key in data) {
                allOfficers.push(data[key]);
            }
            renderTable(allOfficers);
        } else {
            document.getElementById('directoryTable').innerHTML = `
                <tr>
                    <td colspan="3" class="px-6 py-8 text-center text-gray-400">${translations[currentLang]['table_no_data']}</td>
                </tr>`;
        }
    }, (error) => {
        console.error("Firebase Error: ", error);
    });
}

// ৫. টেবিলে ডেটা দেখানোর ফাংশন
function renderTable(data) {
    const tableBody = document.getElementById('directoryTable');
    if (data.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="3" class="px-6 py-8 text-center text-gray-400">${translations[currentLang]['table_no_data']}</td></tr>`;
        return;
    }

    tableBody.innerHTML = data.map(officer => {
        // ভাষা অনুযায়ী নাম ও পদবী ফিল্ড সিলেক্ট করা
        const name = currentLang === 'bn' ? officer.name_bn : officer.name_en;
        const rank = currentLang === 'bn' ? officer.rank_bn : officer.rank_en;
        const phone = officer.phone;

        return `
            <tr class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 font-semibold text-policeNavy border-b">${name}</td>
                <td class="px-6 py-4 text-gray-600 border-b">${rank}</td>
                <td class="px-6 py-4 border-b">
                    <a href="tel:${phone}" class="text-blue-600 hover:underline flex items-center gap-2">
                        <i class="fa-solid fa-phone text-xs"></i> ${phone}
                    </a>
                </td>
            </tr>
        `;
    }).join('');
}

// ৬. সার্চ বার লজিক
document.getElementById('searchBar').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredOfficers = allOfficers.filter(officer => {
        const nameBn = officer.name_bn.toLowerCase();
        const nameEn = officer.name_en.toLowerCase();
        const rankBn = officer.rank_bn.toLowerCase();
        const rankEn = officer.rank_en.toLowerCase();
        const phone = officer.phone;

        return nameBn.includes(searchTerm) || 
               nameEn.includes(searchTerm) || 
               rankBn.includes(searchTerm) || 
               rankEn.includes(searchTerm) || 
               phone.includes(searchTerm);
    });
    renderTable(filteredOfficers);
});

// ৭. ইভেন্ট লিসেনার এবং ইনিশিয়াল রান
document.getElementById('langToggle').addEventListener('click', () => {
    if (currentLang === 'bn') {
        updateLanguage('en');
    } else {
        updateLanguage('bn');
    }
});

// প্রথমবার অ্যাপ লোড হওয়ার সময় রান হবে
updateLanguage('bn');
fetchDirectory();
