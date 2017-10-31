class Enemy{
  constructor(type){
    this.type = type;
    this.upgradeLevel = 1;
    this.health = 100 * this.upgradeLevel;
    this.moveSpeed = 5 * this.upgradeLevel;
  }

  getId(){
    switch(this.type){
      case 'Basic':
        return 10;
        break;
      default:
        return 1;
        break;
    }
  }

  getColor(){
    switch(this.type){
      case 'Basic':
        return "#b71616";
        break;
    }
  }
}
