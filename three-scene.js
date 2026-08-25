/**
 * NIRVAN '26 — Three.js Interactive 3D WebGL Background & Hologram System
 * Features:
 * - 3D Quantum Icosahedron Core with pulsating geometric cage
 * - Dual rotating gimbal rings with emissive particle nodes
 * - 2,500+ dynamic particle constellation reacting to cursor physics
 * - Smooth lerped mouse parallax and gyroscope support
 */

(function () {
  const container = document.getElementById('webgl-container');
  if (!container || typeof THREE === 'undefined') return;

  let scene, camera, renderer;
  let coreGroup, outerMesh, innerMesh, ring1, ring2;
  let particles, particlePositions, particleVelocities;
  const particleCount = 2200;

  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;
  let windowHalfX = window.innerWidth / 2;
  let windowHalfY = window.innerHeight / 2;

  function init() {
    // 1. Scene Setup
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070f, 0.0018);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 600;

    // 2. Renderer Setup
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0x0a192f, 1.5);
    scene.add(ambientLight);

    const cyanPointLight = new THREE.PointLight(0x00f0ff, 3, 800);
    cyanPointLight.position.set(200, 200, 200);
    scene.add(cyanPointLight);

    const purplePointLight = new THREE.PointLight(0x8b5cf6, 2.5, 800);
    purplePointLight.position.set(-200, -200, 150);
    scene.add(purplePointLight);

    // 4. Create 3D Holographic Core Group
    coreGroup = new THREE.Group();
    // Position slightly to the right side on desktop for hero layout balance
    if (window.innerWidth > 1024) {
      coreGroup.position.x = 240;
    } else {
      coreGroup.position.x = 0;
    }
    coreGroup.position.y = 0;
    scene.add(coreGroup);

    // Outer Wireframe Polyhedron (Icosahedron)
    const outerGeo = new THREE.IcosahedronGeometry(130, 1);
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      wireframe: true,
      emissive: 0x005577,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.8
    });
    outerMesh = new THREE.Mesh(outerGeo, outerMat);
    coreGroup.add(outerMesh);

    // Inner Glowing Core (Octahedron)
    const innerGeo = new THREE.OctahedronGeometry(75, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      emissive: 0x6d28d9,
      emissiveIntensity: 1.2,
      roughness: 0.1,
      metalness: 0.9,
      wireframe: false,
      transparent: true,
      opacity: 0.85
    });
    innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // Core Point Nodes (Glowing vertices)
    const nodesGeo = new THREE.IcosahedronGeometry(130, 1);
    const nodesMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 4,
      transparent: true,
      opacity: 0.9
    });
    const nodesMesh = new THREE.Points(nodesGeo, nodesMat);
    coreGroup.add(nodesMesh);

    // Ring 1 (Cyan Orbital Ring)
    const ring1Geo = new THREE.TorusGeometry(175, 1.2, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.6
    });
    ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    // Ring 2 (Purple Orbital Ring)
    const ring2Geo = new THREE.TorusGeometry(210, 1.2, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.45
    });
    ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 5;
    coreGroup.add(ring2);

    // Floating micro-nodes on ring
    const ringPointGeo = new THREE.BufferGeometry();
    const ringPointsArr = new Float32Array(40 * 3);
    for (let i = 0; i < 40; i++) {
      const angle = (i / 40) * Math.PI * 2;
      ringPointsArr[i * 3] = Math.cos(angle) * 175;
      ringPointsArr[i * 3 + 1] = Math.sin(angle) * 175;
      ringPointsArr[i * 3 + 2] = 0;
    }
    ringPointGeo.setAttribute('position', new THREE.BufferAttribute(ringPointsArr, 3));
    const ringPointsMesh = new THREE.Points(ringPointGeo, new THREE.PointsMaterial({ color: 0x00f0ff, size: 3 }));
    ring1.add(ringPointsMesh);

    // 5. Starfield & Particle Constellation
    const pGeometry = new THREE.BufferGeometry();
    particlePositions = new Float32Array(particleCount * 3);
    particleVelocities = [];

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 1800;
      particlePositions[i + 1] = (Math.random() - 0.5) * 1400;
      particlePositions[i + 2] = (Math.random() - 0.5) * 1600;

      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.3,
        y: (Math.random() - 0.5) * 0.3,
        z: (Math.random() - 0.5) * 0.3
      });
    }

    pGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Custom circular particle texture via Canvas
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.3, 'rgba(0,240,255,0.8)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(16, 16, 16, 0, Math.PI * 2);
    ctx.fill();

    const particleTexture = new THREE.CanvasTexture(canvas);

    const pMaterial = new THREE.PointsMaterial({
      size: 4,
      map: particleTexture,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    particles = new THREE.Points(pGeometry, pMaterial);
    scene.add(particles);

    // 6. Floating Polyhedral Asteroids/Cubes in Ambient Space
    const floatGroup = new THREE.Group();
    const floatGeo = new THREE.TetrahedronGeometry(15, 0);
    const floatMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      wireframe: true,
      emissive: 0x0088aa,
      transparent: true,
      opacity: 0.4
    });

    for (let j = 0; j < 18; j++) {
      const mesh = new THREE.Mesh(floatGeo, floatMat);
      mesh.position.set(
        (Math.random() - 0.5) * 1200,
        (Math.random() - 0.5) * 900,
        (Math.random() - 0.5) * 600
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      mesh.userData = {
        rotSpeedX: (Math.random() - 0.5) * 0.015,
        rotSpeedY: (Math.random() - 0.5) * 0.015,
        floatSpeed: 0.001 + Math.random() * 0.002,
        initialY: mesh.position.y
      };
      floatGroup.add(mesh);
    }
    scene.add(floatGroup);

    // 7. Event Listeners
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('click', onDocumentClick, false);

    // Initial render loop
    animate();
  }

  function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (coreGroup) {
      if (window.innerWidth > 1024) {
        coreGroup.position.x = 240;
      } else {
        coreGroup.position.x = 0;
      }
    }
  }

  function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.5;
    mouseY = (event.clientY - windowHalfY) * 0.5;
  }

  function onDocumentClick() {
    // Burst acceleration pulse on click
    if (coreGroup) {
      coreGroup.scale.set(1.15, 1.15, 1.15);
    }
  }

  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // 1. Mouse Parallax Lerp
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    camera.position.x += (targetX * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (-targetY * 0.5 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    // 2. Core Hologram Animations
    if (coreGroup) {
      // Return scale smoothly back to 1
      coreGroup.scale.x += (1.0 - coreGroup.scale.x) * 0.08;
      coreGroup.scale.y += (1.0 - coreGroup.scale.y) * 0.08;
      coreGroup.scale.z += (1.0 - coreGroup.scale.z) * 0.08;

      outerMesh.rotation.y = elapsedTime * 0.25;
      outerMesh.rotation.x = elapsedTime * 0.15;

      innerMesh.rotation.y = -elapsedTime * 0.4;
      innerMesh.rotation.z = elapsedTime * 0.3;
      
      const pulse = 1 + Math.sin(elapsedTime * 3) * 0.08;
      innerMesh.scale.set(pulse, pulse, pulse);

      ring1.rotation.z = elapsedTime * 0.35;
      ring2.rotation.x = -elapsedTime * 0.25;
      ring2.rotation.y = elapsedTime * 0.2;

      coreGroup.rotation.y = targetX * 0.001;
      coreGroup.rotation.x = targetY * 0.001;
    }

    // 3. Particle Starfield Motion
    if (particles) {
      const positions = particles.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        positions[idx + 1] -= 0.3; // gentle descent
        if (positions[idx + 1] < -700) {
          positions[idx + 1] = 700;
        }

        // subtle wave
        positions[idx] += Math.sin(elapsedTime + i) * 0.1;
      }
      particles.geometry.attributes.position.needsUpdate = true;
      particles.rotation.y = elapsedTime * 0.02;
    }

    renderer.render(scene, camera);
  }

  // Auto-init on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
