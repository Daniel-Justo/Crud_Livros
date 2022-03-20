const express = require('express')

const router = express.Router()

const controller = require('./src/controller')


router.get('/', controller.showAll)

router.post('/adicionarLivro', controller.create)

router.get('/delete/:id', controller.delete)

router.get('/edit/:id', controller.editPage)

router.post('/updateLivro/:id', controller.update)

router.get('/novoLivro', (req, res)=>{
    res.render('novoLivro')
})

router.get('/livros/:id', controller.findById)


module.exports = router