const Livros = require('./model')

const acceptedImageTypes = ['jpeg', 'png']

exports.showAll = async (req, res)=>{
    const livros = await Livros.findAll()
    res.render('index', {livros: livros})
}

exports.create = async (req, res) =>{
    const capa = req.file.filename
    const filextension = capa.slice((capa.lastIndexOf('.')- 1 >>> 0) + 2)
    if(acceptedImageTypes.includes(filextension)){
        const capaurl = '/imgs/'+capa
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
        res.redirect('/novoLivro')
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
    const capaurl = '/imgs/'+capa
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
    res.redirect('/')

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