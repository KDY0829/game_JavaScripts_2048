// 보드 그리기 + 뷰 갱신
import { getTileBg, getTileFg } from "./colors.mjs";

export function createBoardView(scene) {
  for (let i = 0; i < 4; i++) {
    scene.cells[i] = [];
    scene.labels[i] = [];
    for (let j = 0; j < 4; j++) {
      const { x, y } = cellCenter(scene, i, j);
      const r = scene.add
        .rectangle(x, y, scene.tileSize, scene.tileSize, 0xeee4da)
        .setStrokeStyle(3, 0xbbada0);
      const t = scene.add
        .text(x, y, "", {
          fontFamily: "GMarketSans",
          fontSize: "42px",
          color: "#776e65",
        })
        .setOrigin(0.5);

      scene.cells[i][j] = r;
      scene.labels[i][j] = t;
    }
  }
}

export function refreshView(scene) {
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++) {
      const v = scene.board[i][j];
      scene.cells[i][j].setFillStyle(getTileBg(v));
      scene.labels[i][j].setText(v ? String(v) : "");
      scene.labels[i][j].setColor(getTileFg(v));
      scene.labels[i][j].setFontSize(
        v >= 1024 ? "32px" : v >= 128 ? "36px" : "42px"
      );
      scene.labels[i][j].setFontFamily("GMarketSans");
    }
  scene.scoreText.setText("Score: " + scene.score);
}

export function cellCenter(scene, i, j) {
  return {
    x: scene.startX + j * (scene.tileSize + scene.gap) + scene.tileSize / 2,
    y: scene.startY + i * (scene.tileSize + scene.gap) + scene.tileSize / 2,
  };
}
