let spriteSheet; // 宣告角色走路動畫的精靈圖變數
let characterX; // 宣告角色的水平座標
let characterY; // 宣告角色的垂直座標
let facingDirection = 1; // 設定角色初始面向右方
let animationFrame = 0; // 設定角色目前播放的動畫影格
const frameCountTotal = 8; // 設定精靈圖的影格總數
const spriteWidth = 307; // 設定精靈圖的總寬度
const spriteHeight = 71; // 設定精靈圖的總高度
const frameWidth = spriteWidth / frameCountTotal; // 計算每個動畫影格的寬度
const moveSpeed = 4; // 設定角色每次繪製時的移動速度

function preload() { // 在畫布建立前載入角色精靈圖
  spriteSheet = loadImage("Raimu/走路/all.png"); // 載入走路動畫圖片
} // 結束圖片載入函式

function setup() { // 設定畫布與角色的初始狀態
  createCanvas(windowWidth, windowHeight); // 建立符合視窗大小的畫布
  frameRate(60); // 將畫面更新頻率設定為每秒六十格
  characterX = width / 2; // 將角色放在畫布水平中央
  characterY = height / 2; // 將角色放在畫布垂直中央
} // 結束初始設定函式

function draw() { // 每一格更新背景、角色位置與動畫
  background("#f7b1b0"); // 使用指定的粉紅色作為背景
  let horizontalDirection = 0; // 設定本次更新的水平移動方向

  if (keyIsDown(RIGHT_ARROW)) { // 檢查是否按住鍵盤右方向鍵
    horizontalDirection += 1; // 將移動方向設為右方
  } // 結束右方向鍵判斷

    if (keyIsDown(LEFT_ARROW)) { // 檢查是否按住鍵盤左方向鍵
    horizontalDirection -= 1; // 將移動方向設為左方
  } // 結束左方向鍵判斷

  if (horizontalDirection !== 0) { // 判斷角色是否正在移動
    characterX += horizontalDirection * moveSpeed; // 依方向與速度更新角色水平位置
    facingDirection = horizontalDirection; // 讓角色面向目前移動方向
    animationFrame = floor(frameCount / 6) % frameCountTotal; // 依時間循環播放八格走路動畫
  } else { // 處理角色沒有移動的狀態
    animationFrame = 0; // 讓角色停在動畫的第一格
  } // 結束移動狀態判斷

  characterX = constrain(characterX, min(frameWidth / 2, width / 2), max(width - frameWidth / 2, width / 2)); // 將角色限制在畫布水平範圍內
  push(); // 暫存目前的繪圖狀態
  translate(characterX, characterY); // 將繪圖原點移到角色中心
  scale(facingDirection, 1); // 依角色方向水平翻轉精靈圖
  image(spriteSheet, -frameWidth / 2, -spriteHeight / 2, frameWidth, spriteHeight, animationFrame * frameWidth, 0, frameWidth, spriteHeight); // 繪製目前的動畫影格
  pop(); // 還原繪圖狀態
} // 結束每格繪圖函式

function windowResized() { // 在瀏覽器視窗尺寸改變時更新畫布
  resizeCanvas(windowWidth, windowHeight); // 將畫布調整為新的視窗大小
  characterX = constrain(characterX, min(frameWidth / 2, width / 2), max(width - frameWidth / 2, width / 2)); // 將角色保持在畫布水平範圍內
  characterY = height / 2; // 讓角色維持在畫布垂直中央
} // 結束視窗尺寸更新函式
