'use strict'

const drawOuterUI = require('./draw/index.js')

// Currently no headless browser testing, only test browser-independent logic
/* istanbul ignore next */
const ui = drawOuterUI()

// TODO: look into moving the below into a Worker to do in parrallel with drawOuterUI
setTimeout(() => {
  const loadData = require('./data/index.js')
  const generateLayout = require('./layout/index.js')

  const dataSet = loadData({ debugMode: false })
  if (dataSet.settings.debugMode) {
    window.data = dataSet
    console.log('data is exposed on window.data')
  }

  const layout = generateLayout(dataSet, Object.assign({ collapseNodes: true }, ui.getSettingsForLayout()))
  if (dataSet.settings.debugMode) {
    window.layout = layout
    console.log('layout is exposed on window.layout')
  }

  /* istanbul ignore next */
  ui.setData(layout, dataSet)

  /* istanbul ignore next */
  ui.draw()

  /* istanbul ignore next */
  ui.complete()
})
