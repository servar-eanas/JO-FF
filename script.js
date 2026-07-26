// ========================================
// إعدادات التخزين
// ========================================

const CONTACT_KEY = "clan_contact_messages";
const MARKET_KEY = "clan_market_accounts";
const THEME_KEY = "clan_theme";
const LANG_KEY = "clan_lang";


// ========================================
// حماية النصوص
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
// ================= الرسائل ================
// ========================================


// عرض الرسائل

function renderContactMessages() {

  const contactList =
    document.getElementById("contactList");

  if (!contactList) return;


  const messages =
    JSON.parse(
      localStorage.getItem(CONTACT_KEY) || "[]"
    );


  if (messages.length === 0) {

    contactList.innerHTML = `
      <div class="list-item">
        لا توجد رسائل حتى الآن.
      </div>
    `;

    return;
  }


  contactList.innerHTML =
    messages.map((message, index) => {

      return `

        <div
          class="list-item"
          id="message-${index}"
          style="margin-bottom:12px;"
        >


          <!-- عرض الرسالة -->

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
                    style="display:block;margin-bottom:8px;"
                  >
                    تم تعديل الرسالة
                  </small>
                `
                : ""
            }


            <!-- أزرار الرسالة -->

            <div
              style="
                display:flex;
                gap:8px;
                flex-wrap:wrap;
                margin-top:10px;
              "
            >

              <button
                type="button"
                class="btn secondary small"
                onclick="editMessage(${index})"
              >
                تعديل الرسالة
              </button>


              <button
                type="button"
                class="btn small"
                onclick="deleteMessage(${index})"
              >
                حذف الرسالة
              </button>

            </div>

          </div>


          <!-- نموذج تعديل الرسالة -->

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
              style="width:100%;margin-top:10px;"
            >${escapeHtml(message.text)}</textarea>


            <div
              style="
                display:flex;
                gap:8px;
                flex-wrap:wrap;
                margin-top:10px;
              "
            >

              <button
                type="button"
                class="btn small"
                onclick="saveMessage(${index})"
              >
                حفظ التعديل
              </button>


              <button
                type="button"
                class="btn secondary small"
                onclick="cancelEdit(${index})"
              >
                إلغاء
              </button>

            </div>


            <div
              id="edit-status-${index}"
              class="status"
            ></div>

          </div>

        </div>

      `;

    }).join("");

}


// فتح تعديل الرسالة

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


  messageView.style.display =
    "none";


  messageEdit.style.display =
    "block";


  const input =
    document.getElementById(
      `message-input-${index}`
    );


  if (input) {

    input.focus();

  }

}


// حفظ تعديل الرسالة

function saveMessage(index) {

  const input =
    document.getElementById(
      `message-input-${index}`
    );


  const status =
    document.getElementById(
      `edit-status-${index}`
    );


  if (!input) return;


  const newText =
    input.value.trim();


  if (newText === "") {

    if (status) {

      status.className =
        "status error";

      status.textContent =
        "لا يمكن أن تكون الرسالة فارغة.";

    }

    return;
  }


  const messages =
    JSON.parse(
      localStorage.getItem(
        CONTACT_KEY
      ) || "[]"
    );


  if (!messages[index]) {

    return;

  }


  messages[index].text =
    newText;


  messages[index].edited =
    true;


  messages[index].editedAt =
    new Date().toISOString();


  localStorage.setItem(
    CONTACT_KEY,
    JSON.stringify(messages)
  );


  renderContactMessages();

}


// إلغاء تعديل الرسالة

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


  messageEdit.style.display =
    "none";


  messageView.style.display =
    "block";

}


// حذف الرسالة

function deleteMessage(index) {

  const confirmDelete =
    confirm(
      "هل أنت متأكد أنك تريد حذف هذه الرسالة؟"
    );


  if (!confirmDelete) {

    return;

  }


  const messages =
    JSON.parse(
      localStorage.getItem(
        CONTACT_KEY
      ) || "[]"
    );


  if (!messages[index]) {

    alert(
      "لم يتم العثور على الرسالة."
    );

    return;

  }


  messages.splice(
    index,
    1
  );


  localStorage.setItem(
    CONTACT_KEY,
    JSON.stringify(messages)
  );


  renderContactMessages();

}


// إرسال رسالة جديدة

function bindContactForm() {

  const form =
    document.getElementById(
      "contactForm"
    );


  if (!form) return;


  form.addEventListener(
    "submit",
    function(event) {

      event.preventDefault();


      const senderName =
        document
          .getElementById(
            "senderName"
          )
          .value
          .trim();


      const contactTo =
        document
          .getElementById(
            "contactTo"
          )
          .value;


      const messageText =
        document
          .getElementById(
            "messageText"
          )
          .value
          .trim();


      const status =
        document.getElementById(
          "contactStatus"
        );


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


      const messages =
        JSON.parse(
          localStorage.getItem(
            CONTACT_KEY
          ) || "[]"
        );


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


      messages.push(
        newMessage
      );


      localStorage.setItem(
        CONTACT_KEY,
        JSON.stringify(messages)
      );


      status.className =
        "status";


      status.textContent =
        "تم إرسال الرسالة بنجاح.";


      document.getElementById(
        "messageText"
      ).value = "";


      renderContactMessages();

    }
  );

}



// ========================================
// ================ الحسابات ===============
// ========================================


// عرض الحسابات

function renderMarketCards() {

  const marketCards =
    document.getElementById(
      "marketCards"
    );


  if (!marketCards) return;


  const accounts =
    JSON.parse(
      localStorage.getItem(
        MARKET_KEY
      ) || "[]"
    );


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


  marketCards.innerHTML =
    accounts.map((account, index) => {

      return `

        <div
          class="market-card"
          id="account-${index}"
        >


          <!-- صورة الحساب -->

          ${
            account.image
              ? `
                <img
                  src="${account.image}"
                  alt="${escapeHtml(account.name)}"
                  style="
                    width:100%;
                    max-width:300px;
                    height:auto;
                    border-radius:10px;
                    margin-bottom:10px;
                  "
                >
              `
              : ""
          }


          <!-- عرض بيانات الحساب -->

          <div id="account-view-${index}">

            <h3>
              ${escapeHtml(account.name)}
            </h3>


            <p>
              النوع:
              ${escapeHtml(account.type)}
            </p>


            <p>
              البرايم:
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


            ${
              account.edited
                ? `
                  <small
                    class="muted"
                    style="display:block;margin-bottom:8px;"
                  >
                    تم تعديل الحساب
                  </small>
                `
                : ""
            }


            <!-- أزرار الحساب -->

            <div
              style="
                display:flex;
                gap:8px;
                flex-wrap:wrap;
                margin-top:12px;
              "
            >

              <button
                type="button"
                class="btn secondary small"
                onclick="editAccount(${index})"
              >
                تعديل الحساب
              </button>


              <button
                type="button"
                class="btn small"
                onclick="deleteAccount(${index})"
              >
                حذف الحساب
              </button>

            </div>

          </div>


          <!-- ================================= -->
          <!-- نموذج تعديل الحساب -->
          <!-- ================================= -->

          <div
            id="account-edit-${index}"
            style="
              display:none;
              margin-top:15px;
            "
          >


            <label>
              اسم الحساب
            </label>


            <input
              id="edit-account-name-${index}"
              class="input"
              type="text"
              value="${escapeHtml(account.name)}"
            >


            <label>
              نوع الحساب
            </label>


            <select
              id="edit-account-type-${index}"
            >

              <option
                value="نادر"
                ${
                  account.type === "نادر"
                    ? "selected"
                    : ""
                }
              >
                نادر
              </option>


              <option
                value="كلاسيكي"
                ${
                  account.type === "كلاسيكي"
                    ? "selected"
                    : ""
                }
              >
                كلاسيكي
              </option>


              <option
                value="احداث"
                ${
                  account.type === "احداث"
                    ? "selected"
                    : ""
                }
              >
                احداث
              </option>


              <option
                value="مختلط"
                ${
                  account.type === "مختلط"
                    ? "selected"
                    : ""
                }
              >
                مختلط
              </option>

            </select>


            <label>
              البرايم
            </label>


            <select
              id="edit-account-prime-${index}"
            >

              ${
                [
                  "برايم 1",
                  "برايم 2",
                  "برايم 3",
                  "برايم 4",
                  "برايم 5",
                  "برايم 6",
                  "برايم 7",
                  "برايم 8"
                ]
                .map(prime => `
                  <option
                    value="${prime}"
                    ${
                      account.primeType === prime
                        ? "selected"
                        : ""
                    }
                  >
                    ${prime}
                  </option>
                `)
                .join("")
              }

            </select>


            <label>
              السعر بالدينار الأردني
            </label>


            <input
              id="edit-account-price-${index}"
              class="input"
              type="number"
              value="${escapeHtml(account.price)}"
            >


            <label>
              مواصفات الحساب
            </label>


            <textarea
              id="edit-account-specs-${index}"
              rows="4"
            >${escapeHtml(account.specs)}</textarea>


            <label>
              تغيير صورة الحساب
            </label>


            <input
              id="edit-account-image-${index}"
              class="input"
              type="file"
              accept="image/*"
            >


            <!-- أزرار التعديل -->

            <div
              style="
                display:flex;
                gap:8px;
                flex-wrap:wrap;
                margin-top:10px;
              "
            >

              <button
                type="button"
                class="btn small"
                onclick="saveAccountEdit(${index})"
              >
                حفظ التعديل
              </button>


              <button
                type="button"
                class="btn secondary small"
                onclick="cancelAccountEdit(${index})"
              >
                إلغاء
              </button>

            </div>


            <div
              id="account-edit-status-${index}"
              class="status"
            ></div>

          </div>

        </div>

      `;

    }).join("");

}


// فتح تعديل الحساب

function editAccount(index) {

  const accountView =
    document.getElementById(
      `account-view-${index}`
    );


  const accountEdit =
    document.getElementById(
      `account-edit-${index}`
    );


  if (
    !accountView ||
    !accountEdit
  ) {
    return;
  }


  accountView.style.display =
    "none";


  accountEdit.style.display =
    "block";

}


// حفظ تعديل الحساب

function saveAccountEdit(index) {

  const nameInput =
    document.getElementById(
      `edit-account-name-${index}`
    );


  const typeInput =
    document.getElementById(
      `edit-account-type-${index}`
    );


  const primeInput =
    document.getElementById(
      `edit-account-prime-${index}`
    );


  const priceInput =
    document.getElementById(
      `edit-account-price-${index}`
    );


  const specsInput =
    document.getElementById(
      `edit-account-specs-${index}`
    );


  const imageInput =
    document.getElementById(
      `edit-account-image-${index}`
    );


  const status =
    document.getElementById(
      `account-edit-status-${index}`
    );


  if (
    !nameInput ||
    !typeInput ||
    !primeInput ||
    !priceInput ||
    !specsInput
  ) {
    return;
  }


  const name =
    nameInput.value.trim();


  const type =
    typeInput.value;


  const primeType =
    primeInput.value;


  const price =
    priceInput.value.trim();


  const specs =
    specsInput.value.trim();


  if (
    name === "" ||
    price === "" ||
    specs === ""
  ) {

    if (status) {

      status.className =
        "status error";

      status.textContent =
        "يرجى تعبئة جميع البيانات.";

    }

    return;

  }


  const accounts =
    JSON.parse(
      localStorage.getItem(
        MARKET_KEY
      ) || "[]"
    );


  if (!accounts[index]) {

    return;

  }


  // تحديث البيانات

  accounts[index].name =
    name;


  accounts[index].type =
    type;


  accounts[index].primeType =
    primeType;


  accounts[index].price =
    price;


  accounts[index].specs =
    specs;


  accounts[index].edited =
    true;


  accounts[index].editedAt =
    new Date().toISOString();


  // إذا اختار صورة جديدة

  if (
    imageInput &&
    imageInput.files &&
    imageInput.files[0]
  ) {

    const reader =
      new FileReader();


    reader.onload =
      function() {

        accounts[index].image =
          reader.result;


        localStorage.setItem(
          MARKET_KEY,
          JSON.stringify(accounts)
        );


        renderMarketCards();

      };


    reader.readAsDataURL(
      imageInput.files[0]
    );

  }

  else {

    // حفظ بدون تغيير الصورة

    localStorage.setItem(
      MARKET_KEY,
      JSON.stringify(accounts)
    );


    renderMarketCards();

  }

}


// إلغاء تعديل الحساب

function cancelAccountEdit(index) {

  const accountView =
    document.getElementById(
      `account-view-${index}`
    );


  const accountEdit =
    document.getElementById(
      `account-edit-${index}`
    );


  if (
    !accountView ||
    !accountEdit
  ) {
    return;
  }


  accountEdit.style.display =
    "none";


  accountView.style.display =
    "block";

}


// حذف الحساب

function deleteAccount(index) {

  const confirmDelete =
    confirm(
      "هل أنت متأكد أنك تريد حذف هذا الحساب؟"
    );


  if (!confirmDelete) {

    return;

  }


  const accounts =
    JSON.parse(
      localStorage.getItem(
        MARKET_KEY
      ) || "[]"
    );


  if (!accounts[index]) {

    alert(
      "لم يتم العثور على الحساب."
    );

    return;

  }


  accounts.splice(
    index,
    1
  );


  localStorage.setItem(
    MARKET_KEY,
    JSON.stringify(accounts)
  );


  renderMarketCards();

}


// إضافة حساب جديد

function bindMarketForm() {

  const form =
    document.getElementById(
      "marketForm"
    );


  if (!form) return;


  form.addEventListener(
    "submit",
    function(event) {

      event.preventDefault();


      const accountName =
        document
          .getElementById(
            "accountName"
          )
          .value
          .trim();


      const accountType =
        document
          .getElementById(
            "accountType"
          )
          .value;


      const primeType =
        document
          .getElementById(
            "primeType"
          )
          .value;


      const accountPrice =
        document
          .getElementById(
            "accountPrice"
          )
          .value
          .trim();


      const accountSpecs =
        document
          .getElementById(
            "accountSpecs"
          )
          .value
          .trim();


      const imageFile =
        document
          .getElementById(
            "accountImageFile"
          );


      const status =
        document.getElementById(
          "marketStatus"
        );


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


      const saveAccount =
        function(imageData) {

          const accounts =
            JSON.parse(
              localStorage.getItem(
                MARKET_KEY
              ) || "[]"
            );


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
              imageData || "",

            edited:
              false

          });


          localStorage.setItem(
            MARKET_KEY,
            JSON.stringify(accounts)
          );


          status.className =
            "status";


          status.textContent =
            "تمت إضافة الحساب بنجاح.";


          form.reset();


          renderMarketCards();

        };


      // رفع الصورة

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

      else {

        saveAccount("");

      }

    }
  );

}



// ========================================
// =============== الوضع الليلي =============
// ========================================

function setupTheme() {

  const themeToggle =
    document.getElementById(
      "themeToggle"
    );


  const savedTheme =
    localStorage.getItem(
      THEME_KEY
    );


  if (
    savedTheme === "light"
  ) {

    document.body.classList.add(
      "light-theme"
    );

  }


  if (!themeToggle) return;


  themeToggle.addEventListener(
    "click",
    function() {

      document.body.classList.toggle(
        "light-theme"
      );


      const isLight =
        document.body.classList.contains(
          "light-theme"
        );


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
// ================ تغيير اللغة ==============
// ========================================

function setupLanguage() {

  const langToggle =
    document.getElementById(
      "langToggle"
    );


  if (!langToggle) return;


  const savedLang =
    localStorage.getItem(
      LANG_KEY
    );


  if (
    savedLang === "en"
  ) {

    document.documentElement.lang =
      "en";

    document.documentElement.dir =
      "ltr";

    langToggle.textContent =
      "AR";

  }


  langToggle.addEventListener(
    "click",
    function() {

      const currentLang =
        document.documentElement.lang;


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
// ================ تشغيل الموقع =============
// ========================================

document.addEventListener(
  "DOMContentLoaded",
  function() {

    // الرسائل

    bindContactForm();

    renderContactMessages();


    // الحسابات

    bindMarketForm();

    renderMarketCards();


    // الوضع الليلي

    setupTheme();


    // اللغة

    setupLanguage();

  }
);
