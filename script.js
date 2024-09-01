'use strict'
// 1行目に記載している 'use strict' は削除しないでください

//////////////////////////////////////
let time = 3;


const abeClick = document.getElementById("abehp")
abeClick.addEventListener("click",gameCharge);

function gameCharge() {
  gameCount += 2;
  battleAction.disabled = false;
}


// ボタンの有効・無効切替
function buttonSwitch() {
  chargeAction.disabled = false;
  defenseAction.disabled = false;
 if (myPowerPoint >= 3) {
  superAction.disabled = false;
 }else{
  superAction.disabled = true;
 }
 if (myPowerPoint >= 1) {
  attackAction.disabled = false;
 }else{
  attackAction.disabled = true;
 }
}
// ボタンの無効
function disabledSwitch() {
  chargeAction.disabled = true;
  defenseAction.disabled = true;
  superAction.disabled = true;
  attackAction.disabled = true;
}




function countdownTimer() {
  buttonSwitch();
  if (time > 0) {
    // document.getElementById("countdown").innerHTML = time;
    // console.log(`行動選択の残り時間${time}`);
    time--;
    document.getElementById("countdown").innerHTML = `選択残り時間: ${time} 秒`;
    setTimeout(countdownTimer, 1000);
  } else {
    console.log("終了");
    let enemyPicSelect = "img/"+ enemyAttacks[enemyAction]+ ".jpg"
    let myPicSelect = "img/"+ enemyAttacks[myAction]+ ".jpg"
    enemyPic.src= enemyPicSelect;
    myPic.src= myPicSelect;
    disabledSwitch();
    setTimeout(battleStart, 1000);
  }
}





// const myAction = document.getElementsByClassName("myAction");
const chargeAction = document.getElementById("charge");
const attackAction = document.getElementById("attack");
const defenseAction = document.getElementById("defense");
const superAction = document.getElementById("superAttack");
const battleAction = document.getElementById("battle");

const myPic = document.getElementById("mypics");
const enemyPic = document.getElementById("enemypics");







let gameCount = 2;
let myPowerPoint = 0; // => 自分のパワーポイント
let myAction = 0; // => 自分のアクション
let enemyPowerPoint = 0; // => 相手のパワーポイント
// let enemyAction = Math.floor(Math.random() * 3); // => 相手のアクション、最初はリロードから決める
let enemyAction = 0; // => 相手のアクション、最初はリロードから決める
const myAttacks = ["charge","defense", "attack","superAttack"]; 
const myActionPP = [1, 0, -1, -3];
const enemyAttacks = ["charge", "defense", "attack","superAttack"]; 

///////////my_turn////////////////////
function chargeRelease() {
  // console.log(chargeAction.value);
  console.log("funcName:charge");
  // myPowerPoint += 1;
  myAction = 0;
  console.log("PP:" + myPowerPoint);
  myPic.src = "img/charge.jpg";
}

function defenseRelease() {
  console.log("funcName:defense");
  // myPowerPoint += 1;
  myAction = 1;
  console.log("PP:" + myPowerPoint);
  myPic.src="img/defense.jpg";
}

function attackRelease() {
  console.log("funcName:attack");
  myPic.src="img/attack.jpg";

  if (myPowerPoint > 0) {
    // myPowerPoint -= 1;
    console.log("PP:" + myPowerPoint);  
    myAction = 2;
  }else{
    console.log("チャージして出直しな");
  }
}

function superRelease() {
  console.log("funcName:super");
  myPic.src="img/superAttack.jpg";

  if (myPowerPoint >= 3) {
    // myPowerPoint -= 3;
    // console.log("PP:" + myPowerPoint);  
    myAction = 3;
  }else{
    console.log("PP不足じゃよ")
  }
}

chargeAction.addEventListener("click", chargeRelease);
defenseAction.addEventListener("click", defenseRelease);
attackAction.addEventListener("click", attackRelease);
superAction.addEventListener("click", superRelease);

battleAction.addEventListener("click", gameStart);

function gameStart() {
  // gameCount--;
  battleAction.disabled = true;
  enemyAction = 0;
  console.log(`残りゲームカウント${gameCount}`);
  document.getElementById("myPowerPoints").innerHTML = "";
  document.getElementById("enemeyPowerPoints").innerHTML = "";

  myPic.src="img/think.jpg";
  enemyPic.src="img/think.jpg";
  myPowerPoint = 0;
  enemyPowerPoint = 0;
  if(gameCount > 0) {
    gameCount--;
    countdownTimer();
  }
  
}


///////////my_turn////////////////////

function battleStart(){
  // threeTimer(); //3秒遅延
  let battleResultFlag = 0; //　0:drow,1:win,2:lose
  time = 4;
  let battleComent = "";
  // console.log(myAction);
  // console.log("befo" + myPowerPoint);
  // console.log(myActionPP[myAction]);
  myPowerPoint += myActionPP[myAction];
  // console.log("afte" + myPowerPoint);
  // let enemyPicSelect = "img/"+ enemyAttacks[enemyAction]+ ".jpg"
  // enemyPic.src= enemyPicSelect;

  console.log(`自分は ${myAttacks[myAction]}、 相手は ${enemyAttacks[enemyAction]}`);
  if (myAction === 2 && enemyAction === 0) { //=>アタックで勝ちイベント
    // console.log('you_win');
    battleComent = "you_win";
    myPic.src="img/win.jpg";
    enemyPic.src="img/lose.jpg";
    battleResultFlag = 1;
    // battleAction.disabled = false;

  }else if(myAction === 3 && enemyAction < 3) { //=>スーパーで勝ちイベント
    // console.log('you_win');
    battleComent = "you_win";
    myPic.src="img/win.jpg";
    enemyPic.src="img/lose.jpg";
    battleResultFlag = 1;
    // battleAction.disabled = false;

  }else if(myAction === 0 && enemyAction === 2) { //=>チャージで負けイベント
    // console.log('you_lose');
    battleComent = "you_lose";
    myPic.src="img/lose.jpg";
    enemyPic.src="img/win.jpg";
    battleResultFlag = 2;
    // battleAction.disabled = false;

  }else if(myAction < 3 && enemyAction === 3) { //=>スーパー以外で負けイベント
    // console.log('you_lose');
    battleComent = "you_lose";
    myPic.src="img/lose.jpg";
    enemyPic.src="img/win.jpg";
    battleResultFlag = 2;
    // battleAction.disabled = false;

  }else{
    // console.log('ドロー')
    battleComent = "drow";
    myPic.src="img/think.jpg";
    enemyPic.src="img/think.jpg";
    countdownTimer();
  }

  if(battleResultFlag !== 0 && gameCount > 0){
    battleAction.disabled = false;
  }else if(battleResultFlag !== 0 && gameCount < 0){
    console.log(`abeGO`)
  }


  document.getElementById("battleResult").innerHTML = `バトル結果：${battleComent}`;
  enemyActionSelect();

  document.getElementById("myPowerPoints").innerHTML = displayPowerPoint(myPowerPoint);
  document.getElementById("enemeyPowerPoints").innerHTML = displayPowerPoint(enemyPowerPoint);
  

  
}

function displayPowerPoint(powerPoints) {
  let resultLemon = "";
  for (let i = 0; i < powerPoints; i++) {
    resultLemon += "🍋";
  }
  return resultLemon;
}

////////////////////////enemy_turn////////////////////////////////////////
function enemyActionSelect() {

  // console.log("私は" + enemyAction + "が選択されました");
  /////////////////////////////////////////
  // console.log("相手は" + enemyAttacks[enemyAction]);

  if (enemyAction === 0) {// => charge
    enemyPowerPoint += 1; 
    console.log("相手残量" + enemyPowerPoint); // => charge
  }else if(enemyAction === 1) {// => defence
    // enemyPowerPoint -= 1;
    // console.log("相手残量" + enemyPowerPoint); // => defence
  }else if(enemyAction === 2) {// => attack
    enemyPowerPoint -= 1;
    // console.log("相手残量" + enemyPowerPoint); // => attack
  }else if(enemyAction === 3) {// => super
    enemyPowerPoint -= 3;
    // console.log("残量" + enemyPowerPoint); // => super
  }

  if (enemyPowerPoint >= 3) {
    enemyAction= Math.floor(Math.random() * 4);
    // console.log("PP3以上アクション" + enemyAttacks[enemyAction]);
  }else if(enemyPowerPoint >= 1) {
    enemyAction = Math.floor(Math.random() * 3);
    // console.log("PP1以上アクション" + enemyAttacks[enemyAction]);
  }else if(enemyPowerPoint === 0) {
    enemyAction = Math.floor(Math.random() * 2);
    // console.log("PP0アクション" + enemyAttacks[enemyAction]);
  }
  console.log("次は" + enemyAttacks[enemyAction] + "です");
};

//////////////////////////////////enemy_turn/////////////////////////////////








console.log("終わりじゃよ")
