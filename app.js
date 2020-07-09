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
// Function add space to string
String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}


server.on('connection', (client) => {
	var count = 0;
	//send old msgs to new user
	fs.readFile('./public/log.json', (err, data) => {
		if (err) {
			throw err;
		} else {
			var oldMsgs = JSON.parse(data);
			while ((oldMsgs.length > 0) && (count < oldMsgs.length)) {
				client.emit('chat message', oldMsgs[count].username, oldMsgs[count].message);	
				count += 1;
			}
		}
	});

	//take message
	client.on('chat message', (username, msg) => {
		// Make msg fix to node in client
		var msgCount = 0;
		for (let i = 0; i < msg.length; i++) {
			if (msg[i] == ' ') {
				msgCount = 0;
			} else {
				msgCount++;
				if (msgCount == 30) {
					msg = msg.replaceAt(i, '\n');
					msgCount = 0;
				}
			}
		}

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
});
module.exports = app;