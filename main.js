// 랜덤번호 지정
// 유저가 번호를 입력한다 그리고 go 라는 버튼을 누름
// 만약에 유저가 번호를 맞추면 맞췄습니다!
// 정답번호가 유저번호보다 작으면 down 출력
// 크면 up 출력 후 리셋 버튼 활성화
 //5번의 기회를 다쓰면 게임이 끝난다. (더이상 추측 불가, 버튼이 disable)
//유저가 1~100 범위 밖에 숫자를 입력하면 알려주고 기회를 깎지 않는다.
//유저가 이미 입력한 숫자를 또 입력하면, 알려준다, 기회를 깎지 않는다.
//함수도 매개변수처럼 넘길수 있다.

let computerNum =0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 10;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let history=[];

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function(){
  userInput.value="";
});

function pickRandomNum(){
    computerNum = Math.floor(Math.random()*100)+1;
    console.log("정답", computerNum);
}

function play(){  //.value 하게되면 html상 사용자가 입력한 값을 들고옴
    const userValue = userInput.value;

    if(userValue<1 || userValue>100){
        resultArea.textContent="1과 100사이 숫자를 입력해 주세요";
        return;
    }

    if(history.includes(userValue)){
      resultArea.textContent="이미 입력한 숫자입니다. 다른 숫자를 입력해주세요.";
      return;
    }
    chances -- ;
    chanceArea.textContent= `남은 찬스: ${chances}번`;
      history.push(userValue);
    if(userValue < computerNum){
      resultArea.textContent = "up!!!"

    } else if(userValue > computerNum){
      resultArea.textContent = "down!!!"

    } else {
      resultArea.textContent = "맞췄습니다!"
      gameOver=true;
    }
    if(chances < 1){
      gameOver = true;
      resultArea.textContent = "게임이 종료되었습니다ㅜ,ㅜ"
    }
    if(gameOver == true){
      playButton.disabled = true;
    }
  }

function reset(){
    //user input창이 깨끗하게 정리
    userInput.value = "";
    //새로운 번호가 생성
    pickRandomNum();
    resultArea.textContent = "결과값이 여기 나옵니다!";
    gameOver = false;
    playButton.disabled = false;
    chances = 10;
    chanceArea.textContent= `남은 찬스: ${chances}번`;
    history = [];
}
pickRandomNum();
