"use strict";
var matchInit = function (ctx, logger, nk, params) {
  logger.debug("Lobby match created");
  var presences = {};
  return {
    state: { presences: presences },
    tickRate: 1,
    label: "",
  };
};
var matchJoinAttempt = function (
  ctx,
  logger,
  nk,
  dispatcher,
  tick,
  state,
  presence,
  metadata
) {
  logger.debug("%q attempted to join Lobby match", ctx.userId);
  return {
    state: state,
    accept: true,
  };
};
var matchJoin = function (ctx, logger, nk, dispatcher, tick, state, presences) {
  presences.forEach(function (presence) {
    state.presences[presence.userId] = presence;
    logger.debug("%q joined Lobby match", presence.userId);
  });
  return {
    state: state,
  };
};
var matchLeave = function (
  ctx,
  logger,
  nk,
  dispatcher,
  tick,
  state,
  presences
) {
  presences.forEach(function (presence) {
    delete state.presences[presence.userId];
    logger.debug("%q left Lobby match", presence.userId);
  });
  return {
    state: state,
  };
};
var matchLoop = function (ctx, logger, nk, dispatcher, tick, state, messages) {
  logger.debug("Lobby match loop executed");
  Object.keys(state.presences).forEach(function (key) {
    var presence = state.presences[key];
    logger.info("Presence %v name $v", presence.userId, presence.username);
  });
  messages.forEach(function (message) {
    logger.info("Received %v from %v", message.data, message.sender.userId);
    dispatcher.broadcastMessage(1, message.data, [message.sender], null);
  });
  return {
    state: state,
  };
};
var matchTerminate = function (
  ctx,
  logger,
  nk,
  dispatcher,
  tick,
  state,
  graceSeconds
) {
  logger.debug("Lobby match terminated");
  var message = "Server shutting down in ".concat(graceSeconds, " seconds.");
  dispatcher.broadcastMessage(2, message, null, null);
  return {
    state: state,
  };
};
var matchSignal = function (ctx, logger, nk, dispatcher, tick, state, data) {
  logger.debug("Lobby match signal received: " + data);
  return {
    state: state,
    data: "Lobby match signal received: " + data,
  };
};
var InitModule = function (ctx, logger, nk, initializer) {
  initializer.registerMatch("lacuna", {
    matchInit: matchInit,
    matchJoinAttempt: matchJoinAttempt,
    matchJoin: matchJoin,
    matchLeave: matchLeave,
    matchLoop: matchLoop,
    matchSignal: matchSignal,
    matchTerminate: matchTerminate,
  });
};
