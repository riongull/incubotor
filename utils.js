const { spawnSync } = require('child_process');

exports.bashCommand = (cmd) => (process.platform === 'win32'
  ? spawnSync('cmd.exe', ['/S', '/C', cmd])
  : spawnSync('sh', ['-c', cmd])
).stdout.toString();
