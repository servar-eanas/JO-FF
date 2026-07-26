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


// ========================================
// وظائف البيانات وتسجيل الدخول
// ========================================

function getStoredData() {
  const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  return parsed;
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function isLoggedIn() {
  return !!(
    localStorage.getItem('clan_logged_in') ||
    localStorage.getItem(USER_KEY)
  );
}


// ========================================
// حماية النصوص من HTML
// ========================================

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}


// ========================================
// عرض الحسابات
// ========================================

function renderAccountCards() {
  const accounts = [
    {
      name: 'الـ Account 1',
      type: 'Battle Royale',
      status: 'متوفر'
    },
    {
      name: 'الـ Account 2',
      type: 'Clash Squad',
      status: 'متوفر'
    },
    {
      name: 'الـ Account 3',
      type: 'Rifles / Rank',
      status: 'مغلق مؤقتاً'
    }
  ];

  const container = document.getElementById('accountCards');

  if (!container) return;

  container.innerHTML = accounts.map(acc => `
    <div class="panel">
      <span class="badge">${escapeHtml(acc.type)}</span>
      <h3>${escapeHtml(acc.name)}</h3>
      <p class="muted">الحالة: ${escapeHtml(acc.status)}</p>
    </div>
  `).join('');
}


// ========================================
// عرض حسابات السوق
// ========================================

function renderMarketCards() {
  const container = document.getElementById('marketCards');

  if (!container) return;

  const stored = JSON.parse(
    localStorage.getItem(MARKET_KEY) || '[]'
  );

  if (!stored.length) {
    container.innerHTML = `
      <div class="market-card">
        <p class="muted">
          لا توجد حسابات معروضة حاليًا.
        </p>
      </div>
    `;

    return;
  }

  container.innerHTML = stored.map(item => `
    <div class="market-card">

      <img
        src="${item.image || 'https://via.placeholder.com/800x400?text=Account'}"
        alt="${escapeHtml(item.name)}"
      />

      <h3>${escapeHtml(item.name)}</h3>

      <p class="muted">
        ${escapeHtml(item.type)}
        •
        ${escapeHtml(item.primeType || 'برايم غير محدد')}
      </p>

      <p>
        ${escapeHtml(item.specs)}
      </p>

      <div class="price-tag">
        ${escapeHtml(item.price)} د.ا
      </div>

    </div>
  `).join('');
}


// ========================================
// عرض الرسائل + تعديل الرسائل
// ========================================

function renderContactMessages() {

  const list = document.getElementById('contactList');

  if (!list) return;

  const messages = JSON.parse(
    localStorage.getItem(CONTACT_KEY) || '[]'
  );

  const currentUser = localStorage.getItem(USER_KEY) || '';

  if (!messages.length) {

    list.innerHTML = `
      <div class="list-item">
        لا توجد رسائل حتى الآن.
      </div>
    `;

    return;
  }


  list.innerHTML = messages.map((msg, index) => {

    /*
      السماح بالتعديل فقط إذا كان اسم الرسالة
      يطابق اسم المستخدم المسجل دخوله.
    */

    const canEdit =
      currentUser &&
      msg.name === currentUser;


    return `

      <div
        class="list-item message-item"
        data-message-index="${index}"
      >

        <!-- عرض الرسالة -->

        <div
          id="message-view-${index}"
          class="message-view"
        >

          <strong>
            ${escapeHtml(msg.name)}
          </strong>

          <br>

          <span class="muted">
            إلى: ${escapeHtml(msg.person)}
          </span>

          <br>

          <div style="margin-top: 8px;">
            ${escapeHtml(msg.text)}
          </div>


          ${
            msg.edited
              ? `
                <small
                  class="muted"
                  style="display:block; margin-top:6px;"
                >
                  تم تعديل الرسالة
                </small>
              `
              : ''
          }


          ${
            canEdit
              ? `

                <button
                  type="button"
                  class="btn secondary small edit-message-btn"
                  data-index="${index}"
                  style="margin-top:10px;"
                >
                  تعديل الرسالة
                </button>

              `
              : ''
          }

        </div>


        <!-- منطقة تعديل الرسالة -->

        ${
          canEdit
            ? `

              <div
                id="message-edit-${index}"
                class="message-edit"
                style="display:none; margin-top:10px;"
              >

                <textarea
                  class="input edit-message-input"
                  rows="5"
                  style="width:100%;"
                >${escapeHtml(msg.text)}</textarea>


                <div
                  style="
                    display:flex;
                    gap:8px;
                    margin-top:10px;
                    flex-wrap:wrap;
                  "
                >

                  <button
                    type="button"
                    class="btn save-message-btn"
                    data-index="${index}"
                  >
                    حفظ التعديل
                  </button>


                  <button
                    type="button"
                    class="btn secondary cancel-message-btn"
                    data-index="${index}"
                  >
                    إلغاء
                  </button>

                </div>


                <div
                  id="edit-status-${index}"
                  class="status"
                  style="margin-top:8px;"
                ></div>

              </div>

            `
            : ''
        }

      </div>

    `;

  }).join('');


  // ========================================
  // زر تعديل الرسالة
  // ========================================

  list
    .querySelectorAll('.edit-message-btn')
    .forEach(button => {

      button.addEventListener('click', () => {

        const index =
          Number(button.dataset.index);

        const view =
          document.getElementById(
            `message-view-${index}`
          );

        const edit =
          document.getElementById(
            `message-edit-${index}`
          );


        if (view && edit) {

          view.style.display = 'none';

          edit.style.display = 'block';

          const input =
            edit.querySelector(
              '.edit-message-input'
            );

          if (input) {

            input.focus();

            input.setSelectionRange(
              input.value.length,
              input.value.length
            );

          }

        }

      });

    });


  // ========================================
  // زر إلغاء التعديل
  // ========================================

  list
    .querySelectorAll('.cancel-message-btn')
    .forEach(button => {

      button.addEventListener('click', () => {

        renderContactMessages();

      });

    });


  // ========================================
  // زر حفظ التعديل
  // ========================================

  list
    .querySelectorAll('.save-message-btn')
    .forEach(button => {

      button.addEventListener('click', () => {

        const index =
          Number(button.dataset.index);


        const editBox =
          document.getElementById(
            `message-edit-${index}`
          );


        const input =
          editBox.querySelector(
            '.edit-message-input'
          );


        const status =
          document.getElementById(
            `edit-status-${index}`
          );


        if (!input || !status) return;


        const newText =
          input.value.trim();


        // التحقق من أن الرسالة ليست فارغة

        if (!newText) {

          status.className =
            'status error';

          status.textContent =
            'لا يمكن حفظ رسالة فارغة.';

          return;

        }


        // جلب الرسائل من التخزين

        const messages =
          JSON.parse(
            localStorage.getItem(
              CONTACT_KEY
            ) || '[]'
          );


        // التحقق من وجود الرسالة

        if (!messages[index]) {

          status.className =
            'status error';

          status.textContent =
            'تعذر العثور على الرسالة.';

          return;

        }


        // التحقق من المستخدم الحالي

        const currentUser =
          localStorage.getItem(
            USER_KEY
          ) || '';


        if (
          messages[index].name !==
          currentUser
        ) {

          status.className =
            'status error';

          status.textContent =
            'لا يمكنك تعديل هذه الرسالة.';

          return;

        }


        // تحديث الرسالة

        messages[index].text =
          newText;


        // تسجيل أن الرسالة تم تعديلها

        messages[index].edited =
          true;


        messages[index].editedAt =
          new Date().toISOString();


        // حفظ الرسالة

        localStorage.setItem(
          CONTACT_KEY,
          JSON.stringify(messages)
        );


        // إعادة عرض الرسائل

        renderContactMessages();

      });

    });

}


// ========================================
// تسجيل الدخول
// ========================================

function bindLoginForm() {

  const form =
    document.getElementById(
      'loginForm'
    );

  if (!form) return;


  const stored =
    getStoredData();


  if (stored.username) {

    document.getElementById(
      'username'
    ).value =
      stored.username;

  }


  form.addEventListener(
    'submit',
    (e) => {

      e.preventDefault();


      const username =
        document
          .getElementById(
            'username'
          )
          .value
          .trim();


      const password =
        document
          .getElementById(
            'password'
          )
          .value
          .trim();


      const status =
        document.getElementById(
          'loginStatus'
        );


      if (!username || !password) {

        status.className =
          'status error';

        status.textContent =
          'يرجى إدخال الاسم وكلمة المرور.';

        return;

      }


      saveData({
        username,
        password
      });


      localStorage.setItem(
        USER_KEY,
        username
      );


      localStorage.setItem(
        'clan_logged_in',
        'true'
      );


      status.className =
        'status';


      status.textContent =
        'تم تسجيل الدخول بنجاح، جاري التوجيه...';


      setTimeout(
        () => {
          window.location.href =
            'intro.html';
        },
        800
      );

    }
  );

}


// ========================================
// إرسال الرسائل
// ========================================

function bindContactForm() {

  const form =
    document.getElementById(
      'contactForm'
    );

  if (!form) return;


  const senderName =
    document.getElementById(
      'senderName'
    );


  /*
    إذا كان المستخدم مسجل الدخول،
    يتم وضع اسمه تلقائيا.
  */

  const loggedInUser =
    localStorage.getItem(
      USER_KEY
    );


  if (
    loggedInUser &&
    senderName
  ) {

    senderName.value =
      loggedInUser;

    senderName.readOnly =
      true;

  }


  form.addEventListener(
    'submit',
    (e) => {

      e.preventDefault();


      const typedName =
        senderName.value.trim();


      const loggedUser =
        localStorage.getItem(
          USER_KEY
        ) || '';


      /*
        استخدام اسم الحساب المسجل
        بدلا من الاسم المكتوب يدويا.
      */

      const name =
        loggedUser ||
        typedName;


      const person =
        document
          .getElementById(
            'contactTo'
          )
          .value;


      const text =
        document
          .getElementById(
            'messageText'
          )
          .value
          .trim();


      const status =
        document.getElementById(
          'contactStatus'
        );


      if (!name || !text) {

        status.className =
          'status error';

        status.textContent =
          'يرجى تعبئة الاسم والنص.';

        return;

      }


      const messages =
        JSON.parse(
          localStorage.getItem(
            CONTACT_KEY
          ) || '[]'
        );


      messages.push({

        name: name,

        person: person,

        text: text,

        edited: false,

        createdAt:
          new Date().toISOString()

      });


      localStorage.setItem(
        CONTACT_KEY,
        JSON.stringify(messages)
      );


      status.className =
        'status';


      status.textContent =
        'تم حفظ الرسالة بنجاح.';


      document.getElementById(
        'messageText'
      ).value = '';


      renderContactMessages();

    }
  );

}


// ========================================
// اختيار المسابقات
// ========================================

function bindCompetitionSelector() {

  const select =
    document.getElementById(
      'competitionSelect'
    );


  const details =
    document.getElementById(
      'competitionDetails'
    );


  if (
    !select ||
    !details
  ) return;


  const renderDetails = () => {

    const item =
      competitionDetails[
        select.value
      ];


    if (!item) return;


    details.innerHTML = `

      <h4>
        ${escapeHtml(item.title)}
      </h4>

      <p>
        <strong>النمط:</strong>
        ${escapeHtml(item.mode)}
      </p>

      <p>
        <strong>الجائزة:</strong>
        ${escapeHtml(item.reward)}
      </p>

      <p>
        <strong>الوصف:</strong>
        ${escapeHtml(item.description)}
      </p>

    `;

  };


  select.addEventListener(
    'change',
    renderDetails
  );


  renderDetails();

}


// ========================================
// إضافة حساب للسوق
// ========================================

function bindMarketForm() {

  const form =
    document.getElementById(
      'marketForm'
    );


  if (!form) return;


  const imageInput =
    document.getElementById(
      'accountImageFile'
    );


  const preview =
    document.createElement(
      'img'
    );


  preview.className =
    'preview-box';


  form.appendChild(
    preview
  );


  imageInput.addEventListener(
    'change',
    () => {

      const file =
        imageInput.files[0];


      if (!file) return;


      const reader =
        new FileReader();


      reader.onload =
        () => {

          preview.src =
            reader.result;


          preview.style.display =
            'block';

        };


      reader.readAsDataURL(
        file
      );

    }
  );


  form.addEventListener(
    'submit',
    (e) => {

      e.preventDefault();


      const name =
        document
          .getElementById(
            'accountName'
          )
          .value
          .trim();


      const type =
        document
          .getElementById(
            'accountType'
          )
          .value;


      const primeType =
        document
          .getElementById(
            'primeType'
          )
          .value;


      const price =
        document
          .getElementById(
            'accountPrice'
          )
          .value
          .trim();


      const specs =
        document
          .getElementById(
            'accountSpecs'
          )
          .value
          .trim();


      const status =
        document.getElementById(
          'marketStatus'
        );


      if (
        !name ||
        !price ||
        !specs
      ) {

        status.className =
          'status error';

        status.textContent =
          'يرجى تعبئة اسم الحساب والسعر والمواصفات.';

        return;

      }


      const accounts =
        JSON.parse(
          localStorage.getItem(
            MARKET_KEY
          ) || '[]'
        );


      accounts.push({

        name,

        type,

        primeType,

        price:
          Number(price),

        image:
          preview.src || '',

        specs

      });


      localStorage.setItem(
        MARKET_KEY,
        JSON.stringify(accounts)
      );


      status.className =
        'status';


      status.textContent =
        'تمت إضافة الحساب بنجاح.';


      form.reset();


      preview.style.display =
        'none';


      renderMarketCards();

    }
  );

}


// ========================================
// حماية الصفحات
// ========================================

function enforceLogin() {

  const currentPage =
    window.location.pathname
      .split('/')
      .pop();


  const protectedPages = [

    'intro.html',

    'clan.html',

    'competitions.html',

    'contact.html',

    'accounts.html',

    'links.html'

  ];


  if (
    !isLoggedIn() &&
    currentPage !== 'index.html'
  ) {

    window.location.href =
      'index.html';

  }


  if (
    isLoggedIn() &&
    currentPage === 'index.html'
  ) {

    window.location.href =
      'intro.html';

  }


  if (
    protectedPages.includes(
      currentPage
    ) &&
    !isLoggedIn()
  ) {

    window.location.href =
      'index.html';

  }

}


// ========================================
// الوضع الليلي والنهاري
// ========================================

function setTheme(theme) {

  document.body.classList.toggle(
    'light-theme',
    theme === 'light'
  );


  localStorage.setItem(
    'clan_theme',
    theme
  );


  const button =
    document.getElementById(
      'themeToggle'
    );


  if (button) {

    button.textContent =
      theme === 'light'
        ? 'الوضع الليلي'
        : 'الوضع النهاري';

  }

}


// ========================================
// تغيير اللغة
// ========================================

function setLanguage(lang) {

  localStorage.setItem(
    'clan_lang',
    lang
  );


  document.documentElement.lang =
    lang;


  document.documentElement.dir =
    lang === 'en'
      ? 'ltr'
      : 'rtl';


  document
    .querySelectorAll(
      '[data-i18n]'
    )
    .forEach(
      (node) => {

        const key =
          node.dataset.i18n;


        const value =
          translations[
            lang
          ][key];


        if (value) {

          node.textContent =
            value;

        }

      }
    );


  const toggle =
    document.getElementById(
      'langToggle'
    );


  if (toggle) {

    toggle.textContent =
      lang === 'en'
        ? 'AR'
        : 'EN';

  }

}


// ========================================
// تشغيل الموقع
// ========================================

document.addEventListener(
  'DOMContentLoaded',
  () => {

    enforceLogin();

    bindLoginForm();

    bindContactForm();

    bindCompetitionSelector();

    bindMarketForm();

    renderAccountCards();

    renderContactMessages();

    renderMarketCards();


    const savedTheme =
      localStorage.getItem(
        'clan_theme'
      ) || 'dark';


    const savedLang =
      localStorage.getItem(
        'clan_lang'
      ) || 'ar';


    setTheme(
      savedTheme
    );


    setLanguage(
      savedLang
    );


    // زر الوضع الليلي

    const themeButton =
      document.getElementById(
        'themeToggle'
      );


    if (themeButton) {

      themeButton.addEventListener(
        'click',
        () => {

          const nextTheme =
            document.body
              .classList
              .contains(
                'light-theme'
              )
              ? 'dark'
              : 'light';


          setTheme(
            nextTheme
          );

        }
      );

    }


    // زر اللغة

    const langButton =
      document.getElementById(
        'langToggle'
      );


    if (langButton) {

      langButton.addEventListener(
        'click',
        () => {

          const currentLang =
            localStorage.getItem(
              'clan_lang'
            ) || 'ar';


          const nextLang =
            currentLang === 'ar'
              ? 'en'
              : 'ar';


          setLanguage(
            nextLang
          );

        }
      );

    }


    // عرض اسم المستخدم

    const usernameDisplay =
      document.getElementById(
        'usernameDisplay'
      );


    if (usernameDisplay) {

      const stored =
        getStoredData();


      usernameDisplay.textContent =
        stored.username ||
        'العضو';

    }

  }
);