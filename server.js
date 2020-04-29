// server.js
// where your node app starts
// init project
const express = require('express');
const app = express();

// cookies are used to save authentication
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());


// Functional routes
require('./routes.js')(app);

// Listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
