import { assert, assertEquals } from "std/assert/mod.ts";
import { getNextPossibleActions } from "./get-next-possible-actions.ts";
import { getNextState } from "./get-next-state.ts";
import { GameState } from "./state.ts";
import { gameOver, isGameOver } from "./game-over.ts";

Deno.test("ChaB's first game - move 1", () => {
  const state: GameState = {
    player: 1,
    history: [],
    score: [0, 0],
    board: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  };

  // * Player 1 play 6
  assert(getNextPossibleActions(state).includes(6));

  const nextState = getNextState(state, 6);

  assertEquals(nextState, {
    player: 0,
    history: [6],
    score: [0, 0],
    board: [4, 4, 4, 4, 4, 4, /**/ 0, 5, 5, 5, 5, 4],
  });
});

Deno.test("ChaB's first game - move 2", () => {
  const state: GameState = {
    player: 0,
    history: [6],
    score: [0, 0],
    board: [4, 4, 4, 4, 4, 4, /**/ 0, 5, 5, 5, 5, 4],
  };

  // * Player 0 play 3
  assert(getNextPossibleActions(state).includes(3));

  const nextState = getNextState(state, 3);

  assertEquals(nextState, {
    player: 1,
    history: [6, 3],
    score: [0, 0],
    board: [4, 4, 4, 0, 5, 5, /**/ 1, 6, 5, 5, 5, 4],
  });
});

Deno.test("ChaB's first game - move 3", () => {
  const state: GameState = {
    player: 1,
    history: [6, 3],
    score: [0, 0],
    board: [4, 4, 4, 0, 5, 5, /**/ 1, 6, 5, 5, 5, 4],
  };

  // * Player 0 play 6
  const nextState = getNextState(state, 6);

  assertEquals(nextState, {
    player: 0,
    history: [6, 3, 6],
    score: [0, 0],
    board: [4, 4, 4, 0, 5, 5, /**/ 0, 7, 5, 5, 5, 4],
  });
});

Deno.test("ChaB's first game - move 4", () => {
  const state: GameState = {
    player: 0,
    history: [6, 3, 6],
    score: [0, 0],
    board: [4, 4, 4, 0, 5, 5, /**/ 0, 7, 5, 5, 5, 4],
  };

  // * Player 0 play 4
  const nextState = getNextState(state, 4);

  assertEquals(nextState, {
    player: 1,
    history: [6, 3, 6, 4],
    score: [0, 0],
    board: [4, 4, 4, 0, 0, 6, /**/ 1, 8, 6, 6, 5, 4],
  });
});

Deno.test("ChaB's first game - move 5", () => {
  const state: GameState = {
    player: 1,
    history: [6, 3, 6, 4],
    score: [0, 0],
    board: [4, 4, 4, 0, 0, 6, /**/ 1, 8, 6, 6, 5, 4],
  };

  // * Player 0 play 6
  const nextState = getNextState(state, 6);

  assertEquals(nextState, {
    player: 0,
    history: [6, 3, 6, 4, 6],
    score: [0, 0],
    board: [4, 4, 4, 0, 0, 6, /**/ 0, 9, 6, 6, 5, 4],
  });
});

Deno.test("ChaB's first game - move 6", () => {
  const state: GameState = {
    player: 0,
    history: [6, 3, 6, 4, 6],
    score: [0, 0],
    board: [4, 4, 4, 0, 0, 6, /**/ 0, 9, 6, 6, 5, 4],
  };

  // * Player 0 play 2
  const nextState = getNextState(state, 2);

  assertEquals(nextState, {
    player: 1,
    history: [6, 3, 6, 4, 6, 2],
    score: [0, 0],
    board: [4, 4, 0, 1, 1, 7, /**/ 1, 9, 6, 6, 5, 4],
  });
});

Deno.test("ChaB's first game - move 7", () => {
  const state: GameState = {
    player: 1,
    history: [6, 3, 6, 4, 6, 2],
    score: [0, 0],
    board: [4, 4, 0, 1, 1, 7, /**/ 1, 9, 6, 6, 5, 4],
  };

  // * Player 1 play 7
  const nextState = getNextState(state, 7);

  assertEquals(nextState, {
    player: 0,
    history: [6, 3, 6, 4, 6, 2, 7],
    score: [0, 4],
    board: [5, 5, 1, 0, 0, 7, /**/ 1, 0, 7, 7, 6, 5],
  });
});

Deno.test("ChaB's first game - move 8", () => {
  const state: GameState = {
    player: 0,
    history: [6, 3, 6, 4, 6, 2, 7],
    score: [0, 4],
    board: [5, 5, 1, 0, 0, 7, /**/ 1, 0, 7, 7, 6, 5],
  };

  // * Player 0 play 1
  const nextState = getNextState(state, 1);

  assertEquals(nextState, {
    player: 1,
    history: [6, 3, 6, 4, 6, 2, 7, 1],
    score: [2, 4],
    board: [5, 0, 2, 1, 1, 8, /**/ 0, 0, 7, 7, 6, 5],
  });
});

Deno.test("ChaB's first game - move 9", () => {
  const state: GameState = {
    player: 1,
    history: [6, 3, 6, 4, 6, 2, 7, 1],
    score: [2, 4],
    board: [5, 0, 2, 1, 1, 8, /**/ 0, 0, 7, 7, 6, 5],
  };

  // * Player 1 play 10
  const nextState = getNextState(state, 10);

  assertEquals(nextState, {
    player: 0,
    history: [6, 3, 6, 4, 6, 2, 7, 1, 10],
    score: [2, 11],
    board: [6, 1, 0, 0, 0, 8, /**/ 0, 0, 7, 7, 0, 6],
  });
});

Deno.test("ChaB's first game - move 10", () => {
  const state: GameState = {
    player: 0,
    history: [6, 3, 6, 4, 6, 2, 7, 1, 10],
    score: [2, 11],
    board: [6, 1, 0, 0, 0, 8, /**/ 0, 0, 7, 7, 0, 6],
  };

  // * Player 0 play 5
  const nextState = getNextState(state, 5);

  assertEquals(nextState, {
    player: 1,
    history: [6, 3, 6, 4, 6, 2, 7, 1, 10, 5],
    score: [2, 11],
    board: [7, 2, 0, 0, 0, 0, /**/ 1, 1, 8, 8, 1, 7],
  });
});

Deno.test("ChaB's first game - move 11", () => {
  const state: GameState = {
    player: 1,
    history: [6, 3, 6, 4, 6, 2, 7, 1, 10, 5],
    score: [2, 11],
    board: [7, 2, 0, 0, 0, 0, /**/ 1, 1, 8, 8, 1, 7],
  };

  // * Player 1 play 6
  const nextState = getNextState(state, 6);

  assertEquals(nextState, {
    player: 0,
    history: [6, 3, 6, 4, 6, 2, 7, 1, 10, 5, 6],
    score: [2, 11],
    board: [7, 2, 0, 0, 0, 0, /**/ 0, 2, 8, 8, 1, 7],
  });
});

Deno.test("ChaB's first game - move 12", () => {
  const state: GameState = {
    player: 0,
    history: [6, 3, 6, 4, 6, 2, 7, 1, 10, 5, 6],
    score: [2, 11],
    board: [7, 2, 0, 0, 0, 0, /**/ 0, 2, 8, 8, 1, 7],
  };

  // * Player 0 play 0
  const nextState = getNextState(state, 0);

  assertEquals(nextState, {
    player: 1,
    history: [6, 3, 6, 4, 6, 2, 7, 1, 10, 5, 6, 0],
    score: [5, 11],
    board: [0, 3, 1, 1, 1, 1, /**/ 1, 0, 8, 8, 1, 7],
  });
});

Deno.test("ChaB's first game - move 13", () => {
  const state: GameState = {
    player: 1,
    history: [6, 3, 6, 4, 6, 2, 7, 1, 10, 5, 6, 0],
    score: [5, 11],
    board: [0, 3, 1, 1, 1, 1, /**/ 1, 0, 8, 8, 1, 7],
  };

  // * Player 1 play 9
  const nextState = getNextState(state, 9);

  assertEquals(nextState, {
    player: 0,
    history: [6, 3, 6, 4, 6, 2, 7, 1, 10, 5, 6, 0, 9],
    score: [5, 19],
    board: [1, 4, 0, 0, 0, 0, /**/ 1, 0, 8, 0, 2, 8],
  });
});

Deno.test("ChaB's first game - move 14", () => {
  const state: GameState = {
    player: 0,
    history: [6, 3, 6, 4, 6, 2, 7, 1, 10, 5, 6, 0, 9],
    score: [5, 19],
    board: [1, 4, 0, 0, 0, 0, /**/ 1, 0, 8, 0, 2, 8],
  };

  // * Player 0 play 1
  const nextState = getNextState(state, 1);

  assertEquals(nextState, {
    player: 1,
    history: [6, 3, 6, 4, 6, 2, 7, 1, 10, 5, 6, 0, 9, 1],
    score: [5, 19],
    board: [1, 0, 1, 1, 1, 1, /**/ 1, 0, 8, 0, 2, 8],
  });
});

Deno.test("ChaB's first game - move 15", () => {
  const state: GameState = {
    player: 1,
    history: [6, 3, 6, 4, 6, 2, 7, 1, 10, 5, 6, 0, 9, 1],
    score: [5, 19],
    board: [1, 0, 1, 1, 1, 1, /**/ 1, 0, 8, 0, 2, 8],
  };

  // * Player 1 play 8
  const nextState = getNextState(state, 8);

  assertEquals(nextState, {
    player: 0,
    history: [6, 3, 6, 4, 6, 2, 7, 1, 10, 5, 6, 0, 9, 1, 8],
    score: [5, 25],
    board: [2, 1, 0, 0, 0, 1, /**/ 1, 0, 0, 1, 3, 9],
  });
});

Deno.test("Win conditons - 1/3", () => {
  const state: GameState = {
    player: 1,
    history: [6, 3, 6, 4, 6, 2, 7, 1, 10, 5, 6, 0, 9, 1],
    score: [5, 19],
    board: [1, 0, 1, 1, 1, 1, /**/ 1, 0, 8, 0, 2, 8],
  };

  assert(getNextPossibleActions(state).length > 0);
  assert(isGameOver(state) === false);
  assertEquals(gameOver(state), state);
});

Deno.test("Win conditons - 2/3", () => {
  const state: GameState = {
    player: 0,
    history: [6, 3, 6, 4, 6, 2, 7, 1, 10, 5, 6, 0, 9, 1, 8],
    score: [5, 25],
    board: [2, 1, 0, 0, 0, 1, /**/ 1, 0, 0, 1, 3, 9],
  };

  assert(getNextPossibleActions(state).length > 0);
  assert(isGameOver(state) === true);
  assertEquals(gameOver(state), state);
});

Deno.test("Win conditons - 3/3", () => {
  const state: GameState = {
    player: 1,
    history: [],
    score: [0, 0],
    board: [0, 0, 0, 0, 0, 0, /**/ 1, 0, 0, 1, 1, 0],
  };

  assert(getNextPossibleActions(state).length === 0);
  assert(isGameOver(state) === true);
  assertEquals(gameOver(state), {
    player: 1,
    history: [],
    score: [0, 3],
    board: [0, 0, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 0, 0],
  });
});
