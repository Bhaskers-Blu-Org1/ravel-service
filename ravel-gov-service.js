/*
Copyright 2020 IBM
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

var ravelaction = require('ravel-gov-action');
var bodyParser = require('body-parser');

var express = require('express'),

app = express();

app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, UPDATE, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

port = process.env.PORT || 8700;

app.listen(port);

app.post('/ravel-gov-add', function(req, res, next) {

    console.log(req.body)

    if (req.body) {

      params = req.body;

      console.log("[ADD CONVERSATION] PARAMS:")
      console.log(JSON.stringify(params))

      let mainAddPromise = ravelaction.create(params);

      mainAddPromise
      .then((ret) => {
        result = {}
        result.response = {}
        result.response.result = ret
        console.log("[ADD CONVERSATION] RESULT: ");
        console.log(JSON.stringify(result));
        res.json(result);

      })
      .catch((e) => {
          console.log("[ADD CONVERSATION] ERROR: ", e);
      })
      .then(function() {
          console.log("[ADD CONVERSATION]  OK");
      });

    }
    else {
        res.json("[ADD CONVERSATION] Error. Conversation Object is missing")
    }

})

app.post('/ravel-gov-update', function(req, res) {

    if (req.body) {
      params = req.body;

      console.log("[UPDATE CONVERSATION] PARAMS:")
      console.log(JSON.stringify(params))

      let mainUpdatePromise = ravelaction.update(params);

      mainUpdatePromise
      .then((ret) => {

          result = {}
          result.response = {}
          result.response.result = ret
          console.log("[UPDATE CONVERSATION] RESULT: ");
          console.log(JSON.stringify(result));
          res.json(result);

      })
      .catch((e) => {
          console.log("[UPDATE CONVERSATION]  ERROR: ", e);
      })
      .then(function() {
          console.log("[UPDATE CONVERSATION]  OK");
      });


  }
  else {
      res.json("[UPDATE CONVERSATION] Error. Conversation Object is missing")
  }


})

console.log('Governance RESTful API server started on: ' + port);
