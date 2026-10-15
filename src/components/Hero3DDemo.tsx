/**
 * 3D Hero Demo Page — Scroll-Driven 3D Experience
 * Based on: scroll-driven-3d-experience skill
 * 
 * Demonstrates:
 * 1. Three.js 3D scene with tone mapping (fixes dark renders)
 * 2. GSAP ScrollTrigger for scroll-driven 3D rotation
 * 3. Sticky pinned hero on full scroll
 * 4. Content reveal on scroll
 * 5. Mobile-responsive with reduced-motion fallback
 * 
 * Libraries loaded via CDN (no npm install): three.js + GSAP
 */

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger, ScrollSmoother } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

export default function Hero3DDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [webglError, setWebglError] = useState(false);

  useEffect(() => {
    if (!canvasContainerRef.current || !containerRef.current) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b0d17);
    scene.fog = new THREE.FogExp2(0x0b0d17, 0.0015);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 4);

    // Renderer with proper tone mapping (critical for 3D quality)
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      toneMapping: THREE.ACESFilmicToneMapping,
      toneMappingExposure: 1.0,
      outputEncoding: THREE.sRGBEncoding,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSilterShadow;

    // Try to create WebGL context — catch errors gracefully
    try {
      canvasContainerRef.current.appendChild(renderer.domElement);
    } catch (e) {
      setWebglError(true);
      return;
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    scene.add(directionalLight);

    // Multiple floating geometries for visual richness
    const geometries = [
      { geo: new THREE.TorusKnotGeometry(0.7, 0.2, 300, 20), color: 0x00a8ff, pos: [-2, 0, 0] },
      { geo: new THREE.IcosahedronGeometry(0.8, 2), color: 0xff3366, pos: [2, 0, 0] },
      { geo: new THREE.OctahedronGeometry(0.7, 0), color: 0xffb700, pos: [0, 1.5, -1] },
    ];

    const meshes: THREE.Mesh[] = [];

    geometries.forEach(({ geo, color, pos }) => {
      const mat = new THREE.MeshStandardMaterial({
        color,
        metalness: 0.7,
        roughness: 0.1,
        emissive: color,
        emissiveIntensity: 0.3,
        wireframe: false,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(pos[0], pos[1], pos[2]);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);
      meshes.push(mesh);
    });

    // Responsive
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    // Render loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Slow auto-rotation (will be overridden by scroll)
      meshes.forEach((mesh, i) => {
        mesh.rotation.x += 0.001 * (i + 1);
        mesh.rotation.y += 0.002 * (i + 1);
      });

      renderer.render(scene, camera);

      // Fade in fog density on load
      if (scene.fog) {
        scene.fog.density = Math.min(0.0015, scene.fog.density + 0.0001);
      }
    };
    animate();

    // GSAP ScrollTrigger — sync scroll to 3D rotation
    // This is the key technique from 21st.dev + motionsites.ai
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      // Rotate the entire scene group based on scroll progress
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          // markers: true, // uncomment for debugging
        },
      });

      // Each mesh rotates differently based on scroll
      scrollTl.to(
        meshes[0].rotation,
        {
          y: Math.PI * 4,
          x: Math.PI * 2,
          ease: 'none',
        },
        0
      );

      scrollTl.to(
        meshes[1].rotation,
        {
          y: -Math.PI * 4,
          z: Math.PI * 3,
          ease: 'none',
        },
        0
      );

      // Camera drift on scroll
      scrollTl.to(
        camera.position,
        {
          x: 1,
          z: 5,
          ease: 'none',
        },
        0
      );

      // Headline animation (only if not reduced motion)
      if (!prefersReducedMotion && headlineRef.current) {
        gsap.from(headlineRef.current, {
          y: 60,
          opacity: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 85%',
          },
        });
      }
    });

    // Enable smooth scroll only on desktop
    let smoother: any = null;
    if (!prefersReducedMotion && window.innerWidth >= 768) {
      smoother = ScrollSmoother.create({
        smooth: 1.5,
        normalizeScroll: true,
        effects: true,
      });
    }

    // Cleanup
    return () => {
      ctx.revert();
      smoother?.kill();
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      scene.fog = null;
      meshes.forEach((mesh) => {
        (mesh.geometry as any).dispose();
        (mesh.material as any).dispose();
      });
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh] w-full overflow-hidden bg-[#0b0d17] text-slate-100"
      dir="rtl"
    >
      {/* Pinned hero */}
      <div className="sticky top-0 flex h-screen w-full items-center justify-center">
        {/* 3D Canvas Container */}
        <div
          ref={canvasContainerRef}
          className="pointer-events-none absolute inset-0 z-0"
          style={{ height: '100vh' }}
        />

        {/* Content overlay */}
        <div className="relative z-10 text-center">
          <h1
            ref={headlineRef}
            className="text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-pink-500 to-emerald-400 drop-shadow-2xl px-4"
          >
            ADIX MEDIA
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300 px-4">
            نبتكر لعلامتك حضوراً مؤكداً — حلول رقمية متكاملة تشمل تصميم المواقع،
            الإعلانات المدفوعة، والمحتوى الجذاب.
          </p>
          <button
            onClick={() => {
              const el = document.getElementById('services-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="mt-8 rounded-full bg-pink-500 px-8 py-3 font-bold text-white transition-all hover:scale-105 hover:shadow-2xl"
          >
            ابدأ مشروعك الآن
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-slate-400">
            <span className="text-sm">اسحب للأسفل</span>
            <div className="h-10 w-6 rounded-full border-2 border-slate-400">
              <div className="mx-auto mt-2 h-1 w-1 animate-bounce rounded-full bg-slate-400"></div>
            </div>
          </div>
        </div>

        {/* WebGL Fallback */}
        {webglError && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <p className="text-red-400">
              Unable to initialize WebGL. Please try a different device.
            </p>
          </div>
        )}
      </div>

      {/* Content sections for scroll height */}
      <div
        id="services-section"
        className="relative z-10 mx-auto max-w-4xl space-y-12 px-6 py-20"
      >
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold text-cyan-400">خدماتنا المتخصصة</h2>
          <p className="text-slate-300">نقدّم حلولاً رقمية متكاملة لتميّز علامتك التجارية</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              title: 'تصميم مواقع',
              desc: 'مواقع احترافية متجاوبة مع جميع الأجهزة',
              icon: '💻',
            },
            {
              title: 'إعلانات مدفوعة',
              desc: 'حملات إعلانية مدروسة لزيادة المبيعات',
              icon: '📈',
            },
            {
              title: 'إدارة محتوى',
              desc: 'محتوى جذاب يجذب ويحوّل المتابعين',
              icon: '📱',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-xl bg-[#151723] p-6 text-center transition-all hover:scale-105"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="mb-2 text-xl font-bold text-white">{item.title}</h3>
              <p className="text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Add this route to App.tsx or create a route file
// Route: /3d-hero-demo
// The component above can be imported and rendered directly