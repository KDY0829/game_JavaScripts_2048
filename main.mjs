// main.mjs — Phaser 부팅 + Scene + 이동 파이프라인 (+ Restart 버튼)
import { setupSwipeInput } from "./modules/input.mjs";
import { createBoardView, refreshView, cellCenter } from "./modules/view.mjs";
import {
  addRandomTile,
  simulateMove,
  isGameOver,
  makeEmptyBoard,
} from "./modules/logic.mjs";
import { getTileBg, getTileFg } from "./modules/colors.mjs";

export const gameWidth = 600,
  gameHeight = 700;

// ───────── GameScene 먼저 선언 ─────────
class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }
  init() {
    this.board = makeEmptyBoard();
    this.score = 0;
    this.gameOver = false;

    this.tileSize = 120;
    this.gap = 10;
    this.startX = (gameWidth - (this.tileSize * 4 + this.gap * 3)) / 2;
    this.startY = 150;

    this.cells = [];
    this.labels = [];
    this.fxGroup = this.add.group(); // 이동 고스트 타일
    this.gameOverText = null; // 오버레이 텍스트 참조
  }
  preload() {}
  create() {
    // 타이틀/점수
    this.add
      .text(gameWidth / 2, 40, "2048", {
        fontFamily: "GMarketSans",
        fontSize: "48px",
        color: "#776e65",
      })
      .setOrigin(0.5);

    this.scoreText = this.add
      .text(gameWidth / 2, 90, "Score: 0", {
        fontFamily: "GMarketSans",
        fontSize: "28px",
        color: "#776e65",
      })
      .setOrigin(0.5);

    // ▶ RESTART 버튼 (우상단)
    const btnW = 120,
      btnH = 40,
      bx = gameWidth - btnW / 2 - 16,
      by = 50;
    const btn = this.add
      .rectangle(bx, by, btnW, btnH, 0xbbada0)
      .setStrokeStyle(2, 0x8f7a66)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });
    const lbl = this.add
      .text(bx, by, "RESTART", { fontSize: "18px", color: "#f9f6f2" })
      .setOrigin(0.5);
    btn.on("pointerup", () => resetGame(this));
    lbl
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => resetGame(this)); // 텍스트 클릭도 동작

    // 보드 생성/초기화
    createBoardView(this);
    addRandomTile(this.board);
    addRandomTile(this.board);
    refreshView(this);

    // 스와이프 입력
    setupSwipeInput(this, (dir) => handleMoveAnimated(this, dir));
  }
}

export default GameScene;

// ───────── Restart 구현 ─────────
function resetGame(scene) {
  // 오버레이/이펙트 정리
  if (scene.gameOverText) {
    scene.gameOverText.destroy();
    scene.gameOverText = null;
  }
  scene.fxGroup.clear(true, true);

  // 상태 초기화
  scene.board = makeEmptyBoard();
  scene.score = 0;
  scene.gameOver = false;

  // 보드 다시 시작
  addRandomTile(scene.board);
  addRandomTile(scene.board);
  refreshView(scene);
}

// ───────── 이동 + FX 파이프라인 ─────────
function handleMoveAnimated(scene, dir) {
  if (scene.gameOver) return;
  const sim = simulateMove(scene.board, dir); // {changed, result, actions, merges, scoreGain}
  if (!sim.changed) return;

  // 1) 고스트 타일 슬라이드
  sim.actions.forEach(({ from, to, value }) => {
    if (from.row === to.row && from.col === to.col) return;
    const s = cellCenter(scene, from.row, from.col),
      d = cellCenter(scene, to.row, to.col);
    scene.labels[from.row][from.col].setText(""); // 겹침 방지
    const ghostRect = scene.add
      .rectangle(s.x, s.y, scene.tileSize, scene.tileSize, getTileBg(value))
      .setStrokeStyle(3, 0xbbada0);
    const ghostText = scene.add
      .text(s.x, s.y, String(value), {
        fontSize: value >= 1024 ? "32px" : value >= 128 ? "36px" : "42px",
        color: getTileFg(value),
      })
      .setOrigin(0.5);
    scene.fxGroup.addMultiple([ghostRect, ghostText]);
    scene.tweens.add({
      targets: [ghostRect, ghostText],
      x: d.x,
      y: d.y,
      duration: 140,
      ease: "Quad.easeOut",
    });
  });

  // 2) 결과 반영 → 합체 팝 → 새 타일 → 갱신 → 게임오버 체크
  scene.time.delayedCall(150, () => {
    scene.fxGroup.clear(true, true);
    scene.board = sim.result;
    scene.score += sim.scoreGain;

    refreshView(scene);
    sim.merges.forEach(({ row, col }) => {
      const rect = scene.cells[row][col],
        label = scene.labels[row][col];
      scene.tweens.add({
        targets: [rect, label],
        scale: 1.12,
        duration: 90,
        yoyo: true,
        ease: "Quad.easeOut",
      });
    });

    addRandomTile(scene.board);
    refreshView(scene);

    if (isGameOver(scene.board)) {
      scene.gameOver = true;
      // GAME OVER 텍스트를 저장해두면 재시작 때 제거 가능
      scene.gameOverText = scene.add
        .text(gameWidth / 2, 640, "GAME OVER", {
          fontSize: "48px",
          color: "#f00",
        })
        .setOrigin(0.5);
    }
  });
}

// ───────── Phaser 설정/부팅 ─────────
const config = {
  type: Phaser.AUTO,
  width: gameWidth,
  height: gameHeight,
  backgroundColor: 0xfaf8ef,
  scene: [GameScene],
};

new Phaser.Game(config);
