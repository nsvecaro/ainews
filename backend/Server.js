const express = require("express");
const cors = require("cors");
const session = require("express-session");
const path = require("path");
const MySQLStore = require("express-mysql-session")(session);

const app = express();

// Postavke za MySQL pohranu sesija
const sessionStore = new MySQLStore({
  host: "ucka.veleri.hr",
  user: "mtauzer",
  password: "11",
  database: "mtauzer",
});

// Middleware za sesije
app.use(
  session({
    key: "connect.sid",
    secret: "secret_key",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    rolling: true, 
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000, //1 dan
    },
  })
);

// CORS postavke
app.use(
  cors({
    origin: "http://localhost:9000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
  })
);

// Debug middleware za provjeru sesije
app.use((req, res, next) => {
  console.log("=== Middleware za sesije ===");
  console.log("Dolazni kolačići:", req.headers.cookie); 
  console.log("Sesija iz middlewarea:", req.session); 
  console.log("Session ID:", req.sessionID); 
  next();
});

app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rute
require("./routes/vijesti.routes.js")(app);
require("./routes/korisnik.routes.js")(app);
require("./routes/komentar.routes.js")(app);
require("./routes/teme.routes.js")(app);
require("./routes/forum.routes.js")(app);
require("./routes/forumObjava.routes.js")(app);
require("./routes/forumKomentar.routes.js")(app);


// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
