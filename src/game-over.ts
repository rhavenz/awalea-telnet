import { partition } from "std/collections/mod.ts";
import { getNextPossibleActions } from "./get-next-possible-actions.ts";
import { GameState } from "./state.ts";

export function gameOver(state: GameState): GameState {
  const board = [...state.board];
  const score = [...state.score];

  if (
    getNextPossibleActions({ ...state, player: state.player === 0 ? 1 : 0 })
      .length === 0
  ) {
    const [playerIndexes, opponentIndexes] = partition(
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      (i) => {
        return state.player === 0 ? i < 6 : i >= 6;
      }
    );

    score[state.player] += playerIndexes.reduce((acc, i) => {
      return acc + board[i];
    }, 0);

    score[state.player === 0 ? 1 : 0] += opponentIndexes.reduce((acc, i) => {
      return acc + board[i];
    }, 0);

    board.fill(0);
  }

  return { ...state, board, score };
}
