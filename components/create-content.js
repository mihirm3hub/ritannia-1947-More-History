export const createContent = (eleId) => {
    const ele = document.getElementById(eleId)
    const content = document.getElementById('content')
    // console.log(eleId)
    const getContent = () => {
        if (eleId === 'britMarie') {
            ele.insertAdjacentHTML('beforeend', `
          <a-entity
            id="content"
            material="shader: chromakey; src: #leela-video; color: 0.1 0.9 0.2"
            geometry="primitive: plane; height: 0.720; width: 1.280;"
            visible="false"
            scale="2 2 2"
            position=".3 0 0">
            <a-entity
              id="model"
              gltf-model="#leelaModel"
              class="cantap"
              scale=".63 .63 .7"
              position="-0.02 0.028 0.15"
              shadow="receive: false">
            </a-entity>
          </a-entity>
      `)
        } else if (eleId === 'milkBikis') {
            console.log('milkbikis')
            ele.insertAdjacentHTML('beforeend', `
          <a-entity
            id="content"
            material="shader: chromakey; src: #lakshmi-video; color: 0.1 0.9 0.2;"
            geometry="primitive: plane; height: 0.720; width: 1.280;"
            visible="false"
            scale="2 2 2"
            position=".3 0 0">
            <a-entity
              id="model"
              gltf-model="#lakshmiModel"
              class="cantap"
              scale=".63 .63 .7"
              position="-0.02 0 0.15"
              shadow="receive: false">
            </a-entity>
          </a-entity>
      `)
        } else if (eleId === 'gdLogo') {
            console.log('gdLogo')
            ele.insertAdjacentHTML('beforeend', `
          <a-entity
            id="content"
            material="shader: chromakey; src: #asha-video; color: 0.1 0.9 0.2;"
            geometry="primitive: plane; height: 0.720; width: 1.280;"
            visible="false"
            scale="2 2 2"
            position=".3 0 0">
            <a-entity
              id="model"
              gltf-model="#ashaModel"
              class="cantap"
              scale=".63 .63 .7"
              position="-0.02 0 0.15"
              shadow="receive: false">
            </a-entity>
          </a-entity>
      `)
        } else if (eleId === 'wcother' || eleId === 'wcBlackBg') {
            console.log('wcother')
            ele.insertAdjacentHTML('beforeend', `
          <a-entity
            id="content"
            material="shader: chromakey; src: #madhavan-video; color: 0.1 0.9 0.2;"
            geometry="primitive: plane; height: 0.720; width: 1.280;"
            visible="false"
            scale="2.5 2.5 2.5"
            position="0 -0.5 0">
            <a-entity
              id="model"
              gltf-model="#madhavanModel"
              class="cantap"
              scale=".63 .63 .7"
              position="-0.02 0 0.15"
              shadow="receive: false">
            </a-entity>
          </a-entity>
      `)
        } else if (eleId === 'healthySlice' || eleId === 'SandwichWhiteBread' || eleId === 'vitaRich' || eleId === 'wholeWheat' || eleId === 'brownBread' || eleId === 'milkSlice') {
            console.log('bread')
            ele.insertAdjacentHTML('beforeend', `
          <a-entity
            id="content"
            material="shader: chromakey; src: #gaur-video; color: 0.1 0.9 0.2;"
            geometry="primitive: plane; height: 0.720; width: 1.280;"
            visible="false"
            scale="2 2 2"
            position="0 -0.3 0">
            <a-entity
              id="model"
              gltf-model="#gaurModel"
              class="cantap"
              scale=".63 .63 .7"
              position="-0.02 0 0.15"
              shadow="receive: false">
            </a-entity>
          </a-entity>
      `)
        }
    }
    if (!content) {
        getContent()
    } else {
        content.parentNode.removeChild(content)
        getContent()
    }
}
