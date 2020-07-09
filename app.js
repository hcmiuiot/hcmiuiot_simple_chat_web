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



var arrMsg = [];

server.on('connection', (client) => {
	var count = 0;
	//send old msgs to new user
	fs.readFile('./public/log.json', (err, data) => {
		if (err) {
			throw err;
		} else {
			var oldMsgs = JSON.parse(data);
			while ((oldMsgs.length > 0) && (count < oldMsgs.length)) {
				if (oldMsgs[count].hasOwnProperty('message')) {
					client.emit('chat message', oldMsgs[count].username, oldMsgs[count].message);
				}
				else {
					client.emit('code snippet', oldMsgs[count].username, oldMsgs[count].snippet, 'code');
                }
				count += 1;
			}
		}
	});

	//take message
	client.on('chat message', (username, msg) => {
		var usermsg = {
			username: username,
			message: msg,
		};
		console.log('receive message');
		server.emit('chat message', username, msg);
		arrMsg.push(usermsg);
		var data = JSON.stringify(arrMsg);
		fs.writeFile('public/log.json', data, { flag: 'w+' }, (err) => {
			if (err) {
				throw err;
			}
		});
	});

	//take code
	client.on('code snippet', (username, code, check) => {
		var usercode = {
			username: username,
			snippet: code,
		};
		console.log('receive code');
		server.emit('code snippet', username, code, check);
		arrMsg.push(usercode);
		var data = JSON.stringify(arrMsg);
		fs.writeFile('public/log.json', data, { flag: 'w+' }, (err) => {
			if (err) {
				throw err;
			}
		});
	});
});
module.exports = app;

