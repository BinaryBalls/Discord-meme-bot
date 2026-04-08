const levels = {
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR'
};

function format(level, message, meta) {
  const timestamp = new Date().toISOString();
  const suffix = meta ? ` ${JSON.stringify(meta)}` : '';
  return `[${timestamp}] [${level}] ${message}${suffix}`;
}

export const logger = {
  info(message, meta) {
    console.log(format(levels.INFO, message, meta));
  },

  warn(message, meta) {
    console.warn(format(levels.WARN, message, meta));
  },

  error(message, meta) {
    console.error(format(levels.ERROR, message, meta));
  }
};
