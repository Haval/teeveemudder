var commands = require('./command.js');

function CommandInterpreter(game) {
	var self = this;

	this.init = function(game) {
		self.game = game;
	};

	this.interpret = function(player, msg) {
		var parts = msg.split(' ');
		if (parts.length == 0) return;

		var command = self.capitalize(parts[0]) + 'Command';

		try {
			eval('commands.' + command + '(self.game, player)');
		}
		catch(e) {
			// console.log(e);
			player.send('Unknown command.');
		}
	};

	this.capitalize = function(text) {
		return text.charAt(0).toUpperCase() + text.slice(1);
	};

	self.init(game);
}

module.exports = CommandInterpreter;
