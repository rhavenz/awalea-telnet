import { getNextState } from "./get-next-state.ts";
import { GameState } from "./state.ts";

export function getNextPossibleActions(state: GameState): number[] {
  const moves = [0, 1, 2, 3, 4, 5]
    .map((i) => i + state.player * 6)
    .map((action) => {
      return {
        // * If the next state is the same as the current state, then the action is invalid
        valid: getNextState(state, action) === state ? false : true,
        action,
      };
    })
    .filter(({ valid }) => valid)
    .map(({ action }) => action);

  return moves;
}
