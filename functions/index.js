const functions = require("firebase-functions");
const express = require("express");
const app = express();
const cors = require("cors")({ origin: true });
app.use(cors);

const memesRouter = require("./services/Memes/controller");

app.use("/memes", memesRouter);

exports.api = functions.https.onRequest(app);
