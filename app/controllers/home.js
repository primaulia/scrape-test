const express = require('express')
const request = require('request')
const cheerio = require('cheerio')

const router = express.Router()
const mongoose = require('mongoose')

  // Article = mongoose.model('Article')

router.get('/', function (req, res, next) {
  let url = 'http://themeatmen.sg/eggplant-with-minced-pork/'

  request(url, function (err, response, body) {
    if (err) return next(err)

    const $ = cheerio.load(body)
    let title = $('.entry-title').text()
    let vidUrl = $('.embed-container').find('iframe').attr('src')

    let steps = $('.recipe-instructions').find('li').map(function (index, step) {
      let $stepText = $(this).find('p')
      return $stepText.text()
    }).get()

    return res.send({
      title,
      vidUrl,
      steps
    })
  })

  // Article.find(function (err, articles) {
  //   if (err) return next(err)
  //   res.render('index', {
  //     title: 'Scrapie scrape',
  //     articles: articles
  //   })
  // })
})

module.exports = function (app) {
  app.use('/', router)
}
