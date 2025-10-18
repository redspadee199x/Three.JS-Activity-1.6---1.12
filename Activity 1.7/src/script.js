import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Scene
const scene = new THREE.Scene()

// Geometries examples
const geometries = [
    new THREE.BoxGeometry(1, 1, 1, 2, 2, 2),
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.ConeGeometry(0.5, 1, 32),
    new THREE.TorusGeometry(0.3, 0.2, 16, 100)
]

// Meshes for each geometry
geometries.forEach((geometry, index) => {
    const material = new THREE.MeshBasicMaterial({ 
        color: Math.random() * 0xffffff,
        wireframe: true 
    })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.x = (index - 1.5) * 2
    scene.add(mesh)
})

// Custom geometry example
const customGeometry = new THREE.BufferGeometry()
const count = 50
const positionsArray = new Float32Array(count * 3 * 3)

for(let i = 0; i < count * 3 * 3; i++) {
    positionsArray[i] = (Math.random() - 0.5) * 4
}

const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
customGeometry.setAttribute('position', positionsAttribute)

const customMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xff0000,
    wireframe: true 
})
const customMesh = new THREE.Mesh(customGeometry, customMaterial)
customMesh.position.y = 2
scene.add(customMesh)

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