'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let coreGroup: THREE.Group, outerMesh: THREE.Mesh, innerMesh: THREE.Mesh, ring1: THREE.Mesh, ring2: THREE.Mesh;
    let particles: THREE.Points, particlePositions: Float32Array;
    let particleVelocities: { x: number; y: number; z: number }[] = [];
    const particleCount = 2200;

    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;
    let animationFrameId: number;

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
    container.innerHTML = '';
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
      metalness: 0.8,
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
      opacity: 0.85,
    });
    innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // Core Point Nodes (Glowing vertices)
    const nodesGeo = new THREE.IcosahedronGeometry(130, 1);
    const nodesMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 4,
      transparent: true,
      opacity: 0.9,
    });
    const nodesMesh = new THREE.Points(nodesGeo, nodesMat);
    coreGroup.add(nodesMesh);

    // Ring 1 (Cyan Orbital Ring)
    const ring1Geo = new THREE.TorusGeometry(175, 1.2, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.6,
    });
    ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    // Ring 2 (Purple Orbital Ring)
    const ring2Geo = new THREE.TorusGeometry(210, 1.2, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.45,
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
        z: (Math.random() - 0.5) * 0.3,
      });
    }

    pGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Custom circular particle texture via Canvas
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.3, 'rgba(0,240,255,0.8)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, Math.PI * 2);
      ctx.fill();
    }

    const particleTexture = new THREE.CanvasTexture(canvas);
    const pMaterial = new THREE.PointsMaterial({
      size: 4,
      map: particleTexture,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    particles = new THREE.Points(pGeometry, pMaterial);
    scene.add(particles);

    // 6. Floating Polyhedral Asteroids in Ambient Space
    const floatGroup = new THREE.Group();
    const floatGeo = new THREE.TetrahedronGeometry(15, 0);
    const floatMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      wireframe: true,
      emissive: 0x0088aa,
      transparent: true,
      opacity: 0.4,
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
        initialY: mesh.position.y,
      };
      floatGroup.add(mesh);
    }
    scene.add(floatGroup);

    // Handlers
    const onWindowResize = () => {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);

      if (coreGroup) {
        coreGroup.position.x = window.innerWidth > 1024 ? 240 : 0;
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX) * 0.5;
      mouseY = (event.clientY - windowHalfY) * 0.5;
    };

    const onClick = () => {
      if (coreGroup) {
        coreGroup.scale.set(1.15, 1.15, 1.15);
      }
    };

    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('click', onClick, false);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera parallax
      targetX = mouseX * 0.4;
      targetY = mouseY * 0.4;
      camera.position.x += (targetX - camera.position.x) * 0.035;
      camera.position.y += (-targetY - camera.position.y) * 0.035;
      camera.lookAt(0, 0, 0);

      // Core rotation & animations
      if (coreGroup) {
        coreGroup.rotation.y += 0.006;
        coreGroup.rotation.x = Math.sin(elapsedTime * 0.5) * 0.15;
        coreGroup.position.y = Math.sin(elapsedTime * 1.2) * 12;

        if (outerMesh) {
          outerMesh.rotation.y -= 0.003;
          outerMesh.rotation.z += 0.002;
        }

        if (innerMesh) {
          innerMesh.rotation.x += 0.01;
          innerMesh.rotation.y += 0.015;
          const scalePulse = 1 + Math.sin(elapsedTime * 3) * 0.08;
          innerMesh.scale.set(scalePulse, scalePulse, scalePulse);
        }

        if (ring1) {
          ring1.rotation.z += 0.012;
          ring1.rotation.x += 0.004;
        }

        if (ring2) {
          ring2.rotation.z -= 0.009;
          ring2.rotation.y += 0.006;
        }

        // Return scale smoothly back to 1 if pulsed
        coreGroup.scale.lerp(new THREE.Vector3(1, 1, 1), 0.05);
      }

      // Particle physics & drift
      if (particles) {
        const positions = particles.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3;
          positions[idx] += particleVelocities[i].x;
          positions[idx + 1] += particleVelocities[i].y;
          positions[idx + 2] += particleVelocities[i].z;

          // Boundary bounce
          if (Math.abs(positions[idx]) > 900) particleVelocities[i].x *= -1;
          if (Math.abs(positions[idx + 1]) > 700) particleVelocities[i].y *= -1;
          if (Math.abs(positions[idx + 2]) > 800) particleVelocities[i].z *= -1;
        }
        particles.geometry.attributes.position.needsUpdate = true;
        particles.rotation.y += 0.0003;
      }

      // Floating polyhedrons
      floatGroup.children.forEach((mesh) => {
        mesh.rotation.x += mesh.userData.rotSpeedX;
        mesh.rotation.y += mesh.userData.rotSpeedY;
        mesh.position.y = mesh.userData.initialY + Math.sin(elapsedTime * 1.5 + mesh.position.x) * 15;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', onWindowResize);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(animationFrameId);
      if (renderer) {
        renderer.dispose();
      }
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return <div id="webgl-container" ref={containerRef} />;
}
