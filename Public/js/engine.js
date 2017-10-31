var canvas = document.getElementById('gameboard');
var ctx = canvas.getContext('2d');

var game = new Game();
var player = new Player();

var boxsize = canvas.width / game.DIFFICULTY;
var level = initLevel(game.DIFFICULTY);
var timer = window.setInterval(draw,game.FPS);
var spawnedTowers = [];
var livingEnemies = [];

var mouseX,mouseY;

function getClick(event){
  mouseX = Math.floor(event.offsetX / boxsize);
  mouseY = Math.floor(event.offsetY / boxsize);

  if(level[mouseY][mouseX] == 2){
    $('#UI_Tower_Selection').fadeIn(1000);
  }
}

function placeTower(type){
  var temp = new Tower(type);
  if(player.money >= temp.getCost()){
    spawnedTowers.push([temp,mouseX,mouseY]);
    player.money -= temp.getCost();
    $('#UI_Tower_Selection').fadeOut(500);
  }
}

function draw(){
  ctx.clearRect(0,0,canvas.height,canvas.width);

  for(row in level){
    for(col in level[row]){
      if(level[row][col] == 2){
        drawTowerSpace(col * boxsize, row * boxsize);
      }
      if(level[row][col] == 1){
        drawPathSpace(col * boxsize, row * boxsize);
      }
      if(level[row][col] == 0){
        drawEmptySpace(col * boxsize, row * boxsize);
      }
    }
  }

  for(tower in spawnedTowers){
    drawTower(spawnedTowers[tower][0],spawnedTowers[tower][1] * boxsize,spawnedTowers[tower][2] * boxsize);
  }

  $('#playerInformation').html("<h3>Money: $" + player.money + "</h3>")
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

function drawTower(type,x,y){
  for(tower in spawnedTowers){
    ctx.fillStyle = type.getColor();
    ctx.fillRect(x,y,boxsize,boxsize);
  }
}

function drawEnemy(color,x,y){
  ctx.fillStyle = color;
  ctx.fillRect(x,y,boxsize,boxsize);
}

function drawTowerSpace(x,y){
  ctx.fillStyle = game.TOWERSPACE_COLOR;
  ctx.fillRect(x,y,boxsize,boxsize);
}

function drawPathSpace(x,y){
  ctx.fillStyle = game.PATHSPACE_COLOR;
  ctx.fillRect(x,y,boxsize,boxsize);
}

function drawEmptySpace(x,y){
  ctx.fillStyle = game.EMPTYSPACE_COLOR;
  ctx.fillRect(x,y,boxsize,boxsize);
}
