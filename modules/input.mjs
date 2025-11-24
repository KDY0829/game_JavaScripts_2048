// 마우스/터치 스와이프 방향 판단
export function setupSwipeInput(scene, onDirection) {
  let sx = 0,
    sy = 0;
  scene.input.on("pointerdown", (p) => {
    sx = p.x;
    sy = p.y;
  });
  scene.input.on("pointerup", (p) => {
    const dx = p.x - sx,
      dy = p.y - sy;
    if (Math.abs(dx) < 20 && Math.abs(dy) < 20) return; // 최소 스와이프 길이
    const horiz = Math.abs(dx) > Math.abs(dy);
    if (horiz) onDirection(dx > 0 ? "right" : "left");
    else onDirection(dy > 0 ? "down" : "up");
  });
}
