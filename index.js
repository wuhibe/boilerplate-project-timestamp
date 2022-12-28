// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});
app.get("/api/:date", (req, res) => {
  let utc, unix, date = req.params.date;
  if (+date == date){
    date = +date;
  }
  try {
    utc = new Date(date).toUTCString();
    unix = (new Date(date).getTime()).toString();
  } catch (error) {
    utc = "Invalid Date"
  }
  if (utc != "Invalid Date")
    res.json({ unix: +unix, utc: utc });
  else
    res.json({error:"Invalid Date"});
});

app.get("/api", (req, res) => {
  let
  utc = new Date().toUTCString(),
  unix = (new Date().getTime()).toString();
  res.json({ unix: +unix, utc: utc });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
