var World = require('./world.js'),
	Player = require('./player.js'),
	SaveManager = require('./save_manager.js'),
	CommandInterpreter = require('./command_interpreter.js'),
	commands = require('./command.js');

var Game = function() {
	var self = this;

	this.init = function() {
		self.players = {};
		self.interpreter = new CommandInterpreter(self);
		self.saveManager = new SaveManager();
		self.world = new World();
	};

	this.interpret = function(socket, msg) {
		var player = self.players[socket.id];
		if (!player) return;
		self.interpreter.interpret(player, msg);
	};

	this.addPlayer = function(connection, name) {
		var player = new Player(connection, name);
		self.saveManager.load(player);

		self.players[connection.id] = player;
		commands.JoinCommand(self, player);
	};

	this.dropPlayer = function(connection) {
		var player = self.players[connection.id];
		self.saveManager.save(player);

		delete self.players[connection.id];
	};

	self.init();
}

module.exports = Game;