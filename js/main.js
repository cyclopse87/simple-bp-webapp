var http = require('http')
var fs = require('fs')
var ecstatic = require('ecstatic')
var st = ecstatic('public')
var router = require('./router.js')
var hyperstream = require('hyperstream')
var createElement = require('virtual-dom/create-element')
var body = require('body/any')
var level = require('level')
var db = level('users2.db', {valueEncoding: 'json'})
var accountdown = require('accountdown')
var uid = require('uid')
var collect = require('collect-stream')

var users = accountdown(db, {
  login: {basic: require('accountdown-basic')}
})

var server = http.createServer(function(req, res){

    var m = router.match(req.url)

    if(req.url === '/register' && req.method === 'POST') {

      body(req, res, function(err, params){
          var opts = {
            login: { basic: {username: params.email, password: params.password}},
            value: params.fullname
          }
          users.create(uid(), opts, function(err){
            if(err) return res.end('Error', err)
            res.writeHead(302, {
              'Location': 'http://localhost:5001/login'
            });
            res.end()
          })
      })

    }
    else if(m)

     m.state = {}

     if(req.url === '/login' && req.method === 'POST') {

      body(req, res, function(err, params){
        var creds = { username: params.email,  password: params.password }
        users.verify('basic', creds, function(err, ok, id){
          if(err) return res.end('Error' + err)
          else{
            if(ok === false) res.end('Error Logging in please try again')
            else res.writeHead(302, {
            'Location': 'http://localhost:5001/user/' + id
            });
            res.end()

        }
        })
      })
    }

    else if (req.url.split('/')[1] === 'user') {

      var id = req.url.split('/')[2]

      username = users.get(id, function(err, value){
        console.log(value)
        m.state.username = value
        render(m)
      } )

    }

    else if (m) {

      m.state = {}
      if(req.url === '/users'){

        r = users.list()

        collect(r, function(err, rows){
          m.state.users = rows
          render(m)
        })
    }
    else render(m)
  }

    function render (m){
      var html = createElement(m.fn(m)).toString()
        fs.createReadStream('public/register.html')
        .pipe(hyperstream({
          '#content': html
        }))
        .pipe(res)
      }
}).listen(5001)
