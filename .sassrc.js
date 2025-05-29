module.exports = {
  quietDeps: true,
  logger: {
    warn: function(message) {
      // Suppress deprecation warnings
      if (!message.includes('abs()')) {
        console.warn(message);
      }
    }
  }
}; 