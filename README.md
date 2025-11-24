# 🎮 2048 Game (Phaser 3 + ES Modules)

이 프로젝트는 **Phaser 3**를 사용하여 제작된 2048 퍼즐 게임입니다.  
키보드 대신 **마우스/터치 스와이프**를 이용해 타일을 이동시키며,  
Phaser의 다양한 기능(씬 관리, Tween 애니메이션, 입력 시스템, Display Object 등)을 활용하여 구현되었습니다.

> 모듈 기반 구조(`main.mjs`, `modules/*.mjs`)라 GitHub Pages에서도 실행 가능합니다.

---

## 🧩 주요 특징

- ✔ Phaser 3 기반 Canvas/WebGL 렌더링
- ✔ 마우스/터치 스와이프 이동
- ✔ 자연스러운 슬라이드 이동 애니메이션
- ✔ 타일 합체 시 팝 애니메이션
- ✔ 숫자 타일별 색상 매핑
- ✔ 게임 중/게임 끝나고 재시작 버튼
- ✔ 모듈 기반 코드로 유지보수 용이
- ✔ GitHub Pages 완전 호환

---

## 📁 폴더 구조

```
📂 project-root
 ├─ index.html
 ├─ main.mjs
 ├─ phaser.js (CDN으로 대체 가능)
 └─ modules/
      ├─ input.mjs
      ├─ view.mjs
      ├─ logic.mjs
      └─ colors.mjs
```

---

# 🧠 프로젝트에서 사용한 Phaser 기능 정리

## 🎬 Scene (장면) 시스템

- `init()` – 보드/변수 초기화
- `create()` – UI 초기화, 입력 생성, 재시작 버튼
- Phaser의 핵심 흐름을 구성하는 단위

## 🖼 Display Object (화면 오브젝트)

- `Rectangle`, `Text`, `Group` 사용
- 색상/폰트/정렬 지정
- 캔버스 내부는 CSS 적용 불가 → JS에서 직접 스타일 지정

## 🔄 Tween 애니메이션

- 이동 슬라이드 애니메이션
- 합체 팝 애니메이션 (scale yoyo)

## 🎮 입력 시스템 (Pointer Input)

- 마우스/터치 스와이프 방향 판단
- `pointerdown`, `pointerup` 사용

## 🎨 색상 매핑 (colors.mjs)

- 타일 숫자에 따른 Hex 색상 테이블
- CSS로는 제어 불가 (Canvas 내부라서)

## 🧠 2048 게임 알고리즘 (logic.mjs)

- 보드 초기화
- 랜덤 타일 생성
- 슬라이드/합체 계산
- 점수 계산
- 게임 오버 판정

## 🔁 Restart 버튼

- 게임 도중/게임 오버 모두 사용 가능
- 보드, 점수, 상태 재초기화

---

## 📱 모바일/태블릿 지원

- 스와이프 입력 덕분에 모바일에서도 완전 플레이 가능
- WebGL 렌더링으로 부드러운 퍼포먼스

---

## 📄 라이선스

MIT  
Phaser 3 © Photon Storm

---

## 💬 문의 / 제안

버그 제보와 기능 제안 모두 환영합니다!
