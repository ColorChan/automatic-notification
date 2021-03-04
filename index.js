const path = require('path')
global.rootPath = __dirname.split(path.sep).join(path.posix.sep)

require('./src/main')
