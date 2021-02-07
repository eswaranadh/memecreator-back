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

router.post("/create", (req, res) => {
  db.collection("MEMES")
    .doc("/" + req.body.id + "/")
    .create({
      memeId: req.body.id,
      category: req.body.category,
      movieName: req.body.movieName,
      imageURL: req.body.metaInfo.imageURL,
      name: req.body.metaInfo.name,
    });
  return res
    .json({ message: `Successfully Created Meme` })
    .catch((error) => console.error(error));
});

router.put("/update/:id", (req, res) => {
  db.collection("MEMES").doc(req.params.id).update({
    memeId: req.body.id,
    category: req.body.category,
    movieName: req.body.movieName,
    imageURL: req.body.metaInfo.imageURL,
    name: req.body.metaInfo.name,
  });
  return res
    .json({ message: `Successfully Updated Meme` })
    .catch((error) => console.error(error));
});

router.delete("/delete/:id", (req, res) => {
  db.collection("MEMES").doc(req.params.id).delete();
  return res
    .status(200)
    .json({ message: `Successfully Deleted Meme` })
    .catch((error) => console.error(error));
});

module.exports = router;
