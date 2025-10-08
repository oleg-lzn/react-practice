import { createServer, startServer } from "#shared";
import { readFile } from "fs/promises";
import cookieParser from "cookie-parser";
import crypto from "crypto";

import db from "./database.js";

const cookieSecret = "super-secret";

const app = createServer({ cookies: false, log: false });
app.use(cookieParser(cookieSecret));

const generateSessionId = () => {
  return crypto.randomBytes(16).toString("hex");
};

app.get("/", (req, res) => {
  if (!req.cookies) res.send("Cookies are disabled.");
  if (req.cookies.username) {
    res.redirect("/profile");
  } else {
    res.redirect("/login");
  }
});

app.get("/login", async (req, res) => {
  const loginPage = await readFile("./pages/login.html", "utf-8");

  if (req.signedCookies.username) {
    res.redirect("/profile");
  }

  if (req.query.error) {
    res
      .status(403)
      .send(loginPage.replace("{{error}}", String(req.query.error)));
    return;
  }

  res.send(loginPage);
});

// Simulate user login and set a cookie
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await db.get(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password]
  );

  if (user) {
    const sessionId = generateSessionId();
    await db.run("INSERT INTO sessions (id, username) VALUES (?, ?)", [
      sessionId,
      username,
    ]);

    res.cookie("sessionId", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      signed: true,
    });

    res.redirect("/profile");
  } else {
    res.status(403).redirect("/login?error=Invalid login credentials.");
  }
});

app.post("/logout", (_, res) => {
  res.clearCookie("username");
  res.redirect("/login");
});

// Display user profile only if the username cookie exists
app.get("/profile", async (req, res) => {
  res.locals.title = "Profile";

  const sessionId = req.signedCookies.sessionId;

  if (!sessionId) {
    return res.redirect("/login?error=Please login to view your profile.");
  }

  const session = await db.get(
    "SELECT * FROM sessions WHERE id = ?",
    sessionId
  );

  const user = await db.get(
    "SELECT * FROM users WHERE username = ?",
    session.username
  );

  console.log(user, session);

  if (user && user.username) {
    res.send(
      (await readFile("./pages/profile.html", "utf-8")).replace(
        "{{username}}",
        user.username
      )
    );
  } else {
    return res.redirect("/login?error=Please login to view your profile.");
  }
});

startServer(app, { name: "Cookie Jar" });

// На монго

import { createServer, startServer } from "#shared";
import { readFile } from "fs/promises";
import cookieParser from "cookie-parser";
import crypto from "crypto";
import { MongoClient } from "mongodb";

const cookieSecret = "super-secret";

// подключение к MongoDB
const client = new MongoClient("mongodb://localhost:27017");
await client.connect();
const db = client.db("cookieDemo");
const users = db.collection("users");
const sessions = db.collection("sessions");

const app = createServer({ cookies: false, log: false });
app.use(cookieParser(cookieSecret));

const generateSessionId = () => crypto.randomBytes(16).toString("hex");

app.get("/", (req, res) => {
  if (!req.cookies) res.send("Cookies are disabled.");
  if (req.signedCookies?.sessionId) {
    res.redirect("/profile");
  } else {
    res.redirect("/login");
  }
});

app.get("/login", async (req, res) => {
  const loginPage = await readFile("./pages/login.html", "utf-8");

  if (req.signedCookies.sessionId) {
    res.redirect("/profile");
  }

  if (req.query.error) {
    res
      .status(403)
      .send(loginPage.replace("{{error}}", String(req.query.error)));
    return;
  }

  res.send(loginPage);
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // ищем пользователя
  const user = await users.findOne({ username, password });

  if (user) {
    const sessionId = generateSessionId();

    // сохраняем сессию в Mongo
    await sessions.insertOne({
      _id: sessionId, // используем как id
      username,
      createdAt: new Date(),
    });

    // отправляем cookie
    res.cookie("sessionId", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      signed: true,
    });

    res.redirect("/profile");
  } else {
    res.status(403).redirect("/login?error=Invalid login credentials.");
  }
});

app.post("/logout", async (req, res) => {
  const sessionId = req.signedCookies.sessionId;

  if (sessionId) {
    await sessions.deleteOne({ _id: sessionId });
  }

  res.clearCookie("sessionId");
  res.redirect("/login");
});

app.get("/profile", async (req, res) => {
  const sessionId = req.signedCookies.sessionId;

  if (!sessionId) {
    return res.redirect("/login?error=Please login to view your profile.");
  }

  const session = await sessions.findOne({ _id: sessionId });

  if (!session) {
    return res.redirect("/login?error=Invalid session.");
  }

  const user = await users.findOne({ username: session.username });

  if (user) {
    res.send(
      (await readFile("./pages/profile.html", "utf-8")).replace(
        "{{username}}",
        user.username
      )
    );
  } else {
    return res.redirect("/login?error=Please login to view your profile.");
  }
});

startServer(app, { name: "Cookie Jar with MongoDB" });
