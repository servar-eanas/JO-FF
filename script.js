// ==================================================
// JO FF CLAN - SCRIPT.JS
// نظام تسجيل الدخول + الإدارة + الرسائل + الحسابات
// ==================================================


// ==================================================
// بيانات المستخدمين الإداريين
// ==================================================

const ADMIN_USERS = {
  "x2t_3": "mutaz12mutaz09123",
  "_7ep6": "abood12abood09123"
};


// ==================================================
// تشغيل جميع وظائف الموقع عند تحميل الصفحة
// ==================================================

document.addEventListener("DOMContentLoaded", function () {

  // تسجيل الدخول
  setupLogin();

  // حماية الصفحات
  protectPages();

  // حماية صفحة الإدارة
  protectAdminPage();

  // إظهار رابط لوحة الإدارة للمدراء فقط
  addAdminLink();

  // إظهار اسم المستخدم الحالي
  showCurrentUser();

  // تسجيل الخروج
  setupLogout();

  // سجل تسجيل الدخول
  showLoginHistory();

  // نظام الرسائل
  setupContactForm();
  showContactMessages();

  // نظام الحسابات
  setupMarketForm();
  showMarketAccounts();

  // معاينة الصور والفيديو
  setupMediaPreview();

  // الوضع الليلي
  setupTheme();

  // اللغة
  setupLanguage();

});


// ==================================================
// تسجيل الدخول
// ==================================================

function setupLogin() {

  const loginForm = document.getElementById("loginForm");

  // إذا لم تكن الصفحة تحتوي على نموذج تسجيل الدخول
  if (!loginForm) {
    return;
  }

  loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const usernameElement =
      document.getElementById("username");

    const passwordElement =
      document.getElementById("password");

    const statusElement =
      document.getElementById("loginStatus");

    if (!usernameElement || !passwordElement) {
      return;
    }

    const username =
      usernameElement.value.trim();

    const password =
      passwordElement.value;

    // التحقق من الحقول
    if (username === "" || password === "") {

      if (statusElement) {

        statusElement.textContent =
          "يرجى إدخال اسم المستخدم وكلمة المرور";

        statusElement.className =
          "status error";

      }

      return;
    }


    // ==================================================
    // التحقق من المستخدم الإداري
    // ==================================================

    const isAdmin =
      Object.prototype.hasOwnProperty.call(
        ADMIN_USERS,
        username
      ) &&
      ADMIN_USERS[username] === password;


    // ==================================================
    // حفظ المستخدم الحالي
    // ==================================================

    localStorage.setItem(
      "currentUser",
      username
    );

    localStorage.setItem(
      "isAdmin",
      isAdmin ? "true" : "false"
    );


    // ==================================================
    // حفظ سجل تسجيل الدخول
    // ==================================================

    let loginHistory = [];

    try {

      loginHistory =
        JSON.parse(
          localStorage.getItem("loginHistory") || "[]"
        );

      if (!Array.isArray(loginHistory)) {
        loginHistory = [];
      }

    } catch (error) {

      loginHistory = [];

    }


    loginHistory.push({

      username: username,

      time:
        new Date().toLocaleString("ar-JO"),

      isAdmin:
        isAdmin

    });


    localStorage.setItem(
      "loginHistory",
      JSON.stringify(loginHistory)
    );


    // ==================================================
    // رسالة نجاح
    // ==================================================

    if (statusElement) {

      statusElement.textContent =
        "تم تسجيل الدخول بنجاح";

      statusElement.className =
        "status";

    }


    // ==================================================
    // الانتقال إلى الصفحة الرئيسية
    // ==================================================

    setTimeout(function () {

      window.location.href =
        "intro.html";

    }, 500);

  });

}


// ==================================================
// حماية الصفحات
// ==================================================

function protectPages() {

  const currentPage =
    window.location.pathname
      .split("/")
      .pop();


  // إذا كان اسم الصفحة فارغا
  // يعتبر صفحة عامة
  const publicPages = [

    "login.html",

    ""

  ];


  // السماح لصفحة تسجيل الدخول
  if (publicPages.includes(currentPage)) {

    return;

  }


  // الحصول على المستخدم الحالي
  const currentUser =
    localStorage.getItem("currentUser");


  // إذا لم يكن هناك مستخدم مسجل
  if (!currentUser) {

    window.location.href =
      "login.html";

  }

}


// ==================================================
// حماية لوحة الإدارة
// ==================================================

function protectAdminPage() {

  const currentPage =
    window.location.pathname
      .split("/")
      .pop();


  // إذا لم تكن صفحة الإدارة
  if (currentPage !== "admin.html") {

    return;

  }


  const currentUser =
    localStorage.getItem("currentUser");

  const isAdmin =
    localStorage.getItem("isAdmin");


  // التحقق من أن المستخدم من المدراء المسموح لهم
  const allowedAdmin =

    currentUser &&

    Object.prototype.hasOwnProperty.call(
      ADMIN_USERS,
      currentUser
    ) &&

    isAdmin === "true";


  // إذا لم يكن لديه صلاحية
  if (!allowedAdmin) {

    alert(
      "ليس لديك صلاحية لدخول لوحة الإدارة."
    );

    window.location.href =
      "intro.html";

  }

}


// ==================================================
// إظهار رابط لوحة الإدارة للمدراء فقط
// ==================================================

function addAdminLink() {

  const adminLinks =
    document.querySelectorAll(
      "#adminLink, #adminPanelLink"
    );


  if (!adminLinks.length) {

    return;

  }


  const currentUser =
    localStorage.getItem("currentUser");

  const isAdmin =
    localStorage.getItem("isAdmin");


  const isAllowed =

    currentUser &&

    Object.prototype.hasOwnProperty.call(
      ADMIN_USERS,
      currentUser
    ) &&

    isAdmin === "true";


  adminLinks.forEach(function (link) {

    if (isAllowed) {

      link.style.display =
        "inline-flex";

    } else {

      link.style.display =
        "none";

    }

  });

}


// ==================================================
// إظهار اسم المستخدم الحالي
// ==================================================

function showCurrentUser() {

  const currentUser =
    localStorage.getItem("currentUser");


  const elements =
    document.querySelectorAll(
      "#currentUser, #usernameDisplay, .current-user"
    );


  elements.forEach(function (element) {

    if (currentUser) {

      element.textContent =
        currentUser;

    }

  });

}


// ==================================================
// تسجيل الخروج
// ==================================================

function setupLogout() {

  const logoutButtons =
    document.querySelectorAll(
      "#logoutBtn, .logout-btn"
    );


  logoutButtons.forEach(function (button) {

    button.addEventListener(
      "click",
      function (event) {

        event.preventDefault();


        // حذف جلسة المستخدم فقط
        localStorage.removeItem(
          "currentUser"
        );

        localStorage.removeItem(
          "isAdmin"
        );


        // العودة إلى صفحة تسجيل الدخول
        window.location.href =
          "login.html";

      }
    );

  });

}


// ==================================================
// سجل تسجيل الدخول
// ==================================================

function showLoginHistory() {

  const container =
    document.getElementById(
      "loginHistory"
    );


  if (!container) {

    return;

  }


  let history = [];

  try {

    history =
      JSON.parse(
        localStorage.getItem(
          "loginHistory"
        ) || "[]"
      );

    if (!Array.isArray(history)) {
      history = [];
    }

  } catch (error) {

    history = [];

  }


  container.innerHTML = "";


  if (history.length === 0) {

    container.innerHTML =
      "<p>لا يوجد سجل تسجيل دخول</p>";

    return;

  }


  history
    .slice()
    .reverse()
    .forEach(function (item) {

      const element =
        document.createElement("div");


      element.className =
        "list-item";


      element.innerHTML = `

        <strong>
          المستخدم: ${escapeHTML(item.username)}
        </strong>

        <br>

        <span>
          وقت الدخول: ${escapeHTML(item.time)}
        </span>

      `;


      container.appendChild(
        element
      );

    });

}


// ==================================================
// نظام الرسائل - نموذج التواصل
// ==================================================

function setupContactForm() {

  const contactForm =
    document.getElementById(
      "contactForm"
    );


  if (!contactForm) {

    return;

  }


  contactForm.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();


      const senderName =
        document.getElementById(
          "senderName"
        );

      const contactTo =
        document.getElementById(
          "contactTo"
        );

      const messageText =
        document.getElementById(
          "messageText"
        );

      const contactStatus =
        document.getElementById(
          "contactStatus"
        );


      if (
        !senderName ||
        !contactTo ||
        !messageText
      ) {

        return;

      }


      const name =
        senderName.value.trim();

      const receiver =
        contactTo.value;

      const message =
        messageText.value.trim();


      // التحقق من البيانات
      if (
        name === "" ||
        message === ""
      ) {

        if (contactStatus) {

          contactStatus.textContent =
            "يرجى تعبئة الاسم والرسالة";

          contactStatus.className =
            "status error";

        }

        return;

      }


      // الحصول على الرسائل القديمة
      let messages = [];

      try {

        messages =
          JSON.parse(
            localStorage.getItem(
              "contactMessages"
            ) || "[]"
          );

        if (!Array.isArray(messages)) {
          messages = [];
        }

      } catch (error) {

        messages = [];

      }


      // إضافة الرسالة الجديدة
      messages.push({

        id:
          Date.now(),

        sender:
          name,

        receiver:
          receiver,

        message:
          message,

        time:
          new Date().toLocaleString("ar-JO"),

        user:
          localStorage.getItem(
            "currentUser"
          ) || name

      });


      // حفظ الرسائل
      localStorage.setItem(

        "contactMessages",

        JSON.stringify(messages)

      );


      // تنظيف الحقول
      senderName.value = "";

      messageText.value = "";


      // إظهار رسالة النجاح
      if (contactStatus) {

        contactStatus.textContent =
          "تم إرسال الرسالة وحفظها بنجاح";

        contactStatus.className =
          "status";

      }


      // تحديث القائمة
      showContactMessages();

    }
  );

}


// ==================================================
// عرض الرسائل المحفوظة
// ==================================================

function showContactMessages() {

  const container =
    document.getElementById(
      "contactList"
    );


  if (!container) {

    return;

  }


  let messages = [];

  try {

    messages =
      JSON.parse(
        localStorage.getItem(
          "contactMessages"
        ) || "[]"
      );

    if (!Array.isArray(messages)) {
      messages = [];
    }

  } catch (error) {

    messages = [];

  }


  container.innerHTML = "";


  if (messages.length === 0) {

    container.innerHTML =
      "<p>لا توجد رسائل محفوظة</p>";

    return;

  }


  messages
    .slice()
    .reverse()
    .forEach(function (item) {

      const element =
        document.createElement("div");


      element.className =
        "list-item";


      element.innerHTML = `

        <strong>
          من: ${escapeHTML(item.sender)}
        </strong>

        <br>

        <strong>
          إلى: ${escapeHTML(item.receiver)}
        </strong>

        <br>

        <p>
          ${escapeHTML(item.message)}
        </p>

        <small>
          ${escapeHTML(item.time)}
        </small>

      `;


      container.appendChild(
        element
      );

    });

}


// ==================================================
// نظام الحسابات
// ==================================================

function setupMarketForm() {

  const marketForm =
    document.getElementById(
      "marketForm"
    );


  if (!marketForm) {

    return;

  }


  marketForm.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();


      const accountName =
        document.getElementById(
          "accountName"
        );

      const accountType =
        document.getElementById(
          "accountType"
        );

      const primeType =
        document.getElementById(
          "primeType"
        );

      const accountPrice =
        document.getElementById(
          "accountPrice"
        );

      const accountSpecs =
        document.getElementById(
          "accountSpecs"
        );

      const accountImageFile =
        document.getElementById(
          "accountImageFile"
        );

      const marketStatus =
        document.getElementById(
          "marketStatus"
        );


      if (
        !accountName ||
        !accountType ||
        !primeType ||
        !accountPrice ||
        !accountSpecs
      ) {

        return;

      }


      const name =
        accountName.value.trim();

      const type =
        accountType.value;

      const prime =
        primeType.value;

      const price =
        accountPrice.value;

      const specs =
        accountSpecs.value.trim();


      // التحقق
      if (
        name === "" ||
        price === "" ||
        specs === ""
      ) {

        if (marketStatus) {

          marketStatus.textContent =
            "يرجى تعبئة جميع البيانات المطلوبة";

          marketStatus.className =
            "status error";

        }

        return;

      }


      let accounts = [];

      try {

        accounts =
          JSON.parse(
            localStorage.getItem(
              "marketAccounts"
            ) || "[]"
          );

        if (!Array.isArray(accounts)) {
          accounts = [];
        }

      } catch (error) {

        accounts = [];

      }


      // ==================================================
      // حفظ الصور والفيديوهات
      // ==================================================

      const files =
        accountImageFile
          ? Array.from(accountImageFile.files)
          : [];


      const processFiles =
        files.length
          ? Promise.all(
              files.map(function (file) {

                return fileToDataURL(file);

              })
            )
          : Promise.resolve([]);


      processFiles.then(function (mediaFiles) {

        const newAccount = {

          id:
            Date.now(),

          name:
            name,

          type:
            type,

          prime:
            prime,

          price:
            price,

          specs:
            specs,

          media:
            mediaFiles,

          user:
            localStorage.getItem(
              "currentUser"
            ) || "غير معروف",

          time:
            new Date().toLocaleString("ar-JO")

        };


        accounts.push(
          newAccount
        );


        // حفظ الحساب
        localStorage.setItem(

          "marketAccounts",

          JSON.stringify(accounts)

        );


        // تنظيف النموذج
        accountName.value = "";

        accountPrice.value = "";

        accountSpecs.value = "";


        if (accountImageFile) {

          accountImageFile.value =
            "";

        }


        // رسالة نجاح
        if (marketStatus) {

          marketStatus.textContent =
            "تمت إضافة الحساب وحفظه بنجاح";

          marketStatus.className =
            "status";

        }


        // تحديث الحسابات
        showMarketAccounts();

      });

    }
  );

}


// ==================================================
// عرض الحسابات
// ==================================================

function showMarketAccounts() {

  const container =
    document.getElementById(
      "marketCards"
    );


  if (!container) {

    return;

  }


  let accounts = [];

  try {

    accounts =
      JSON.parse(
        localStorage.getItem(
          "marketAccounts"
        ) || "[]"
      );

    if (!Array.isArray(accounts)) {
      accounts = [];
    }

  } catch (error) {

    accounts = [];

  }


  container.innerHTML = "";


  if (accounts.length === 0) {

    container.innerHTML =
      "<p>لا توجد حسابات معروضة حاليا</p>";

    return;

  }


  accounts
    .slice()
    .reverse()
    .forEach(function (account) {

      const card =
        document.createElement("div");


      card.className =
        "panel market-card";


      let mediaHTML = "";


      if (
        account.media &&
        account.media.length > 0
      ) {

        mediaHTML = `

          <div class="account-media">

            ${account.media
              .map(function (media) {

                if (
                  media.type &&
                  media.type.startsWith(
                    "video/"
                  )
                ) {

                  return `

                    <video
                      src="${media.data}"
                      controls
                      style="
                        max-width:100%;
                        border-radius:8px;
                      "
                    ></video>

                  `;

                }


                return `

                  <img
                    src="${media.data}"
                    alt="صورة الحساب"
                    style="
                      max-width:100%;
                      border-radius:8px;
                    "
                  >

                `;

              })
              .join("")}

          </div>

        `;

      }


      card.innerHTML = `

        ${mediaHTML}

        <h3>
          ${escapeHTML(account.name)}
        </h3>

        <p>
          النوع:
          ${escapeHTML(account.type)}
        </p>

        <p>
          ${escapeHTML(account.prime)}
        </p>

        <p>
          السعر:
          ${escapeHTML(String(account.price))}
          دينار
        </p>

        <p>
          ${escapeHTML(account.specs)}
        </p>

        <small>
          أضيف بواسطة:
          ${escapeHTML(account.user)}
        </small>

        <br>

        <small>
          ${escapeHTML(account.time)}
        </small>

      `;


      container.appendChild(
        card
      );

    });

}


// ==================================================
// معاينة الصور والفيديو قبل الإضافة
// ==================================================

function setupMediaPreview() {

  const input =
    document.getElementById(
      "accountImageFile"
    );

  const previewArea =
    document.getElementById(
      "previewArea"
    );

  const previewIndicator =
    document.getElementById(
      "previewIndicator"
    );

  const prevButton =
    document.getElementById(
      "prevMedia"
    );

  const nextButton =
    document.getElementById(
      "nextMedia"
    );


  if (
    !input ||
    !previewArea
  ) {

    return;

  }


  let files = [];

  let currentIndex = 0;


  input.addEventListener(
    "change",
    function () {

      files =
        Array.from(
          input.files
        );

      currentIndex = 0;

      updatePreview();

    }
  );


  function updatePreview() {

    previewArea.innerHTML =
      "";


    if (files.length === 0) {

      if (previewIndicator) {

        previewIndicator.textContent =
          "";

      }

      if (prevButton) {

        prevButton.style.display =
          "none";

      }

      if (nextButton) {

        nextButton.style.display =
          "none";

      }

      return;

    }


    const file =
      files[currentIndex];


    if (
      file.type.startsWith(
        "video/"
      )
    ) {

      const video =
        document.createElement(
          "video"
        );

      video.src =
        URL.createObjectURL(
          file
        );

      video.controls =
        true;

      video.style.maxWidth =
        "100%";

      video.style.maxHeight =
        "100%";

      previewArea.appendChild(
        video
      );

    } else {

      const image =
        document.createElement(
          "img"
        );

      image.src =
        URL.createObjectURL(
          file
        );

      image.style.maxWidth =
        "100%";

      image.style.maxHeight =
        "100%";

      image.style.objectFit =
        "contain";

      previewArea.appendChild(
        image
      );

    }


    if (previewIndicator) {

      previewIndicator.textContent =

        "الملف " +

        (currentIndex + 1) +

        " من " +

        files.length;

    }


    if (prevButton) {

      prevButton.style.display =
        files.length > 1
          ? "inline-flex"
          : "none";

    }


    if (nextButton) {

      nextButton.style.display =
        files.length > 1
          ? "inline-flex"
          : "none";

    }

  }


  if (prevButton) {

    prevButton.addEventListener(
      "click",
      function () {

        if (files.length === 0) {
          return;
        }

        currentIndex =

          (currentIndex - 1 + files.length) %

          files.length;

        updatePreview();

      }
    );

  }


  if (nextButton) {

    nextButton.addEventListener(
      "click",
      function () {

        if (files.length === 0) {
          return;
        }

        currentIndex =

          (currentIndex + 1) %

          files.length;

        updatePreview();

      }
    );

  }

}


// ==================================================
// تحويل الملفات إلى Data URL
// ==================================================

function fileToDataURL(file) {

  return new Promise(function (
    resolve,
    reject
  ) {

    const reader =
      new FileReader();


    reader.onload =
      function () {

        resolve({

          name:
            file.name,

          type:
            file.type,

          data:
            reader.result

        });

      };


    reader.onerror =
      reject;


    reader.readAsDataURL(
      file
    );

  });

}


// ==================================================
// الوضع الليلي
// ==================================================

function setupTheme() {

  const themeButton =
    document.getElementById(
      "themeToggle"
    );


  // استرجاع الوضع المحفوظ
  const savedTheme =
    localStorage.getItem(
      "theme"
    );


  if (
    savedTheme === "dark"
  ) {

    document.body.classList.add(
      "dark-mode"
    );

  }


  if (!themeButton) {

    return;

  }


  themeButton.addEventListener(
    "click",
    function () {

      document.body.classList.toggle(
        "dark-mode"
      );


      const isDark =
        document.body.classList.contains(
          "dark-mode"
        );


      localStorage.setItem(

        "theme",

        isDark
          ? "dark"
          : "light"

      );

    }
  );

}


// ==================================================
// نظام اللغة
// ==================================================

function setupLanguage() {

  const languageButton =
    document.getElementById(
      "langToggle"
    );


  if (!languageButton) {

    return;

  }


  // ملاحظة:
  // هذا الجزء لا يغير اللغة تلقائيا
  // إلا إذا كان لديك نظام ترجمة data-i18n
  // حتى لا تتغير النصوص العربية التي ليس لها ترجمة.


  languageButton.addEventListener(
    "click",
    function () {

      const currentLanguage =
        localStorage.getItem(
          "language"
        ) || "ar";


      const newLanguage =
        currentLanguage === "ar"
          ? "en"
          : "ar";


      localStorage.setItem(
        "language",
        newLanguage
      );


      applyLanguage(
        newLanguage
      );

    }
  );


  const savedLanguage =
    localStorage.getItem(
      "language"
    ) || "ar";


  applyLanguage(
    savedLanguage
  );

}


// ==================================================
// تطبيق اللغة على العناصر التي تحتوي data-i18n فقط
// ==================================================

function applyLanguage(language) {

  const translations = {

    ar: {

      nav_intro:
        "المقدمة",

      nav_clan:
        "عن الكلان",

      nav_competitions:
        "المسابقات",

      nav_contact:
        "التواصل",

      nav_market:
        "الحسابات",

      nav_links:
        "الروابط",

      contacts_title:
        "تواصل مع الإداريين",

      contact_message_title:
        "الرسائل المرسلة",

      market_title:
        "بيع وشراء الحسابات داخل اللعبة",

      market_desc:
        "يمكنك عرض الحسابات المتاحة للبيع، مع صورة، السعر، مواصفات الحساب، وروابط التواصل مع الكلان والقيادة.",

      market_form:
        "إضافة حساب للبيع او طلب شراء",

      label_name:
        "اسم الحساب",

      label_type:
        "نوع الحساب",

      label_price:
        "السعر بالدينار الأردني",

      label_upload:
        "رفع صور/فيديو من الجهاز",

      label_specs:
        "مواصفات الحساب",

      btn_add:
        "إضافة الحساب",

      intro_title:
        "مرحباً بك في كيان JO FF",

      intro_text1:
        "الكلان JO FF هو مجتمع لعب احترافي في Free Fire يضم لاعبين من مختلف المستويات، ويهتم بتطوير الأداء داخل Clash Squad و Battle Royale عبر تنظيم فعاليات، تدريب مستمر، وتوزيع مهام واضحة بين الأعضاء.",

      intro_text2:
        "في الكلان نركز على روح الفريق والعمل الجماعي، مع حرص خاص على احترام النظام، الالتزام بالقواعد، وتحفيز اللاعبين على التقدم مستواهم بانتظام في كل يوم."

    },


    en: {

      nav_intro:
        "Introduction",

      nav_clan:
        "About Clan",

      nav_competitions:
        "Competitions",

      nav_contact:
        "Contact",

      nav_market:
        "Accounts",

      nav_links:
        "Links",

      contacts_title:
        "Contact Administrators",

      contact_message_title:
        "Sent Messages",

      market_title:
        "Buy and Sell Game Accounts",

      market_desc:
        "You can display accounts available for sale with images, price, account specifications, and contact links.",

      market_form:
        "Add an Account for Sale or Request a Purchase",

      label_name:
        "Account Name",

      label_type:
        "Account Type",

      label_price:
        "Price in Jordanian Dinar",

      label_upload:
        "Upload Images/Video",

      label_specs:
        "Account Specifications",

      btn_add:
        "Add Account",

      intro_title:
        "Welcome to JO FF Clan",

      intro_text1:
        "JO FF Clan is a professional Free Fire gaming community with players of different skill levels.",

      intro_text2:
        "We focus on teamwork, organization, rules, and helping players improve their skills every day."

    }

  };


  // تغيير اتجاه الصفحة
  document.documentElement.lang =
    language;

  document.documentElement.dir =
    language === "ar"
      ? "rtl"
      : "ltr";


  // تغيير النصوص التي تحتوي data-i18n فقط
  document
    .querySelectorAll(
      "[data-i18n]"
    )
    .forEach(function (element) {

      const key =
        element.getAttribute(
          "data-i18n"
        );


      if (
        translations[language] &&
        translations[language][key]
      ) {

const navIcon = element.querySelector(".nav-icon");

if (navIcon) {
  const icon = navIcon.textContent;

  element.innerHTML =
    `<span class="nav-icon">${icon}</span>
     <span>${translations[language][key]}</span>`;
} else {
  element.textContent =
    translations[language][key];
}

      }

    });


  // تحديث زر اللغة
  const languageButton =
    document.getElementById(
      "langToggle"
    );


  if (languageButton) {

    languageButton.textContent =

      language === "ar"
        ? "EN"
        : "AR";

  }

}


// ==================================================
// حماية من إدخال HTML ضار
// ==================================================

function escapeHTML(value) {

  return String(value)

    .replace(   
      /&/g,
      "&amp;"
    )

    .replace(
      /</g,
      "&lt;"
    )

    .replace(
      />/g,
      "&gt;"
    )

    .replace(
      /"/g,
      "&quot;"
    )

    .replace(
      /'/g,
      "&#039;"
    );

}             


// ==================================================
// انتقال سلس بين صفحات الموقع
// ==================================================

document.addEventListener("DOMContentLoaded", function () {

  // روابط الانتقال داخل الموقع
  const pageLinks = document.querySelectorAll(
    'a[href]:not([target="_blank"])'
  );

  pageLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

      const href = link.getAttribute("href");

      // تجاهل الروابط الخاصة
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("javascript:") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      // تجاهل الروابط الخارجية
      if (
        link.hostname &&
        link.hostname !== window.location.hostname
      ) {
        return;
      }

      event.preventDefault();

      // إضافة تأثير الخروج
      document.body.classList.add("page-exit");

      // الانتقال بعد انتهاء الحركة
      setTimeout(function () {
        window.location.href = href;
      }, 450);

    });

  });

});

// ==================================================
// نظام إدارة أعضاء JO FF Clan
// ==================================================

document.addEventListener(
  "DOMContentLoaded",
  function () {

    setupMembersSystem();

  }
);


function setupMembersSystem() {

  const memberForm =
    document.getElementById(
      "memberForm"
    );


  const membersList =
    document.getElementById(
      "adminMembersList"
    );


  const status =
    document.getElementById(
      "memberStatus"
    );


  // إذا لم تكن لوحة الإدارة
  if (
    !memberForm ||
    !membersList
  ) {

    return;

  }


  // تحميل الأعضاء
  loadAdminMembers();


  // ==================================================
  // إضافة عضو
  // ==================================================

  memberForm.addEventListener(
    "submit",
    async function (
      event
    ) {

      event.preventDefault();


      const memberId =
        document.getElementById(
          "memberId"
        ).value;


      const name =
        document.getElementById(
          "memberName"
        ).value.trim();


      const rank =
        document.getElementById(
          "memberRank"
        ).value;


      const level =
        document.getElementById(
          "memberLevel"
        ).value.trim();


      const description =
        document.getElementById(
          "memberDescription"
        ).value.trim();


      const image =
        document.getElementById(
          "memberImage"
        ).files[0];


      const formData =
        new FormData();


      formData.append(
        "name",
        name
      );


      formData.append(
        "rank",
        rank
      );


      formData.append(
        "level",
        level
      );


      formData.append(
        "description",
        description
      );


      if (image) {

        formData.append(
          "image",
          image
        );

      }


      try {

        let response;


        if (memberId) {

          response =
            await fetch(
              "/api/members/" +
              memberId,
              {

                method:
                  "PUT",

                body:
                  formData

              }
            );

        } else {

          response =
            await fetch(
              "/api/members",
              {

                method:
                  "POST",

                body:
                  formData

              }
            );

        }


        const data =
          await response.json();


        if (
          !response.ok
        ) {

          throw new Error(
            data.message
          );

        }


        status.textContent =
          data.message;


        status.className =
          "status";


        memberForm.reset();


        document.getElementById(
          "memberId"
        ).value = "";


        loadAdminMembers();


      } catch (error) {

        status.textContent =
          error.message ||
          "حدث خطأ";

        status.className =
          "status error";

      }

    }
  );


  // ==================================================
  // عرض الأعضاء في الإدارة
  // ==================================================

  async function loadAdminMembers() {

    try {

      const response =
        await fetch(
          "/api/members"
        );


      const members =
        await response.json();


      membersList.innerHTML =
        "";


      if (
        members.length === 0
      ) {

        membersList.innerHTML =
          "<p>لا يوجد أعضاء حاليا.</p>";

        return;

      }


      members.forEach(
        function (
          member
        ) {

          const card =
            document.createElement(
              "div"
            );


          card.className =
            "panel";


          const imageHTML =
            member.image

              ? `
                <img
                  src="${member.image}"
                  style="
                    width:100%;
                    height:180px;
                    object-fit:cover;
                    border-radius:12px;
                    margin-bottom:12px;
                  "
                >
              `

              : "";


          card.innerHTML = `

            ${imageHTML}

            <h3>
              👤 ${escapeHTML(member.name)}
            </h3>

            <p>
              🏅 الرتبة:
              ${escapeHTML(member.rank)}
            </p>

            <p>
              ⭐ المستوى:
              ${escapeHTML(member.level || "غير محدد")}
            </p>

            <p>
              ${escapeHTML(member.description || "")}
            </p>

            <div class="admin-actions">

              <button
                class="btn edit-member"
                data-id="${member.id}"
              >
                ✏️ تعديل
              </button>

              <button
                class="btn danger-btn delete-member"
                data-id="${member.id}"
              >
                🗑️ حذف
              </button>

            </div>

          `;


          membersList.appendChild(
            card
          );

        }
      );


      // أزرار التعديل
      document
        .querySelectorAll(
          ".edit-member"
        )
        .forEach(
          function (
            button
          ) {

            button.addEventListener(
              "click",
              function () {

                editMember(
                  Number(
                    button.dataset.id
                  )
                );

              }
            );

          }
        );


      // أزرار الحذف
      document
        .querySelectorAll(
          ".delete-member"
        )
        .forEach(
          function (
            button
          ) {

            button.addEventListener(
              "click",
              function () {

                deleteMember(
                  Number(
                    button.dataset.id
                  )
                );

              }
            );

          }
        );


    } catch (error) {

      membersList.innerHTML =
        "<p>تعذر تحميل الأعضاء.</p>";

    }

  }


  // ==================================================
  // تعديل عضو
  // ==================================================

  async function editMember(
    id
  ) {

    const response =
      await fetch(
        "/api/members"
      );


    const members =
      await response.json();


    const member =
      members.find(
        function (
          item
        ) {

          return item.id === id;

        }
      );


    if (!member) {

      return;

    }


    document.getElementById(
      "memberId"
    ).value =
      member.id;


    document.getElementById(
      "memberName"
    ).value =
      member.name;


    document.getElementById(
      "memberRank"
    ).value =
      member.rank;


    document.getElementById(
      "memberLevel"
    ).value =
      member.level || "";


    document.getElementById(
      "memberDescription"
    ).value =
      member.description || "";


    document.querySelector(
      "#memberForm button[type='submit']"
    ).textContent =
      "💾 حفظ التعديل";


    window.scrollTo({

      top:
        document.getElementById(
          "memberForm"
        ).offsetTop - 100,

      behavior:
        "smooth"

    });

  }


  // ==================================================
  // حذف عضو
  // ==================================================

  async function deleteMember(
    id
  ) {

    const confirmed =
      confirm(
        "هل أنت متأكد من حذف هذا العضو؟"
      );


    if (!confirmed) {

      return;

    }


    try {

      const response =
        await fetch(
          "/api/members/" +
          id,
          {

            method:
              "DELETE"

          }
        );


      const data =
        await response.json();


      if (
        !response.ok
      ) {

        throw new Error(
          data.message
        );

      }


      status.textContent =
        data.message;


      loadAdminMembers();


    } catch (error) {

      alert(
        error.message
      );

    }

  }

}

// firebase-config.js

const firebaseConfig = {
  apiKey: "AIzaSyCFCzrqmUGEyk0uc_mDWlGGkwDbZfTpTvU",
  authDomain: "jo-ff-clan-c97c3.firebaseapp.com",
  projectId: "jo-ff-clan-c97c3",
  storageBucket: "jo-ff-clan-c97c3.firebasestorage.app",
  messagingSenderId: "619526988519",
  appId: "1:619526988519:web:7fd63f016a93191bf23842",
  measurementId: "G-6KRVTVSC5F"
};





