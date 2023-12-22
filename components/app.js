// Copyright (c) 2022 8th Wall, Inc.
//
// app.js is the main entry point for your 8th Wall app. Code here will execute after head.html
// is loaded, and before body.html is loaded.
import './index.css'

import { configTargetsComponent, handleSelection, handleModal } from './components'
// AFRAME.registerComponent('brit-load-screen', britLoadingScreenComponent)
AFRAME.registerComponent('config-targets', configTargetsComponent)
AFRAME.registerComponent('handle-select', handleSelection)
AFRAME.registerComponent('handle-modal', handleModal)

import { targetVideoComponent } from './target-video'
import { chromaKeyShader } from './chroma-key'

AFRAME.registerShader('chromakey', chromaKeyShader)
AFRAME.registerComponent('target-video', targetVideoComponent)

// bitmaps cause texture issues on iOS this workaround prevents black textures and crashes
// Bitmaps can cause texture issues on iOS. This workaround can help prevent black textures and crashes.
const IS_IOS =
    /^(iPad|iPhone|iPod)/.test(window.navigator.platform) ||
    (/^Mac/.test(window.navigator.platform) && window.navigator.maxTouchPoints > 1)
if (IS_IOS) {
    window.createImageBitmap = undefined
}

// create loading screen
const bg = require('./assets/BG-1.png')
const logo = require('./assets/1947-Txt-With-Base.png')
let inDom = false
const observer = new MutationObserver(() => {
    if (document.querySelector('#loadBackground')) {
        if (!inDom) {
            document.querySelector('#loadBackground').insertAdjacentHTML('beforeend', `
          <img id="loadbg" src="${bg}">
          <img id="loadLogo" src="${logo}">
          <div style="position: absolute; top: 66%; left: 50%; transform: translate(-50%, -50%)">
            <div id="bar" class="spinner"></div>
          </div>
      `)
        }
        inDom = true
    } else if (inDom) {
        inDom = false
        observer.disconnect()
    }
})
observer.observe(document.body, { childList: true })
