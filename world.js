var World = function() {
	var self = this;

	this.init = function() {
		self.rooms = rooms;
		self.mobs = mobs;
		self.items = items;
	};

	self.init();
}

var items = {
	'Black Suit': {cost:350},
	'Pair of Smith\'s Sunglasses': {cost:45},
	'Bicycle': {cost:100},
	'Crystal Ball': {cost:80},
	'Sin': {cost:-100},
	'Pack of Trick Chewing Gum': {cost:20},
	'Red Bowtie': {cost:30},
	'Magic Lamp': {cost:50},
	'Radio Active Man - Issue #1': {cost:500},
	'Torn Vest': {cost:20},
	'Krusty the Clown Autographed Picture': {cost:40},
	'Rake': {cost:25},
	'Broken Chains': {cost:10},
	'Stolen Bicycle': {cost:200},
	'Unicorn Tears': {cost:-50},
	'11" Wand': {cost:0},
	'Magnificent Beard': {cost:50},
	'Time-Turner': {cost:1000},
	'blank': {cost:0}
};

var mobs = {
	'Agent Smith': {
		quote: 'You hear that Mr. Anderson?... That is the sound of inevitability... It is the sound of your death... Goodbye, Mr. Anderson...',
		level: 3,
		drops: ['Black Suit', 'Pair of Smith\'s Sunglasses']
	},
	'Harmless Child': {
		quote: 'Please don\'t hurt me!',
		level: -2,
		drops: ['Sin']
	},
	'Pee Wee': {
		quote: 'I know you are, but what am I?',
		level: 2,
		drops: ['Bicycle', 'Pack of Trick Chewing Gum', 'Red Bowtie']
	},
	'Creepy Clown': {
		quote: '*waves*',
		level: 2,
		drops: ['Broken Chains']
	},
	'Jambi': {
		quote: 'Mekka Lekka Hi-Mekka Hiney Ho.',
		level: 1,
		drops: ['Crystal Ball', 'Magic Lamp']
	},
	'Nelson': {
		quote: 'HA! HA!',
		level: 4,
		drops: ['Torn Vest']
	},
	'Sideshow Bob': {
		quote: 'Hand over all your money in a paper bag.',
		level: 8,
		drops: ['Rake', 'Krusty the Clown Autographed Picture']
	},
	'Comic Book Guy': {
		quote: 'Worst game ever!',
		level: 6,
		drops: ['Radio Active Man - Issue #1']
	},
	'Francis Buxton': {
		quote: 'Today\'s my birthday and my father says I can have anything I want.',
		level: 7,
		drops: ['Stolen Bicycle']
	},
	'Fluttershy': {
		quote: '*neighs*',
		level: -1,
		drops: ['Unicorn Tears']
	},
	'Rainbow Dash': {
		quote: '*neighs*',
		level: -1,
		drops: ['Unicorn Tears']
	},
	'Twilight Sparkle': {
		quote: '*neighs*',
		level: -1,
		drops: ['Unicorn Tears']
	},
	'Applejack': {
		quote: '*neighs*',
		level: -1,
		drops: ['Unicorn Tears']
	},
	'Pinkie Pie': {
		quote: '*neighs*',
		level: -1,
		drops: ['Unicorn Tears']
	},
	'Frog': {
		quote: '*ribbit*',
		level: 500,
		drops: ['Time-Turner']
	},
	'Dumbledore': {
		quote: 'Snape kills Dumbledore!',
		level: 8,
		drops: ['Magnificent Beard']
	},
	'Harry Potter': {
		quote: 'Please return to me with a Time-Turner to restore the time you have wasted on this game!  Rumor has it that this went missing in your home.',
		level: 5,
		drops: ['11" Wand']
	}
};

var rooms = {
	'Home': {
		attackProbability: 1,
		mobs: ['Frog'],
		n: 'Equestria',
		e: 'Pee Wee\'s Playhouse',
		s: 'Springfield',
		w: 'The Matrix'
	},
	'Equestria' : {
		attackProbability: 60,
		mobs: ['Fluttershy', 'Rainbow Dash', 'Twilight Sparkle', 'Applejack', 'Pinkie Pie'],
		s: 'Home',
		e: 'Hogwarts School of Witchcraft and Wizardry'
	},
	'Hogwarts School of Witchcraft and Wizardry' : {
		attackProbability: 85,
		mobs: ['Harry Potter', 'Dumbledore'],
		w: 'Equestria'
	},
	'Pee Wee\'s Playhouse': {
		attackProbability: 40,
		mobs: ['Pee Wee', 'Jambi'],
		w: 'Home',
		s: 'Chuck\'s Bike-o-Rama',
		n: 'Francis\' Home'
	},
	'Francis\' Home' : {
		attackProbability: 80,
		mobs: ['Francis Buxton'],
		s: 'Pee Wee\'s Playhouse'
	},
	'Chuck\'s Bike-o-Rama' : {
		attackProbability: 40,
		mobs: ['Creepy Clown'],
		n: 'Pee Wee\'s Playhouse'
	},
	'The Matrix': {
		attackProbability: 80,
		mobs: ['Harmless Child', 'Agent Smith', 'Agent Smith', 'Agent Smith'],
		e: 'Home'
	},
	'Springfield' : {
		attackProbability: 60,
		mobs: ['Nelson'],
		n: 'Home',
		e: 'Terror Lake',
		w: 'The Android\'s Dungeon & Baseball Card Shop'
	},
	'Terror Lake' : {
		attackProbability: 90,
		mobs: ['Sideshow Bob'],
		w: 'Springfield'
	},
	'The Android\'s Dungeon & Baseball Card Shop' : {
		attackProbability: 50,
		mobs: ['Comic Book Guy'],
		e: 'Springfield'
	}
};

module.exports = World;
