import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface HydraHyperdriveCanvasProps {
  wireframeMode: boolean;
  aeroTrailsEnabled: boolean;
  trailDensity: 'subtle' | 'dense' | 'off';
  activeSection: string;
  isOpeningDone: boolean;
  onOpeningComplete?: () => void;
}

export const HydraHyperdriveCanvas: React.FC<HydraHyperdriveCanvasProps> = ({
  wireframeMode,
  aeroTrailsEnabled,
  trailDensity,
  activeSection,
  isOpeningDone,
  onOpeningComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGlAvailable, setWebGlAvailable] = useState<boolean>(true);
  const [loadingIntro, setLoadingIntro] = useState<boolean>(!isOpeningDone);

  // References for animation state
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });

  const scrollRef = useRef<number>(0);
  const activeSectionRef = useRef<string>(activeSection);
  activeSectionRef.current = activeSection;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL support
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGlAvailable(false);
        return;
      }
    } catch {
      setWebGlAvailable(false);
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050507);
    scene.fog = new THREE.FogExp2(0x050507, 0.038);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 150);
    camera.position.set(2.8, 1.4, 5.2);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 4. Lighting Layer E
    const ambientLight = new THREE.AmbientLight(0x18181f, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(4, 6, 4);
    scene.add(keyLight);

    const redRimLight = new THREE.DirectionalLight(0xdc2626, 3.8);
    redRimLight.position.set(-5, 2.5, -3);
    scene.add(redRimLight);

    const frontWhiteLight = new THREE.DirectionalLight(0xffffff, 1.5);
    frontWhiteLight.position.set(0, 3, 6);
    scene.add(frontWhiteLight);

    const underglowLight = new THREE.PointLight(0xdc2626, 1.8, 8);
    underglowLight.position.set(0, -0.3, 0);
    scene.add(underglowLight);

    // 5. Living Engineering Grid (Layer D)
    const gridGroup = new THREE.Group();
    const gridHelper = new THREE.GridHelper(30, 60, 0x331010, 0x17171d);
    gridHelper.position.y = -0.6;
    gridGroup.add(gridHelper);

    // Secondary vertical reference grid plane in background
    const backGridHelper = new THREE.GridHelper(30, 60, 0x24242c, 0x121217);
    backGridHelper.rotation.x = Math.PI / 2;
    backGridHelper.position.set(0, 4, -8);
    gridGroup.add(backGridHelper);

    scene.add(gridGroup);

    // 6. Photorealistic Formula Car + 3D Structural Geometry (Layer A)
    const carGroup = new THREE.Group();

    // Load High-Res Hero Render into 3D space backdrop texture plane
    const textureLoader = new THREE.TextureLoader();
    const heroTexture = textureLoader.load('/src/assets/images/hydra_f1_car_hero_1791515707724.jpg');
    heroTexture.colorSpace = THREE.SRGBColorSpace;

    // High quality 2026 F1 car backdrop panel with alpha blending
    const carPlaneGeo = new THREE.PlaneGeometry(7.2, 4.05);
    const carPlaneMat = new THREE.MeshStandardMaterial({
      map: heroTexture,
      transparent: true,
      opacity: 0.94,
      roughness: 0.4,
      metalness: 0.2,
      depthWrite: true,
    });
    const carPlaneMesh = new THREE.Mesh(carPlaneGeo, carPlaneMat);
    carPlaneMesh.position.set(0, 0.55, -0.1);
    carGroup.add(carPlaneMesh);

    // Formula 3D Chassis & Aerodynamic geometry overlay (Halo, front wing, nose, sidepods, diffuser)
    // Materials: Matte carbon black with red highlights & wireframe toggle support
    const carbonMaterial = new THREE.MeshStandardMaterial({
      color: 0x0c0d10,
      roughness: 0.32,
      metalness: 0.65,
      wireframe: wireframeMode,
    });

    const redAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      roughness: 0.2,
      metalness: 0.5,
      emissive: 0x991b1b,
      emissiveIntensity: 0.2,
      wireframe: wireframeMode,
    });

    const metallicDarkMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.2,
      metalness: 0.85,
      wireframe: wireframeMode,
    });

    // 3D Nose cone & Monocoque
    const noseGeo = new THREE.ConeGeometry(0.24, 2.2, 8);
    noseGeo.rotateX(Math.PI / 2);
    const noseMesh = new THREE.Mesh(noseGeo, carbonMaterial);
    noseMesh.position.set(0, -0.15, 1.6);
    noseMesh.scale.set(1.4, 0.45, 1);
    carGroup.add(noseMesh);

    // Front Wing Mainplane
    const frontWingGeo = new THREE.BoxGeometry(2.8, 0.04, 0.5);
    const frontWingMesh = new THREE.Mesh(frontWingGeo, carbonMaterial);
    frontWingMesh.position.set(0, -0.38, 2.6);
    carGroup.add(frontWingMesh);

    // Front Wing Endplates with Red Accent
    const endplateGeo = new THREE.BoxGeometry(0.04, 0.28, 0.52);
    const leftEndplate = new THREE.Mesh(endplateGeo, redAccentMaterial);
    leftEndplate.position.set(-1.4, -0.28, 2.6);
    const rightEndplate = new THREE.Mesh(endplateGeo, redAccentMaterial);
    rightEndplate.position.set(1.4, -0.28, 2.6);
    carGroup.add(leftEndplate);
    carGroup.add(rightEndplate);

    // Halo safety hoop structure
    const haloCurve = new THREE.EllipseCurve(0, 0, 0.45, 0.55, 0, Math.PI, false, 0);
    const haloPoints = haloCurve.getPoints(24).map(p => new THREE.Vector3(p.x, 0.38, p.y + 0.3));
    const haloGeo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(haloPoints), 24, 0.045, 8, false);
    const haloMesh = new THREE.Mesh(haloGeo, metallicDarkMat);
    carGroup.add(haloMesh);

    // Halo central pylon
    const haloPylonGeo = new THREE.CylinderGeometry(0.03, 0.04, 0.45, 8);
    const haloPylon = new THREE.Mesh(haloPylonGeo, metallicDarkMat);
    haloPylon.position.set(0, 0.15, 0.82);
    haloPylon.rotation.x = -0.3;
    carGroup.add(haloPylon);

    // Sidepods with aerodynamic undercut
    const sidepodGeo = new THREE.BoxGeometry(0.55, 0.35, 1.8);
    const leftSidepod = new THREE.Mesh(sidepodGeo, carbonMaterial);
    leftSidepod.position.set(-0.85, -0.1, 0.1);
    const rightSidepod = new THREE.Mesh(sidepodGeo, carbonMaterial);
    rightSidepod.position.set(0.85, -0.1, 0.1);
    carGroup.add(leftSidepod);
    carGroup.add(rightSidepod);

    // Rear wing assembly
    const rearWingGeo = new THREE.BoxGeometry(2.1, 0.05, 0.45);
    const rearWingMesh = new THREE.Mesh(rearWingGeo, carbonMaterial);
    rearWingMesh.position.set(0, 0.55, -2.1);
    carGroup.add(rearWingMesh);

    const rearEndplateGeo = new THREE.BoxGeometry(0.04, 0.5, 0.5);
    const leftRearEndplate = new THREE.Mesh(rearEndplateGeo, redAccentMaterial);
    leftRearEndplate.position.set(-1.05, 0.45, -2.1);
    const rightRearEndplate = new THREE.Mesh(rearEndplateGeo, redAccentMaterial);
    rightRearEndplate.position.set(1.05, 0.45, -2.1);
    carGroup.add(leftRearEndplate);
    carGroup.add(rightRearEndplate);

    // Slick Racing Tyres with satin rim
    const tyreGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.48, 20);
    tyreGeo.rotateZ(Math.PI / 2);
    const tyreMat = new THREE.MeshStandardMaterial({
      color: 0x08080a,
      roughness: 0.65,
      metalness: 0.1,
      wireframe: wireframeMode,
    });

    const frontLeftTyre = new THREE.Mesh(tyreGeo, tyreMat);
    frontLeftTyre.position.set(-1.35, -0.22, 1.8);
    const frontRightTyre = new THREE.Mesh(tyreGeo, tyreMat);
    frontRightTyre.position.set(1.35, -0.22, 1.8);
    const rearLeftTyre = new THREE.Mesh(tyreGeo, tyreMat);
    rearLeftTyre.position.set(-1.38, -0.2, -1.8);
    rearLeftTyre.scale.set(1.08, 1.25, 1.08);
    const rearRightTyre = new THREE.Mesh(tyreGeo, tyreMat);
    rearRightTyre.position.set(1.38, -0.2, -1.8);
    rearRightTyre.scale.set(1.08, 1.25, 1.08);

    carGroup.add(frontLeftTyre);
    carGroup.add(frontRightTyre);
    carGroup.add(rearLeftTyre);
    carGroup.add(rearRightTyre);

    scene.add(carGroup);

    // 7. HYDRA Energy Trails (Layer C)
    const particleCount = 280;
    const trailGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number; speed: number; resetZ: number }[] = [];

    const redColor = new THREE.Color(0xdc2626);
    const whiteColor = new THREE.Color(0xf4f4f5);

    for (let i = 0; i < particleCount; i++) {
      // Create aerodynamic streamline paths wrapping around the car body
      const isRed = Math.random() > 0.35;
      const c = isRed ? redColor : whiteColor;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      // Span along car trajectory
      const lane = (Math.random() - 0.5) * 3.2;
      const heightOffset = -0.3 + Math.random() * 1.4;
      const z = 3.5 - Math.random() * 8.0;

      positions[i * 3] = lane;
      positions[i * 3 + 1] = heightOffset;
      positions[i * 3 + 2] = z;

      velocities.push({
        x: (Math.random() - 0.5) * 0.003,
        y: Math.sin(lane) * 0.002,
        z: -0.04 - Math.random() * 0.07,
        speed: 1.0,
        resetZ: 3.8,
      });
    }

    trailGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    trailGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle sprite using canvas
    const particleCanvas = document.createElement('canvas');
    particleCanvas.width = 32;
    particleCanvas.height = 32;
    const pctx = particleCanvas.getContext('2d');
    if (pctx) {
      const grad = pctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.3, 'rgba(255,80,80,0.8)');
      grad.addColorStop(1, 'rgba(220,38,38,0)');
      pctx.fillStyle = grad;
      pctx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(particleCanvas);

    const trailMaterial = new THREE.PointsMaterial({
      size: 0.14,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      depthWrite: false,
    });

    const particles = new THREE.Points(trailGeometry, trailMaterial);
    scene.add(particles);

    // Continuous spline airflow ribbons (sweeping red telemetry traces)
    const ribbonCurves: THREE.Line[] = [];
    const ribbonMaterial = new THREE.LineBasicMaterial({
      color: 0xdc2626,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const createRibbon = (offsetY: number, offsetX: number) => {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(offsetX * 0.4, offsetY - 0.2, 3.2),
        new THREE.Vector3(offsetX * 0.7, offsetY + 0.1, 1.8),
        new THREE.Vector3(offsetX * 1.1, offsetY + 0.2, 0.4),
        new THREE.Vector3(offsetX * 0.9, offsetY + 0.35, -1.2),
        new THREE.Vector3(offsetX * 0.4, offsetY + 0.5, -2.6),
      ]);
      const pts = curve.getPoints(50);
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const line = new THREE.Line(geo, ribbonMaterial);
      scene.add(line);
      ribbonCurves.push(line);
    };

    createRibbon(0.1, 0.8);
    createRibbon(0.1, -0.8);
    createRibbon(0.3, 0.4);
    createRibbon(0.3, -0.4);

    // 8. Event listeners: Mouse parallax and Touch perspective
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = normX;
      mouseRef.current.targetY = normY;
    };

    let touchStartY = 0;
    let touchStartX = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const deltaX = (e.touches[0].clientX - touchStartX) / window.innerWidth;
        const deltaY = (e.touches[0].clientY - touchStartY) / window.innerHeight;
        // Subtle tilt without blocking vertical scroll
        mouseRef.current.targetX = THREE.MathUtils.clamp(deltaX * 1.5, -1, 1);
        mouseRef.current.targetY = THREE.MathUtils.clamp(-deltaY * 1.5, -1, 1);
      }
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollRef.current = scrollTop / maxScroll;
    };

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // 9. Camera Choreography by Section
    // As the user scrolls across sections, camera transitions smoothly
    const getSectionCameraConfig = (section: string) => {
      switch (section) {
        case 'hero':
          return {
            camPos: new THREE.Vector3(2.6, 1.2, 5.0),
            lookAt: new THREE.Vector3(0, 0.2, 0),
            carRotY: 0.12,
            gridIntensity: 0.4,
          };
        case 'about':
          return {
            camPos: new THREE.Vector3(1.8, 0.9, 4.2),
            lookAt: new THREE.Vector3(-0.2, 0.1, 0.4),
            carRotY: 0.22,
            gridIntensity: 0.7,
          };
        case 'divisions':
          return {
            camPos: new THREE.Vector3(-2.8, 1.4, 4.4),
            lookAt: new THREE.Vector3(0.1, 0.2, -0.2),
            carRotY: -0.15,
            gridIntensity: 0.6,
          };
        case 'business-model':
          return {
            camPos: new THREE.Vector3(0.0, 3.8, 4.8),
            lookAt: new THREE.Vector3(0, 0.0, 0),
            carRotY: 0.0,
            gridIntensity: 0.9,
          };
        case 'racing':
          return {
            camPos: new THREE.Vector3(3.4, 0.8, 4.0),
            lookAt: new THREE.Vector3(0, 0.1, 0.5),
            carRotY: 0.35,
            gridIntensity: 0.5,
          };
        case 'technology':
        case 'engineering':
          return {
            camPos: new THREE.Vector3(1.2, 0.7, 3.4),
            lookAt: new THREE.Vector3(0.3, 0.0, 1.2),
            carRotY: 0.28,
            gridIntensity: 0.95,
          };
        case 'power':
          return {
            camPos: new THREE.Vector3(-2.2, 1.6, -2.4),
            lookAt: new THREE.Vector3(0, 0.3, -0.8),
            carRotY: -0.3,
            gridIntensity: 0.8,
          };
        case 'contact':
          return {
            camPos: new THREE.Vector3(1.6, 0.9, 4.6),
            lookAt: new THREE.Vector3(0, 0.1, 0),
            carRotY: 0.08,
            gridIntensity: 0.3,
          };
        default:
          return {
            camPos: new THREE.Vector3(2.4, 1.2, 4.8),
            lookAt: new THREE.Vector3(0, 0.1, 0),
            carRotY: 0.1,
            gridIntensity: 0.5,
          };
      }
    };

    // 10. Opening Hero Animation Sequence
    let introStartTime = performance.now();
    const introDuration = 2200; // 2.2 seconds opening
    let introFinished = isOpeningDone;

    // 11. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Handle opening intro
      if (!introFinished) {
        const introElapsed = performance.now() - introStartTime;
        const progress = Math.min(introElapsed / introDuration, 1.0);

        // Ease in lighting and opacity
        const eased = 1 - Math.pow(1 - progress, 3);
        renderer.toneMappingExposure = 0.1 + eased * 1.0;
        keyLight.intensity = eased * 2.4;
        redRimLight.intensity = eased * 3.8;
        carPlaneMat.opacity = 0.1 + eased * 0.84;

        if (progress >= 1.0) {
          introFinished = true;
          setLoadingIntro(false);
          if (onOpeningComplete) onOpeningComplete();
        }
      }

      // Smooth mouse lerp (easing)
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Section target camera interpolation
      const secConfig = getSectionCameraConfig(activeSectionRef.current);

      // Subtle parallax shift applied to camera position
      const parallaxOffsetX = mouseRef.current.x * 0.6;
      const parallaxOffsetY = mouseRef.current.y * 0.35;

      const targetCamX = secConfig.camPos.x + parallaxOffsetX;
      const targetCamY = secConfig.camPos.y + parallaxOffsetY;
      const targetCamZ = secConfig.camPos.z;

      camera.position.x += (targetCamX - camera.position.x) * 0.04;
      camera.position.y += (targetCamY - camera.position.y) * 0.04;
      camera.position.z += (targetCamZ - camera.position.z) * 0.04;

      const targetLookAt = new THREE.Vector3(
        secConfig.lookAt.x + mouseRef.current.x * 0.15,
        secConfig.lookAt.y + mouseRef.current.y * 0.1,
        secConfig.lookAt.z
      );
      camera.lookAt(targetLookAt);

      // Subtle responsive car rotation
      carGroup.rotation.y += (secConfig.carRotY + mouseRef.current.x * 0.06 - carGroup.rotation.y) * 0.04;
      carGroup.rotation.x = mouseRef.current.y * 0.02;

      // Pulse underglow and rim lights subtly
      underglowLight.intensity = 1.4 + Math.sin(elapsed * 2.4) * 0.4;
      redRimLight.intensity = 3.4 + Math.sin(elapsed * 1.8) * 0.6;

      // Update energy trails (Layer C)
      if (aeroTrailsEnabled && trailDensity !== 'off') {
        const posAttr = trailGeometry.getAttribute('position') as THREE.BufferAttribute;
        const speedMultiplier = trailDensity === 'dense' ? 1.6 : 1.0;

        for (let i = 0; i < particleCount; i++) {
          const v = velocities[i];
          let z = posAttr.getZ(i) + v.z * speedMultiplier;
          let y = posAttr.getY(i) + v.y;
          let x = posAttr.getX(i) + v.x;

          if (z < -4.5) {
            z = v.resetZ;
            x = (Math.random() - 0.5) * 3.2;
            y = -0.3 + Math.random() * 1.4;
          }

          posAttr.setXYZ(i, x, y, z);
        }
        posAttr.needsUpdate = true;
      }

      // Gentle wave in airflow ribbons
      for (let i = 0; i < ribbonCurves.length; i++) {
        ribbonCurves[i].position.y = Math.sin(elapsed * 2 + i * 1.5) * 0.02;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 12. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      heroTexture.dispose();
    };
  }, [wireframeMode, aeroTrailsEnabled, trailDensity]);

  // Fallback for non-WebGL
  if (!webGlAvailable) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050507]">
        <img
          src="/src/assets/images/hydra_f1_car_hero_1791515707724.jpg"
          alt="HYDRA 2026 Formula Concept"
          className="w-full h-full object-cover opacity-80"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-[#050507]" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Cinematic Vignette Overlay */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#050507]/40 to-[#050507]/90 pointer-events-none" />
      {/* Subtle Bottom Floor Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050507] to-transparent pointer-events-none" />
    </div>
  );
};
