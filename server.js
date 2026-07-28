const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const Database = require("better-sqlite3");

const app = express();

const PORT = 3000;


// ==================================================
// إعداد قاعدة البيانات
// ==================================================

const db = new Database("clan.db");

db.prepare(`
  CREATE TABLE IF NOT EXISTS members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    rank TEXT NOT NULL,
    level TEXT,
    description TEXT,
    image TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();


// ==================================================
// إنشاء مجلد الصور
// ==================================================

const uploadsFolder = path.join(
  __dirname,
  "public",
  "uploads"
);

if (!fs.existsSync(uploadsFolder)) {
  fs.mkdirSync(
    uploadsFolder,
    { recursive: true }
  );
}


// ==================================================
// إعداد رفع الصور
// ==================================================

const storage = multer.diskStorage({

  destination: function (
    req,
    file,
    cb
  ) {

    cb(
      null,
      uploadsFolder
    );

  },

  filename: function (
    req,
    file,
    cb
  ) {

    const extension =
      path.extname(
        file.originalname
      );

    const filename =
      Date.now() +
      "-" +
      Math.random()
        .toString(36)
        .substring(2, 8) +
      extension;

    cb(
      null,
      filename
    );

  }

});


const upload = multer({

  storage: storage,

  limits: {
    fileSize: 5 * 1024 * 1024
  },

  fileFilter:
    function (
      req,
      file,
      cb
    ) {

      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif"
      ];

      if (
        allowedTypes.includes(
          file.mimetype
        )
      ) {

        cb(
          null,
          true
        );

      } else {

        cb(
          new Error(
            "نوع الصورة غير مسموح"
          )
        );

      }

    }

});


// ==================================================
// إعداد Express
// ==================================================

app.use(
  express.json()
);

app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(
  express.static(
    path.join(
      __dirname,
      "public"
    )
  )
);


// ==================================================
// جلب جميع الأعضاء
// ==================================================

app.get(
  "/api/members",
  function (
    req,
    res
  ) {

    try {

      const members =
        db.prepare(`
          SELECT *
          FROM members
          ORDER BY id DESC
        `).all();

      res.json(
        members
      );

    } catch (error) {

      console.error(
        error
      );

      res.status(500).json({

        success: false,

        message:
          "حدث خطأ أثناء جلب الأعضاء"

      });

    }

  }
);


// ==================================================
// إضافة عضو جديد
// ==================================================

app.post(
  "/api/members",
  upload.single("image"),
  function (
    req,
    res
  ) {

    try {

      const {
        name,
        rank,
        level,
        description
      } = req.body;


      if (
        !name ||
        !rank
      ) {

        return res.status(400).json({

          success: false,

          message:
            "اسم العضو والرتبة مطلوبان"

        });

      }


      const image =
        req.file
          ? "/uploads/" +
            req.file.filename
          : null;


      const result =
        db.prepare(`
          INSERT INTO members
          (
            name,
            rank,
            level,
            description,
            image
          )
          VALUES
          (
            ?,
            ?,
            ?,
            ?,
            ?
          )
        `).run(

          name.trim(),

          rank.trim(),

          level
            ? level.trim()
            : "",

          description
            ? description.trim()
            : "",

          image

        );


      res.json({

        success: true,

        message:
          "تمت إضافة العضو بنجاح",

        id:
          result.lastInsertRowid

      });

    } catch (error) {

      console.error(
        error
      );

      res.status(500).json({

        success: false,

        message:
          "حدث خطأ أثناء إضافة العضو"

      });

    }

  }
);


// ==================================================
// تعديل عضو
// ==================================================

app.put(
  "/api/members/:id",
  upload.single("image"),
  function (
    req,
    res
  ) {

    try {

      const id =
        Number(
          req.params.id
        );


      const member =
        db.prepare(`
          SELECT *
          FROM members
          WHERE id = ?
        `).get(id);


      if (!member) {

        return res.status(404).json({

          success: false,

          message:
            "العضو غير موجود"

        });

      }


      const {
        name,
        rank,
        level,
        description
      } = req.body;


      let image =
        member.image;


      if (req.file) {

        image =
          "/uploads/" +
          req.file.filename;


        if (
          member.image
        ) {

          const oldImage =
            path.join(
              __dirname,
              "public",
              member.image
            );

          if (
            fs.existsSync(
              oldImage
            )
          ) {

            fs.unlinkSync(
              oldImage
            );

          }

        }

      }


      db.prepare(`
        UPDATE members
        SET
          name = ?,
          rank = ?,
          level = ?,
          description = ?,
          image = ?
        WHERE id = ?
      `).run(

        name.trim(),

        rank.trim(),

        level
          ? level.trim()
          : "",

        description
          ? description.trim()
          : "",

        image,

        id

      );


      res.json({

        success: true,

        message:
          "تم تعديل بيانات العضو"

      });

    } catch (error) {

      console.error(
        error
      );

      res.status(500).json({

        success: false,

        message:
          "حدث خطأ أثناء تعديل العضو"

      });

    }

  }
);


// ==================================================
// حذف عضو
// ==================================================

app.delete(
  "/api/members/:id",
  function (
    req,
    res
  ) {

    try {

      const id =
        Number(
          req.params.id
        );


      const member =
        db.prepare(`
          SELECT *
          FROM members
          WHERE id = ?
        `).get(id);


      if (!member) {

        return res.status(404).json({

          success: false,

          message:
            "العضو غير موجود"

        });

      }


      db.prepare(`
        DELETE FROM members
        WHERE id = ?
      `).run(id);


      if (
        member.image
      ) {

        const imagePath =
          path.join(
            __dirname,
            "public",
            member.image
          );


        if (
          fs.existsSync(
            imagePath
          )
        ) {

          fs.unlinkSync(
            imagePath
          );

        }

      }


      res.json({

        success: true,

        message:
          "تم حذف العضو بنجاح"

      });

    } catch (error) {

      console.error(
        error
      );

      res.status(500).json({

        success: false,

        message:
          "حدث خطأ أثناء حذف العضو"

      });

    }

  }
);


// ==================================================
// تشغيل السيرفر
// ==================================================

app.listen(
  PORT,
  function () {

    console.log(
      `JO FF Clan Server running on http://localhost:${PORT}`
    );

  }
);