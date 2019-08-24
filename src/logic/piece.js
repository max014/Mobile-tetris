class Piece {
  constructor(type) {
  	switch(type){
  		case "O":
  			this.position = [
  				{ y: 21, x:4 },
  				{ y: 21, x: 5 },
  				{ y: 20, x: 4 },
  				{ y: 20, x: 5 }
  			];
			this.color = 1;
			break;
		case "I":
			this.position = [
  				{ y: 23, x:4 },
  				{ y: 22, x: 4 },
  				{ y: 21, x: 4 },
  				{ y: 20, x: 4 }
  			];
			this.color = 2;
			break;
		case "T":
			this.position = [
				{ y: 21, x: 4 },
				{ y: 20, x: 3 },
				{ y: 20, x: 4 },
				{ y: 20, x: 5 }
			];
			this.color = 3;
			break;
		case "S":
			this.position = [
				{ y: 22, x: 5 },
				{ y: 21, x: 4 },
				{ y: 21, x: 5 },
				{ y: 20, x: 4 }
			];
			this.color = 4;
			break;
		case "Z":
			this.position = [
				{ y: 22, x: 4 },
				{ y: 21, x: 4 },
				{ y: 21, x: 5 },
				{ y: 20, x: 5 }
			];
			this.color = 5;
			break;
		case "J":
			this.position = [
				{ y: 22, x: 5 },
				{ y: 21, x: 5 },
				{ y: 20, x: 4 },
				{ y: 20, x: 5 }
			];
			this.color = 6;
			break;
		case "L":
			this.position = [
				{ y: 22, x: 4 },
				{ y: 21, x: 4 },
				{ y: 20, x: 4 },
				{ y: 20, x: 5 }
			];
			this.color = 7;
			break;
		case "SUPER":
		this.position = [
				{ y: 20, x: 1 },
				{ y: 20, x: 2 },
				{ y: 20, x: 3 },
				{ y: 20, x: 4 },
				{ y: 20, x: 5 },
				{ y: 20, x: 6 },
				{ y: 20, x: 7 },
				{ y: 20, x: 8 },
			];
			this.color = 8;
			break;
		default:
			return null;
  	}
  	this.rotation = 0;
  	this.type = type;
  	this.active = true;
  }

	canFall(board) {
		const ys = this.position.map((block) => {
			return block.y;
		});
		const lowestPoint = Math.min(...ys);
		if(lowestPoint === 0){
			return false;
		};

		const oldPosition = this.position;
		const newPosition = this.position.map((block) => {
			return {
				y: block.y - 1,
				x: block.x
			}
		})

		for(let j=0; j<newPosition.length; j++){
			let y = newPosition[j].y;
			let x = newPosition[j].x;
			let inThisPiece = false;

			if (y >= 0){
				if(board[y][x] === 0){
					//do nothing for this block
				} else {
					for(let i=0; i<oldPosition.length; i++){
						if(JSON.stringify(newPosition[j]) === JSON.stringify(oldPosition[i])){
							inThisPiece = true;
							break;
						} 
					}
					if(inThisPiece){
						// do nothing
					} else {
						return false;
					}
				}
			}
		}
		return true;
	}

	fall(board) {
		if(this.canFall(board)){
			const newPosition = this.position.map((block) => {
		  		return {
		  			y: block.y - 1,
		  			x: block.x
		  		};
		  	});
		  	this.position = newPosition;
		} else {
		  	this.active = false;
		}
	}

	canMoveSideways(input, board) {
	  	const xs = this.position.map((block) => {
	  		return block.x;
	  	});
	  	const leftestPoint = Math.min(...xs);
	  	const rightestPoint = Math.max(...xs);
	  	if(input === 37){
	  		if(leftestPoint === 0){
	  			return false;
	  		}
	  	} else if (input === 39){
	  		if(rightestPoint === 9){
	  			return false;
	  		}
	  	}

	  	let future = null;
	  	if (input === 37) {
	  		future = -1;
	  	} else if(input === 39){
	  		future = 1;
	  	}
	  	const nextToBlocks =  this.position.map((block) => {
			const y = block.y;
			const x = block.x;

			const isBlockNextToThisInThisPiece = this.position.map((otherBlocks) => {
				return otherBlocks.x === x+future && otherBlocks.y === y;
			});

			if (board[y][x + future] === 0) {
				return true;
			} else if (isBlockNextToThisInThisPiece.includes(true)) {
				return true;
			} else {
				return false;
			}
		});

		if (nextToBlocks.includes(false)){
			return false;
		}

	  	return true;
	}

  	counterClockwise(board){
  		let newPosition = this.position;
  		let newRotation = this.rotation;

  		switch(this.type){
	  		case "O":
				break;
			case "I":
				let positions = [
					[
						{ x: this.position[0].x - 2, y: this.position[0].y - 3 },
		  				{ x: this.position[1].x - 1, y: this.position[1].y - 2 },
		  				{ x: this.position[2].x, y: this.position[2].y -1 },
		  				{ x: this.position[3].x + 1, y: this.position[3].y }
					],
					[
						{ x: this.position[0].x + 2, y: this.position[0].y + 3 },
		  				{ x: this.position[1].x + 1, y: this.position[1].y + 2 },
		  				{ x: this.position[2].x, y: this.position[2].y + 1 },
		  				{ x: this.position[3].x - 1, y: this.position[3].y }
		  			]
				];
				if(this.rotation === 0){
					newPosition = positions[0];
					newRotation = 1;
				} else {
					newPosition = positions[1];
					newRotation = 0;
				}
				break;
			case "T":
				positions = [
					[
						{ x: this.position[0].x - 1, y: this.position[0].y - 1 },
		  				{ x: this.position[1].x + 1, y: this.position[1].y - 1 },
		  				{ x: this.position[2].x, y: this.position[2].y },
		  				{ x: this.position[3].x - 1, y: this.position[3].y + 1 }
		  			],
		  			[
		  				{ x: this.position[0].x + 1, y: this.position[0].y - 1 },
		  				{ x: this.position[1].x + 1, y: this.position[1].y + 1 },
		  				{ x: this.position[2].x, y: this.position[2].y },
		  				{ x: this.position[3].x - 1, y: this.position[3].y - 1 }
		  			],
		  			[
						{ x: this.position[0].x + 1, y: this.position[0].y + 1 },
		  				{ x: this.position[1].x - 1, y: this.position[1].y + 1 },
		  				{ x: this.position[2].x, y: this.position[2].y },
		  				{ x: this.position[3].x + 1, y: this.position[3].y - 1 }
		  			],
		  			[
		  				{ x: this.position[0].x - 1, y: this.position[0].y + 1 },
		  				{ x: this.position[1].x - 1, y: this.position[1].y - 1 },
		  				{ x: this.position[2].x, y: this.position[2].y },
		  				{ x: this.position[3].x + 1, y: this.position[3].y + 1 }
		  			],
				]
				if(this.rotation === 0){
					newPosition = positions[0];
					newRotation = 1;
				} else if (this.rotation === 1) {
					newPosition = positions[1];
					newRotation = 2;
				} else if (this.rotation === 2) {
					newPosition = positions[2];
					newRotation = 3;
				} else if (this.rotation === 3) {
					newPosition = positions[3];
					newRotation = 0;
				}
				break;
			case "S":
				positions = [
					[
						{ x: this.position[0].x - 2, y: this.position[0].y - 1 },
		  				{ x: this.position[1].x, y: this.position[1].y - 1 },
		  				{ x: this.position[2].x - 1, y: this.position[2].y },
		  				{ x: this.position[3].x + 1, y: this.position[3].y }
		  			],
		  			[
		  				{ x: this.position[0].x + 2, y: this.position[0].y + 1 },
		  				{ x: this.position[1].x, y: this.position[1].y + 1 },
		  				{ x: this.position[2].x + 1, y: this.position[2].y },
		  				{ x: this.position[3].x - 1, y: this.position[3].y }
		  			]
				]
				if(this.rotation === 0){
					newPosition = positions[0];
					newRotation = 1;
				} else if (this.rotation === 1) {
					newPosition = positions[1];
					newRotation = 0;
				}
				break;
			case "Z":
				positions = [
					[
						{ x: this.position[0].x + 2, y: this.position[0].y - 1 },
		  				{ x: this.position[1].x + 1, y: this.position[1].y },
		  				{ x: this.position[2].x , y: this.position[2].y - 1 },
		  				{ x: this.position[3].x - 1, y: this.position[3].y }
		  			],
		  			[
		  				{ x: this.position[0].x - 2, y: this.position[0].y + 1 },
		  				{ x: this.position[1].x - 1, y: this.position[1].y },
		  				{ x: this.position[2].x, y: this.position[2].y + 1 },
		  				{ x: this.position[3].x + 1, y: this.position[3].y }
		  			]
				]
				if(this.rotation === 0){
					newPosition = positions[0];
					newRotation = 1;
				} else if (this.rotation === 1) {
					newPosition = positions[1];
					newRotation = 0;
				}
				break;
			case "J":
				positions = [
					[
						{ x: this.position[0].x - 2, y: this.position[0].y - 1 },
		  				{ x: this.position[1].x - 1, y: this.position[1].y },
		  				{ x: this.position[2].x + 1, y: this.position[2].y },
		  				{ x: this.position[3].x, y: this.position[3].y + 1 }
		  			],
		  			[
		  				{ x: this.position[0].x + 1, y: this.position[0].y - 1 },
		  				{ x: this.position[1].x, y: this.position[1].y },
		  				{ x: this.position[2].x, y: this.position[2].y + 2 },
		  				{ x: this.position[3].x - 1, y: this.position[3].y + 1 }
		  			],
		  			[
						{ x: this.position[0].x + 2, y: this.position[0].y },
		  				{ x: this.position[1].x + 1, y: this.position[1].y - 1 },
		  				{ x: this.position[2].x - 1, y: this.position[2].y - 1 },
		  				{ x: this.position[3].x, y: this.position[3].y - 2 }
		  			],
		  			[
		  				{ x: this.position[0].x - 1, y: this.position[0].y + 2 },
		  				{ x: this.position[1].x, y: this.position[1].y + 1 },
		  				{ x: this.position[2].x, y: this.position[2].y - 1 },
		  				{ x: this.position[3].x + 1, y: this.position[3].y }
		  			],
				]
				if(this.rotation === 0){
					newPosition = positions[0];
					newRotation = 1;
				} else if (this.rotation === 1) {
					newPosition = positions[1];
					newRotation = 2;
				} else if (this.rotation === 2) {
					newPosition = positions[2];
					newRotation = 3;
				} else if (this.rotation === 3) {
					newPosition = positions[3];
					newRotation = 0;
				}
				break;
			case "L":
				positions = [
					[
						{ x: this.position[0].x - 1, y: this.position[0].y - 2 },
		  				{ x: this.position[1].x, y: this.position[1].y - 1 },
		  				{ x: this.position[2].x + 1, y: this.position[2].y },
		  				{ x: this.position[3].x, y: this.position[3].y + 1 }
		  			],
		  			[
		  				{ x: this.position[0].x + 2, y: this.position[0].y },
		  				{ x: this.position[1].x + 1, y: this.position[1].y + 1 },
		  				{ x: this.position[2].x, y: this.position[2].y + 2 },
		  				{ x: this.position[3].x - 1, y: this.position[3].y + 1 }
		  			],
		  			[
						{ x: this.position[0].x + 1, y: this.position[0].y + 1 },
		  				{ x: this.position[1].x, y: this.position[1].y },
		  				{ x: this.position[2].x - 1, y: this.position[2].y - 1 },
		  				{ x: this.position[3].x, y: this.position[3].y - 2 }
		  			],
		  			[
		  				{ x: this.position[0].x - 2, y: this.position[0].y + 1 },
		  				{ x: this.position[1].x - 1, y: this.position[1].y },
		  				{ x: this.position[2].x, y: this.position[2].y - 1 },
		  				{ x: this.position[3].x + 1, y: this.position[3].y }
		  			],
				]
				if(this.rotation === 0){
					newPosition = positions[0];
					newRotation = 1;
				} else if (this.rotation === 1) {
					newPosition = positions[1];
					newRotation = 2;
				} else if (this.rotation === 2) {
					newPosition = positions[2];
					newRotation = 3;
				} else if (this.rotation === 3) {
					newPosition = positions[3];
					newRotation = 0;
				}
				break;
			case "SUPER":
				positions = [
					[
						{ x: this.position[0].x + 4, y: this.position[0].y },
		  				{ x: this.position[1].x + 3, y: this.position[1].y + 1 },
		  				{ x: this.position[2].x + 2, y: this.position[2].y + 2 },
		  				{ x: this.position[3].x + 1, y: this.position[3].y + 3 },
		  				{ x: this.position[4].x, y: this.position[4].y + 4 },
		  				{ x: this.position[5].x - 1, y: this.position[5].y + 5 },
		  				{ x: this.position[6].x - 2, y: this.position[6].y + 6 },
		  				{ x: this.position[7].x - 3, y: this.position[7].y + 7 }
					],
					[
						{ x: this.position[0].x - 4, y: this.position[0].y },
		  				{ x: this.position[1].x - 3, y: this.position[1].y - 1 },
		  				{ x: this.position[2].x - 2, y: this.position[2].y - 2 },
		  				{ x: this.position[3].x - 1, y: this.position[3].y - 3 },
		  				{ x: this.position[4].x, y: this.position[4].y - 4 },
		  				{ x: this.position[5].x + 1, y: this.position[5].y - 5 },
		  				{ x: this.position[6].x + 2, y: this.position[6].y - 6 },
		  				{ x: this.position[7].x + 3, y: this.position[7].y - 7 }
		  			]
				];
				if(this.rotation === 0){
					newPosition = positions[0];
					newRotation = 1;
				} else {
					newPosition = positions[1];
					newRotation = 0;
				}
				break;
			default:
				break;
	  	}
	  	for(let i=0; i<newPosition.length; i++){
	  		if(board[newPosition[i].y][newPosition[i].x] !== 0){
	  			return false;
	  		}
	  	}
	  	this.position = newPosition;
	  	this.rotation = newRotation;
  	}

  	clockwise(board){
  		let newPosition = this.position;
  		let newRotation = this.rotation;

  		switch(this.type){
	  		case "O":
				break;
			case "I":
				let positions = [
					[
						{ x: this.position[0].x - 2, y: this.position[0].y - 3 },
		  				{ x: this.position[1].x - 1, y: this.position[1].y - 2 },
		  				{ x: this.position[2].x, y: this.position[2].y -1 },
		  				{ x: this.position[3].x + 1, y: this.position[3].y }
					],
					[
						{ x: this.position[0].x + 2, y: this.position[0].y + 3 },
		  				{ x: this.position[1].x + 1, y: this.position[1].y + 2 },
		  				{ x: this.position[2].x, y: this.position[2].y + 1 },
		  				{ x: this.position[3].x - 1, y: this.position[3].y }
		  			]
				];
				if(this.rotation === 0){
					newPosition = positions[0];
					newRotation = 1;
				} else {
					newPosition = positions[1];
					newRotation = 0;
				}
				break;
			case "T":
				positions = [
					[
						{ x: this.position[0].x + 1, y: this.position[0].y - 1 },
		  				{ x: this.position[1].x + 1, y: this.position[1].y + 1 },
		  				{ x: this.position[2].x, y: this.position[2].y },
		  				{ x: this.position[3].x - 1, y: this.position[3].y - 1 }
		  			],
		  			[
		  				{ x: this.position[0].x - 1, y: this.position[0].y - 1 },
		  				{ x: this.position[1].x + 1, y: this.position[1].y - 1 },
		  				{ x: this.position[2].x, y: this.position[2].y },
		  				{ x: this.position[3].x - 1, y: this.position[3].y + 1 }
		  			],
		  			[
						{ x: this.position[0].x - 1, y: this.position[0].y + 1 },
		  				{ x: this.position[1].x - 1, y: this.position[1].y - 1 },
		  				{ x: this.position[2].x, y: this.position[2].y },
		  				{ x: this.position[3].x + 1, y: this.position[3].y + 1 }
		  			],
		  			[
		  				{ x: this.position[0].x + 1, y: this.position[0].y + 1 },
		  				{ x: this.position[1].x - 1, y: this.position[1].y + 1 },
		  				{ x: this.position[2].x, y: this.position[2].y },
		  				{ x: this.position[3].x + 1, y: this.position[3].y - 1 }
		  			],
				]
				if(this.rotation === 0){
					newPosition = positions[0];
					newRotation = 3;
				} else if (this.rotation === 3) {
					newPosition = positions[1];
					newRotation = 2;
				} else if (this.rotation === 2) {
					newPosition = positions[2];
					newRotation = 1;
				} else if (this.rotation === 1) {
					newPosition = positions[3];
					newRotation = 0;
				}
				break;
			case "S":
				positions = [
					[
						{ x: this.position[0].x - 2, y: this.position[0].y - 1 },
		  				{ x: this.position[1].x, y: this.position[1].y - 1 },
		  				{ x: this.position[2].x - 1, y: this.position[2].y },
		  				{ x: this.position[3].x + 1, y: this.position[3].y }
		  			],
		  			[
		  				{ x: this.position[0].x + 2, y: this.position[0].y + 1 },
		  				{ x: this.position[1].x, y: this.position[1].y + 1 },
		  				{ x: this.position[2].x + 1, y: this.position[2].y },
		  				{ x: this.position[3].x - 1, y: this.position[3].y }
		  			]
				]
				if(this.rotation === 0){
					newPosition = positions[0];
					newRotation = 1;
				} else if (this.rotation === 1) {
					newPosition = positions[1];
					newRotation = 0;
				}
				break;
			case "Z":
				positions = [
					[
						{ x: this.position[0].x + 2, y: this.position[0].y - 1 },
		  				{ x: this.position[1].x + 1, y: this.position[1].y },
		  				{ x: this.position[2].x , y: this.position[2].y - 1 },
		  				{ x: this.position[3].x - 1, y: this.position[3].y }
		  			],
		  			[
		  				{ x: this.position[0].x - 2, y: this.position[0].y + 1 },
		  				{ x: this.position[1].x - 1, y: this.position[1].y },
		  				{ x: this.position[2].x, y: this.position[2].y + 1 },
		  				{ x: this.position[3].x + 1, y: this.position[3].y }
		  			]
				]
				if(this.rotation === 0){
					newPosition = positions[0];
					newRotation = 1;
				} else if (this.rotation === 1) {
					newPosition = positions[1];
					newRotation = 0;
				}
				break;
			case "J":
				positions = [
					[
						{ x: this.position[0].x + 1, y: this.position[0].y - 2 },
		  				{ x: this.position[1].x, y: this.position[1].y - 1 },
		  				{ x: this.position[2].x, y: this.position[2].y + 1 },
		  				{ x: this.position[3].x - 1, y: this.position[3].y }
		  			],
		  			[
		  				{ x: this.position[0].x - 2, y: this.position[0].y },
		  				{ x: this.position[1].x - 1, y: this.position[1].y + 1 },
		  				{ x: this.position[2].x + 1, y: this.position[2].y + 1 },
		  				{ x: this.position[3].x, y: this.position[3].y + 2 }
		  			],
		  			[
						{ x: this.position[0].x - 1, y: this.position[0].y + 1 },
		  				{ x: this.position[1].x, y: this.position[1].y },
		  				{ x: this.position[2].x, y: this.position[2].y - 2 },
		  				{ x: this.position[3].x + 1, y: this.position[3].y - 1 }
		  			],
		  			[
		  				{ x: this.position[0].x + 2, y: this.position[0].y + 1 },
		  				{ x: this.position[1].x + 1, y: this.position[1].y },
		  				{ x: this.position[2].x - 1, y: this.position[2].y },
		  				{ x: this.position[3].x, y: this.position[3].y - 1 }
		  			],
				]
				if(this.rotation === 0){
					newPosition = positions[0];
					newRotation = 3;
				} else if (this.rotation === 3) {
					newPosition = positions[1];
					newRotation = 2;
				} else if (this.rotation === 2) {
					newPosition = positions[2];
					newRotation = 1;
				} else if (this.rotation === 1) {
					newPosition = positions[3];
					newRotation = 0;
				}
				break;
			case "L":
				positions = [
					[
						{ x: this.position[0].x + 2, y: this.position[0].y - 1 },
		  				{ x: this.position[1].x + 1, y: this.position[1].y },
		  				{ x: this.position[2].x, y: this.position[2].y + 1 },
		  				{ x: this.position[3].x - 1, y: this.position[3].y }
		  			],
		  			[
		  				{ x: this.position[0].x - 1, y: this.position[0].y - 1 },
		  				{ x: this.position[1].x, y: this.position[1].y },
		  				{ x: this.position[2].x + 1, y: this.position[2].y + 1 },
		  				{ x: this.position[3].x, y: this.position[3].y + 2 }
		  			],
		  			[
						{ x: this.position[0].x - 2, y: this.position[0].y },
		  				{ x: this.position[1].x - 1, y: this.position[1].y - 1 },
		  				{ x: this.position[2].x, y: this.position[2].y - 2 },
		  				{ x: this.position[3].x + 1, y: this.position[3].y - 1 }
		  			],
		  			[
		  				{ x: this.position[0].x + 1, y: this.position[0].y + 2 },
		  				{ x: this.position[1].x, y: this.position[1].y + 1 },
		  				{ x: this.position[2].x - 1, y: this.position[2].y },
		  				{ x: this.position[3].x, y: this.position[3].y - 1 }
		  			],
				]
				if(this.rotation === 0){
					newPosition = positions[0];
					newRotation = 3;
				} else if (this.rotation === 3) {
					newPosition = positions[1];
					newRotation = 2;
				} else if (this.rotation === 2) {
					newPosition = positions[2];
					newRotation = 1;
				} else if (this.rotation === 1) {
					newPosition = positions[3];
					newRotation = 0;
				}
				break;
			case "SUPER":
				positions = [
					[
						{ x: this.position[0].x + 4, y: this.position[0].y },
		  				{ x: this.position[1].x + 3, y: this.position[1].y + 1 },
		  				{ x: this.position[2].x + 2, y: this.position[2].y + 2 },
		  				{ x: this.position[3].x + 1, y: this.position[3].y + 3 },
		  				{ x: this.position[4].x, y: this.position[4].y + 4 },
		  				{ x: this.position[5].x - 1, y: this.position[5].y + 5 },
		  				{ x: this.position[6].x - 2, y: this.position[6].y + 6 },
		  				{ x: this.position[7].x - 3, y: this.position[7].y + 7 }
					],
					[
						{ x: this.position[0].x - 4, y: this.position[0].y },
		  				{ x: this.position[1].x - 3, y: this.position[1].y - 1 },
		  				{ x: this.position[2].x - 2, y: this.position[2].y - 2 },
		  				{ x: this.position[3].x - 1, y: this.position[3].y - 3 },
		  				{ x: this.position[4].x, y: this.position[4].y - 4 },
		  				{ x: this.position[5].x + 1, y: this.position[5].y - 5 },
		  				{ x: this.position[6].x + 2, y: this.position[6].y - 6 },
		  				{ x: this.position[7].x + 3, y: this.position[7].y - 7 }
		  			]
				];
				if(this.rotation === 0){
					newPosition = positions[0];
					newRotation = 1;
				} else {
					newPosition = positions[1];
					newRotation = 0;
				}
				break;
			default:
				break;
	  	}
	  	for(let i=0; i<newPosition.length; i++){
	  		if(board[newPosition[i].y][newPosition[i].x] !== 0){
	  			return false;
	  		}
	  	}
	  	this.position = newPosition;
	  	this.rotation = newRotation;
  	}

	move(input, board) {
	  	if (input === 37 || input === 39){ // move sideways
	  		if(this.canMoveSideways(input, board)){
		  		const newPosition = this.position.map((block) => {
			  		switch(input){
			  			case 37:
			  				return {
			  					y: block.y,
					  			x: block.x - 1
					  		}
					  	case 39:
			  				return {
			  					y: block.y,
					  			x: block.x + 1
					  		}
					  	default:
					  		return null;
			  		}
			  	});
				this.position = newPosition;
			}
	  	} else if (input === 83 || input === 68){ // rotate
	  		if(true){
	  			switch(input){
		  			case 83:
		  				this.counterClockwise(board);
		  				break;
				  	case 68:
		  				this.clockwise(board);
		  				break;
				  	default:
				  		break;
		  		}
	  		}
	  	} else if (input === 40){
	  		this.fall(board);
	  	}
	}
}

export default Piece;