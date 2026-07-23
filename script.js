const STORAGE_KEY = 'clan_member_data';
const CONTACT_KEY = 'clan_contact_messages';
const MARKET_KEY = 'clan_market_accounts';
const USER_KEY = 'user';

const competitionDetails = {
  clash: {
    title: 'مسابقة Clash Squad',
    mode: 'نظام 5v5',
    reward: 'جائزة فورية + نقاط ترتيب',
    description: 'تُقام المسابقة بشكل أسبوعي وتتميز بتقسيم الفرق حسب مستوى الأداء، مع نظام نقاط واضح لاحتساب النتائج.'
  },
  battle: {
    title: 'بطولة Battle Royale',
    mode: 'نظام فرق مفتوح',
    reward: 'جوائز شهرية + تمييز في قائمة الكلان',
    description: 'تُعقد البطولة بشكل شهري وتُركز على التنسيق داخل الفريق، واستغلال الخريطة بذكاء لتحصيل أعلى نتائج.'
  },
  rewards: {
    title: 'مكافآت الأعضاء',
    mode: 'مكافآت مستمرة',
    reward: 'مكافآت تشجيعية وامتيازات خاصة',
    description: 'يتم منح المكافآت للأعضاء المبدعين والمنتظمين داخل الفعاليات، كما تُشجع روح التفاعل والالتزام.'
  }
};

const translations = {
  ar: {
    nav_intro: 'المقدمة',
    nav_clan: 'عن الكلان',
    nav_competitions: 'المسابقات',
    nav_contact: 'التواصل',
    nav_market: 'الحسابات',
    nav_links: 'الروابط',
    intro_title: 'مرحباً بك في كيان JO FF',
    intro_text1: 'الكلان JO FF هو مجتمع لعب احترافي في Free Fire يضم لاعبين من مختلف المستويات، ويهتم بتطوير الأداء داخل Clash Squad و Battle Royale عبر تنظيم فعاليات، تدريب مستمر، وتوزيع مهام واضحة بين الأعضاء.',
    intro_text2: 'في الكلان نركز على روح الفريق والعمل الجماعي، مع حرص خاص على احترام النظام، الالتزام بالقواعد، وتحفيز اللاعبين على التقدم مستواهم بانتظام في كل يوم.',
    current_member: 'العضو الحالي',
    intro_features: 'أبرز المميزات',
    feature_1: 'تنظيم لفرق اللعب حسب المستوى',
    feature_2: 'خطة تدريب يومية وسباق رتب',
    feature_3: 'مسابقات أسبوعية وبوابة تواصل',
    focus_title: 'التركيز',
    focus_text: 'تنسيق ممتاز داخل الفرق',
    identity_title: 'العلامة',
    identity_text: 'روح تفاعل ومشاركة قوية',
    goal_title: 'الهدف',
    goal_text: 'رفع مستوى الكلان ببطولة وتنظيم',
    social_title: 'حسابات الكلان الرسمية',
    market_title: 'بيع وشراء الحسابات داخل اللعبة',
    market_desc: 'يمكنك عرض الحسابات المتاحة للبيع، مع صورة، السعر، مواصفات الحساب، وروابط التواصل مع الكلان والقيادة.',
    market_form: 'إضافة حساب جديد',
    label_name: 'اسم الحساب',
    label_type: 'نوع الحساب',
    label_price: 'السعر بالدينار الأردني',
    label_upload: 'رفع صورة من الجهاز',
    label_specs: 'مواصفات الحساب',
    btn_add: 'إضافة الحساب',
    clan_title: 'اسم الكلان',
    clan_category: 'التصنيف',
    clan_roles: 'أدوار الإدارة',
    clan_play_style: 'نمط اللعب',
    competitions_title: 'المسابقات',
    contacts_title: 'تواصل مع الإداريين',
    contact_message_title: 'الرسائل المرسلة'
  },
  en: {
    nav_intro: 'Intro',
    nav_clan: 'Clan',
    nav_competitions: 'Competitions',
    nav_contact: 'Contact',
    nav_market: 'Accounts',
    nav_links: 'Links',
    intro_title: 'Welcome to JO FF Clan',
    intro_text1: 'JO FF Clan is a professional Free Fire community that brings together players of all levels and focuses on improving performance in Clash Squad and Battle Royale through structured events, continuous training, and clear role distribution.',
    intro_text2: 'Our clan focuses on teamwork, discipline, and constant progress, with a strong commitment to rules, coordination, and sharing positive energy among members.',
    current_member: 'Current member',
    intro_features: 'Key Features',
    feature_1: 'Organized team setup by skill level',
    feature_2: 'Daily training plan and rank progression',
    feature_3: 'Weekly competitions and communication hub',
    focus_title: 'Focus',
    focus_text: 'Excellent coordination inside teams',
    identity_title: 'Identity',
    identity_text: 'Strong engagement and community spirit',
    goal_title: 'Goal',
    goal_text: 'Raise the clan to a higher competitive level',
    social_title: 'Official Clan Accounts',
    market_title: 'Buy and Sell Game Accounts',
    market_desc: 'You can list available accounts for sale with a photo, price, account specifications, and links to the clan and leadership.',
    market_form: 'Add a New Account',
    label_name: 'Account Name',
    label_type: 'Account Type',
    label_price: 'Price in Jordanian Dinar',
    label_upload: 'Upload image from device',
    label_specs: 'Account Specifications',
    btn_add: 'Add Account',
    clan_title: 'Clan Name',
    clan_category: 'Category',
    clan_roles: 'Management Roles',
    clan_play_style: 'Play Style',
    competitions_title: 'Competitions',
    contacts_title: 'Contact Admins',
    contact_message_title: 'Sent Messages'
  }
};

function getStoredData() {
  const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  return parsed;
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function isLoggedIn() {
  return !!(localStorage.getItem('clan_logged_in') || localStorage.getItem(USER_KEY));
}

function renderAccountCards() {
  const accounts = [
    { name: 'الـ Account 1', type: 'Battle Royale', status: 'متوفر' },
    { name: 'الـ Account 2', type: 'Clash Squad', status: 'متوفر' },
    { name: 'الـ Account 3', type: 'Rifles / Rank', status: 'مغلق مؤقتاً' },
  ];

  const container = document.getElementById('accountCards');
  if (!container) return;

  container.innerHTML = accounts.map(acc => `
    <div class="panel">
      <span class="badge">${acc.type}</span>
      <h3>${acc.name}</h3>
      <p class="muted">الحالة: ${acc.status}</p>
    </div>
  `).join('');
}

function renderMarketCards() {
  const container = document.getElementById('marketCards');
  if (!container) return;

  const stored = JSON.parse(localStorage.getItem(MARKET_KEY) || '[]');
  if (!stored.length) {
    container.innerHTML = '<div class="market-card"><p class="muted">لا توجد حسابات معروضة حاليًا.</p></div>';
    return;
  }

  container.innerHTML = stored.map(item => `
    <div class="market-card">
      <img src="${item.image || 'https://via.placeholder.com/800x400?text=Account'}" alt="${item.name}" />
      <h3>${item.name}</h3>
      <p class="muted">${item.type} • ${item.primeType || 'برايم غير محدد'}</p>
      <p>${item.specs}</p>
      <div class="price-tag">${item.price} د.ا</div>
    </div>
  `).join('');
}

function renderContactMessages() {
  const list = document.getElementById('contactList');
  if (!list) return;

  const messages = JSON.parse(localStorage.getItem(CONTACT_KEY) || '[]');
  if (!messages.length) {
    list.innerHTML = '<div class="list-item">لا توجد رسائل حتى الآن.</div>';
    return;
  }

  list.innerHTML = messages.map(msg => `
    <div class="list-item">
      <strong>${msg.name}</strong><br>
      <span class="muted">${msg.person}</span><br>
      <div>${msg.text}</div>
    </div>
  `).join('');
}

function bindLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  const stored = getStoredData();
  if (stored.username) {
    document.getElementById('username').value = stored.username;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const status = document.getElementById('loginStatus');

    if (!username || !password) {
      status.className = 'status error';
      status.textContent = 'يرجى إدخال الاسم وكلمة المرور.';
      return;
    }

    saveData({ username, password });
    localStorage.setItem(USER_KEY, username);
    localStorage.setItem('clan_logged_in', 'true');
    status.className = 'status';
    status.textContent = 'تم تسجيل الدخول بنجاح، جاري التوجيه...';

    setTimeout(() => window.location.href = 'intro.html', 800);
  });
}

function bindContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('senderName').value.trim();
    const person = document.getElementById('contactTo').value;
    const text = document.getElementById('messageText').value.trim();
    const status = document.getElementById('contactStatus');

    if (!name || !text) {
      status.className = 'status error';
      status.textContent = 'يرجى تعبئة الاسم والنص.';
      return;
    }

    const messages = JSON.parse(localStorage.getItem(CONTACT_KEY) || '[]');
    messages.push({ name, person, text });
    localStorage.setItem(CONTACT_KEY, JSON.stringify(messages));
    status.className = 'status';
    status.textContent = 'تم حفظ الرسالة بنجاح.';
    form.reset();
    renderContactMessages();
  });
}

function bindCompetitionSelector() {
  const select = document.getElementById('competitionSelect');
  const details = document.getElementById('competitionDetails');
  if (!select || !details) return;

  const renderDetails = () => {
    const item = competitionDetails[select.value];
    if (!item) return;

    details.innerHTML = `
      <h4>${item.title}</h4>
      <p><strong>النمط:</strong> ${item.mode}</p>
      <p><strong>الجائزة:</strong> ${item.reward}</p>
      <p><strong>الوصف:</strong> ${item.description}</p>
    `;
  };

  select.addEventListener('change', renderDetails);
  renderDetails();
}

function bindMarketForm() {
  const form = document.getElementById('marketForm');
  if (!form) return;

  const imageInput = document.getElementById('accountImageFile');
  const preview = document.createElement('img');
  preview.className = 'preview-box';
  form.appendChild(preview);

  imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      preview.src = reader.result;
      preview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('accountName').value.trim();
    const type = document.getElementById('accountType').value;
    const primeType = document.getElementById('primeType').value;
    const price = document.getElementById('accountPrice').value.trim();
    const specs = document.getElementById('accountSpecs').value.trim();
    const status = document.getElementById('marketStatus');

    if (!name || !price || !specs) {
      status.className = 'status error';
      status.textContent = 'يرجى تعبئة اسم الحساب والسعر والمواصفات.';
      return;
    }

    const accounts = JSON.parse(localStorage.getItem(MARKET_KEY) || '[]');
    accounts.push({
      name,
      type,
      primeType,
      price: Number(price),
      image: preview.src || '',
      specs
    });
    localStorage.setItem(MARKET_KEY, JSON.stringify(accounts));
    status.className = 'status';
    status.textContent = 'تمت إضافة الحساب بنجاح.';
    form.reset();
    preview.style.display = 'none';
    renderMarketCards();
  });
}

function enforceLogin() {
  const currentPage = window.location.pathname.split('/').pop();
  const protectedPages = ['intro.html', 'clan.html', 'competitions.html', 'contact.html', 'accounts.html', 'links.html'];

  if (!isLoggedIn() && currentPage !== 'index.html') {
    window.location.href = 'index.html';
  }

  if (isLoggedIn() && currentPage === 'index.html') {
    window.location.href = 'intro.html';
  }

  if (protectedPages.includes(currentPage) && !isLoggedIn()) {
    window.location.href = 'index.html';
  }
}

function setTheme(theme) {
  document.body.classList.toggle('light-theme', theme === 'light');
  localStorage.setItem('clan_theme', theme);
  const button = document.getElementById('themeToggle');
  if (button) {
    button.textContent = theme === 'light' ? 'الوضع الليلي' : 'الوضع النهاري';
  }
}

function setLanguage(lang) {
  localStorage.setItem('clan_lang', lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.dataset.i18n;
    const value = translations[lang][key];
    if (value) node.textContent = value;
  });

  const toggle = document.getElementById('langToggle');
  if (toggle) toggle.textContent = lang === 'en' ? 'AR' : 'EN';
}

document.addEventListener('DOMContentLoaded', () => {
  enforceLogin();
  bindLoginForm();
  bindContactForm();
  bindCompetitionSelector();
  bindMarketForm();
  renderAccountCards();
  renderContactMessages();
  renderMarketCards();

  const savedTheme = localStorage.getItem('clan_theme') || 'dark';
  const savedLang = localStorage.getItem('clan_lang') || 'ar';
  setTheme(savedTheme);
  setLanguage(savedLang);

  const themeButton = document.getElementById('themeToggle');
  if (themeButton) {
    themeButton.addEventListener('click', () => {
      const nextTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
      setTheme(nextTheme);
    });
  }

  const langButton = document.getElementById('langToggle');
  if (langButton) {
    langButton.addEventListener('click', () => {
      const currentLang = localStorage.getItem('clan_lang') || 'ar';
      const nextLang = currentLang === 'ar' ? 'en' : 'ar';
      setLanguage(nextLang);
    });
  }

  const usernameDisplay = document.getElementById('usernameDisplay');
  if (usernameDisplay) {
    const stored = getStoredData();
    usernameDisplay.textContent = stored.username || 'العضو';
  }
});
