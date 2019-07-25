const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const axios = require('axios');
const chalk = require('chalk');
var mcache = require('memory-cache');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var compression = require('compression');

const appConfig = require('./config');

console.log(appConfig);

app.use(bodyParser.urlencoded({
  extended: true
}));

var cache = (duration) => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url
    let cachedBody = mcache.get(key)
    if (cachedBody) {
      res.send(cachedBody)
      return
    } else {
      res.sendResponse = res.send
      res.send = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body)
      }
      next()
    }
  }
}

app.use(bodyParser.json());

app.use(compression());

app.use(express.static(path.join(__dirname, '../build')));

app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
  key: 'userid',
  secret: 'somerandonstuffs',
  resave: false,
  rolling: false,
  saveUninitialized: false,
  cookie: {
    expires: 3600000
  }
}));

var sessionChecker = (req, res, next) => {
  //console.log(req.cookies);
  if (req.session.user && req.cookies.userid) {
    console.log("loggedin");
    next();
    // res.redirect('/dashboard');
  } else {
    console.log("not loggedin-----");
    removeSession(res);
    //res.redirect('/#/');
  }
};

var mergeGuestCart = (req, res, next) => {
  console.log("merge cart");
  next();
}

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
  if (req.cookies.userid && !req.session.user) {
    res.clearCookie('userid');
    res.clearCookie('usertype');
  }
  next();
});

function getHomedata(catId) {
  return axios.get(`${appConfig.basePath}/rest/V1/products/?searchCriteria[filterGroups][0][filters][0][field]=category_id&searchCriteria[filterGroups][0][filters][0][value]=${catId}&searchCriteria[pageSize]=4`,
    {
      headers: { 'Authorization': `Bearer ${appConfig.secretToken}` }
    }
  )
}
app.get('/api/homelist', cache(300000), function (req, res) {
  axios.all([getHomedata(12), getHomedata(13)])
    .then(axios.spread(function (acct, perms) {
      var upres = {};
      upres.firstlist = acct.data.items;
      upres.sectlist = perms.data.items;
      upres.processid = process.pid;
      res.send(upres);
    }));
})

function addCartitms(itm, guestId) {
  var postitms = {};
  postitms.cartItem = itm;
  postitms.cartItem.quote_id = guestId;
  return axios.post(`${appConfig.basePath}/rest/V1/guest-carts/${guestId}/items`, postitms,
    {
      headers: { 'Authorization': `Bearer ${appConfig.secretToken}` }
    }
  )
}

function removeSession(res) {
  res.clearCookie('userid');
  res.clearCookie('usertype');
  res.send({'status':'error-401'});
}

app.post('/addbulkitems', function (req, res) {
  var arritems = [];
  var id = req.body.gid;
  var arr = req.body.productarr;

  arr.map(function (item) {
    arritems.push(addCartitms(item, id))
  })
  axios.all(arritems)
    .then(axios.spread((...args) => {
      var cartItems = [];
      for (let i = 0; i < args.length; i++) {
        cartItems.push(args[i].data);
      }
      res.send(cartItems);
    })).
    catch(error => {
      res.send(error.response.data);
    });
})

//app.get('/products/:catid', function (req, res) {
app.get('/api/products/:catid', cache(300000),(req, res) => {
  var catId = req.params.catid;
  axios.get(`${appConfig.basePath}/rest/V1/products/?searchCriteria[filterGroups][0][filters][0][field]=category_id&searchCriteria[filterGroups][0][filters][0][value]=${catId}&searchCriteria[pageSize]=32`,
    {
      headers: { 'Authorization': `Bearer ${appConfig.secretToken}` }
    }
  )
    .then(response => {
      res.send(response.data.items);
      console.log(response.data.items);
    })
    .catch(error => {
      res.send(error.response.data);
    });

})

app.get('/api/product/:skuid', cache(900000), function (req, res) {
  console.log(req.session);
  var skuid = req.params.skuid;
  axios.get(`${appConfig.basePath}/rest/V1/products/${skuid}`,
    {
      headers: { 'Authorization': `Bearer ${appConfig.secretToken}` }
    }
  )
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      res.send(error.response.data);
    });

})

app.post('/api/removeitem/:id', function (req, res) {
  //console.log(req.session);
  var id = req.params.id;
  var cid = req.body.cartid;
  console.log(req);
  axios.delete(`${appConfig.basePath}/rest/V1/guest-carts/${cid}/items/${id}`,
    {
      headers: { 'Authorization': `Bearer ${appConfig.secretToken}` }
    }
  )
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      res.send(error.response.data);
    });

})

app.post('/api/removeitemuser/:id', function (req, res) {
  //console.log(req.session);
  var id = req.params.id;
  var uid = req.session.user;
  console.log(uid);
  axios.delete(`${appConfig.basePath}/rest/V1/carts/mine/items/${id}`,
    {
      headers: { 'Authorization': `Bearer ${uid}` }
    }
  )
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      res.send(error.response.data);
    });

})

app.post('/api/edititem/:id/:cartid', function (req, res) {
  //console.log(req.session);
  var id = req.params.id;
  var cid = req.params.cartid;
  console.log(req);
  axios.put(`${appConfig.basePath}/rest/V1/guest-carts/${cid}/items/${id}`, req.body,
    {
      headers: { 'Authorization': `Bearer ${appConfig.secretToken}` }
    }
  )
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      res.send(error.response.data);
    });

})

app.post('/api/edititemuser/:id', function (req, res) {
  console.log(req.body);
  var id = req.params.id;
  var uid = req.session.user;
  console.log(uid);
  axios.put(`${appConfig.basePath}/rest/V1/carts/mine/items/${id}`,req.body,
    {
      headers: { 'Authorization': `Bearer ${uid}` }
    }
  )
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      res.send(error.response.data);
    });

})


app.get('/api/userdata/:uid', sessionChecker, (req, res) => {
  console.log(req.session.user);
  var uid = req.session.user;
  axios.get(`${appConfig.basePath}/rest/V1/customers/me`,
    {
      headers: { 'Authorization': `Bearer ${uid}` }
    }
  )
    .then((responses) => {
      res.send(responses.data);
    })

})

app.get('/api/getGuestToken', function (req, res) {
  console.log("1");
  axios.post(`${appConfig.basePath}/rest/V1/guest-carts`, {},
    {
      headers: { 'Authorization': `Bearer ${appConfig.secretToken}` }
    }
  )
    .then(response => {
      guestId = response.data;
      res.send(response.data);
    })
    .catch(error => {
      res.send(error.response.data);
    });

})

app.get('/api/logout', function (req, res) {
  if (req.cookies.userid) {
    res.clearCookie('userid');
    res.clearCookie('usertype');
    res.send({ 'msg': 'Succesfully logout' });
  } else {
    res.send({ 'msg': 'Failed' });
  }
})

app.post('/api/makeCartRequest/:guestid', function (req, res) {
  var guestId = req.params.guestid;
  console.log(req.body);
  if (guestId) {
    axios.post(`${appConfig.basePath}/rest/V1/guest-carts/${guestId}/items`, req.body,
      {
        headers: { 'Authorization': `Bearer ${appConfig.secretToken}` }
      }
    )
      .then(response => {
        res.send(response.data);

      })
      .catch(error => {
        res.send(error.response.data);
      });
  }

})

app.post('/api/makeCartRequestUser/:ucartid', sessionChecker, (req, res) => {
  var ucartid = req.session.user;
  axios.post(`${appConfig.basePath}/rest/V1/carts/mine`, {},
    {
      headers: { 'Authorization': `Bearer ${ucartid}` }
    }
  )
    .then(result => {
      console.log("quote id: "+ result.data);
      req.body.cartItem.quote_id = result.data;
      console.log(req.body);
      axios.post(`${appConfig.basePath}/rest/V1/carts/mine/items`, req.body,
        {
          headers: { 'Authorization': `Bearer ${ucartid}` }
        }
      )
        .then(response => {
          res.send(response.data);
        })
        .catch(error => {
          res.send(error.response.data);
        });
    }).catch(error => {
      //console.log(error.response.status);
      if(error.response.status == 401){
        removeSession(res);
      } else {
        res.send(error.response.data);
      }
    });
})

app.post('/api/userlogin/', function (req, res) {
  axios.post(`${appConfig.basePath}/rest/V1/integration/customer/token`, req.body,
    {
      headers: { 'Authorization': `Bearer ${appConfig.secretToken}` }
    }
  )
    .then(response => {
      res.cookie('usertype', 'loggeduser', { maxAge: 3600000 });
      req.session.user = response.data;



      axios.get(`${appConfig.basePath}/rest/V1/customers/me`,
        {
          headers: { 'Authorization': `Bearer ${response.data}` }
        }
      )
        .then((responses) => {
          res.send(responses.data);
        }).catch(error => {
          // Error
          if (error.response) {
            // Falls out of the range of 2xx
            res.send({
              'type': 'danger',
              'message': error.response.data.message
            });
          } else if (error.request) {
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
        });


    })
    .catch((error) => {
      // Error
      if (error.response) {
        // Falls out of the range of 2xx
        res.send({
          'type': 'danger',
          'message': error.response.data.message
        });
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      //console.log(error.config);
    });

})

app.post('/api/userregister/', function (req, res) {
  axios.post(`${appConfig.basePath}/rest/V1/customers`, req.body,
    {
      headers: { 'Authorization': `Bearer ${appConfig.secretToken}` }
    }
  )
    .then(response => {
      res.send(
        {
          'type': 'success',
          'message': 'You have successfully regestered. Please continue with login.'
        }
      );
    })
    .catch((error) => {
      // Error
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        res.send({
          'type': 'danger',
          'message': error.response.data.parameters && error.response.data.parameters.length ? error.response.data.message.replace('%1', error.response.data.parameters[0]) : error.response.data.message
        });
        // console.log(error.response.status);
        // console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      //console.log(error.config);
    });
})

app.post('/api/shipping/', function (req, res) {

  var guestId = req.body.guestUser;
  var usrId = req.session.user;
  var path = `${appConfig.basePath}/rest/V1/guest-carts/${guestId}/shipping-information`;
  var token = 'tlb5vy2barxkh8pgvlpevxr5b62nwmps';

  if (usrId) {
    path = `${appConfig.basePath}/rest/V1/carts/mine/shipping-information`;
    token = usrId;
  }
  axios.post(path,
    req.body,
    {
      headers: { 'Authorization': `Bearer ${token}` }
    }
  )
    .then((response) => {
      res.send(response.data)
    }).catch((error) => {
      if (error.response) {
        // Falls out of the range of 2xx
        res.send({
          'type': 'danger',
          'message': error.response.data.message
        });
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    });
})

app.post('/api/payment/', function (req, res) {

  var guestId = req.body.guestUser;
  var usrId = req.session.user;
  var path = `${appConfig.basePath}/rest/V1/guest-carts/${guestId}/payment-information`;
  var token = 'tlb5vy2barxkh8pgvlpevxr5b62nwmps';

  if (usrId) {
    path = `${appConfig.basePath}/rest/V1/carts/mine/payment-information`;
    token = usrId;
  }
  axios.post(path,
    req.body,
    {
      headers: { 'Authorization': `Bearer ${token}` }
    }
  )
    .then((response) => {
      // res.send(response.data)

      axios.get(`${appConfig.basePath}/rest/default/V1/orders/${response.data}`,
        {
          headers: { 'Authorization': `Bearer ${appConfig.secretToken}` }
        }
      )
        .then(result => {
          if (result) {
            res.send(result.data)
          }
        }).catch((error) => {
          if (error.response) {
            res.send({
              'type': 'danger',
              'message': error.response.data.message
            });
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
        });

    }).catch((error) => {
      if (error.response) {
        res.send({
          'type': 'danger',
          'message': error.response.data.message
        });
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    });
})

app.get('/api/cartUpdate/:gcartid', function (req, res) {
  var guestId = req.params.gcartid;

  axios.get(`${appConfig.basePath}/rest/V1/guest-carts/${guestId}/items`,
    {
      headers: { 'Authorization': `Bearer ${appConfig.secretToken}` }
    }
  )
    .then(resp => {
      res.send(resp.data);
    })
})

app.post('/api/assignCart/:gcartid', sessionChecker, mergeGuestCart, (req, res) => {
  var guestId = req.params.gcartid;
  var uid = req.session.user;

  console.log(1);

  //Attempt to assign guest cart to logged in user
  axios.put(`${appConfig.basePath}/rest/V1/guest-carts/${guestId}`,
    req.body,
    {
      headers: { 'Authorization': `Bearer ${req.session.user}` }
    }
  )
    .then(resp => {
      console.log(2);
      //create a new cart for logged user after guest cart assignment
      axios.post(`${appConfig.basePath}/rest/V1/carts/mine`, {},
        {
          headers: { 'Authorization': `Bearer ${uid}` }
        }
      )
        .then((result) => {
          console.log(3);
         // console.log(result.data);
         // res.send(result.data);
        }).catch(error => {
          console.log(4);
          //console.log(error.result.data);
          //res.send(error.result.data);
        });
    })
    //If there is no cart item as a guest earlier request will fail then create a new cart for logged user
    .catch(error => {
      console.log(5);
      //console.log(error);
      axios.post(`${appConfig.basePath}/rest/V1/carts/mine`, {},
        {
          headers: { 'Authorization': `Bearer ${uid}` }
        }
      )
        .then((result) => {
          console.log(6);
          //console.log(result.data);
         //res.send(result.data);
         console.log(error.data);
         res.send(error.data);
        }).catch(err => {
          console.log(7);
          //console.log(error.result.data);
          //res.send(error.result.data);
          res.send(error.data);
        });
        //console.log(8);
        
    });
})

app.get('/api/cartUpdateUser/:ucartid', sessionChecker, (req, res) => {
  var ucartid = req.session.user;

  axios.get(`${appConfig.basePath}/rest/V1/carts/mine/items`,
    {
      headers: { 'Authorization': `Bearer ${ucartid}` }
    }
  )
    .then(resp => {
      res.send(resp.data);
    })
})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', './index.html'));
});

app.get('/static/terms/', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', './terms.html'));
});

app.get('/view/*', function(req, res) {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, '../build', './index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(process.env.PORT || 3009, function () {
  console.log(chalk.green('Express listening on port ') + chalk.bgRed.bold(this.address().port));
});