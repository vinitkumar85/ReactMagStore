const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const axios = require('axios');
const chalk = require('chalk');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

var guestId;
app.use(express.static(path.join(__dirname, '../build')));


function getHomedata(catId) {
  return axios.get('http://localhost:8888/shop/backend/rest/V1/products/?searchCriteria[filterGroups][0][filters][0][field]=category_id&searchCriteria[filterGroups][0][filters][0][value]=' + catId + '&searchCriteria[pageSize]=4',
    {
      headers: { 'Authorization': 'Bearer tlb5vy2barxkh8pgvlpevxr5b62nwmps' }
    }
  )
}
app.get('/homelist', function (req, res) {
  axios.all([getHomedata(2), getHomedata(4)])
    .then(axios.spread(function (acct, perms) {
      var upres = {};
      upres.firstlist = acct.data.items;
      upres.sectlist = perms.data.items;
      res.send(upres);
    }));
})

app.get('/productApi/:catid', function (req, res) {
  var catId = req.params.catid;
  axios.get('http://localhost:8888/shop/backend/rest/V1/products/?searchCriteria[filterGroups][0][filters][0][field]=category_id&searchCriteria[filterGroups][0][filters][0][value]=' + catId + '&searchCriteria[pageSize]=8',
    {
      headers: { 'Authorization': 'Bearer tlb5vy2barxkh8pgvlpevxr5b62nwmps' }
    }
  )
    .then(response => {
      res.send(response.data.items);
    })
    .catch(error => {
      res.send(error.response.data);
    });

})

app.get('/product/:skuid', function (req, res) {
  var skuid = req.params.skuid;
  axios.get('http://localhost:8888/shop/backend/rest/V1/products/' + skuid,
    {
      headers: { 'Authorization': 'Bearer tlb5vy2barxkh8pgvlpevxr5b62nwmps' }
    }
  )
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      res.send(error.response.data);
    });

})

app.get('/userdata/:uid', function (req, res) {
  var uid = req.params.uid;
  axios.get(`http://localhost:8888/shop/backend/rest/V1/customers/me`,
    {
      headers: { 'Authorization': `Bearer ${uid}` }
    }
  )
    .then((responses) => {
      res.send(responses.data);
    })

})

app.get('/getGuestToken', function (req, res) {
  axios.post('http://localhost:8888/shop/backend/rest/V1/guest-carts', {},
    {
      headers: { 'Authorization': 'Bearer tlb5vy2barxkh8pgvlpevxr5b62nwmps' }
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

app.post('/makeCartRequest/:guestid', function (req, res) {
  var guestId = req.params.guestid;
  if (guestId) {
    axios.post('http://localhost:8888/shop/backend/rest/V1/guest-carts/' + guestId + '/items', req.body,
      {
        headers: { 'Authorization': 'Bearer tlb5vy2barxkh8pgvlpevxr5b62nwmps' }
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

app.post('/makeCartRequestUser/:ucartid', function (req, res) {
  var ucartid = req.params.ucartid;
  axios.post('http://localhost:8888/shop/backend/rest/V1/carts/mine', {},
    {
      headers: { 'Authorization': `Bearer ${ucartid}` }
    }
  )
    .then(result => {
      req.body.cartItem.quote_id = result.data;
      console.log(req.body);
      axios.post('http://localhost:8888/shop/backend/rest/V1/carts/mine/items', req.body,
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
    })
})

app.post('/userlogin/', function (req, res) {
  axios.post('http://localhost:8888/shop/backend/rest/V1/integration/customer/token', req.body,
    {
      headers: { 'Authorization': 'Bearer tlb5vy2barxkh8pgvlpevxr5b62nwmps' }
    }
  )
    .then(response => {
      res.cookie('userid', response.data, { maxAge: 3600000 });
      axios.get(`http://localhost:8888/shop/backend/rest/V1/customers/me`,
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

app.post('/userregister/', function (req, res) {
  axios.post('http://localhost:8888/shop/backend/rest/V1/customers', req.body,
    {
      headers: { 'Authorization': 'Bearer tlb5vy2barxkh8pgvlpevxr5b62nwmps' }
    }
  )
    .then(response => {
      res.send(
        {
          'type': 'success',
          'message': 'You have successfully regestered'
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

app.post('/shipping/', function (req, res) {

  var guestId = req.body.guestUser;
  var usrId = req.body.userId;
  var path = `http://localhost:8888/shop/backend/rest/V1/guest-carts/${guestId}/shipping-information`;
  var token = 'tlb5vy2barxkh8pgvlpevxr5b62nwmps';

  if (usrId) {
    path = `http://localhost:8888/shop/backend/rest/V1/carts/mine/shipping-information`;
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

app.post('/payment/', function (req, res) {

  var guestId = req.body.guestUser;
  var usrId = req.body.userId;
  var path = `http://localhost:8888/shop/backend/rest/V1/guest-carts/${guestId}/payment-information`;
  var token = 'tlb5vy2barxkh8pgvlpevxr5b62nwmps';

  if (usrId) {
    path = `http://localhost:8888/shop/backend/rest/V1/carts/mine/payment-information`;
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

      axios.get(`http://localhost:8888/shop/backend/rest/default/V1/orders/${response.data}`,
            {
              headers: {'Authorization': `Bearer tlb5vy2barxkh8pgvlpevxr5b62nwmps`}
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

app.get('/cartUpdate/:gcartid', function (req, res) {
  var guestId = req.params.gcartid;

  axios.get('http://localhost:8888/shop/backend/rest/V1/guest-carts/' + guestId + '/items',
    {
      headers: { 'Authorization': 'Bearer tlb5vy2barxkh8pgvlpevxr5b62nwmps' }
    }
  )
    .then(resp => {
      res.send(resp.data);
    })
})

app.post('/assignCart/:gcartid', function (req, res) {
  var guestId = req.params.gcartid;
  var uid = req.body.userToken;

  axios.put(`http://localhost:8888/shop/backend/rest/V1/guest-carts/${guestId}`,
    req.body,
    {
      headers: { 'Authorization': `Bearer ${req.body.userToken}` }
    }
  )
    .then(resp => {
      console.log(resp.data);
      axios.post(`http://localhost:8888/shop/backend/rest/V1/carts/mine`, {},
        {
          headers: { 'Authorization': `Bearer ${uid}` }
        }
      )
        .then((result) => {
          res.send(result.data);
        }).catch(error => {
          res.send(error.result.data);
        });
    })

    .catch(error => {
      console.log("error.resp.data");
      axios.post(`http://localhost:8888/shop/backend/rest/V1/carts/mine`, {},
        {
          headers: { 'Authorization': `Bearer ${uid}` }
        }
      )
        .then((result) => {
          res.send(result.data);
        }).catch(error => {
          res.send(error.result.data);
        });
    });
})

app.get('/cartUpdateUser/:ucartid', function (req, res) {
  var ucartid = req.params.ucartid;

  axios.get('http://localhost:8888/shop/backend/rest/V1/carts/mine/items',
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

app.listen(process.env.PORT || 3005, function () {
  console.log(chalk.green('Express listening on port ') + chalk.bgRed.bold(this.address().port));
});