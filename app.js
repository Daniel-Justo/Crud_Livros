const express = require('express');
const path = require('path');
const app = express();
const router = require('./router')
const connection = require('./src/connection')
const multer = require('multer')


const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, 'public/imgs')
    },
    filename: (req, file, cb)=>{
        cb(null, 'capa_'+file.originalname)
    }
})


app.use(multer({storage: storage}).single('capa'))

app.use('/imgs', express.static(path.join(__dirname,'/imgs')))
app.use(express.static(path.join(__dirname,'/public')))


app.set('view engine', 'ejs');



app.use(express.urlencoded({extended: false}))

app.use(router)

connection.sync()

app.listen(2004, ()=>{
    console.log('rodando na porta 2004', path.join(__dirname, '/imgs'), path.join(__dirname, '/public'))
});