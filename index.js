// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date?', (req, res) => {
  const { date } = req.params;

  console.log(`Received date parameter: ${date}`); // Log the input

  let parsedDate;

  if (!date) {
      parsedDate = new Date();
      console.log(`No date provided. Using current date: ${parsedDate}`);
  } else if (!isNaN(date)) {
      parsedDate = new Date(parseInt(date));
      console.log(`Parsed Unix timestamp: ${parsedDate}`);
  } else {
      parsedDate = new Date(date);
      console.log(`Parsed date string: ${parsedDate}`);
  }

  if (isNaN(parsedDate.getTime())) {
      console.error('Invalid Date');
      return res.status(400).json({ error: 'Invalid Date' });
  }

  const response = {
      unix: parsedDate.getTime(),
      utc: parsedDate.toUTCString(),
  };

  console.log(`Sending response: ${JSON.stringify(response)}`); // Log the output

  res.json(response);
});




// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
