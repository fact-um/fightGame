$(function(){
	var Pers=function(_opts){
		// default
		this.opts={
			x: 0,
			width: 50,
			height: 0,
			heightValue: {
				standUp: 50,
				seat: 30
			},
			distance: {
				moveBack: 15,
				moveForward: 35,
				moveJump: 50,
				ground: 300
			},
			time: {
				jump: 300
			},
			situation: {
				seat: false,
				standUp: false,
				jump: false,
				forward: false,
				back: false
			},
			parent: 'main-field',
			// must overflow when user created
			name: 'pers',
			y: 0,
			bg: 'gray',
			moveVectorY: 1
		};
		// user overflow
		for(var i in _opts){
			this.opts[i]=_opts[i];
		}
		this.makeStandUp();
		this.makeGround();
		this.init();
	};
	Pers.prototype.init=function(){
		var self=this;
		self.opts.elem=createBlock(self.opts);
		renderBlock(self.opts);
	};
	Pers.prototype.moveForward=function(){
		var self=this;
		self.opts.y += self.opts.distance.moveForward * self.opts.moveVectorY;
		renderBlock(self.opts);
	};
	Pers.prototype.moveBack=function(){
		var self=this;
		self.opts.y -= self.opts.distance.moveBack * self.opts.moveVectorY;
		renderBlock(self.opts);
	};
	Pers.prototype.moveJump=function(){
		var self=this;
		self.opts.x -= self.opts.distance.moveJump;
		renderBlock(self.opts);
		setTimeout(function(){
			self.moveGround();
		}, self.opts.time.jump);
	};
	Pers.prototype.moveGround=function(){
		var self=this;
		self.makeGround();
		renderBlock(self.opts);
	};
	Pers.prototype.moveSeat=function(){
		var self=this;
		self.makeSeat();
		renderBlock(self.opts);
	};
	Pers.prototype.makeGround=function(){
		var self=this;
		self.opts.x = self.opts.distance.ground - self.opts.height;
	};
	Pers.prototype.makeSeat=function(){
		var self=this;
		self.opts.height = self.opts.heightValue.seat;
		self.makeGround();
	};
	Pers.prototype.makeStandUp=function(){
		var self=this;
		self.opts.height = self.opts.heightValue.standUp;
	};

// ==========
	var vars={
		fields: [
			{
				name: 'main-field',
				width: 500,
				height: 300,
				x: 0,
				y: 0,
				parent: 'parent'
			}
		]
	};
	var elem = createBlock(vars.fields[0]);
	vars.fields[0].elem = elem;
//	console.log(fieldOpts);
	renderBlock(vars.fields[0]);

	function createBlock(item){
		var elem=$('<div></div>', {
			'class': 'field' + ' ' + item.name
		});
		elem.text(item.name)
			.appendTo('.' + item.parent);
		return elem;
	}
	function renderBlock(opts){
		$(opts.elem).css({
			width: opts.width,
			height: opts.height,
			top: opts.x,
			left: opts.y,
			background: opts.bg
		});
	}



	var persLeftOpts = {
		name: 'pers Left',
		y: 0,
		bg: 'lightgreen',
		moveVectorY: 1
	};
	var persLeft=new Pers(persLeftOpts);
	var persRightOpts = {
		name: 'pers Right',
		y: 450,
		bg: 'lightblue',
		moveVectorY: -1
	};
	var persRight=new Pers(persRightOpts);


//	function

	$(document).bind('keydown', function(e){
//		console.log(11, e, e.char, e.chatCode, e.keyCode );
		var char=String.fromCharCode(e.keyCode);
		switch(char){
			case 'A': persLeft.moveBack();
				break;
			case 'D': persLeft.moveForward();
				break;
			case 'W': persLeft.moveJump();
				break;
			case 'S': persLeft.moveSeat();
				break;
			case 'E': //persLeft.hit();
				break;

			case 'J': persRight.moveForward();
				break;
			case 'L': persRight.moveBack();
				break;
			case 'I': persRight.moveJump();
				break;
			case 'K': persRight.moveSeat();
				break;
			case 'U': //persRight.hit();
				break;
		}
	});

});