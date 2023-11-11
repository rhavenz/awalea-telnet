import { assertEquals } from "std/assert/mod.ts";
import { getNextPossibleActions } from "./get-next-possible-actions.ts";
import { getNextState } from "./get-next-state.ts";
import { GameState } from "./state.ts";

Deno.test("Determine next valid actions 1/5", () => {
  const state: GameState = {
    player: 0,
    history: [],
    score: [0, 0],
    board: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  };

  const possibleMoves: number[] = getNextPossibleActions(state);
  assertEquals(possibleMoves, [0, 1, 2, 3, 4, 5]);
});

Deno.test("Determine next valid actions 2/5", () => {
  const state: GameState = {
    player: 1,
    history: [],
    score: [0, 0],
    board: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  };

  const possibleMoves: number[] = getNextPossibleActions(state);
  assertEquals(possibleMoves, [6, 7, 8, 9, 10, 11]);
});

Deno.test("Determine next valid actions 3/5", () => {
  const state: GameState = {
    board: [4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0],
    history: [],
    score: [0, 0],
    player: 0,
  };

  const possibleMoves: number[] = getNextPossibleActions(state);
  assertEquals(possibleMoves, [2, 3, 4, 5]);
});

Deno.test("Determine next valid actions 4/5", () => {
  const state: GameState = {
    player: 0,
    history: [],
    score: [0, 0],
    board: [4, 4, 4, 4, 4, 4, 2, 2, 2, 0, 0, 0],
  };

  const possibleMoves: number[] = getNextPossibleActions(state);
  assertEquals(possibleMoves, [0, 1, 2, 3, 5]);
});

Deno.test("Determine next valid actions 5/5", () => {
  const state: GameState = {
    player: 1,
    history: [],
    score: [0, 0],
    board: [2, 2, 2, 0, 0, 0, 4, 4, 4, 4, 4, 4],
  };

  const possibleMoves: number[] = getNextPossibleActions(state);
  assertEquals(possibleMoves, [6, 7, 8, 9, 11]);
});

Deno.test("Produce next state 1/1", () => {
  const state: GameState = {
    player: 1,
    history: [],
    score: [0, 0],
    board: [3, 0, 2, 0, 0, 6, /**/ 13, 4, 4, 2, 10, 3],
  };

  const nextState = getNextState(state, 0);
  assertEquals(nextState, {
    player: 0,
    history: [6],
    score: [0, 0],
    board: [4, 1, 3, 1, 1, 7, /**/ 0, 6, 6, 3, 11, 4],
  });
});
