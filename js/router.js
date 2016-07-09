var router = require('routes')()
var h = require('virtual-dom/h')

router.addRoute('/register', function(m){

  return   h('div.container-fluid',

              [h('h1', "Register"), h('nav.navbar.navbar-inverse.navbar-fixed-top', {role: 'navigation'},

                  [h('div.container'), h('div.navbar-header'), h('a.navbar-brand', {href: '/'}, 'Home')

                ]),
              h('br'),

        h('div.container-fluid',
              [h('form', {method: 'POST', action: '/register'},
                        [ h('div.form-group',
                            [  h('label', "Fullname" ),
                               h('input.form-control', {type: 'text', placeholder: "Fullname", name: 'fullname'})
                            ]),
                          h('div.form-group',
                                [h('label', "Email" ),
                                h('input.form-control', {type: 'text', placeholder: "Email", name: 'email'}),
                              ]),
                          h('div.form-group',
                              [  h('label', "Password" ),
                                 h('input.form-control', {type: 'text', placeholder: "password", name: 'password'})
                              ]),
                          h('input.btn.btn-default', {type: 'submit', value: 'register'}),
                          h('br'),
                          h('p', [ h('a', {href: '/login'}, 'Click here to login if registered')])

               ])
          ])
     ])

})

router.addRoute('/login', function(m){

  return   h('div.container-fluid',

              [h('h1', "Login"),h('nav.navbar.navbar-inverse.navbar-fixed-top', {role: 'navigation'},

                  [h('div.container'), h('div.navbar-header'), h('a.navbar-brand', {href: '/'}, 'Home')

                ]),
              h('br'),

        h('div.container-fluid.center-block',
              [h('form', {method: 'POST', action: '/login'},
                        [ h('div.form-group',
                                [h('label', "Email" ),
                                h('input.form-control', {type: 'text', placeholder: "Email", name: 'email'}),
                              ]),
                          h('div.form-group',
                              [  h('label', "Password" ),
                                 h('input.form-control', {type: 'text', placeholder: "password", name: 'password'})
                              ]),
                          h('input.btn.btn-default', {type: 'submit', value: 'login'})
               ])
          ])
     ])

})

router.addRoute('/users', function(m){

  return h('div.container-fluid',

              [h('h1', "Users"),
                h('ul.list-group', [h('div', m.state.users.map(function(s){
                             return h('li.list-group-item', h('div.users', h('a', {href: '/user/' + s.key }, s.key)))
                          }))
                  ]),
              h('nav.navbar.navbar-inverse.navbar-fixed-top', {role: 'navigation'},

                  [h('div.container'), h('div.navbar-header'), h('a.navbar-brand', {href: '/'}, 'Home')])

                ])
              })


router.addRoute('/user/:id', function(m){

    var username = m.state.username

    return h('div.container-fluid',

              [ h('h1', "Profile"),

                h('div.row', h('div.col-xs-6.col-md-4', h('div.thumbnail', h('img', {src: 'http://cache.diomedia.com/230h/01/A8/0U/01A8-0U4W.jpg'})))),

                h('h4', username),
                h('nav.navbar.navbar-inverse.navbar-fixed-top', {role: 'navigation'},

                    [h('div.container'), h('div.navbar-header'), h('a.navbar-brand', {href: '/'}, 'Home')])

                  ])
                })


router.addRoute('/', function(m){

  var nav = h('div',
                  [h('nav.navbar.navbar-inverse.navbar-fixed-top', {role: 'navigation'},
                      [h('div.container'),  h('div.navbar-header'), h('a.navbar-brand', {href: '/'}, 'Home')]),

                   h('div.jumbotron', [h('h1', "Hello World"), h('p', "This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique."), h('a.btn.btn-primary.btn-lg', {href: '/register', role: "button" }, "Register")])])

    return nav;
})

module.exports = router
