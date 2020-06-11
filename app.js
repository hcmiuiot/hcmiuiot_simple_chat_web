var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var app = express();


//look into logger middleware and cookie
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//connect html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/app.html'));
});

//export
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports = app;
