const express = require("express");
const cors = require("cors");
const session = require("express-session");
const path = require('path');

const app = express();

// CORS postavke
var corsOptions = {
  origin: "http://localhost:9000", // URL frontenda
  credentials: true // Omogući dijeljenje kolačića/sesija
};

app.use(cors(corsOptions));

// Middleware za sesije
app.use(
  session({
    secret: "tvoja_tajna_ključa", // Zamijeni s vlastitim sigurnim ključem
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Postavi na true samo ako koristiš HTTPS
  })
);

// Omogući serviranje direktorija 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rute
require("./routes/vijesti.routes.js")(app);
require("./routes/korisnik.routes.js")(app);
require("./routes/komentar.routes.js")(app);
require("./routes/teme.routes.js")(app);
//mani je lijep

// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});