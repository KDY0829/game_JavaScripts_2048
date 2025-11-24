// 보드 로직(랜덤 생성, 이동/합체 시뮬, 게임오버)
export function makeEmptyBoard() {
  return [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
}

export function addRandomTile(board) {
  const empty = [];
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++) if (!board[i][j]) empty.push([i, j]);
  if (!empty.length) return;
  const [i, j] = empty[Math.floor(Math.random() * empty.length)];
  board[i][j] = Math.random() < 0.9 ? 2 : 4;
}

export function isGameOver(board) {
  if (board.some((r) => r.includes(0))) return false;
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++) {
      const v = board[i][j];
      if (j < 3 && v === board[i][j + 1]) return false;
      if (i < 3 && v === board[i + 1][j]) return false;
    }
  return true;
}

export function simulateMove(board, dir) {
  const N = 4,
    old = copy(board),
    res = makeEmptyBoard();
  let actions = [],
    merges = [],
    scoreGain = 0;

  const slide = (line) => {
    const nz = [];
    for (let k = 0; k < N; k++) if (line[k]) nz.push({ v: line[k], idx: k });
    const out = [0, 0, 0, 0];
    const moveMap = [];
    const mergeInfo = [];
    let w = 0,
      skip = false,
      gain = 0;
    for (let i = 0; i < nz.length; i++) {
      if (skip) {
        skip = false;
        continue;
      }
      if (i + 1 < nz.length && nz[i].v === nz[i + 1].v) {
        const m = nz[i].v * 2;
        out[w] = m;
        gain += m;
        moveMap.push({ from: nz[i].idx, to: w, v: nz[i].v });
        moveMap.push({ from: nz[i + 1].idx, to: w, v: nz[i + 1].v });
        mergeInfo.push({ at: w, v: m });
        w++;
        i++;
      } else {
        out[w] = nz[i].v;
        moveMap.push({ from: nz[i].idx, to: w, v: nz[i].v });
        w++;
      }
    }
    return { out, moveMap, mergeInfo, gain };
  };

  if (dir === "left") {
    for (let r = 0; r < N; r++) {
      const { out, moveMap, mergeInfo, gain } = slide(old[r]);
      scoreGain += gain;
      res[r] = out;
      moveMap.forEach((m) =>
        actions.push({
          from: { row: r, col: m.from },
          to: { row: r, col: m.to },
          value: m.v,
        })
      );
      mergeInfo.forEach((m) => merges.push({ row: r, col: m.at, value: m.v }));
    }
  } else if (dir === "right") {
    for (let r = 0; r < N; r++) {
      const rev = [...old[r]].reverse();
      const { out, moveMap, mergeInfo, gain } = slide(rev);
      scoreGain += gain;
      const restored = out.reverse();
      res[r] = restored;
      moveMap.forEach((m) =>
        actions.push({
          from: { row: r, col: N - 1 - m.from },
          to: { row: r, col: N - 1 - m.to },
          value: m.v,
        })
      );
      mergeInfo.forEach((m) =>
        merges.push({ row: r, col: N - 1 - m.at, value: m.v })
      );
    }
  } else if (dir === "up") {
    for (let c = 0; c < N; c++) {
      const col = [old[0][c], old[1][c], old[2][c], old[3][c]];
      const { out, moveMap, mergeInfo, gain } = slide(col);
      scoreGain += gain;
      for (let r = 0; r < N; r++) res[r][c] = out[r];
      moveMap.forEach((m) =>
        actions.push({
          from: { row: m.from, col: c },
          to: { row: m.to, col: c },
          value: m.v,
        })
      );
      mergeInfo.forEach((m) => merges.push({ row: m.at, col: c, value: m.v }));
    }
  } else if (dir === "down") {
    for (let c = 0; c < N; c++) {
      const col = [old[0][c], old[1][c], old[2][c], old[3][c]].reverse();
      const { out, moveMap, mergeInfo, gain } = slide(col);
      scoreGain += gain;
      const restored = out.reverse();
      for (let r = 0; r < N; r++) res[r][c] = restored[r];
      moveMap.forEach((m) =>
        actions.push({
          from: { row: N - 1 - m.from, col: c },
          to: { row: N - 1 - m.to, col: c },
          value: m.v,
        })
      );
      mergeInfo.forEach((m) =>
        merges.push({ row: N - 1 - m.at, col: c, value: m.v })
      );
    }
  }

  const changed = JSON.stringify(old) !== JSON.stringify(res);
  return { changed, result: res, actions, merges, scoreGain };
}

const copy = (b) => b.map((r) => r.slice());
