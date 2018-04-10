'use strict'

const BubbleprofUI = require('./bubbleprof-ui.js')
const HoverBox = require('./hover-box.js')
const SvgContainer = require('./svg-container.js')

function drawOuterUI () {
  // Initial DOM drawing that is independent of data

  const sections = ['header', 'side-bar', 'node-link', 'footer']
  const ui = new BubbleprofUI(sections)

  const footerCollapseHTML = '<div class="text">How to use this</div><div class="arrow"></div>'

  ui.sections.get('footer').addCollapseControl(true, {
    htmlContent: footerCollapseHTML,
    classNames: 'bar'
  })
  ui.sections.get('side-bar').addCollapseControl()

  const nodeLink = ui.sections.get('node-link')
  nodeLink.addLoadingAnimation()

  const nodeLinkSVG = nodeLink.addContent(SvgContainer, {id: 'node-link-svg', svgBounds: {}})
  nodeLinkSVG.addBubbles()
  nodeLinkSVG.addLinks()

  nodeLink.addContent(HoverBox)

  ui.initializeElements()
  return ui
}

module.exports = drawOuterUI