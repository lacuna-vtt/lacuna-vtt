/*
 * An abstraction over the Nakama API, meant for how we're using it.
 */

import { NakamaContextInterface } from "./NakamaContext";

type LacunaGameId = string;

/**
 * Connects the user to a game, by ID.
 * If no game has been started, spin up a match
 * @param gameId
 */
export async function joinOrStartGame(
  ctx: NakamaContextInterface,
  gameId: LacunaGameId
): Promise<void> {
  // TODO: find game by ID
  // TODO: if no game found, start a server authoritative match
}

/**
 * Disconnects the user from a game, by ID
 */
export async function leaveGame(
  ctx: NakamaContextInterface,
  gameId: LacunaGameId
): Promise<void> {
  // TODO: leave match by game ID
}

/**
 * List games the user is a member of
 * @param ctx
 */
export async function listGames(ctx: NakamaContextInterface): Promise<void> {
  // TODO: list games I'm a member of
}
