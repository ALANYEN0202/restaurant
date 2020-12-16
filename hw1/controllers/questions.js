const db = require('../models')
Question = db.Question

const questionsController = {

questions: ((req, res) => {
  Question.findAll().then(questions => {
    res.render('questions', {
      questions
    })
  })
}),

admin: ((req, res) => {
  Question.findAll().then(questions => {
    res.render('questionsadmin', {
      questions
    })
  })
}),

add: ((req, res) => {
  const { title, content } = req.body
  const { username } = req.session
  if (!title || !content || !username) {
    req.flash('errorMessage', '欄位不得為空')
    res.redirect('back')
  }
  Question.create({
    title,
    content,
    username,
  }).then(() => {
    res.redirect('back')
  }).catch(err => {
    req.flash('errorMessage', err.toString())
    res.redirect('back')
  })
}),

update: ((req, res) => {
  Question.findOne({
    where: {
      id: req.params.id,
    }
  }).then(question => {
    res.render('questionupdate', {
      question
    })
  })
}),

handelupdate: ((req, res) => {
  const { title, content } = req.body
  if(!title || !content ) {
    req.flash('errorMessage', '欄位不得為空')
    res.redirect('back')
  }
  Question.findOne({
    where: {
      id: req.params.id,
      username: req.session.username,
    }
  }).then(question => {
    return question.update({
      title,
      content,
    })
  }).then(() => {
    res.redirect('/questions/admin')
  }).catch(() => {
    res.redirect('/questions/admin')
  })
}),

delete: ((req, res) => {
  Question.findOne({
    where:{
      id: req.params.id,
      username: req.session.username,
    }
  }).then(question => {
    return question.destroy()
  }).then(() => {
    res.redirect('back')
  }).catch(() => {
    res.redirect('back')
  })
}),

}

module.exports = questionsController
