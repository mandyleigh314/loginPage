const express = require('express')
const mustacheExpress = require('mustache-express')
const expressSession = require('express-session')
const bodyParser = require('body-parser')

app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(
  expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  })
)

app.engine('mst', mustacheExpress())
app.set('views', './templates')
app.set('view engine', 'mst')

app.get('/', (req, res) => {
  console.log(req.session.isLoggedIn)
  if (!req.session.isLoggedIn) {
    res.render('login')
  } else {
    res.render('index')
  }
})

app.post('/', (req, res) => {
  if (req.body.username === 'mandy' && req.body.password === 'password') {
    let name = req.body.username
    req.session.isLoggedIn = true
    res.render('index', { name: name })
  } else {
    res.render('login')
  }
})

app.listen(3000, () => {
  console.log('Hello on 3000')
})
