import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Loading Manager
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = () => console.log('loading started')
loadingManager.onLoad = () => console.log('loading finished')
loadingManager.onProgress = () => console.log('loading progressing')
loadingManager.onError = () => console.log('loading error')

// Texture Loader
const textureLoader = new THREE.TextureLoader(loadingManager)

// Load textures
const colorTexture = textureLoader.load('/textures/door/color.jpg')
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

// Texture transformations
colorTexture.repeat.x = 2
colorTexture.repeat.y = 2
colorTexture.wrapS = THREE.RepeatWrapping
colorTexture.wrapT = THREE.RepeatWrapping
// colorTexture.offset.x = 0.5
// colorTexture.rotation = Math.PI * 0.25
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5

// Scene
const scene = new THREE.Scene()

// Objects with different geometries
const geometries = [
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.ConeGeometry(0.5, 1, 32),
    new THREE.TorusGeometry(0.3, 0.2, 16, 100)
]

geometries.forEach((geometry, index) => {
    const material = new THREE.MeshBasicMaterial({ 
        map: colorTexture 
    })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.x = (index - 1.5) * 2
    scene.add(mesh)
})

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 5
scene.add(camera)

// Controls
const canvas = document.querySelector('canvas.webgl')
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animation
const tick = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()