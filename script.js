// ========================================
// إعدادات التخزين
// ========================================

const CONTACT_KEY = "clan_contact_messages";
const MARKET_KEY = "clan_market_accounts";
const USER_KEY = "user";
const THEME_KEY = "clan_theme";
const LANG_KEY = "clan_lang";


// ========================================
// حماية النصوص من أكواد HTML
// ========================================

function escapeHtml(text) {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


// ========================================
// الرسائل - عرض الرسائل
// ========================================

function renderContactMessages() {

  const contactList =
    document.getElementById("contactList");

  // إذا لم تكن صفحة التواصل موجودة
  if (!contactList) return;


  // جلب الرسائل المحفوظة
  const messages =
    JSON.parse(
      localStorage.getItem(CONTACT_KEY) || "[]"
    );


  // إذا لم توجد رسائل
  if (messages.length === 0) {

    contactList.innerHTML = `
      <div class="list-item">
        لا توجد رسائل حتى الآن.
      </div>
    `;

    return;
  }


  // عرض جميع الرسائل
  contactList.innerHTML = messages.map(
    (message, index) => {

      return `
        <div
          class="list-item"
          id="message-${index}"
          style="margin-bottom:12px;"
        >

          <!-- ================================= -->
          <!-- عرض الرسالة -->
          <!-- ================================= -->

          <div id="message-view-${index}">

            <strong>
              ${escapeHtml(message.name)}
            </strong>

            <br>

            <span class="muted">
              إلى:
              ${escapeHtml(message.person)}
            </span>

            <p
              style="
                margin-top:10px;
                white-space:pre-wrap;
              "
            >
              ${escapeHtml(message.text)}
            </p>


            ${
              message.edited
                ? `
                  <small
                    class="muted"
                    style="
                      display:block;
                      margin-bottom:8px;
                    "
                  >
                    تم تعديل الرسالة
                  </small>
                `
                : ""
            }


            <!-- أزرار التحكم -->

            <div
              style="
                display:flex;
                gap:8px;
                flex-wrap:wrap;
                margin-top:10px;
              "
            >

              <!-- زر تعديل -->

              <button
                type="button"
                class="btn secondary small"
                onclick="editMessage(${index})"
              >
                تعديل الرسالة
              </button>


              <!-- زر حذف -->

              <button
                type="button"
                class="btn small"
                onclick="deleteMessage(${index})"
              >
                حذف الرسالة
              </button>

            </div>

          </div>


          <!-- ================================= -->
          <!-- منطقة تعديل الرسالة -->
          <!-- ================================= -->

          <div
            id="message-edit-${index}"
            style="display:none;"
          >

            <label>
              تعديل الرسالة
            </label>


            <textarea
              id="message-input-${index}"
              class="input"
              rows="5"
              style="
                width:100%;
                margin-top:10px;
              "
            >${escapeHtml(message.text)}</textarea>


            <!-- أزرار الحفظ والإلغاء -->

            <div
              style="
                display:flex;
                gap:8px;
                margin-top:10px;
                flex-wrap:wrap;
              "
            >

              <!-- حفظ -->

              <button
                type="button"
                class="btn small"
                onclick="saveMessage(${index})"
              >
                حفظ التعديل
              </button>


              <!-- إلغاء -->

              <button
                type="button"
                class="btn secondary small"
                onclick="cancelEdit(${index})"
              >
                إلغاء
              </button>

            </div>


            <!-- رسالة الخطأ -->

            <div
              id="edit-status-${index}"
              class="status"
            ></div>

          </div>

        </div>
      `;

    }
  ).join("");

}


// ========================================
// فتح تعديل الرسالة
// ========================================

function editMessage(index) {

  const messageView =
    document.getElementById(
      `message-view-${index}`
    );


  const messageEdit =
    document.getElementById(
      `message-edit-${index}`
    );


  if (
    !messageView ||
    !messageEdit
  ) {
    return;
  }


  // إخفاء الرسالة الأصلية

  messageView.style.display =
    "none";


  // إظهار صندوق التعديل

  messageEdit.style.display =
    "block";


  // التركيز على مربع النص

  const input =
    document.getElementById(
      `message-input-${index}`
    );


  if (input) {

    input.focus();

  }

}


// ========================================
// حفظ تعديل الرسالة
// ========================================

function saveMessage(index) {

  const input =
    document.getElementById(
      `message-input-${index}`
    );


  const status =
    document.getElementById(
      `edit-status-${index}`
    );


  if (!input) {
    return;
  }


  // الحصول على النص الجديد

  const newText =
    input.value.trim();


  // منع الرسالة الفارغة

  if (newText === "") {

    if (status) {

      status.className =
        "status error";

      status.textContent =
        "لا يمكن أن تكون الرسالة فارغة.";

    }

    return;

  }


  // جلب الرسائل

  const messages =
    JSON.parse(
      localStorage.getItem(
        CONTACT_KEY
      ) || "[]"
    );


  // التأكد من وجود الرسالة

  if (!messages[index]) {

    if (status) {

      status.className =
        "status error";

      status.textContent =
        "حدث خطأ، لم يتم العثور على الرسالة.";

    }

    return;

  }


  // تحديث النص

  messages[index].text =
    newText;


  // تسجيل أن الرسالة تم تعديلها

  messages[index].edited =
    true;


  // حفظ وقت التعديل

  messages[index].editedAt =
    new Date().toISOString();


  // حفظ البيانات

  localStorage.setItem(
    CONTACT_KEY,
    JSON.stringify(messages)
  );


  // تحديث قائمة الرسائل

  renderContactMessages();

}


// ========================================
// إلغاء تعديل الرسالة
// ========================================

function cancelEdit(index) {

  const messageView =
    document.getElementById(
      `message-view-${index}`
    );


  const messageEdit =
    document.getElementById(
      `message-edit-${index}`
    );


  if (
    !messageView ||
    !messageEdit
  ) {
    return;
  }


  // إخفاء صندوق التعديل

  messageEdit.style.display =
    "none";


  // إظهار الرسالة

  messageView.style.display =
    "block";

}


// ========================================
// حذف الرسالة
// ========================================

function deleteMessage(index) {

  // تأكيد الحذف

  const confirmDelete =
    confirm(
      "هل أنت متأكد أنك تريد حذف هذه الرسالة؟"
    );


  // إذا ضغط المستخدم إلغاء

  if (!confirmDelete) {

    return;

  }


  // جلب الرسائل

  const messages =
    JSON.parse(
      localStorage.getItem(
        CONTACT_KEY
      ) || "[]"
    );


  // التأكد من وجود الرسالة

  if (!messages[index]) {

    alert(
      "لم يتم العثور على الرسالة."
    );

    return;

  }


  // حذف الرسالة

  messages.splice(
    index,
    1
  );


  // حفظ القائمة الجديدة

  localStorage.setItem(
    CONTACT_KEY,
    JSON.stringify(messages)
  );


  // تحديث الرسائل

  renderContactMessages();

}


// ========================================
// إرسال رسالة جديدة
// ========================================

function bindContactForm() {

  const form =
    document.getElementById(
      "contactForm"
    );


  // إذا لم توجد صفحة التواصل

  if (!form) return;


  // استقبال إرسال النموذج

  form.addEventListener(
    "submit",
    function(event) {

      event.preventDefault();


      // اسم المستخدم

      const senderName =
        document
          .getElementById(
            "senderName"
          )
          .value
          .trim();


      // الشخص المراد التواصل معه

      const contactTo =
        document
          .getElementById(
            "contactTo"
          )
          .value;


      // نص الرسالة

      const messageText =
        document
          .getElementById(
            "messageText"
          )
          .value
          .trim();


      // مكان حالة الرسالة

      const status =
        document.getElementById(
          "contactStatus"
        );


      // التحقق من البيانات

      if (
        senderName === "" ||
        messageText === ""
      ) {

        status.className =
          "status error";

        status.textContent =
          "يرجى كتابة الاسم والرسالة.";

        return;

      }


      // جلب الرسائل القديمة

      const messages =
        JSON.parse(
          localStorage.getItem(
            CONTACT_KEY
          ) || "[]"
        );


      // إنشاء الرسالة

      const newMessage = {

        id:
          Date.now(),

        name:
          senderName,

        person:
          contactTo,

        text:
          messageText,

        edited:
          false,

        createdAt:
          new Date().toISOString()

      };


      // إضافة الرسالة

      messages.push(
        newMessage
      );


      // حفظ الرسائل

      localStorage.setItem(
        CONTACT_KEY,
        JSON.stringify(messages)
      );


      // رسالة نجاح

      status.className =
        "status";

      status.textContent =
        "تم إرسال الرسالة بنجاح.";


      // تفريغ مربع الرسالة

      document.getElementById(
        "messageText"
      ).value = "";


      // تحديث القائمة

      renderContactMessages();

    }
  );

}


// ========================================
// عرض الحسابات
// ========================================

function renderMarketCards() {

  const marketCards =
    document.getElementById(
      "marketCards"
    );


  // إذا لم تكن صفحة الحسابات

  if (!marketCards) return;


  // جلب الحسابات

  const accounts =
    JSON.parse(
      localStorage.getItem(
        MARKET_KEY
      ) || "[]"
    );


  // إذا لا توجد حسابات

  if (accounts.length === 0) {

    marketCards.innerHTML = `
      <div class="market-card">
        <p class="muted">
          لا توجد حسابات معروضة حاليا.
        </p>
      </div>
    `;

    return;

  }


  // عرض الحسابات

  marketCards.innerHTML =
    accounts.map(
      (account) => {

        return `
          <div class="market-card">

            ${
              account.image
                ? `
                  <img
                    src="${account.image}"
                    alt="${escapeHtml(account.name)}"
                  >
                `
                : ""
            }


            <h3>
              ${escapeHtml(account.name)}
            </h3>


            <p>
              النوع:
              ${escapeHtml(account.type)}
            </p>


            <p>
              ${escapeHtml(
                account.primeType || ""
              )}
            </p>


            <p>
              السعر:
              ${escapeHtml(account.price)}
              دينار
            </p>


            <p>
              ${escapeHtml(account.specs)}
            </p>

          </div>
        `;

      }
    ).join("");

}


// ========================================
// إضافة حساب جديد
// ========================================

function bindMarketForm() {

  const form =
    document.getElementById(
      "marketForm"
    );


  // إذا لم تكن صفحة الحسابات

  if (!form) return;


  // إرسال النموذج

  form.addEventListener(
    "submit",
    function(event) {

      event.preventDefault();


      // اسم الحساب

      const accountName =
        document
          .getElementById(
            "accountName"
          )
          .value
          .trim();


      // نوع الحساب

      const accountType =
        document
          .getElementById(
            "accountType"
          )
          .value;


      // نوع البرايم

      const primeType =
        document
          .getElementById(
            "primeType"
          )
          .value;


      // السعر

      const accountPrice =
        document
          .getElementById(
            "accountPrice"
          )
          .value
          .trim();


      // المواصفات

      const accountSpecs =
        document
          .getElementById(
            "accountSpecs"
          )
          .value
          .trim();


      // صورة الحساب

      const imageFile =
        document
          .getElementById(
            "accountImageFile"
          );


      // مكان الحالة

      const status =
        document.getElementById(
          "marketStatus"
        );


      // التحقق

      if (
        accountName === "" ||
        accountPrice === "" ||
        accountSpecs === ""
      ) {

        status.className =
          "status error";

        status.textContent =
          "يرجى تعبئة جميع البيانات.";

        return;

      }


      // دالة حفظ الحساب

      const saveAccount =
        function(imageData) {

          // جلب الحسابات

          const accounts =
            JSON.parse(
              localStorage.getItem(
                MARKET_KEY
              ) || "[]"
            );


          // إضافة الحساب

          accounts.push({

            name:
              accountName,

            type:
              accountType,

            primeType:
              primeType,

            price:
              accountPrice,

            specs:
              accountSpecs,

            image:
              imageData || ""

          });


          // حفظ الحسابات

          localStorage.setItem(
            MARKET_KEY,
            JSON.stringify(accounts)
          );


          // رسالة نجاح

          status.className =
            "status";

          status.textContent =
            "تمت إضافة الحساب بنجاح.";


          // إعادة تعيين النموذج

          form.reset();


          // تحديث الحسابات

          renderMarketCards();

        };


      // إذا تم اختيار صورة

      if (
        imageFile &&
        imageFile.files &&
        imageFile.files[0]
      ) {

        const reader =
          new FileReader();


        reader.onload =
          function() {

            saveAccount(
              reader.result
            );

          };


        reader.readAsDataURL(
          imageFile.files[0]
        );

      }

      // بدون صورة

      else {

        saveAccount("");

      }

    }
  );

}


// ========================================
// الوضع الليلي
// ========================================

function setupTheme() {

  const themeToggle =
    document.getElementById(
      "themeToggle"
    );


  // جلب الوضع المحفوظ

  const savedTheme =
    localStorage.getItem(
      THEME_KEY
    );


  // تشغيل الوضع الفاتح

  if (
    savedTheme === "light"
  ) {

    document.body.classList.add(
      "light-theme"
    );

  }


  // إذا لم يوجد الزر

  if (!themeToggle) return;


  // عند الضغط

  themeToggle.addEventListener(
    "click",
    function() {

      // تبديل الوضع

      document.body.classList.toggle(
        "light-theme"
      );


      // معرفة الوضع الحالي

      const isLight =
        document.body.classList.contains(
          "light-theme"
        );


      // حفظ الوضع

      localStorage.setItem(
        THEME_KEY,
        isLight
          ? "light"
          : "dark"
      );

    }
  );

}


// ========================================
// تغيير اللغة
// ========================================

function setupLanguage() {

  const langToggle =
    document.getElementById(
      "langToggle"
    );


  // إذا لم يوجد الزر

  if (!langToggle) return;


  // عند الضغط

  langToggle.addEventListener(
    "click",
    function() {

      // اللغة الحالية

      const currentLang =
        document.documentElement.lang;


      // التحويل إلى الإنجليزية

      if (
        currentLang === "ar"
      ) {

        document.documentElement.lang =
          "en";

        document.documentElement.dir =
          "ltr";

        langToggle.textContent =
          "AR";

        localStorage.setItem(
          LANG_KEY,
          "en"
        );

      }


      // التحويل إلى العربية

      else {

        document.documentElement.lang =
          "ar";

        document.documentElement.dir =
          "rtl";

        langToggle.textContent =
          "EN";

        localStorage.setItem(
          LANG_KEY,
          "ar"
        );

      }

    }
  );

}


// ========================================
// تشغيل الموقع
// ========================================

document.addEventListener(
  "DOMContentLoaded",
  function() {

    // تشغيل نموذج الرسائل

    bindContactForm();


    // عرض الرسائل

    renderContactMessages();


    // تشغيل نموذج الحسابات

    bindMarketForm();


    // عرض الحسابات

    renderMarketCards();


    // تشغيل الوضع الليلي

    setupTheme();


    // تشغيل اللغة

    setupLanguage();

  }
);
