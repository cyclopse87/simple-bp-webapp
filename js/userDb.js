var accountdown = require('accountdown')
var level = require('level')
var db = level('./testuser.db')
var uid = require('uid')

var users = accountdown(db, {
  login: {basic: require('accountdown-basic')}
})
/*
var opts = {
  login: {basic: {username: 'substack', password: 'beep boop'} },
  value: {bio: 'Hello World'}
}

users.create(uid(), opts, function(err){
  if(err) return console.error(err)
  })

  */
/*
var creds = { username: process.argv[2], password: 'beep boop'};
users.verify('basic', creds, function(err, ok, id){
  if(err) return console.error(err)
  console.log('ok=', ok)
  console.log('id=', id)
})
*/

users.get('4wqc3xd', function(err, value){
  console.log(value)
})
