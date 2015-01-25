var app = require('express')(),
	http = require('http').Server(app),
	io = require('socket.io')(http),
	fs = require('fs');

var Game = require('./game.js');
var g = new Game();

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function() {
	console.log('Running server on port %d...', http.address().port);
});

io.on('connection', function(socket) {
	socket.on('join', function(name) {
		g.addPlayer(socket, name);
	});

	socket.on('disconnect', function(){
		g.dropPlayer(socket);
	});

	socket.on('command', function(msg) {
		g.interpret(socket, msg);
	});
});
