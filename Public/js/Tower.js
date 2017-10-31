class Tower{
  constructor(type){
    this.type = type;
    this.upgradeLevel = 1;
    this.attackSpeed = 100 * this.upgradeLevel;
    this.damage = 20 * this.upgradeLevel;
  }

  getCost(){
    switch(this.type){
      case 'Basic':
        return 20;
        break;
      default:
        return 20;
        break;
    }
  }

  getId(){
    switch(this.type){
      case 'Basic':
        return 3;
        break;
      default:
        return 2;
        break;
    }
  }

  getColor(){
    switch(this.type){
      case 'Basic':
        return "#cfc";
        break;
    }
  }
}
