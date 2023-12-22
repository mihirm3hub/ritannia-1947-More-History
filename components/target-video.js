import { createContent } from './create-content.js'
import { gaEvent } from './firebase.js'
import { leelataiSubs, ashaSahaySubs, rMadhavanSubs, breadSubs, laxmiSubs } from './subtitlesData'

const targetVideoComponent = {
    schema: {
        name: { type: 'string' },
        video: { type: 'string' },
        fade: { type: 'number', default: 800 },  // fade speed in ms. Set to 0 for no fade
    },
    init() {
        const { object3D } = this.el
        const { name } = this.data
        const v = document.querySelector(this.data.video)
        const { el } = this

        let isVisible = false

        el.addEventListener('realityready', () => {
            object3D.visible = true
        })

        // pre-play video as fix for black box bug (Android Only)
        let videoSetup = false
        const prePlay = () => {
            v.muted = true
            v.play()
        }
        prePlay()

        const restartVideo = () => {
            if (!videoSetup) {
                v.currentTime = 0
                //  this.sound.stop()
                videoSetup = true
            }
        }

        const handleUI = (status) => {
            // add code to handle UI here
            // hide scanner screen
            const mediaInst = document.querySelector('#mediaInst')
            const mediaInst2 = document.querySelector('#mediaInst2')
            if (status) {
                document.getElementById('overlay-ui').classList.add('overlay-ui-hide')
                setTimeout(() => {
                    document.getElementById('overlay-ui').style.display = 'none'
                }, 700)
                mediaInst.style.display = 'block'
                setTimeout(() => {
                    // console.log('change copy')
                    mediaInst2.style.display = 'block'
                }, 6000)
                document.querySelector('.recorder-container').style.display = 'block'
                document.querySelector('.recorder-container').classList.add('fade-in')
                document.querySelector('.recorder-container').classList.remove('fade-out')
            } else {
                document.getElementById('overlay-ui').style.display = 'block'
                document.getElementById('overlay-ui').classList.remove('overlay-ui-hide')
                mediaInst.style.display = 'none'
                document.querySelector('.recorder-container').classList.remove('fade-in')
                document.querySelector('.recorder-container').classList.add('fade-out')
                setTimeout(() => {
                    document.querySelector('.recorder-container').style.display = 'none'
                }, 700)
            }
        }

        function getSubsByProduct(eleId) {
            console.log(eleId, 'iddd')
            if (eleId === 'britMarie') {
                return leelataiSubs
            } else if (eleId === 'milkBikis') {
                return laxmiSubs
            } else if (eleId === 'gdLogo') {
                return ashaSahaySubs
            } else if (eleId === 'wcother' || eleId === 'wcBlackBg') {
                return rMadhavanSubs
            } else if (eleId === 'healthySlice' || eleId === 'SandwichWhiteBread' || eleId === 'vitaRich' || eleId === 'wholeWheat' || eleId === 'brownBread') {
                return breadSubs
            }
            return []
        }

        function getTitle(eleId) {
            if (eleId === 'britMarie') {
                return 'MARIE'
            } else if (eleId === 'milkBikis') {
                return 'MILKBIKIS'
            } else if (eleId === 'gdLogo') {
                return 'GOODDAY'
            } else if (eleId === 'wcother' || eleId === 'wcBlackBg') {
                return 'WIKINCOW'
            } else if (eleId === 'healthySlice' || eleId === 'SandwichWhiteBread' || eleId === 'vitaRich' || eleId === 'wholeWheat' || eleId === 'brownBread') {
                return eleId
            }
            return []
        }

        function displaySubtitles(video, subtitlesDiv, eleId) {
            const { currentTime } = video
            const subtitlesData = getSubsByProduct(eleId)
            for (let i = 0; i < subtitlesData.length; i++) {
                const subtitle = subtitlesData[i]
                if (currentTime >= subtitle.start && currentTime <= subtitle.end) {
                    subtitlesDiv.innerHTML = subtitlesData[i].text
                    return
                }
            }
            // clear subs
            subtitlesDiv.innerHTML = ''
        }

        // create video and 3D content
        const setContent = (eleId) => {
            createContent(eleId)
            const child = document.getElementById(eleId).firstElementChild

            gaEvent('Successful Scans', '')
            gaEvent(`Successfull Scans: ${getTitle(eleId)}`, '')

            const subtitlesDiv = document.getElementById('subtitles')

            console.log(subtitlesDiv, 'subtitles')

            const model = document.getElementById('model')
            prePlay()
            setTimeout(() => {
                v.currentTime = 0
                v.muted = false
                v.play()
                if (child && this.data.fade > 0) {
                    child.setAttribute('visible', 'true')
                    child.setAttribute('material', 'opacity: 0')
                    child.setAttribute('animation', {
                        property: 'material.opacity',
                        from: 0,
                        to: 1,
                        easing: 'easeInOutQuad',
                        dur: this.data.fade,
                    })
                }

                model.setAttribute('animation-mixer', 'clip: *; loop: once; clampWhenFinished:true')
                object3D.visible = true
                let videoPlayCount = 0
                v.addEventListener('timeupdate', () => {
                    if (videoPlayCount === 0) {
                        displaySubtitles(v, subtitlesDiv, eleId)
                    }
                    if (v.currentTime > v.duration - 0.4) {
                        v.pause()
                        // this.sound.pause()
                        setTimeout(() => {
                            const modalOverlay = document.querySelector('#instructModal')
                            modalOverlay.style.display = 'flex'  // Change 'block' to 'flex'

                            subtitlesDiv.innerHTML = ''
                            videoPlayCount = 1
                            gaEvent(`Complete Ar Exp Watched: ${getTitle(eleId)}`, '')
                        }, 1250)
                    }
                })
            }, 200)
        }

        const showImage = ({ detail }) => {
            if (name !== detail.name) {
                return
            }

            console.log(detail.name)
            if (!isVisible) {
                handleUI(true)
                setTimeout(() => {
                    setContent(detail.name)
                    isVisible = true
                }, 600)
            }
        }

        const updateImage = ({ detail }) => {
            object3D.position.copy(detail.position)
            object3D.quaternion.copy(detail.rotation)
            object3D.scale.set(detail.scale, detail.scale, detail.scale)
        }

        const reset = () => {
            console.log('reset')
            handleUI(false)
            document.getElementById('subtitles').innerHTML = ''
            v.pause()
            videoSetup = false
            isVisible = false
            const content = document.getElementById('content')
            if (content) {
                document.getElementById('model').removeAttribute('animation-mixer')
                content.parentNode.removeChild(content)
            }
            restartVideo()
            object3D.visible = false
        }

        const hideImage = ({ detail }) => {
            // handleUI(false)
            // v.pause()
            // videoSetup = false
            // const content = document.getElementById('content')
            // if (content) {
            //   document.getElementById('model').removeAttribute('animation-mixer')
            //   content.parentNode.removeChild(content)
            // }
            // restartVideo()
            // object3D.visible = false
        }
        const items = document.querySelectorAll('.selecImg')
        items.forEach((ele) => {
            ele.addEventListener('click', () => {
                console.log('exec', ele.id)
                prePlay()
                reset()
                // console.log('preplay',ele.id)
            })
        })

        const handleMediaBtns = () => {
            reset()
            document.getElementById('previewContainer').style.background = '#f8efbb'
            gaEvent('mediaCaptured', '')
        }

        window.addEventListener('mediarecorder-photocomplete', handleMediaBtns)
        window.addEventListener('mediarecorder-previewopened', handleMediaBtns)

        document.querySelector('.cross').onclick = reset
        document.querySelector('#watchAgainOption').addEventListener('click', reset)
        document.querySelector('#scanMoreOption').addEventListener('click', () => {
            reset()
            document.querySelector('a-scene').pause()
        })

        el.sceneEl.addEventListener('xrimagefound', restartVideo)
        el.sceneEl.addEventListener('xrimagefound', showImage)

        el.sceneEl.addEventListener('xrimagefound', updateImage)
        el.sceneEl.addEventListener('xrimagelost', hideImage)
    },
}

export { targetVideoComponent }
