const { admin, db } = require("../../utils/admin");
const express = require("express");
const router = express.Router();

router.get("/read", (req, res) => {
  db.collection("MEMES")
    .get()
    .then((data) => {
      let memes = [];
      data.forEach((doc) => {
        memes.push({
          memeId: doc.id,
          category: doc.data().category,
          movieName: doc.data().movieName,
          imageURL: doc.data().metaInfo.imageURL,
          name: doc.data().metaInfo.name,
        });
      });
      return res.json(memes);
    })
    .catch((error) => console.error(error));
});

module.exports = router;
