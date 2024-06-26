const matchInit = function (
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  params: { [key: string]: string }
): { state: nkruntime.MatchState; tickRate: number; label: string } {
  logger.debug("Lobby match created");

  const presences: { [userId: string]: nkruntime.Presence } = {};

  // TODO: load initial game state from storage object
  // TODO: set label to game name

  return {
    state: { presences },
    tickRate: 1,
    label: "TODO",
  };
};

const matchJoinAttempt = function (
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  dispatcher: nkruntime.MatchDispatcher,
  tick: number,
  state: nkruntime.MatchState,
  presence: nkruntime.Presence,
  metadata: { [key: string]: any }
): {
  state: nkruntime.MatchState;
  accept: boolean;
  rejectMessage?: string | undefined;
} | null {
  logger.debug("%q attempted to join Lobby match", ctx.userId);

  return {
    state,
    accept: true,
  };
};

const matchJoin = function (
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  dispatcher: nkruntime.MatchDispatcher,
  tick: number,
  state: nkruntime.MatchState,
  presences: nkruntime.Presence[]
): { state: nkruntime.MatchState } | null {
  presences.forEach(function (presence) {
    state.presences[presence.userId] = presence;
    logger.debug("%q joined Lobby match", presence.userId);
  });

  if (Object.keys(state.presences).length == 0) {
    return null;
  }

  return {
    state,
  };
};

const matchLeave = function (
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  dispatcher: nkruntime.MatchDispatcher,
  tick: number,
  state: nkruntime.MatchState,
  presences: nkruntime.Presence[]
): { state: nkruntime.MatchState } | null {
  presences.forEach(function (presence) {
    delete state.presences[presence.userId];
    logger.debug("%q left Lobby match", presence.userId);
  });

  return {
    state,
  };
};

const matchLoop = function (
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  dispatcher: nkruntime.MatchDispatcher,
  tick: number,
  state: nkruntime.MatchState,
  messages: nkruntime.MatchMessage[]
): { state: nkruntime.MatchState } | null {
  logger.debug("Lobby match loop executed");

  Object.keys(state.presences).forEach(function (key) {
    const presence = state.presences[key];
    logger.info("Presence %v name $v", presence.userId, presence.username);
  });

  messages.forEach(function (message) {
    logger.info("Received %v from %v", message.data, message.sender.userId);
    dispatcher.broadcastMessage(1, message.data, [message.sender], null);
  });

  return {
    state,
  };
};

const matchTerminate = function (
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  dispatcher: nkruntime.MatchDispatcher,
  tick: number,
  state: nkruntime.MatchState,
  graceSeconds: number
): { state: nkruntime.MatchState } | null {
  logger.debug("Lobby match terminated");

  const message = `Server shutting down in ${graceSeconds} seconds.`;
  dispatcher.broadcastMessage(2, message, null, null);

  return {
    state,
  };
};

const matchSignal = function (
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  dispatcher: nkruntime.MatchDispatcher,
  tick: number,
  state: nkruntime.MatchState,
  data: string
): { state: nkruntime.MatchState; data?: string } | null {
  logger.debug("Lobby match signal received: " + data);

  return {
    state,
    data: "Lobby match signal received: " + data,
  };
};

function rpcStartLacunaGame(
  context: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  payload: string
): string {
  var matchId = nk.matchCreate("lacuna", JSON.parse(payload));
  return JSON.stringify({ matchId });
}

let InitModule: nkruntime.InitModule = function (
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  initializer: nkruntime.Initializer
) {
  initializer.registerMatch("lacuna", {
    matchInit,
    matchJoinAttempt,
    matchJoin,
    matchLeave,
    matchLoop,
    matchSignal,
    matchTerminate,
  });
  initializer.registerRpc("startlacunagame", rpcStartLacunaGame);
};
