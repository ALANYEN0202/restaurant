const db = require('../models')
const Lottery = db.Lottery

function randomPrize(lotters) {
  let totalChances = 0;

  for (let i = 0; i < lotters.length; i++) {
    totalChances += Number(lotters[i].chances)
  }

  const priceNumber = Math.round(Math.random() * totalChances);
  let rangeMin = 0;
  let rangeMax = 0;

  for (let i = 0; i < lotters.length - 1; i++) {
    if (priceNumber < lotters[0].chances) {
      return lotters[0].id
    }
    if (i === 0) {
      rangeMin = Number(lotters[i].chances);
      rangeMax = Number(lotters[i].chances) + Number(lotters[i + 1].chances)
    } else {
      rangeMin = rangeMax;
      rangeMax = rangeMin + Number(lotters[i + 1].chances)
    }
    if (rangeMin < priceNumber && priceNumber < rangeMax) {
      return lotters[i + 1].id
    }
  }
  return 0
}

const lotteryController = {

  index: ((req, res) => {
    res.render('index')
  }),

  add: ((req, res) => {
    const { username } = req.session
    const { prizename, imgurl, chances } = req.body
    if (!prizename || !imgurl || !chances || !username) {
      req.flash('errorMessage', '欄位不得為空')
      res.redirect('back')
    }
    Lottery.create({
      prizename,
      imgurl,
      chances,
      username,
    }).then(() => {
      res.redirect('back')
    }).catch(err => {
      req.flash('errorMessage', err.toString())
      return next()
    })
  }),


  admin: ((req, res) => {
    Lottery.findAll({
      order: [
        ['id', 'DESC']
      ]
    }).then(lotterys => {
      res.render('lotteryadmin', {
        lotterys,
      })
    })
  }),

  update: ((req, res) => {
    Lottery.findOne({
      where: {
        id: req.params.id,
      }
    }).then(lottery => {
      res.render('lotteryupdate', {
        lottery,
      })
    })
  }),

  handelupdate: ((req, res) => {
    const { prizename, imgurl, chances } = req.body
    if (!prizename || !imgurl || !chances) {
      req.flash('errorMessage', '欄位不得為空')
      res.redirect('back')
    }
    Lottery.findOne({
      where: {
        id: req.params.id,
        username: req.session.username
      }
    }).then(lottery => {
      return lottery.update({
        prizename,
        imgurl,
        chances
      })
    }).then(() => {
      res.redirect('/lottery/admin')
    }).catch(err => {
      res.redirect('/lottery/admin')
    })
  }),

  delete: ((req, res) => {
    Lottery.findOne({
      where: {
        id: req.params.id,
        username: req.session.username
      }
    }).then(lottery => {
      return lottery.destroy()
    }).then(() => {
      res.redirect('back')
    }).catch(err => {
      res.redirect('back')
    })
  }),

  async handelgetprize(req, res) {
    try {
      const prizeCollection = await Lottery.findOne({
        where: {
          id: req.params.id
        }
      })
      res.status(200).json({ prizeCollection })
    } catch (e) {
      console.log(e)
      res.status(500).send(e)
    }
  },

  getprize: ((req, res) => {
    Lottery.findAll({
      order: [
        ['id', 'DESC']
      ]
    }).then(lotterys => {
      const id = randomPrize(lotterys)
      res.render('getprize', {
        id
      })
    })
  }),
}

module.exports = lotteryController
