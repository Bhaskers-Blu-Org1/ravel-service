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

var request = require('request');
const fs = require('fs');


rawdata = fs.readFileSync('params-add.json');
conversation = JSON.parse(rawdata);

console.log("PARAMS ADD")
console.log(JSON.stringify(conversation))


// // Set the headers
// var headers = {
//     'User-Agent':       'Super Agent/0.0.1',
//     'Content-Type':     'application/json'
// }

// // Configure the request
// var options = {
//     url: 'http://localhost:8700/add',
//     method: 'POST',
//     headers: headers,
//     json: params
// }
//
// // Start the request
// request(options, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//         // Print out the response body
//         console.log(body)
//     }
// })

// params = {
//     conversation : { room : conversation.room, member : conversation.member, rules: conversation.rules, members : conversation.members }
// }

params = {
    conversation : conversation
}
request({
   url: 'http://localhost:8700/ravel-gov-add',
   method: "POST",
   headers: {
     "content-type": "application/json",
   },
   json: params
 }, function (error, response, body) {

   if (error) {
     console.error('ERROR ', error);
   } else {
     result = body.response.result;
     console.log(JSON.stringify(result))
   }

 });
