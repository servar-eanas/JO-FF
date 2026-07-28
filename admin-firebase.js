import {
  db,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp
} from "./firebase-config.js";


// =========================================
// التحقق من صلاحية المدير
// =========================================

const currentUser = localStorage.getItem("currentUser");

const adminUsers = [
  "x2t_3",
  "_7ep6"
];

if (!currentUser || !adminUsers.includes(currentUser)) {

  alert("ليس لديك صلاحية لإدارة أعضاء الكلان.");

  window.location.href = "intro.html";

}


// =========================================
// الحصول على عناصر الصفحة
// =========================================

const memberForm =
  document.getElementById("memberForm");

const memberStatusMessage =
  document.getElementById("memberStatusMessage");

const adminMembersList =
  document.getElementById("adminMembersList");


// =========================================
// التأكد من وجود النموذج
// =========================================

if (!memberForm) {

  console.error(
    "لم يتم العثور على memberForm"
  );

}


// =========================================
// إضافة عضو جديد
// =========================================

if (memberForm) {

  memberForm.addEventListener(
    "submit",
    async function(event) {

      event.preventDefault();

      console.log("بدأت عملية إضافة العضو");


      // الحصول على القيم

      const name =
        document
          .getElementById("memberName")
          .value
          .trim();


      const username =
        document
          .getElementById("memberUsername")
          .value
          .trim();


      const role =
        document
          .getElementById("memberRole")
          .value
          .trim();


      const level =
        document
          .getElementById("memberLevel")
          .value
          .trim();


      const status =
        document
          .getElementById("memberStatus")
          .value;


      const image =
        document
          .getElementById("memberImage")
          .value
          .trim();


      // =========================================
      // التحقق من البيانات
      // =========================================

      if (
        name === "" ||
        username === "" ||
        role === "" ||
        level === ""
      ) {

        memberStatusMessage.textContent =
          "يرجى تعبئة جميع البيانات المطلوبة.";

        memberStatusMessage.className =
          "status error";

        return;

      }


      // إظهار حالة الحفظ

      memberStatusMessage.textContent =
        "جاري حفظ العضو...";

      memberStatusMessage.className =
        "status";


      try {

        // =========================================
        // حفظ العضو في Firestore
        // =========================================

        const memberData = {

          name: name,

          username: username,

          role: role,

          level: level,

          status: status,

          image: image,

          addedBy: currentUser,

          createdAt: serverTimestamp()

        };


        const docRef = await addDoc(

          collection(
            db,
            "members"
          ),

          memberData

        );


        console.log(
          "تم حفظ العضو:",
          docRef.id
        );


        // =========================================
        // رسالة النجاح
        // =========================================

        memberStatusMessage.textContent =
          "تمت إضافة العضو بنجاح ✅";

        memberStatusMessage.className =
          "status";


        // =========================================
        // تفريغ الخانات
        // =========================================

        memberForm.reset();


        // =========================================
        // تحديث قائمة الأعضاء
        // =========================================

        await loadAdminMembers();

      }

      catch(error) {

        console.error(
          "خطأ Firebase:",
          error
        );


        memberStatusMessage.textContent =
          "فشل حفظ العضو ❌";

        memberStatusMessage.className =
          "status error";


        alert(
          "حدث خطأ أثناء الحفظ:\n\n" +
          error.message
        );

      }

    }
  );

}


// =========================================
// تحميل أعضاء الكلان
// =========================================

async function loadAdminMembers() {

  if (!adminMembersList) {

    return;

  }


  adminMembersList.innerHTML =
    "<p>جاري تحميل الأعضاء...</p>";


  try {

    const snapshot =
      await getDocs(
        collection(
          db,
          "members"
        )
      );


    adminMembersList.innerHTML =
      "";


    if (snapshot.empty) {

      adminMembersList.innerHTML =
        "<p>لا يوجد أعضاء حاليا.</p>";

      return;

    }


    snapshot.forEach(
      function(memberDoc) {

        const member =
          memberDoc.data();


        const card =
          document.createElement(
            "div"
          );


        card.className =
          "panel";


        card.innerHTML = `

          ${
            member.image
              ? `
                <img
                  src="${escapeHTML(member.image)}"
                  alt="صورة العضو"
                  style="
                    width:100%;
                    height:180px;
                    object-fit:cover;
                    border-radius:12px;
                    margin-bottom:12px;
                  "
                >
              `
              : ""
          }

          <h3>
            👤 ${escapeHTML(member.name || "")}
          </h3>

          <p>
            🎮 اسم اللاعب:
            ${escapeHTML(member.username || "")}
          </p>

          <p>
            🏅 الرتبة:
            ${escapeHTML(member.role || "")}
          </p>

          <p>
            ⭐ المستوى:
            ${escapeHTML(member.level || "")}
          </p>

          <p>
            🟢 الحالة:
            ${escapeHTML(member.status || "")}
          </p>

          <button
            class="btn danger-btn delete-member"
            data-id="${memberDoc.id}"
          >
            🗑️ حذف العضو
          </button>

        `;


        adminMembersList.appendChild(
          card
        );

      }
    );


    // =========================================
    // أزرار الحذف
    // =========================================

    document
      .querySelectorAll(
        ".delete-member"
      )
      .forEach(
        function(button) {

          button.addEventListener(
            "click",
            deleteMember
          );

        }
      );

  }

  catch(error) {

    console.error(
      "خطأ في تحميل الأعضاء:",
      error
    );


    adminMembersList.innerHTML = `

      <p class="status error">
        حدث خطأ أثناء تحميل الأعضاء.
      </p>

    `;

  }

}


// =========================================
// حذف عضو
// =========================================

async function deleteMember(event) {

  const memberId =
    event.currentTarget.dataset.id;


  const confirmed =
    confirm(
      "هل أنت متأكد من حذف هذا العضو؟"
    );


  if (!confirmed) {

    return;

  }


  try {

    await deleteDoc(

      doc(
        db,
        "members",
        memberId
      )

    );


    alert(
      "تم حذف العضو بنجاح ✅"
    );


    await loadAdminMembers();

  }

  catch(error) {

    console.error(
      "خطأ في حذف العضو:",
      error
    );


    alert(
      "حدث خطأ أثناء حذف العضو:\n\n" +
      error.message
    );

  }

}


// =========================================
// حماية النصوص
// =========================================

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


// =========================================
// تشغيل تحميل الأعضاء
// =========================================

loadAdminMembers();