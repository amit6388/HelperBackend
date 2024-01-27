const multer = require('multer')
const router = require("express").Router()
const fs = require('fs')
const path = require('path')

// storage 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadFolder = path.join('static', 'uploads', req.params.folder);
        if (!fs.existsSync(uploadFolder)) {
            try {
                fs.mkdirSync(uploadFolder, { recursive: true });
            } catch (error) {
                console.log('error creating folder', error)
            }
        }
        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + "-" + file.originalname);
    },
})

const myStorage = multer({ storage: storage })


router.post("/uploadfile/:folder", myStorage.single("myfile"), (req, res) => {
    const fileName = req.file.filename;
    res.status(200).json({ message: "Successfully Uploaded", message: 'Successfully Uploaded', fileName: `${req.params.folder}/${fileName}` });
});
 
module.exports = router