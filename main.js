// 화면 크기
const gameWidth = 600;
const gameHeight = 700;

// phaser 설정
const config = {
  type: Phaser.AUTO,
  width: gameWidth,
  height: gameHeight,
  backgroundColor: 0xfaf8ef,
  scene: [GameScene],
};

// phaser 시작
new Phaser.Game(config);
