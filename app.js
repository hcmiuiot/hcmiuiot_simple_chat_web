const express = require('express');
const app = express();
const fs = require('fs');

const PORT = process.env.PORT || 5000;
var serverr = app.listen(PORT, console.log(`Server started on port ${PORT}`));
var server = require('socket.io').listen(serverr);

var path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//connect html file
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/main.html'));
});



server.on('connection', (client) => {
	//console.log("new client connected");

	// take client username
	// client.on('create username', (username) => {

	//take message
	client.on('chat message', (username, msg) => {
		var usermsg = {
			username: username,
			message: msg,
		};
		console.log('receive message');
		server.emit('chat message', username, msg);
		var data = JSON.stringify(usermsg);
		fs.writeFile('public/log.json', data, { flag: 'a+' }, (err) => {
			if (err) {
				throw err;
			}
		});
	});
	//});
});
module.exports = app;
