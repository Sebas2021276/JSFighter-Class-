const START_HP = 20;
const START_SP = 10;
const DEFAULT_ATK = 5;
const DEFAULT_DEF = 5;
const DEFAULT_TEK = 5;
//sets constants names
const P0NAME = 'Crash'
const P0CHARA = 'crashr'
const P1NAME = 'Sam'
const P1CHARA = 'saml'
let playerTurn = false;
let logging = true;
let Player0;
let Player1;
//varible for finding % of players HP used for the HealthBar
let player0PercentHP;
let player1PercentHP;
let player0PercentSP;
let player1PercentSP;
// declared variables for the boxes
let gameBox;
let headerBox;
let graphicsBox;
let barsBox;
let controlsBox;
let outputBox;
class Fighter {
  constructor(name, charaName) {
    //'contructor' is in all JS classes
    // It gets run immediately when a new object is created from a class
    // Set all of our default values for this new fighter here
    this.name = name;
    this.hp = START_HP;
    this.sp = START_SP;
    this.atk = DEFAULT_ATK;
    this.def = DEFAULT_DEF;
    this.tek = DEFAULT_TEK;
    this.charaName = charaName;
  }
  //this logs who attacked who
  attack(target) {
    let amount = 0
    amount = Math.round(Math.random() * this.atk)
      outputBox.innerHTML = target.name
    console.log(target.name + ' received ' + amount + " damage")
    koCheck(target, amount)
  }
  single(target) {
    this.attack(target);
  }
  double(target) {
    this.attack(target);
    this.attack(target);
  }
  //this logs that they recovered
  recover() {
    console.log('Recovered!');
  }
}
function startup() {
  Player0 = new Fighter(P0NAME, P0CHARA);
  Player1 = new Fighter(P1NAME, P1CHARA);
  //this makes a shortcut for 'document.getElementById'
  gameBox = document.getElementById('gameBox');
  headerBox = document.getElementById('headerBox');
  graphicsBox = document.getElementById('graphicsBox');
  barsBox = document.getElementById('barsBox');
  controlsBox = document.getElementById('controlsBox');
  outputBox = document.getElementById('outputBox');
  //this shows the fighter images in the graphics box
  graphicsBox.innerHTML = '<img id ="' + Player0.charaName + '" src="img/' + Player0.charaName + '_idle.png" alt="' + Player0.name + '" class="fighterIMG">'
  graphicsBox.innerHTML += '<img id ="' + Player1.charaName + '" src="img/' + Player1.charaName + '_idle.png" alt="' + Player1.name + '" class="fighterIMG">'
  console.log("My name is " + Player0.name + " and my ATK is " + Player0.atk)
  console.log("My name is " + Player1.name + " and my ATK is " + Player1.atk)
  showControls() //runs the showControls() function
  updateBars() //runs the updateBars() function
}
function showControls() {
  //checks to see which players turn it is and show the apropriate controls
  if (playerTurn) {
    //show buttons for player1 and overwrites player0's controls
    controlsBox.innerHTML = '<button type="button" name="attack" onclick="Player1.single(Player0)">Single Attack!</button>';
    controlsBox.innerHTML += '<br><button type="button" name="attack" onclick="Player1.double(Player0)">Double Attack!</button><br>'
    controlsBox.innerHTML += '<br><button type="button" name="attack" onclick="Player1.recover(Player0)">Recover</button><br>'
  } else {
    //show buttons for player0 and overwrites player1's controls
    controlsBox.innerHTML = '<button type="button" name="attack" onclick="Player0.single(Player1)">Single Attack!</button>';
    controlsBox.innerHTML += '<br><button type="button" name="attack" onclick="Player0.double(Player1)">Double Attack!</button><br>'
    controlsBox.innerHTML += '<br><button type="button" name="attack" onclick="Player0.recover(Player1)">Recover</button><br>'


  }
}
//checks the target's HP is less than or equal to 0, Then retuns true or false.
function koCheck(target, amount) {
  target.hp = target.hp - amount;
  console.log(target.hp);
  if (target.hp <= 0) {
    console.log(target.name + " sadly passed away")
    console.log("Press" + " 'F' " + "To pay respects");
    return true;
  } else {
    return false;
  }
}


//This function takes all the info to build an HP or SP bar, and ensure it is not greater than 100 or less than 0
function updateBar(player, hpsp, min, max) {
  let calculated = ((min / max) * 100)
  if (calculated > 100) {
    calculated = 100;
  } else if (calculated < 0) {
    calculated = 0;
  }
  return '<div class="' + hpsp + 'Bar"><div style="width:' + calculated + '%;" id="p0' + hpsp + 'Fill" class="' + hpsp + 'Fill">' + min + '</div></div>'
}

//This function makes the hp/sp bars and places them in the barsBox useing the updateBar
function updateBars() {
  barsBox.innerHTML = updateBar(Player0, 'hp', Player0.hp, START_HP)
  barsBox.innerHTML += updateBar(Player0, 'sp', Player0.sp, START_SP)
  barsBox.innerHTML += updateBar(Player1, 'hp', Player1.hp, START_HP)
  barsBox.innerHTML += updateBar(Player1, 'sp', Player1.sp, START_SP)
}
// EndTurn code
function endTurn() {
  playerTurn = !playerTurn
  if (kocheck(Player0, 0) || kocheck(Player1, 0)){
    hideControls();
  }
  //Makes sure Player0's SP is not greater than 100% or less than 0%
  if (player0PercentSP <= 0) {
    player0PercentSP = 0
  } else if (player0PercentSP > 100) {
    player0PercentSP = 100
  } else {
    player0PercentSP = player0PercentSP
  }
  //Makes sure Player1's SP is not greater than 100% or less than 0%
  if (player1PercentSP <= 0) {
    player1PercentSP = 0
  } else if (player1PercentSP > 100) {
    player1PercentSP = 100
  } else {
    player1PercentSP = player1PercentSP
  }
  barsBox.innerHTML = ''
  barsBox.innerHTML += 'P0<div class="hpBar"><div style="height:' + player0PercentHP + '%; width: 100%;" id="p0HPfill" class="HPfill"></div></div>'
  barsBox.innerHTML += '<div class="spBar"><div style="height:' + player0PercentSP + '%; width: 100%;" id="p0SPfill" class="SPfill"></div></div>'
  barsBox.innerHTML += 'P1<div class="hpBar"><div style="height:' + player1PercentHP + '%; width: 100%;" id="p1HPfill" class="HPfill"></div></div>'
  barsBox.innerHTML += '<div class="spBar"><div style="height:' + player1PercentSP + '%; width: 100%;" id="p1SPfill" class="SPfill"></div></div>'
}
function hideContols() {
  controlsBox.innerHTML = "";
}
function hideContols() {
  controlsBox.innerHTML = "";
}
/*
MHW = 'delicious'
MHWoutput > MHWinput
*/
