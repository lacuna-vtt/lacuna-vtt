function rpcHealthcheck(ctx, logger, nk, payload) {
  logger.info("health check called");
  return JSON.stringify({ message: "success" });
}

function InitModule(ctx, logger, nk, initializer) {
  initializer.registerRpc("healthcheck", rpcHealthcheck);
}
