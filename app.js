// ১. ফায়ারবেস কনফিগারেশন (আপনার দেওয়া আসল তথ্য)
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
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();

// ২. গ্লোবাল স্টেট এবং ভাষা ডেটা
let currentLang = 'bn';
let allOfficers = [];

const translations = {
    bn: {
        title: "বাংলাদেশ পুলিশ একাডেমি",
        subtitle: "সারদা, রাজশাহী",
        historyTitle: "একাডেমির ইতিহাস",
        historyText: "১৯১২ সালে প্রতিষ্ঠিত সারদা police academy বাংলাদেশ পুলিশের প্রধান এবং ঐতিহ্যবাহী প্রশিক্ষণ কেন্দ্র। সুদক্ষ ও পেশাদার পুলিশ বাহিনী গড়ে তুলতে এই প্রতিষ্ঠান নিরলস কাজ করে যাচ্ছে।",
        facilitiesTitle: "একাডেমির সুযোগ-সুবিধা",
        facility1: "আধুনিক কম্পিউটার ল্যাব ও আইটি সেন্টার",
        facility2: "আন্তর্জাতিক মানের ফায়ারিং রেঞ্জ",
        facility3: "বিশাল প্যারেড গ্রাউন্ড ও স্পোর্টস কমপ্লেক্স",
        tableTitle: "অফিসার ও ফোর্স তালিকা",
        searchPlaceholder: "নাম বা পদবী দিয়ে খুঁজুন...",
        thName: "নাম",
        thRank: "পদবী",
        thPhone: "ফোন নাম্বার",
        loading: "লোড হচ্ছে...",
        noData: "কোনো তথ্য পাওয়া যায়নি",
        footer: "© ২০২৬ বাংলাদেশ পুলিশ একাডেমি, সারদা, রাজশাহী। সর্বস্বত্ব সংরক্ষিত।"
    },
    en: {
        title: "Bangladesh Police Academy",
        subtitle: "Sarda, Rajshahi",
        historyTitle: "Academy History",
        historyText: "Established in 1912, Sarda Police Academy is the premier and historic training institution for the Bangladesh Police, dedicated to developing a highly skilled and professional police force.",
        facilitiesTitle: "Academy Facilities",
        facility1: "Modern Computer Lab & IT Center",
        facility2: "International Standard Firing Range",
        facility3: "Massive Parade Ground & Sports Complex",
        tableTitle: "Officers & Force List",
        searchPlaceholder: "Search by name or rank...",
        thName: "Name",
        thRank: "Rank",
        thPhone: "Phone Number",
        loading: "Loading...",
        noData: "No records found",
        footer: "© 2026 Bangladesh Police Academy, Sarda, Rajshahi. All Rights Reserved."
    }
};

// ৩. ডম এলিমেন্ট সিলেকশন
const langBtn = document.getElementById('langBtn');
const mainTitle = document.getElementById('mainTitle');
const mainSubtitle = document.getElementById('mainSubtitle');
const historyTitle = document.getElementById('historyTitle');
const historyText = document.getElementById('historyText');
const facilitiesTitle = document.getElementById('facilitiesTitle');
const fac1 = document.getElementById('fac1');
const fac2 = document.getElementById('fac2');
const fac3 = document.getElementById('fac3');
const tableTitle = document.getElementById('tableTitle');
const searchInput = document.getElementById('searchInput');
const thName = document.getElementById('thName');
const thRank = document.getElementById('thRank');
const thPhone = document.getElementById('thPhone');
const tableBody = document.getElementById('tableBody');
const footerText = document.getElementById('footerText');

// ৪. ইন্টারফেসের ভাষা পরিবর্তন করার ফাংশন
function updateUI() {
    const t = translations[currentLang];
    
    if(langBtn) langBtn.innerHTML = currentLang === 'bn' ? '🌐 English' : '🌐 বাংলা';
    if(mainTitle) mainTitle.textContent = t.title;
    if(mainSubtitle) mainSubtitle.textContent = t.subtitle;
    if(historyTitle) historyTitle.textContent = t.historyTitle;
    if(historyText) historyText.textContent = t.historyText;
    if(facilitiesTitle) facilitiesTitle.textContent = t.facilitiesTitle;
    if(fac1) fac1.textContent = t.facility1;
    if(fac2) fac2.textContent = t.facility2;
    if(fac3) fac3.textContent = t.facility3;
    if(tableTitle) tableTitle.textContent = t.tableTitle;
    if(searchInput) searchInput.placeholder = t.searchPlaceholder;
    if(thName) thName.textContent = t.thName;
    if(thRank) thRank.textContent = t.thRank;
    if(thPhone) thPhone.textContent = t.thPhone;
    if(footerText) footerText.textContent = t.footer;

    renderTable(allOfficers);
}

// ৫. টেবিলে ডেটা দেখানোর ফাংশন
function renderTable(officersList) {
    if(!tableBody) return;
    tableBody.innerHTML = '';

    if (officersList.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="3" class="text-center text-muted py-4">${translations[currentLang].noData}</td></tr>`;
        return;
    }

    officersList.forEach(officer => {
        const name = currentLang === 'bn' ? officer.name_bn : officer.name_en;
        const rank = currentLang === 'bn' ? officer.rank_bn : officer.rank_en;
        
        const row = `
            <tr class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td class="px-4 py-3 text-sm font-medium text-gray-800">${name}</td>
                <td class="px-4 py-3 text-sm text-gray-600">${rank}</td>
                <td class="px-4 py-3 text-sm text-blue-600 font-mono">
                    <a href="tel:${officer.phone}" class="hover:underline">${officer.phone}</a>
                </td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}

// ৬. ফায়ারবেস থেকে রিয়েলটাইম ডেটা নিয়ে আসা
if(tableBody) {
    tableBody.innerHTML = `<tr><td colspan="3" class="text-center text-muted py-4">${translations[currentLang].loading}</td></tr>`;
}

database.ref('officers').on('value', (snapshot) => {
    allOfficers = [];
    const data = snapshot.val();
    
    if (data) {
        Object.keys(data).forEach(key => {
            allOfficers.push(data[key]);
        });
    }
    renderTable(allOfficers);
}, (error) => {
    console.error("Firebase Error: ", error);
    if(tableBody) {
        tableBody.innerHTML = `<tr><td colspan="3" class="text-center text-red-500 py-4">ডেটা লোড করতে ব্যর্থ হয়েছে। Rules চেক করুন।</td></tr>`;
    }
});

// ७. সার্চ ফিল্টারিং
if(searchInput) {
    searchInput.addEventListener('input', (e) => {
        const keyword = e.target.value.toLowerCase().trim();
        
        const filtered = allOfficers.filter(officer => {
            const nameBn = officer.name_bn ? officer.name_bn.toLowerCase() : '';
            const nameEn = officer.name_en ? officer.name_en.toLowerCase() : '';
            const rankBn = officer.rank_bn ? officer.rank_bn.toLowerCase() : '';
            const rankEn = officer.rank_en ? officer.rank_en.toLowerCase() : '';
            
            return nameBn.includes(keyword) || 
                   nameEn.includes(keyword) || 
                   rankBn.includes(keyword) || 
                   rankEn.includes(keyword);
        });
        
        renderTable(filtered);
    });
}

// ৮. ল্যাঙ্গুয়েজ বাটন ক্লিক হ্যান্ডলার
if(langBtn) {
    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'bn' ? 'en' : 'bn';
        updateUI();
    });
}

// প্রথমবার ইন্টারফেস সেট করা
updateUI();
