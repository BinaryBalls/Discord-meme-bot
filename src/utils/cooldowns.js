const timestamps = new Map();

export function checkCooldown(commandName, userId, cooldownMs = 5000) {
  const now = Date.now();
  if (!timestamps.has(commandName)) {
    timestamps.set(commandName, new Map());
  }

  const commandTimestamps = timestamps.get(commandName);
  const expirationTime = (commandTimestamps.get(userId) ?? 0) + cooldownMs;

  if (now < expirationTime) {
    const timeLeft = ((expirationTime - now) / 1000).toFixed(1);
    return { onCooldown: true, timeLeft };
  }

  commandTimestamps.set(userId, now);
  setTimeout(() => commandTimestamps.delete(userId), cooldownMs).unref();

  return { onCooldown: false, timeLeft: 0 };
}
