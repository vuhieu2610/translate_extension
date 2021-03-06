const express = require('express');
const app = express();
app.listen(process.env.PORT ||3000, () => {
  console.log('Connected!');
})
let request = require('request');
var token = 'API_KEY';
var imagesURL=[];
function getRandomImages() {
  let randomIndex = Math.floor((Math.random() * (100 - 5)));
  request({
    url: `https://graph.facebook.com/v2.9/323925094473196/photos/`,
    qs: {
      fields: "images",
      limit: 5,
      offset: randomIndex,
      access_token: token
    },
    method: "GET"
  }, (error, res, body) => {
    if (error) { console.error(error); }
    var rs = JSON.parse(body);
    imagesURL = rs.data.map(data => data.images[0].source);
  })
};
app.get(`/`, (req, res)=>{
  res.send('Hello');
})
app.post('/geta', (req, res) => {
  console.log("i'm taked");
  getRandomImages();
  setTimeout(()=>{
    console.log('Get imagesURL successful');
    res.send(imagesURL);
  },2000)
})
