var score = 0;
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    'use strict';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    'use strict';
    if (this.x > 475) {
        this.x = -150;
    } else {
        this.x++;
        this.x = Math.random() + this.x + (this.speed * dt);
    };

    // Draw the enemy on the screen, required method for game
    Enemy.prototype.render = function() {
        'use strict';
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    // Check collisions and reset player
    Enemy.prototype.checkCollision = function() {
        'use strict';
        var rect1 = {
            x: player.x,
            y: player.y,
            width: 50,
            height: 50
        };
        var rect2 = {
            x: this.x,
            y: this.y,
            width: 50,
            height: 50
        };

        if (rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.height + rect1.y > rect2.y) {
            player.reset();
            score = 0;
        }
    }
    this.checkCollision();
};

// Player class 
var Player = function(x, y, speed) {
    'use strict';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

//Reset player after collision
Player.prototype.reset = function() {
    'use strict';
    this.x = 200;
    this.y = 425;
}

Player.prototype.update = function() {
    'use strict';
    this.x = this.x;
    this.y = this.y;
    if (this.y > 400) {
        this.y = 400;
    }
    if (this.x > 495) {
        this.x = 0;
    }

    if (this.y < 0) {
        this.y = 0;
    }

    if (this.x < 0) {
        this.x = 0;
    }
    if (this.y <= 0) {
        alert("Player wins!");
        score++;
        this.reset();
    }
};

Player.prototype.render = function() {
    'use strict';
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
    'use strict';
    switch (keyPress) {
        case 'left':
            this.x = this.x - 100;
            break;

        case 'up':
            this.y = this.y - 85;
            score++;
            document.getElementById("score").innerHTML = score;
            break;

        case 'right':
            this.x = this.x + 100;
            break;

        case 'down':
            this.y = this.y + 85;
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy(0, 100, 175);
var enemy2 = new Enemy(0, 150, 200);
var enemy3 = new Enemy(0, 250, 250);
var enemy4 = new Enemy(0, 275, 375);
var enemy5 = new Enemy(0, 300, 200);
var enemy6 = new Enemy(0, 50, 400);

var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];

var player = new Player(200, 435);

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