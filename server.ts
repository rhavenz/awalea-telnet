import { getNextPossibleActions } from "./src/get-next-possible-actions.ts";
import { getInitialState, getNextState } from "./src/get-next-state.ts";
import { GameState } from "./src/state.ts";
import EventEmitter from "node:events";

function printBoard(state: GameState, seat: 0 | 1) {
  if (seat === 1) {
    return (
      `player 0 (${state.score[0]}):\t${state.board
        .slice(0, 6)
        .reverse()
        .map((v, idx) => `${String(5 - idx).padStart(2)} [${v}]`)
        .join("\t")}\n` +
      `player 1 (${state.score[1]}):\t${state.board
        .slice(6)
        .map((v, idx) => `${String(idx + 6).padStart(2)} [${v}]`)
        .join("\t")}\n`
    );
  } else {
    return (
      `player 1 (${state.score[1]}):\t${state.board
        .slice(6)
        .reverse()
        .map((v, idx) => `${String(11 - idx).padStart(2)} [${v}]`)
        .join("\t")}\n` +
      `player 0 (${state.score[0]}):\t${state.board
        .slice(0, 6)
        .map((v, idx) => `${String(idx).padStart(2)} [${v}]`)
        .join("\t")}\n`
    );
  }
}

const server = Deno.listen({ port: 4242 });
console.log("tcp server listening on port 4242");

type Player = {
  seat: 0 | 1;
  emitter: null | EventEmitter;
};

const connections: Deno.Conn[] = [];
const players: Player[] = [
  {
    seat: 0,
    emitter: null,
  },
  {
    seat: 1,
    emitter: null,
  },
];

for await (const conn of server) {
  console.log("new connection");

  if (connections.length === 2) {
    conn.close();
    continue;
  }

  connections.push(conn);
  handleConnection(conn);
}

async function handleConnection(conn: Deno.Conn) {
  await conn.write(
    new TextEncoder().encode(`Greeting 🔥🔥🔥\n
░█▀█░█░█░█▀█░█░░░█▀▀░█▀█
░█▀█░█▄█░█▀█░█░░░█▀▀░█▀█
░▀░▀░▀░▀░▀░▀░▀▀▀░▀▀▀░▀░▀\n`)
  );

  const player = players.find((s) => s.emitter === null)!;

  player.emitter = new EventEmitter();

  async function handleMessage() {
    for await (const chunk of conn.readable) {
      player.emitter!.emit("receive", chunk);
    }
  }

  handleMessage();

  player.emitter.on("send", (chunk: Uint8Array) => {
    conn.write(chunk);
  });

  await conn.write(new TextEncoder().encode(`You are player ${player.seat}\n`));

  if (connections.length !== 2) {
    await conn.write(new TextEncoder().encode("Waiting for other player...\n"));
  }

  if (connections.length === 2) {
    startGame();
  }
}

async function startGame() {
  for (const conn_ of connections) {
    await conn_.write(new TextEncoder().encode("Game starting...\n"));
  }

  const firstPlayer: number = Math.random() > 0.5 ? 0 : 1;

  for (const conn_ of connections) {
    await conn_.write(
      new TextEncoder().encode(`Player ${firstPlayer} will start.\n`)
    );
  }

  let state = {
    ...getInitialState(),
    player: firstPlayer,
  };

  async function getPlayerInput(player: Player, actions: number[]) {
    player.emitter!.emit(
      "send",
      new TextEncoder().encode(`Enter action: (${actions.join(",")})\n`)
    );

    const action = await new Promise<number>((resolve) => {
      player.emitter!.once("receive", (chunk: Uint8Array) => {
        resolve(parseInt(new TextDecoder().decode(chunk).trim()));
      });
    });

    if (isNaN(action)) {
      player.emitter!.emit(
        "send",
        new TextEncoder().encode(`Invalid action!\n`)
      );

      return getPlayerInput(player, actions);
    }

    return action;
  }

  while (getNextPossibleActions(state).length > 0) {
    for (const player of players) {
      player.emitter!.emit(
        "send",
        new TextEncoder().encode(`${printBoard(state, player.seat)}\n`)
      );

      if (state.player !== player.seat) {
        player.emitter!.emit(
          "send",
          new TextEncoder().encode(`Player ${state.player} turn\n`)
        );
      }
    }

    const seat = players.find((s) => s.seat === state.player)!;
    const action = await getPlayerInput(seat, getNextPossibleActions(state));

    for (const conn_ of connections) {
      await conn_.write(
        new TextEncoder().encode(`\nPlayer ${state.player} play ${action}\n`)
      );
    }
    state = getNextState(state, action);
  }
}
