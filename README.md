# 🎮 2048 with Phaser 3

Phaser 3를 사용해 2048 게임을 구현하기 위한 프로젝트입니다.

이 문서는 **이 프로젝트에서 실제로 사용할 Phaser 기능만** 정리합니다.

---

## 🧱 Phaser에서 사용하는 기능 목록

- 게임 캔버스 자동 생성
- Scene 라이프사이클 관리
- 텍스트·사각형(타일) 생성
- 키보드 입력 처리
- (선택) 애니메이션 처리

---

## 🔧 Phaser 기본 설정

```js
new Phaser.Game(config);
```

```js
const config = {
  type: Phaser.AUTO,
  width: gameWidth,
  height: gameHeight,
  backgroundColor: 0xbbada0,
  scene: [GameScene],
};
```

---

## 🎬 Scene (GameScene)

Phaser는 Scene 단위로 실행됩니다.

```
init → preload → create → update
```

### Scene 구조

```js
class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }
  init() {}
  preload() {}
  create() {}
  update(time, delta) {}
}
```

---

## 🖼 화면 그리기

### 1) 텍스트 생성: `this.add.text()`

```js
const title = scene.add
  .text(x, y, "텍스트", {
    fontSize: "32px",
    color: "#ffffff",
  })
  .setOrigin(0.5);
```

**주요 기능**

- 게임 제목, 점수, 안내문 출력
- `.setOrigin(0.5)` → 텍스트 중앙 정렬
- `.setText("새내용")` → 점수/타일 숫자 갱신

---

### 2) 사각형 생성: `this.add.rectangle()`

```js
const tile = scene.add.rectangle(x, y, width, height, color);
tile.setStrokeStyle(2, 0xcdc1b4);
```

**주요 기능**

- 4×4 타일 배경
- `.setFillStyle(color)` → 숫자값에 따라 배경색 변경

---

## 🎹 키보드 입력 처리

```js
scene.input.keyboard.on("keydown", (event) => {
  handleKey(scene, event.code);
});
```

| 입력 | 코드       |
| ---- | ---------- |
| ←    | ArrowLeft  |
| ↑    | ArrowUp    |
| →    | ArrowRight |
| ↓    | ArrowDown  |

---

## 🔄 update()

```js
update(time, delta) { }
```

- 매 프레임 호출
- 애니메이션 사용 시 여기에 구현

---

## 📘 불필요한 Phaser 기능 (2048에서는 사용 X)

- 물리엔진
- 충돌 처리
- 스프라이트 시트
- 카메라 시스템
- 오디오 시스템

---

## 📚 결론

2048 게임은 Phaser의 전체 기능 중 **Scene, 텍스트, 사각형, 입력 처리 정도만으로 충분히 구현** 가능합니다.
