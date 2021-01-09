const db = require('../models')
Carts = db.Carts

const cartsController = {
carts: (req, res) => {
  res.render('carts')
},

add: ((req, res, next) => {
  const { cartsInfoStr, name, phone, email, location, totalPrice } = req.body
  if (name === '' || phone === '' || email === '' || !location === '' || cartsInfoStr === '' || totalPrice === '' ) {
    req.flash('errorMessage', '欄位不得為空')
    return next();
  }
  Carts.create({
    cartsInfoStr,
    billName: name,
    phone,
    email,
    location,
    totalPrice,
  }).then(() => {
    res.redirect('/check')
  }).catch(err => {
    req.flash('errorMessage', err.toString())
    res.redirect('back')
  })
}),

checkBill: (req, res) => {
  res.render('check')
},

checkInfo: (req, res, next) => {
  const { name, phone } = req.body;
  if (!name || !phone ) {
    req.flash('errorMessage', '欄位不得為空')
    return next();
  }
  Carts.findAll({
    where: {
      billName: name,
      phone,
    }
  }).then(billInfo => {
    res.render('bill', {
      billInfo
    })
  }).catch(err => {
    req.flash('errorMessage', '查無此資料')
    next()
  }) 
},
}

module.exports = cartsController
