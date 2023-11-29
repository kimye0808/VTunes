const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    fileServerFolder: 'C:\\Users\\maus\\Desktop\\VTUNES_CYPRESS\\VTunes',
    testIsolation: false
  },
})