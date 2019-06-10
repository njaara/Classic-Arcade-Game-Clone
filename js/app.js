// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if(this.x >= 500) {
      this.x = -100;
      this.speed = Math.floor(Math.random() * (105 - 50) + 50)
    }
    //this.checkCollision();
    //checkCollision(player, this);
    this.checkCollision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*function checkCollision(player, enemy) {        // referenced https://github.com/aviaryan/ud-arcade-game/blob/master/js/app.js and
  if(player.x + 25 <= enemy.x + 88 &&           // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
     player.x + 76 >= enemy.x + 11 &&
     player.y + 73 <=  enemy.y + 100 &&
     player.y + 131 >= enemy.y + 90) {
       loseModal();
       reset();
     }
}*/

/*Enemy.prototype.checkCollision = function() {        // referenced https://github.com/aviaryan/ud-arcade-game/blob/master/js/app.js and
  if(player.x + 20 <= this.x + 80 &&           // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
     player.x + 70 >= this.x + 8 &&
     player.y + 70 <=  this.y + 100 &&
     player.y + 120 >= this.y + 85) {
       loseModal();
       reset();
     }
};*/

Enemy.prototype.checkCollision = function() {        // referenced https://github.com/aviaryan/ud-arcade-game/blob/master/js/app.js and
  if(player.x <= this.x + 70 &&           // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
     player.x + 70 >= this.x &&
     player.y <= this.y + 40 &&
     player.y + 40 >= this.y) {
       loseModal();
       reset();
     }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = 'images/char-horn-girl.png';
};

Player.prototype.update = function(dt) {};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keypress) {
  if(keypress == 'left' && this.x > 5) {
    this.x -= 35;
  } else if(keypress == 'right' && this.x < 405) {
    this.x += 35;
  } else if(keypress == 'up' && this.y > 5) {
    this.y -= 35;
  } else if(keypress == 'down' && this.y < 390){
    this.y += 35;
  }

  // if player moves in increments of 35, it reaches water at -5
  if(this.y == -5) {
    modalBox();
    reset();
  }
};

// return player to starting point
function reset() {
    player.x = 200;
    player.y = 380;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();

for(var i = 0; i < 3; i++) {
  var randSpeed = Math.floor(Math.random() * (105 - 50) + 50);      // referenced https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  allEnemies.push(new Enemy(-90, 70 + (80 * i), randSpeed));
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

function modalBox() {
  var modal = document.getElementById('my-modal');
  var span = document.getElementsByClassName('close')[0];

  modal.style.display = 'block';

  span.onclick = function() {
    modal.style.display = 'none';
  }
}

function loseModal() {
    var modal = document.getElementById('lose-modal');
    var span = document.getElementsByClassName('exit')[0];

    modal.style.display = 'block';

    span.onclick = function() {
      modal.style.display = 'none';
    }
}
