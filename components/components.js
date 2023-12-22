import { gaEvent } from './firebase'

const configTargetsComponent = {
    schema: {
        targets: { type: 'array', default: [''] },
    },
    ensureImageTargetsConfigured() {
        if (this.configured || !this.configOk) {
            return
        }
        console.log(`Scanning for targets: ${JSON.stringify(this.data.targets)}`)
        XR8.XrController.configure({ imageTargets: this.data.targets })
        this.configured = true
    },
    init() {
        this.configured = false
        this.configOk = false
        // this.el.sceneEl.addEventListener('realityready', () => {
        this.configOk = true
        this.ensureImageTargetsConfigured()
        // })
    },
    update() {
        this.configured = false
        this.ensureImageTargetsConfigured()
    },
}

const ashaVid = require('./assets/ashaSahay/ASHA_SAHAY_1.mp4')
const ashaModel = require('./assets/ashaSahay/Lt_Asha_Sahay_Story_Final_01.glb')

const gaurVid = require('./assets/gaurHari/GAUR_HARI_DAS.mp4')
const gaurModel = require('./assets/gaurHari/Final_Gaur_Hari_Das_1.glb')

const lakshmiVid = require('./assets/lakshmiK/LAKSHMI_KRISHNAN.mp4')
const lakshmiModel = require('./assets/lakshmiK/Final_Lakshmi_Krishnan_MBK3_updated1.glb')

const madhavanVid = require('./assets/rMadhavan/R_MADHAVAN_3.mp4')
const madhavanModel = require('./assets/rMadhavan/Final_Lt_R_Madhavan_Story_2.glb')

const leelaVid = require('./assets/leelaTai/LEELA_TAI.mp4')
const leelaModel = require('./assets/leelaTai/Final_Leelatai_Story_2.glb')
const videoTitles = [{ name: 'Shri Gour Hari Das', id: 'QnrtpvJZPwc' },
{ name: 'Lt. R. Madhavan', id: 'XYXCGNCB4RA' },
{ name: 'Lt. Lakshmi Krishnan Agvl', id: 'RkZd6zvM4i4' },
{ name: 'Leelatai Chitale Ji', id: 'ARp3sW5sydI' },
{ name: 'Lt. Bharati Asha Sahay', id: 'Ffw6Q7NUJi4' },
]

const videoSrc = ['https://www.youtube.com/embed/QnrtpvJZPwc',
    'https://www.youtube.com/embed/XYXCGNCB4RA',
    'https://www.youtube.com/embed/RkZd6zvM4i4',
    'https://www.youtube.com/embed/ARp3sW5sydI',
    'https://www.youtube.com/embed/Ffw6Q7NUJi4']
let currentVideo = 0
const handleSelection = {
    init() {
        const scene = this.el.sceneEl
        function closeSelectionScreen() {
            setTimeout(() => {
                const element = document.querySelector('.innerText')
                while (element.firstChild) {
                    element.removeChild(element.lastChild)
                }
                element.insertAdjacentHTML('beforeend', `
          <p class="texts">Oops! Looks like</p>
          <p class="texts">you need to</p>
          <p class="texts">scan again</p>
        `)
            }, 10000)
            document.getElementById('startScan').style.display = 'none'
            document.getElementById('selectionWrapper').classList.add('fade-out')
            document.getElementById('selectionWrapper').classList.remove('fade-in')
            setTimeout(() => {
                document.getElementById('selectionWrapper').style.display = 'none'
            }, 800)
            document.querySelector('#physical-img-blank').style.display = 'block'
            document.querySelector('#internet-blank').style.display = 'block'
            document.querySelector('#physical-img-filled').style.display = 'none'
            document.querySelector('#internet-filled').style.display = 'none'
            scene.play()
        }
        const createAssets = (vidName, modelName, vidId, modelID) => {
            // document.querySelector('.modal1content').insertAdjacentHTML('beforeend', `
            //   <p class="modalTxt">Point your camera</p>
            //   <p class="modalTxt">at the ${productName} logo</p>
            // `)
            // console.log(modelID,modelName)
            document.querySelector('a-assets').insertAdjacentHTML('beforeend', `
        <video
          id="${vidId}"
          muted
          autoplay
          playsinline
          crossorigin="anonymous"
          loop="true"
          src="${vidName}"></video>
        <a-asset-item id="${modelID}" src="${modelName}"></a-asset-item>     
      `)
        }

        // const params = new URLSearchParams(document.location.search.substring(1))
        // const pProduct = params.get('product') ? params.get('product') : 'bread'
        // console.log(pProduct)
        // setTimeout(() => {
        //   document.getElementById('instructModal').style.display = 'flex'
        // }, 2000)
        let pProduct
        const items = document.querySelectorAll('.selecImg')
        items.forEach((ele) => {
            ele.addEventListener('click', () => {
                pProduct = ele.id
                // console.log(ele.id, pProduct)
                const productString = `Product Scanned : ${pProduct}`
                gaEvent(productString, '')
                scene.removeAttribute('config-targets')
                if (pProduct === 'BREAD') {
                    document.getElementById('prodName').innerHTML = 'Britannia Bread'
                    scene.setAttribute('config-targets', {
                        targets: 'healthySlice, vitaRich, wholeWheat, brownBread',
                    })
                    // scene.setAttribute('config-targets', {
                    // targets:'britMain'
                    // })

                    createAssets(gaurVid, gaurModel, 'gaur-video', 'gaurModel')
                    scene.insertAdjacentHTML('beforeend', `
          <!-- Create Bread targets -->
          <a-entity id="healthySlice" target-video="name: healthySlice; video: #gaur-video;"></a-entity>

          <a-entity id="SandwichWhiteBread" target-video="name: SandwichWhiteBread; video: #gaur-video;"></a-entity>

          <a-entity id="vitaRich" target-video="name: vitaRich; video: #gaur-video;"></a-entity>

          <a-entity id="wholeWheat" target-video="name: wholeWheat; video: #gaur-video;"></a-entity>

          <a-entity id="brownBread" target-video="name: brownBread; video: #gaur-video;"></a-entity>

         <!-- <a-entity id="milkSlice" target-video="name: milkSlice; video: #gaur-video;"></a-entity> -->
      `)
                } else if (pProduct === 'MARIE') {
                    document.getElementById('prodName').innerHTML = 'Britannia Marie'
                    scene.setAttribute('config-targets', { targets: 'britMarie' })
                    createAssets(leelaVid, leelaModel, 'leela-video', 'leelaModel')
                    scene.insertAdjacentHTML('beforeend', `
        <a-entity id="britMarie" target-video="name: britMarie; video: #leela-video;"></a-entity>
      `)
                } else if (pProduct === 'GOODDAY') {
                    document.getElementById('prodName').innerHTML = 'Britannia Good Day'
                    scene.setAttribute('config-targets', { targets: 'gdLogo' })
                    createAssets(ashaVid, ashaModel, 'asha-video', 'ashaModel')
                    scene.insertAdjacentHTML('beforeend', `
        <a-entity id="gdLogo" target-video="name: gdLogo; video: #asha-video;"></a-entity>
      `)
                } else if (pProduct === 'MILKBIKIS') {
                    document.getElementById('prodName').innerHTML = 'Britannia Milk Bikis'
                    scene.setAttribute('config-targets', { targets: 'milkBikis' })
                    createAssets(lakshmiVid, lakshmiModel, 'lakshmi-video', 'lakshmiModel')
                    scene.insertAdjacentHTML('beforeend', `
        <a-entity id="milkBikis" target-video="name: milkBikis; video: #lakshmi-video;"></a-entity>
      `)
                } else if (pProduct === 'WINKINCOW') {
                    document.getElementById('prodName').innerHTML = 'Britannia Winkin Cow'
                    scene.setAttribute('config-targets', { targets: 'wcother, wcBlackBg' })
                    createAssets(madhavanVid, madhavanModel, 'madhavan-video', 'madhavanModel')
                    scene.insertAdjacentHTML('beforeend', `
        <a-entity id="wcother" target-video="name: wcother; video: #madhavan-video;"></a-entity>
        <a-entity id="wcBlackBg" target-video="name: wcBlackBg; video: #madhavan-video;"></a-entity>
      `)
                }
                //   document.getElementById('startScan').style.display = 'flex'
                scene.pause()
                closeSelectionScreen()
            })
        })
    },
}

const handleModal = {
    init() {
        const scene = this.el.sceneEl
        // const handleMedia = () =>{
        //   console.log('photo or vid available')
        // }
        // xXR8.MediaRecorder.addEventListener('mediarecorder-photocomplete', handleMedia)
        // XR8.MediaRecorder.addEventListener('mediarecorder-recordcomplete', handleMedia)
        // Function to open the modal
        // function closeSelectionScreen() {
        //   setTimeout(() => {
        //     const element = document.querySelector('.innerText')
        //     while (element.firstChild) {
        //       element.removeChild(element.lastChild)
        //     }
        //     element.insertAdjacentHTML('beforeend', `
        //       <p class="texts">Oops! Looks like</p>
        //       <p class="texts">you need to</p>
        //       <p class="texts">scan again</p>
        //     `)
        //   }, 10000)
        //   document.getElementById('startScan').style.display = 'none'
        //   document.getElementById('selectionWrapper').classList.add('fade-out')
        //   document.getElementById('selectionWrapper').classList.remove('fade-in')
        //   setTimeout(() => {
        //     document.getElementById('selectionWrapper').style.display = 'none'
        //   }, 800)
        //   document.querySelector('#physical-img-blank').style.display = 'block'
        //   document.querySelector('#internet-blank').style.display = 'block'
        //   document.querySelector('#physical-img-filled').style.display = 'none'
        //   document.querySelector('#internet-filled').style.display = 'none'
        //   scene.play()
        // }

        function toggleFullscreen(button) {
            const videoWrapper = button.parentElement
            const videoIframe = videoWrapper.querySelector('.carousel-item')

            if (videoIframe.requestFullscreen) {
                videoIframe.requestFullscreen()
            } else if (videoIframe.mozRequestFullScreen) {
                videoIframe.mozRequestFullScreen()
            } else if (videoIframe.webkitRequestFullscreen) {
                videoIframe.webkitRequestFullscreen()
            }
        }

        function openVideosWrapper() {
            const videosWrapper = document.getElementById('videosWrapper')
            videosWrapper.style.display = 'block'
            videosWrapper.classList.add('fade-in')
            videosWrapper.classList.remove('fade-out')
        }
        function closeVideosWrapper() {
            const videosWrapper = document.getElementById('videosWrapper')
            videosWrapper.classList.add('fade-out')
            videosWrapper.classList.remove('fade-in')
            setTimeout(() => {
                videosWrapper.style.display = 'none'
            }, 850)
        }

        function openModal() {
            const modalOverlay = document.querySelector('#instructModal')
            modalOverlay.style.display = 'flex'  // Change 'block' to 'flex'
        }
        function getVideoTitleByIndex(index) {
            return videoTitles.find(t => videoSrc[index].includes(t.id)).name
        }
        function shuffleVideos(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]]  // Swap elements
            }
        }

        function openYoutubeModal() {
            gaEvent('Watched Video', '')
            const modalOverlay = document.querySelector('#youtube-modal')
            modalOverlay.style.display = 'flex'  // Change 'block' to 'flex'
            currentVideo = 0
            const frame = document.querySelector('#videoFrame')

            shuffleVideos(videoSrc)

            frame.src = videoSrc[0]
            const itemWith = document.querySelector('#videoTitle')
            itemWith.innerHTML = getVideoTitleByIndex(currentVideo)

            const carousel = document.querySelector('.horizontal-carousel')
            carousel.scrollBy({
                left: 0,  // Adjust this value based on item width and gap
                behavior: 'smooth',
            })
        }

        function closeYoutubeModal() {
            const modalOverlay = document.querySelector('#youtube-modal')
            const frame = document.querySelector('#videoFrame')
            frame.src = videoSrc[0]
            modalOverlay.style.display = 'none'  // Change 'block' to 'flex'
        }

        function openShareModal() {
            const modalOverlay1 = document.querySelector('#instructModal')
            modalOverlay1.style.display = 'none'  // Change 'block' to 'flex'
            const modalOverlay = document.querySelector('#shareModal')
            modalOverlay.style.display = 'flex'  // Change 'block' to 'flex'
        }

        function closeShareModal() {
            const modalOverlay = document.querySelector('#shareModal')
            modalOverlay.style.display = 'none'  // Change 'block' to 'flex'
        }

        function openStartModal() {
            const modalOverlay1 = document.querySelector('#startScan')
            modalOverlay1.style.display = 'none'  // Change 'block' to 'flex'
            const modalOverlay = document.querySelector('#startScan')
            modalOverlay.style.display = 'flex'  // Change 'block' to 'flex'
        }

        function closeStartModal() {
            const modalOverlay = document.querySelector('#startScan')
            modalOverlay.style.display = 'none'  // Change 'block' to 'flex'
        }

        // Function to close the modal
        function closeModal() {
            const modalOverlay = document.querySelector('#instructModal')
            modalOverlay.style.display = 'none'
        }

        function showVideoPage() {
            document.getElementById('selectionWrapper').classList.add('fade-out')
            document.getElementById('selectionWrapper').classList.remove('fade-in')
            setTimeout(() => {
                document.getElementById('selectionWrapper').style.display = 'none'
                document.getElementById('videosWrapper').classList.add('fade-in')
                document.getElementById('videosWrapper').style.display = 'flex'
            }, 800)
        }

        function refreshPage() {
            const element = document.querySelector('.innerText')
            while (element.firstChild) {
                element.removeChild(element.lastChild)
            }
            element.insertAdjacentHTML('beforeend', `
          <p class="texts">Keep the</p>
          <p id="prodName" class="texts">Britannia</p>
          <p class="texts">logo in focus.</p>
        `)
            // window.location.reload()
            // window.open('https://freedomlens.netlify.app/scan-more', '_self')
            document.getElementById('selectionWrapper').style.display = 'block'
            document.getElementById('selectionWrapper').classList.add('fade-in')
            document.getElementById('selectionWrapper').classList.remove('fade-out')
            closeModal()
            closeShareModal()
        }

        function facebookClicked() {
            gaEvent('Total Shares', '')
            gaEvent('facebook', '')
            const shareText = `I just heard stories from our freedom struggle that aren't found in any history book... Told by India's last few living freedom fighters, as they went down memory lane 🥹
1. Just go to britannia1947more.com
2. Be the first one to share on all your groups 🇮🇳
`
            const shareUrl = 'https://britannia1947more.com/'

            const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`
            window.open(facebookUrl, '_blank')
        }

        function whatsappClicked() {
            gaEvent('Total Shares', '')
            gaEvent('whatsapp', '')
            const shareText = `I just heard stories from our freedom struggle that aren't found in any history book... Told by India's last few living freedom fighters, as they went down memory lane 🥹
1. Just go to britannia1947more.com
2. Be the first one to share on all your groups 🇮🇳
`
            const shareUrl = 'https://britannia1947more.com/'

            const whatsappMessage = `${shareText}\n${shareUrl}`
            window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank')
        }

        function twitterClicked() {
            gaEvent('Total Shares', '')
            gaEvent('twitter', '')
            const shareText = `I just heard stories from our freedom struggle that aren't found in any history book... Told by India's last few living freedom fighters, as they went down memory lane 🥹
1. Just go to britannia1947more.com
2. Be the first one to share on all your groups 🇮🇳
`
            const shareUrl = 'https://britannia1947more.com/'

            const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`
            window.open(twitterUrl, '_blank')
        }

        function instagramClicked() {
            gaEvent('Total Shares', '')
            gaEvent('instagram', '')
            const shareText = `I just heard stories from our freedom struggle that aren't found in any history book... Told by India's last few living freedom fighters, as they went down memory lane 🥹
1. Just go to britannia1947more.com
2. Be the first one to share on your profile and stories 🇮🇳`
            const shareUrl = 'https://britannia1947more.com/'

            // const instagramUrl = `https://www.instagram.com/share?url=${encodeURIComponent(shareUrl)}&caption=${encodeURIComponent(shareText)}`
            const instagramUrl = 'https://www.instagram.com'
            window.open(instagramUrl, '_blank')
        }

        function startScanProductClick() {
            gaEvent('Physical Product scan', 'Number of scans')
            document.querySelector('#physical-img-blank').style.display = 'none'
            document.querySelector('#physical-img-filled').style.display = 'block'
            document.querySelector('#internet-filled').style.display = 'none'
            document.querySelector('#internet-blank').style.display = 'display'
            setTimeout(() => {
                //  closeSelectionScreen()
            }, 400)
        }

        function startScanInternetClick() {
            gaEvent('Digital Product scan', 'Number of scans')
            document.querySelector('#internet-filled').style.display = 'block'
            document.querySelector('#internet-blank').style.display = 'none'
            document.querySelector('#physical-img-blank').style.display = 'display'
            document.querySelector('#physical-img-filled').style.display = 'none'
            setTimeout(() => {
                //  closeSelectionScreen()
            }, 400)
        }

        function scrollByArrowLeft(isLeft) {
            const carousel = document.querySelector('.horizontal-carousel')
            const itemWith = document.querySelector('#videoTitle')
            const frame = document.querySelector('#videoFrame')
            if (currentVideo != 0 && currentVideo != 4) {
                currentVideo--

                frame.src = videoSrc[currentVideo]
                itemWith.innerHTML = getVideoTitleByIndex(currentVideo)
            } else if (currentVideo != 0 && currentVideo == 4) {
                currentVideo--

                frame.src = videoSrc[currentVideo]
                itemWith.innerHTML = getVideoTitleByIndex(currentVideo)
            }

            carousel.scrollBy({
                left: -1 * (carousel.scrollWidth / 5),  // Adjust this value based on item width and gap
                behavior: 'smooth',
            })
        }

        function scrollByArrowRight(isLeft) {
            const carousel = document.querySelector('.horizontal-carousel')
            const itemWith = document.querySelector('#videoTitle')
            const frame = document.querySelector('#videoFrame')
            if (currentVideo < 4) {
                currentVideo++
                frame.src = videoSrc[currentVideo]
                itemWith.innerHTML = getVideoTitleByIndex(currentVideo)
            }
            carousel.scrollBy({
                left: carousel.scrollWidth / 5,  // Adjust this value based on item width and gap
                behavior: 'smooth',
            })
        }

        // document.querySelector('.cross').onclick = closeShareModal
        // document.querySelector('.Base1947').onclick = openModal
        document.querySelector('#watchAgn').onclick = refreshPage
        document.querySelector('#scanMoreOption').addEventListener('click', refreshPage)
        document.querySelector('#watchAgainOption').addEventListener('click', closeModal)
        document.querySelector('#shareOption').onclick = openShareModal
        document.querySelector('#facebook').onclick = facebookClicked
        document.querySelector('#twitter').onclick = twitterClicked
        document.querySelector('#instagram').onclick = instagramClicked
        document.querySelector('#whatsapp').onclick = whatsappClicked
        // document.querySelector('#BREAD').onclick = openStartModal
        document.querySelector('#scan-close-btn').onclick = closeStartModal
        // document.querySelector('#watch-tutorial').onclick = openYoutubeModal
        document.querySelector('#watch-tutorial-close').onclick = closeYoutubeModal
        // document.querySelector('#watch-tutorial').onclick = openVideosWrapper
        // document.querySelector('#videosWrapper #go-back').onclick = closeVideosWrapper
        document.querySelector('#watch-video').onclick = openYoutubeModal
        // document.querySelector('#watch-tutorial-close').onclick = closeVideosWrapper
        document.querySelector('#instruct-close').onclick = closeModal
        document.querySelector('#share-modal-close').onclick = closeShareModal
        //  document.querySelector('#physical-btn').onclick = startScanProductClick
        //  document.querySelector('#internet-btn').onclick = startScanInternetClick

        document.querySelector('#leftArrow').onclick = scrollByArrowLeft
        document.querySelector('#rightArrow').onclick = scrollByArrowRight

        this.el.sceneEl.addEventListener('realityready', () => {
            const queryParams = new URLSearchParams(new URL(window.location.href).search)
            const showVideos = queryParams.get('videos')
            if (showVideos === 'true') {
                // setTimeout(() => {
                openYoutubeModal()
                //   }, 4000)
            }
        })
        // const queryParams = new URLSearchParams(new URL(window.location.href).search)
        // const showVideos = queryParams.get('videos')
        // if (showVideos === 'true') {
        //   setTimeout(() => {
        //     openYoutubeModal()
        //   }, 4000)
        // }

        // Add an event listener to the "cross" button to close the modal
    },
}
export { configTargetsComponent, handleSelection, handleModal }
