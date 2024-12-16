const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:9000"
};

app.use(cors(corsOptions));
const path = require('path');

// Omogući serviranje direktorija 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//route route...:()
require("./routes/vijesti.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
