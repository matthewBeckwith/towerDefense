class Game{
  constructor(){
    this.TOWERSPACE_COLOR = "#42f44e";
    this.EMPTYSPACE_COLOR = "#000";
    this.PATHSPACE_COLOR = "#b29c52";
    this.FPS = 30/1000;
    this.DIFFICULTY = 30;
  }

  changeDifficulty(diff){
    switch(diff){
      case 1:
        this.DIFFICULTY = 20;
        break;
      case 2:
        this.DIFFICULTY = 30;
        break;
      case 3:
        this.DIFFICULTY = 50;
        break;
      default:
        this.DIFFICULTY = 30;
        break;
    }
  }
}
