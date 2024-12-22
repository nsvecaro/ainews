const multer = require('multer');
const path = require('path');
const sharp = require('sharp');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads/vijesti')); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});


const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); //Prihvati
  } else {
    cb(new Error('Samo slike su dozvoljene!'), false); //Odbij 
  }
};

// Ograničenje mb
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

// Validacija 16:9
const validateAspectRatio = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).send({ message: 'Niste učitali sliku.' });
  }

  try {
    const metadata = await sharp(req.file.path).metadata();

    // Provjeri 16:9
    if (Math.abs(metadata.width / metadata.height - 16 / 9) > 0.01) {
      return res.status(400).send({ message: 'Slika mora imati omjer 16:9.' });
    }

    next();
  } catch (error) {
    console.error('Greška pri validaciji omjera slike:', error);
    return res.status(500).send({ message: 'Greška pri provjeri slike.', error });
  }
};

module.exports = { upload, validateAspectRatio };