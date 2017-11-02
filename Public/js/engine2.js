var game = new Phaser.Game(1000, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  //Static Map Pieces
  game.load.image('grass_bg','imgs/grass.png');
  game.load.image('path_bg','imgs/path.png');
  game.load.image('towerspace_bg','imgs/towerspace.png');

  //UI Pieces
  game.load.image('basicTower_btn','imgs/basicTower_btn.png');
  game.load.image('advancedTower_btn','imgs/basicTower_btn.png');
  game.load.image('expertTower_btn','imgs/basicTower_btn.png');

  //Enemies
  game.load.image('enemy_basic','imgs/enemy_basic.png');

  //Towers
  game.load.image('tower_basic','imgs/tower_basic.png');
}

var g;
var player;
var boxsize;
var spawnedTowers = [];
var livingEnemies = [];
var money;
var health;
var grass_bg, path_bg, towerspace_bg;
var towerChoiceButtons = [
  [630, 100, 'basicTower_btn', 20, true],
  [750, 100, 'advancedTower_btn', 40, false],
  [870, 100, 'expertTower_btn', 60, true]
];
var btns = [];
var currX, currY;

function create() {
  g = new Game();
  player = new Player();
  var level = initLevel(g.DIFFICULTY);
  boxsize = 600 / g.DIFFICULTY;

  grass_bg = game.add.tileSprite(0, 0, 600, 600, 'grass_bg');

  for(row in level){
    for(col in level[row]){
      if(level[row][col] == 2){
        towerspace_bg = game.add.tileSprite(col * boxsize, row * boxsize, boxsize, boxsize, 'towerspace_bg');
        towerspace_bg.inputEnabled = true;
        towerspace_bg.input.useHandCursor = true;
        towerspace_bg.events.onInputDown.add(pickTower,this);
        towerspace_bg.events.onInputOver.add(highlightTowerSpace,this);
        towerspace_bg.events.onInputOut.add(removeHighlightTowerSpace,this);
      }
      if(level[row][col] == 1){
        path_bg = game.add.tileSprite(col * boxsize, row * boxsize, boxsize, boxsize, 'path_bg');
      }
    }
  }

  for(button in towerChoiceButtons){
    var btn = game.add.button(towerChoiceButtons[button][0], towerChoiceButtons[button][1], towerChoiceButtons[button][2], towerChose, this);
    btn.scale.setTo(0.5,0.5);
    btn.tint = 0x222222;
    btn.inputEnabled = false;
    btns.push(btn);
  }

  money = game.add.text(620, 10, "Money: $" + player.money, { font: "25px Arial", fill: g.TOWERSPACE_COLOR, align: "left" });
  health = game.add.text(850, 10, "Health: " + player.health, { font: "25px Arial", fill: "#ff0044", align: "left" });
}

function update() {
  showUI();
  showPlayerStats();
}

function initLevel(d){
  var level = [];

  for(var i = 0; i < d; i++){
    level.push([]);
    for(var j = 0; j < d; j++){
      level[i][j] = 0;
    }
  }

// CREATE PATH
    var lastPos;
    for(var i = 0; i < level.length; i++){
      var temp = Math.floor(Math.random() * (level.length - 1));

      if(temp > 0){
        if(i == 0){
          level[i][temp] = 1;
          lastPos = temp;
        }else{
          if(i % 2 == 0){
            level[i][lastPos] = 1;
          }else if(i == level.length - 1){
            level[i][lastPos] = 1;
          }else{
            for(var j = 0; j < level[i].length; j++){
              if(j >= temp && j <= lastPos){
                level[i][j] = 1;
              }else if(j <= temp && j >= lastPos){
                level[i][j] = 1;
              }
            }
            lastPos = temp;
          }
        }
      }else{
        i--;
        continue;
      }
    }

// CREATE TOWERSPACE LOCATIONS
    for(var i = 0; i < level.length; i++){
      for(var j = 0; j < level[i].length; j++){
        if(level[i][j] == 1){
          if(i > 0){
            if(level[i - 1][j] == 0){
              level[i - 1][j] = 2;
            }
            if(level[i - 1][j] == 1){
              if(level[i][j - 1] == 1){
                level[i + 1][j + 1] = 2;
              }
            }
            if(level[i - 1][j] == 1){
              if(level[i][j + 1] == 1){
                level[i + 1][j - 1] = 2;
              }
            }
          }

          if(i < level.length - 1){
            if(level[i + 1][j] == 0){
              level[i + 1][j] = 2;
            }
            if(level[i + 1][j] == 1){
              if(level[i][j - 1] == 1){
                level[i - 1][j + 1] = 2;
              }
            }
            if(level[i + 1][j] == 1){
              if(level[i][j + 1] == 1){
                level[i - 1][j - 1] = 2;
              }
            }
          }

          if(level[i][j - 1] == 0){
            level[i][j - 1] = 2;
          }
          if(level[i][j + 1] == 0){
            level[i][j + 1] = 2;
          }
        }
      }
    }
    return level;
}

function showPlayerStats(){
  money.setText("Money: $" + player.money);
  health.setText("Health: " + player.health);
}

function highlightTowerSpace(towerspace){
  towerspace.tint = 0x999999;
}

function removeHighlightTowerSpace(towerspace){
  towerspace.tint = 0xffffff;
}

function pickTower(towerspace){
  currX = towerspace.left;
  currY = towerspace.top;
}

function towerChose(towerPicked){
  switch(towerPicked.key){
    case 'basicTower_btn':
      if(player.money >= towerChoiceButtons[0][3]){
        player.money -= towerChoiceButtons[0][3];

        game.add.sprite(currX, currY, 'tower_basic');
      }
      break;
    case 'advancedTower_btn':
      if(player.money >= towerChoiceButtons[1][3]){
        player.money -= towerChoiceButtons[1][3];

        game.add.sprite(currX, currY, 'tower_basic');
      }
      break;
    case 'expertTower_btn':
      if(player.money >= towerChoiceButtons[2][3]){
        player.money -= towerChoiceButtons[2][3];

        game.add.sprite(currX, currY, 'tower_basic');
      }
      break;
  }
}

function showUI(){
  for(btn in btns){
    for(button in towerChoiceButtons){
      if(towerChoiceButtons[btn][4] == true){
        btns[btn].tint = 0xffffff;
        btns[btn].inputEnabled = true;
      }
    }
  }
}
