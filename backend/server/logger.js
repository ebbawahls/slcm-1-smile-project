const LEVELS = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

export function createLogger({ env, level }) {
  const minLevel = LEVELS[level] ? level : 'info';

  function log(logLevel, message, data) {
    if (LEVELS[logLevel] < LEVELS[minLevel]) {
      return;
    }

    const entry = {
      time: new Date().toISOString(),
      level: logLevel,
      env,
      message,
    };

    if (data !== undefined) {
      entry.data = data;
    }

    const line = JSON.stringify(entry);

    if (logLevel === 'error') {
      console.error(line);
    } else if (logLevel === 'warn') {
      console.warn(line);
    } else if (logLevel === 'debug') {
      console.debug(line);
    } else {
      console.info(line);
    }
  }

  return {
    level: minLevel,
    debug: (message, data) => log('debug', message, data),
    info: (message, data) => log('info', message, data),
    warn: (message, data) => log('warn', message, data),
    error: (message, data) => log('error', message, data),
  };
}
