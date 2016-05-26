var express = require('express'),
    fs      = require('fs');

var app = express();

app.get('/items.json', function (req, res) {
  // выставляем заголовки ответа, чтобы браузер "доверял" ответу (CORS)
  res.header('Access-Control-Allow-Origin', '*');

  fs.readFile('./items.json', function(err, data) {
    if (err) throw err;
    console.log('Sending '+data.length+' bytes to client.');
    res.send(data);
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
