var canvas = document.getElementById('gameboard');
var ctx = canvas.getContext('2d');

var TOWERSPACE_COLOR = "#42f44e";
var EMPTYSPACE_COLOR = "#000";
var PATHSPACE_COLOR = "#b29c52";
var FPS = 1000/30;

var difficulty = 20;

var boxsize = canvas.width / difficulty;

var level = initLevel(difficulty);

var timer = window.setInterval(draw,FPS);

function getClick(event){
  var mouseX = Math.floor(event.offsetX / boxsize);
  var mouseY = Math.floor(event.offsetY / boxsize);

  if(level[mouseY][mouseX] == 2){
    console.log("Towerspace!");
  }else if(level[mouseY][mouseX] == 1){
    console.log("Path!");
  }else{
    console.log("Nope");
  }
}

function draw(){
  ctx.clearRect(0,0,canvas.height,canvas.width);

  drawLevel(level);
}

function changeDifficulty(diff){
  switch(diff){
    case '1':
      difficulty = 10;
      break;
    case '2':
      difficulty = 25;
      break;
    case '3':
      difficulty = 50;
      break;
    default:
      difficulty = 25;
      break;
  }
}

function drawLevel(level){
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
}

function initLevel(d){
  var level = [];

  for(var i = 0; i < d; i++){
    level.push([]);
    for(var j = 0; j < d; j++){
      level[i][j] = 0;
    }
  }

  return createPath(level);
}

function createPath(level){
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

  return createTowerLocations(level);
}

function createTowerLocations(level){
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

function drawTowerSpace(x,y){
  ctx.fillStyle = TOWERSPACE_COLOR;
  ctx.fillRect(x,y,boxsize,boxsize);
}

function drawPathSpace(x,y){
  ctx.fillStyle = PATHSPACE_COLOR;
  ctx.fillRect(x,y,boxsize,boxsize);
}

function drawEmptySpace(x,y){
  ctx.fillStyle = EMPTYSPACE_COLOR;
  ctx.fillRect(x,y,boxsize,boxsize);
}
