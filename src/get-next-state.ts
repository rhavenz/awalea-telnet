import { partition } from "std/collections/mod.ts";
import { GameState } from "./state.ts";

const makeCursor = (value: number) => {
  let value_ = value;

  return {
    get() {
      return value_;
    },
    increment() {
      value_ = (value_ + 1) % 12;
    },
    decrement() {
      value_ = value_ - 1 < 0 ? 12 - 1 : value_ - 1;
    },
  };
};

type Cursor = ReturnType<typeof makeCursor>;

function sowingPhase(state: GameState, cursor: Cursor): GameState {
  const board = [...state.board];
  const from = cursor.get();

  let value = board[from];

  if (value === 0) {
    return state;
  }

  board[from] = 0;

  while (value > 0) {
    cursor.increment();

    if (cursor.get() === from) {
      cursor.increment();
    }

    board[cursor.get()] += 1;
    value -= 1;
  }

  return { ...state, board };
}

function capturingPhase(state: GameState, cursor: Cursor) {
  const board = [...state.board];
  const score = [...state.score];
  const [playerIndexes, opponentIndexes] = partition(
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    (i) => {
      return state.player === 0 ? i < 6 : i >= 6;
    }
  );

  while (!playerIndexes.includes(cursor.get())) {
    const idx = cursor.get();
    if (board[idx] !== 2 && board[idx] !== 3) {
      break;
    }

    score[state.player] += board[idx];
    board[idx] = 0;

    cursor.decrement();
  }

  if (opponentIndexes.map((i) => board[i]).every((v) => v === 0)) {
    return state;
  }

  return { ...state, board, score };
}

// * -------------------------------------------------- *

export function getNextState(state: GameState, action: number): GameState {
  if (state.player === 0 && (action < 0 || action > 5)) {
    return state;
  }

  if (state.player === 1 && (action < 6 || action > 11)) {
    return state;
  }

  const cursor = makeCursor(action);

  const stateAfterSowingPhase = sowingPhase(state, cursor);

  if (stateAfterSowingPhase === state) {
    return state;
  }

  const stateAfterCapturingPhase = capturingPhase(
    stateAfterSowingPhase,
    cursor
  );

  if (stateAfterCapturingPhase === stateAfterSowingPhase) {
    return state;
  }

  return {
    board: stateAfterCapturingPhase.board,
    score: stateAfterCapturingPhase.score,
    history: [...state.history, action],
    player: state.player === 0 ? 1 : 0,
  };
}

export function getInitialState(): GameState {
  return {
    board: [4, 4, 4, 4, 4, 4, /**/ 4, 4, 4, 4, 4, 4],
    history: [],
    score: [0, 0],
    player: 0,
  };
}
