import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

// Scene
const scene = new THREE.Scene()

// Texture Loader
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/1.png')

// Font Loader - Using CDN URL
const fontLoader = new FontLoader()

// Use CDN URL for the font
const fontUrl = 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json'

fontLoader.load(
    fontUrl,
    (font) => {
        console.log('Font loaded successfully from CDN!')
        
        // Text Geometry
        const textGeometry = new TextGeometry(
            'Hello Three.js',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 3
            }
        )
        
        // Center the text
        textGeometry.center()

        // Material
        const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })

        // Text Mesh
        const text = new THREE.Mesh(textGeometry, material)
        scene.add(text)

        // Donuts
        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
        
        for(let i = 0; i < 30; i++) {
            const donut = new THREE.Mesh(donutGeometry, material)
            
            donut.position.x = (Math.random() - 0.5) * 10
            donut.position.y = (Math.random() - 0.5) * 10
            donut.position.z = (Math.random() - 0.5) * 10
            
            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI
            
            const scale = Math.random()
            donut.scale.set(scale, scale, scale)
            
            scene.add(donut)
        }
    },
    (progress) => {
        console.log('Loading progress:', progress)
    },
    (error) => {
        console.error('Error loading font from CDN:', error)
        // Fallback: Create simple objects
        createFallbackScene()
    }
)

function createFallbackScene() {
    console.log('Creating fallback scene with basic geometries')
    
    // Create some basic shapes instead of text
    const geometries = [
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.SphereGeometry(0.5, 16, 16),
        new THREE.ConeGeometry(0.5, 1, 16),
        new THREE.TorusGeometry(0.3, 0.2, 16, 32)
    ]
    
    geometries.forEach((geometry, index) => {
        const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.x = (index - 1.5) * 2
        scene.add(mesh)
    })
}

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const canvas = document.querySelector('canvas.webgl')
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({ 
    canvas: canvas,
    antialias: true 
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

// Animation
const tick = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()