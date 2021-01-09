const db = require('../models')
Products = db.Products


const productsController = {
  menu: ((req, res) => {
    Products.findAll({
      order: [
        ['id', 'DESC']
      ]
    }).then(products => {
      res.render('menu', {
        products,
      })
    })
}),
  
menuadmin: ((req, res) => {
  Products.findAll({
    order: [
      ['id', 'DESC']
    ]
  }).then(products => {
    res.render('menuadmin', {
      products
    })
  })
}),

handelmenuadd: ((req, res) => {
  const { username } = req.session
  const { productsname, imgurl, prices } = req.body
  if (!productsname || !imgurl || !prices || !username) {
    req.flash('errorMessage', '欄位不得為空')
    res.redirect('back')
  }
  Products.create({
    productsname,
    imgurl,
    prices,
    username,
  }).then(() => {
    res.redirect('back')
  }).catch(err => {
    req.flash('errorMessage', '價格只能填數字')
    res.redirect('back')
  })
}),

update: ((req, res) => {
  Products.findOne({
    where:{
      id: req.params.id,
      username: req.session.username,
    }
  }).then(product => {
    res.render('menuupdate', {
      product
    })
  })
}),

handelupdate: ((req, res) => {
  const { productsname, imgurl, prices } = req.body
  if (!productsname || !imgurl || !prices) {
    req.flash('errorMessage', '欄位不得為空')
    res.redirect('back')
  }
  Products.findOne({
    where: {
      id: req.params.id,
      username: req.session.username
    }
  }).then(product => {
    return product.update({
      productsname,
      imgurl,
      prices
    })
  }).then(() => {
    res.redirect('/menu/admin')
  }).catch(err => {
    res.redirect('/menu/admin')
  })
}),

delete: ((req, res) => {
  Products.findOne({
    where: {
      id: req.params.id,
      username: req.session.username
    }
  }).then(product => {
    return product.destroy()
  }).then(() => {
    res.redirect('back')
  }).catch(err => {
    res.redirect('back')
  })
}),

}

module.exports = productsController
