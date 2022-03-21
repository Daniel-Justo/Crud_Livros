const Livros = require('./model')
const fs = require('fs')
const acceptedImageTypes = ['jpg', 'png']

exports.showAll = async (req, res)=>{
    const livros = await Livros.findAll()
    res.render('index', {livros: livros})
}

exports.create = async (req, res) =>{
    const capa = req.file.filename
    const filextension = capa.slice((capa.lastIndexOf('.')- 1 >>> 0) + 2)
    const capaurl = '/imgs/'+capa
    if(acceptedImageTypes.includes(filextension)){
        await Livros.create({
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            genero: req.body.genero,
            capa: capaurl,
            editora: req.body.editora,
            autor: req.body.autor,
            dataDePublicacao: req.body.dataDePublicacao
        })
    res.redirect('/')}
    else{
        fs.unlink('./public'+capaurl, ()=>
        res.redirect('/adicionarLivro'))
    }
}

exports.deleteAll = async (req, res)=>{
    await Livros.destroy({
        where:{},
        truncate: true
    })
    res.redirect('/')
}

exports.editPage = async (req,res)=>{
    const id = req.params.id
    const livro = await Livros.findByPk(id)
    res.render('update', {livro:livro})
}

exports.update = async(req, res)=>{
    const capa = req.file.filename
    const filextension = capa.slice((capa.lastIndexOf('.')- 1 >>> 0) + 2)
    const capaurl = '/imgs/'+capa
    if(acceptedImageTypes.includes(filextension)){
    const id = req.params.id
    await Livros.update({
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        genero: req.body.genero,
        capa: capaurl,
        editora: req.body.editora,
        autor: req.body.autor,
        dataDePublicacao: req.body.dataDePublicacao
    }, 
        {where: {id:id}})
    res.redirect('/')}else{
        fs.unlink('./public'+capaurl, ()=>{
            res.redirect(`/edit/${req.params.id}`)
        })
    }
}

exports.delete = async (req,res)=>{
    const id = req.params.id
    await Livros.destroy({
        where:{id:id}
    })
    res.redirect('/')
}

exports.findById = async (req, res)=>{
    const id = req.params.id
    const livro = await Livros.findOne({
        where:{id:id}
    })
    res.render('details', {livro:livro})
}