/**
 * BELLAVITA LUXURY — BLUSH EAU DE PARFUM
 * 3D Cinemagraph Engine, 3D Petals Physics, Spray Mist & Interactive Boutique Controller
 */

(() => {
  'use strict';

  // =========================================================================
  // 1. CONFIGURATION & OLFACTORY DATABASE
  // =========================================================================
  const TOTAL_FRAMES = 300;
  let targetFps = 30;
  let frameInterval = 1000 / targetFps;

  const OLFACTORY_DATABASE = {
    jasmine: {
      tier: 'HEART NOTE',
      name: 'Jasmine Sambac',
      desc: 'Hand-picked at dawn in southern Italy. Star-shaped white petals that unfurl with creamy floral intoxication and crystalline purity.',
      radiance: '96%',
      longevity: '8 - 10 Hours',
      barRad: 96,
      barLong: 90,
      activeTier: 'pyr-heart'
    },
    mandarin: {
      tier: 'TOP NOTE',
      name: 'Italian Mandarin',
      desc: 'Sun-drenched Calabrian citrus accord providing a sparkling, effervescent opening that glistens like morning dew upon flower petals.',
      radiance: '94%',
      longevity: '4 - 6 Hours',
      barRad: 94,
      barLong: 70,
      activeTier: 'pyr-top'
    },
    peach: {
      tier: 'TOP NOTE',
      name: 'Dewy Peach Nectar',
      desc: 'Velvety, succulent white peach delivering an irresistible blush of natural sweetness, perfectly harmonized with crisp pear facets.',
      radiance: '92%',
      longevity: '6 - 7 Hours',
      barRad: 92,
      barLong: 75,
      activeTier: 'pyr-top'
    },
    peony: {
      tier: 'HEART NOTE',
      name: 'Blush Peony',
      desc: 'Romantic and lush floral heart that evokes a blooming Mediterranean sanctuary in gentle perpetual motion.',
      radiance: '95%',
      longevity: '8 - 9 Hours',
      barRad: 95,
      barLong: 85,
      activeTier: 'pyr-heart'
    },
    amber: {
      tier: 'BASE NOTE',
      name: 'Golden Amber',
      desc: 'Deep, resinous warmth echoing the golden hour sunbeams illuminating the flacon. Anchors the fragrance with magnetic sensuality.',
      radiance: '98%',
      longevity: '12+ Hours',
      barRad: 98,
      barLong: 98,
      activeTier: 'pyr-base'
    },
    musk: {
      tier: 'BASE NOTE',
      name: 'Sheer Silk Musk',
      desc: 'A luminous, skin-caressing second-skin accord blended with blonde cedarwood for an intimate, unforgettable trail.',
      radiance: '95%',
      longevity: '14+ Hours',
      barRad: 95,
      barLong: 99,
      activeTier: 'pyr-base'
    },
    damask_rose: {
      tier: 'HEART NOTE',
      name: 'Damask Rose Absolu',
      desc: 'Hand-harvested at twilight in private royal gardens. Intensely romantic, honeyed floral petals radiating imperial luxury and deep feminine grace.',
      radiance: '98%',
      longevity: '10 - 12 Hours',
      barRad: 98,
      barLong: 94,
      activeTier: 'pyr-heart'
    },
    strawberry: {
      tier: 'TOP NOTE',
      name: 'Wild Alpine Strawberry',
      desc: 'Sparkling, succulent wild red berry accord delivering an irresistible burst of juicy sweetness that illuminates the opening.',
      radiance: '94%',
      longevity: '5 - 7 Hours',
      barRad: 94,
      barLong: 72,
      activeTier: 'pyr-top'
    },
    pink_pepper: {
      tier: 'TOP NOTE',
      name: 'Baies Roses (Pink Pepper)',
      desc: 'Subtly piquant and effervescent pink peppercorns lending vibrant sparkle and aristocratic intrigue to the berry-floral crown.',
      radiance: '95%',
      longevity: '6 - 8 Hours',
      barRad: 95,
      barLong: 76,
      activeTier: 'pyr-top'
    },
    turkish_rose: {
      tier: 'HEART NOTE',
      name: 'Turkish Rose Infusion',
      desc: 'Luminous, petal-fresh rose essence embodying pure nobility. Swirls in harmony with delicate flower petals in gentle motion.',
      radiance: '96%',
      longevity: '9 - 11 Hours',
      barRad: 96,
      barLong: 90,
      activeTier: 'pyr-heart'
    },
    amber_rose: {
      tier: 'BASE NOTE',
      name: 'Warm Radiant Amber',
      desc: 'Golden solar amber resin reflecting the 24K gilded crown cap, anchoring the floral heart with intoxicating, magnetic warmth.',
      radiance: '97%',
      longevity: '12+ Hours',
      barRad: 97,
      barLong: 96,
      activeTier: 'pyr-base'
    },
    vanilla_amber: {
      tier: 'BASE NOTE',
      name: 'Bourbon Vanilla Bean',
      desc: 'Velvety Madagascar vanilla pods delivering a creamy, sultry trail that clings intimately to the skin like fine silk.',
      radiance: '96%',
      longevity: '14+ Hours',
      barRad: 96,
      barLong: 98,
      activeTier: 'pyr-base'
    },
    noble_oud: {
      tier: 'BASE NOTE',
      name: 'Noble White Oud (Agarwood)',
      desc: 'Rare wild agarwood aged with crystalline purity. A sovereign resinous base radiating timeless distinction and imperial majesty.',
      radiance: '98%',
      longevity: '14+ Hours',
      barRad: 98,
      barLong: 99,
      activeTier: 'pyr-base'
    },
    white_orchid: {
      tier: 'HEART NOTE',
      name: 'Royal White Orchid',
      desc: 'Dewy alabaster petals unfurling in private Italian conservatories. Creamy, powdery, and aristocratic with subtle solar warmth.',
      radiance: '96%',
      longevity: '10 - 12 Hours',
      barRad: 96,
      barLong: 92,
      activeTier: 'pyr-heart'
    },
    lemon_artemisia: {
      tier: 'TOP NOTE',
      name: 'Calabrian Lemon & Artemisia',
      desc: 'Sparkling Mediterranean morning citrus blended with aromatic silver artemisia, delivering an effervescent, crystalline opening.',
      radiance: '95%',
      longevity: '6 - 7 Hours',
      barRad: 95,
      barLong: 75,
      activeTier: 'pyr-top'
    },
    amber_resin: {
      tier: 'BASE NOTE',
      name: 'Golden Amber Resin',
      desc: 'Sun-warmed fossilized amber crystals lending deep honeyed sensuality and magnetic warmth to the pristine oud heart.',
      radiance: '97%',
      longevity: '12+ Hours',
      barRad: 97,
      barLong: 96,
      activeTier: 'pyr-base'
    },
    wild_honey: {
      tier: 'TOP NOTE',
      name: 'Wild Blossom Honey',
      desc: 'Pure nectar gathered from sunlit Alpine wildflower meadows. Rich, golden, and seductively sweet, cascading into the opening with sovereign allure.',
      radiance: '97%',
      longevity: '7 - 9 Hours',
      barRad: 97,
      barLong: 82,
      activeTier: 'pyr-top'
    },
    cambodian_oud: {
      tier: 'BASE NOTE',
      name: 'Aged Cambodian Agarwood',
      desc: 'Deep, smoky, and richly balsamic vintage oud wood. Anchors the fragrance with hypnotic prestige and sovereign endurance.',
      radiance: '99%',
      longevity: '16+ Hours',
      barRad: 99,
      barLong: 100,
      activeTier: 'pyr-base'
    },
    bourbon_vanilla: {
      tier: 'BASE NOTE',
      name: 'Bourbon Vanilla Bean',
      desc: 'Lush cured vanilla pods radiating rich caramelized sweetness that melds seamlessly with molten honey and oud smoke.',
      radiance: '96%',
      longevity: '14+ Hours',
      barRad: 96,
      barLong: 98,
      activeTier: 'pyr-base'
    },
    spiced_cinnamon: {
      tier: 'HEART NOTE',
      name: 'Royal Ceylon Cinnamon',
      desc: 'Delicately ground golden cinnamon bark adding spicy aristocratic intrigue and radiant warmth to the floral honey bouquet.',
      radiance: '95%',
      longevity: '8 - 10 Hours',
      barRad: 95,
      barLong: 88,
      activeTier: 'pyr-heart'
    }
  };

  // Quad-Product Royal Boutique Catalog (BLUSH, ROSÉ WOMAN, WHITE OUD, HONEY OUD)
  let activeProduct = 'blush'; // 'blush', 'rose', 'white_oud', 'honey_oud'
  const roseBgImg = new Image();
  roseBgImg.src = 'assets/bellavita-rose-background.jpg';
  roseBgImg.onload = () => {
    if (activeProduct === 'rose') {
      renderCurrentFrame();
    }
  };
  const roseCutoutImg = new Image();
  roseCutoutImg.src = 'assets/bellavita-rose-woman-cutout.png';

  const whiteOudBgImg = new Image();
  whiteOudBgImg.src = 'assets/bellavita-white-oud-background.jpg';
  whiteOudBgImg.onload = () => {
    if (activeProduct === 'white_oud') {
      renderCurrentFrame();
    }
  };

  const honeyOudBgImg = new Image();
  honeyOudBgImg.src = 'assets/bellavita-honey-oud-background.jpg';
  honeyOudBgImg.onload = () => {
    if (activeProduct === 'honey_oud') {
      renderCurrentFrame();
    }
  };

  const PRODUCTS = {
    blush: {
      id: 'blush',
      title: 'BLUSH',
      subtitle: 'EAU DE PARFUM POUR FEMME',
      description: 'A luminous celebration of dewy white blossoms bathed in warm Mediterranean sunlight. The delicate jasmine petals dance perpetually in the soft breeze, cradling a timeless flacon of crystalline elegance.',
      notes: [
        { key: 'jasmine', label: 'Jasmine Sambac' },
        { key: 'mandarin', label: 'Italian Mandarin' },
        { key: 'peach', label: 'Dewy Peach' },
        { key: 'peony', label: 'Blush Peony' },
        { key: 'amber', label: 'Golden Amber' },
        { key: 'musk', label: 'Sheer Musk' }
      ],
      perks: [
        '⚜ 100ml / 3.4 fl. oz. Extrait',
        '⚜ Royal Gold Embossed Coffret',
        '⚜ White-Glove Insured Courier'
      ],
      price: 75,
      size: '100ml',
      sizes: [
        { size: '20ml', name: '20 ml', vol: '20 ml', oz: 'Pocket Spray', price: 24 },
        { size: '50ml', name: '50 ml', vol: '50 ml', oz: '1.7 fl. oz.', price: 48 },
        { size: '100ml', name: '100 ml', vol: '100 ml', oz: '3.4 fl. oz.', price: 75, popular: true },
        { size: 'giftset', name: 'Coffret', vol: 'Coffret', oz: '100ml + 20ml', price: 95 }
      ],
      shopModalTitle: 'BELLAVITA BLUSH',
      shopModalDesc: 'Heavy optical crystal flacon adorned with a polished metallic crown. Infused with living white jasmine blossoms, Italian citrus, and warm sunlit amber.',
      petalTone: 'blush'
    },
    rose: {
      id: 'rose',
      title: 'ROSÉ',
      subtitle: 'WOMAN · EAU DE PARFUM · 20ml / 0.68 fl. oz.',
      description: 'An intoxicating symphony of velvety Damask rose and sun-kissed wild berries. Accented with radiant pink pepper and warm golden amber, capturing pure feminine royalty in a slender, travel-luxe flacon.',
      notes: [
        { key: 'damask_rose', label: 'Damask Rose' },
        { key: 'strawberry', label: 'Wild Strawberry' },
        { key: 'pink_pepper', label: 'Pink Pepper' },
        { key: 'turkish_rose', label: 'Turkish Rose' },
        { key: 'amber_rose', label: 'Golden Amber' },
        { key: 'vanilla_amber', label: 'Bourbon Vanilla' }
      ],
      perks: [
        '⚜ 20ml / 0.68 fl. oz. Handbag Flacon',
        '⚜ 50% Off Limited Royal Allocation',
        '⚜ Royal Silk Pouch & 24K Gold Cap'
      ],
      price: 19,
      size: '20ml',
      sizes: [
        { size: '20ml', name: '20 ml', vol: '20 ml', oz: '0.68 fl. oz. · 50% OFF', price: 19, origPrice: 38, popular: true },
        { size: '50ml', name: '50 ml', vol: '50 ml', oz: '1.7 fl. oz. · 50% OFF', price: 39, origPrice: 78 },
        { size: '100ml', name: '100 ml', vol: '100 ml', oz: '3.4 fl. oz. · 50% OFF', price: 59, origPrice: 118 },
        { size: 'giftset', name: 'Royal Coffret', vol: 'Coffret', oz: '20ml + 50ml · 50% OFF', price: 69, origPrice: 138 }
      ],
      shopModalTitle: 'BELLAVITA ROSÉ WOMAN',
      shopModalDesc: 'Blush-pink flacon crowned with a gleaming cylindrical gold cap. Infused with velvety Damask rose, spiced berries, and warm vanilla amber. Featuring 20ml / 0.68 fl. oz. at 50% OFF.',
      petalTone: 'rose'
    },
    white_oud: {
      id: 'white_oud',
      title: 'WHITE OUD',
      subtitle: 'EAU DE PARFUM · 100 ml | 3.4 fl.oz',
      description: 'An aristocratic symphony of pristine white oud and sunlit citrus. Enveloped in velvety white orchids, golden amber resin crystals, and noble agarwood, evoking imperial purity and sovereign poise.',
      notes: [
        { key: 'noble_oud', label: 'Noble White Oud' },
        { key: 'white_orchid', label: 'White Orchid' },
        { key: 'lemon_artemisia', label: 'Calabrian Lemon' },
        { key: 'amber_resin', label: 'Amber Resin' },
        { key: 'musk', label: 'Sheer Musk' },
        { key: 'peach', label: 'Dewy Peach' }
      ],
      perks: [
        '⚜ 100ml / 3.4 fl. oz. Extrait Flacon',
        '⚜ Alabaster Crystal & 24K Gold Crown',
        '⚜ White-Glove Insured Courier Delivery'
      ],
      price: 85,
      size: '100ml',
      sizes: [
        { size: '20ml', name: '20 ml', vol: '20 ml', oz: 'Pocket Spray', price: 28 },
        { size: '50ml', name: '50 ml', vol: '50 ml', oz: '1.7 fl. oz.', price: 52 },
        { size: '100ml', name: '100 ml', vol: '100 ml', oz: '3.4 fl. oz.', price: 85, popular: true },
        { size: 'giftset', name: 'Royal Coffret', vol: 'Coffret', oz: '100ml + 20ml', price: 110 }
      ],
      shopModalTitle: 'BELLAVITA WHITE OUD',
      shopModalDesc: 'Opaque alabaster white flacon crowned with a gleaming cylindrical gold metallic cap. Infused with noble agarwood, white orchids, and crystalline golden amber.',
      petalTone: 'white'
    },
    honey_oud: {
      id: 'honey_oud',
      title: 'HONEY OUD',
      subtitle: 'LUXURY · EAU DE PARFUM · 3.38 fl. oz. 100 ml e',
      description: 'An intoxicating elixir of molten wild blossom honey drizzled over precious Cambodian agarwood. Infused with warm bourbon vanilla and spiced golden amber for an irresistible, imperial sillage.',
      notes: [
        { key: 'wild_honey', label: 'Wild Honey' },
        { key: 'cambodian_oud', label: 'Cambodian Oud' },
        { key: 'bourbon_vanilla', label: 'Bourbon Vanilla' },
        { key: 'spiced_cinnamon', label: 'Ceylon Cinnamon' },
        { key: 'damask_rose', label: 'Damask Rose' },
        { key: 'amber_rose', label: 'Golden Amber' }
      ],
      perks: [
        '⚜ 100ml / 3.38 fl. oz. Crystal Presentation',
        '⚜ Pure Wild Blossom Honey & Aged Oud',
        '⚜ Royal Velvet Coffret & Gold Accents'
      ],
      price: 80,
      size: '100ml',
      sizes: [
        { size: '20ml', name: '20 ml', vol: '20 ml', oz: 'Pocket Spray', price: 26 },
        { size: '50ml', name: '50 ml', vol: '50 ml', oz: '1.7 fl. oz.', price: 48 },
        { size: '100ml', name: '100 ml', vol: '100 ml', oz: '3.38 fl. oz.', price: 80, popular: true },
        { size: 'giftset', name: 'Royal Coffret', vol: 'Coffret', oz: '100ml + 20ml', price: 105 }
      ],
      shopModalTitle: 'BELLAVITA HONEY OUD',
      shopModalDesc: 'Heavy amber crystal flacon capturing liquid golden nectar crowned with a polished gold cap. Infused with wild blossom honey, Cambodian oud, and bourbon vanilla.',
      petalTone: 'amber'
    }
  };

  // State
  let currentFrame = 0;
  let isAnimationPlaying = true;
  let lastFrameTime = performance.now();
  let loadedFramesCount = 0;
  const frameImages = new Array(TOTAL_FRAMES);

  // E-Commerce State
  let cartCount = 1;
  let wishlistCount = 1;
  let selectedSize = '100ml';
  let selectedPrice = 75;
  let isPetalsEnabled = true;
  let isMagnifierActive = false;
  let isRoyalAuraActive = true;

  // 3D Parallax Mouse Tracking State
  const mouseState = {
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    vx: 0,
    vy: 0,
    rawX: window.innerWidth * 0.5,
    rawY: window.innerHeight * 0.5
  };

  // DOM Elements
  const canvas = document.getElementById('animation-canvas');
  const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
  const royalCanvas = document.getElementById('royal-rays');
  const rCtx = royalCanvas ? royalCanvas.getContext('2d') : null;
  const royalAuraEl = document.getElementById('royal-aura');
  const particlesCanvas = document.getElementById('particles-3d');
  const pCtx = particlesCanvas.getContext('2d');
  const sprayCanvas = document.getElementById('spray-canvas');
  const sCtx = sprayCanvas.getContext('2d');

  const magnifierLens = document.getElementById('magnifier-lens');
  const magnifierCanvas = document.getElementById('magnifier-canvas');
  const mCtx = magnifierCanvas.getContext('2d');

  const cursorGlow = document.getElementById('cursor-glow');
  const loader = document.getElementById('loader');
  const loaderBar = document.getElementById('loader-bar');
  const loaderPercent = document.getElementById('loader-percent');
  const heroCard = document.getElementById('hero-card');

  // =========================================================================
  // 2. 300-FRAME CINEMAGRAPH LOOP (STATIC BOTTLE + MOVING BLOSSOMS)
  // =========================================================================

  function getFrameUrl(index) {
    const pad = String(index + 1).padStart(3, '0');
    return `frames/ezgif-frame-${pad}.jpg`;
  }

  function resizeAllCanvases() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;

    // Main animation canvas
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Royal Rays canvas
    if (royalCanvas) {
      royalCanvas.width = Math.round(w * dpr);
      royalCanvas.height = Math.round(h * dpr);
    }

    // 3D Petals canvas
    particlesCanvas.width = Math.round(w * dpr);
    particlesCanvas.height = Math.round(h * dpr);

    // Spray canvas
    sprayCanvas.width = Math.round(w * dpr);
    sprayCanvas.height = Math.round(h * dpr);

    // Magnifier canvas
    magnifierCanvas.width = 220 * dpr;
    magnifierCanvas.height = 220 * dpr;

    renderCurrentFrame();
  }

  function drawCover(targetCtx, img, cw, ch) {
    if (!img || !img.complete || !img.naturalWidth) return;

    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) * 0.5;
    const sy = (ch - sh) * 0.5;

    targetCtx.drawImage(img, sx, sy, sw, sh);
  }

  function getNearestLoadedImage(index) {
    if (frameImages[index] && frameImages[index].complete && frameImages[index].naturalWidth > 0) {
      return frameImages[index];
    }
    // Search outward for closest loaded neighbor
    for (let d = 1; d < TOTAL_FRAMES; d++) {
      const prev = (index - d + TOTAL_FRAMES) % TOTAL_FRAMES;
      if (frameImages[prev] && frameImages[prev].complete && frameImages[prev].naturalWidth > 0) {
        return frameImages[prev];
      }
      const next = (index + d) % TOTAL_FRAMES;
      if (frameImages[next] && frameImages[next].complete && frameImages[next].naturalWidth > 0) {
        return frameImages[next];
      }
    }
    return frameImages[0] || null;
  }

  function renderCurrentFrame() {
    if (activeProduct === 'rose') {
      if (roseBgImg && roseBgImg.complete && roseBgImg.naturalWidth) {
        drawCover(ctx, roseBgImg, canvas.width, canvas.height);
        if (isMagnifierActive) {
          updateMagnifierView(roseBgImg);
        }
      }
    } else if (activeProduct === 'white_oud') {
      if (whiteOudBgImg && whiteOudBgImg.complete && whiteOudBgImg.naturalWidth) {
        drawCover(ctx, whiteOudBgImg, canvas.width, canvas.height);
        if (isMagnifierActive) {
          updateMagnifierView(whiteOudBgImg);
        }
      }
    } else if (activeProduct === 'honey_oud') {
      if (honeyOudBgImg && honeyOudBgImg.complete && honeyOudBgImg.naturalWidth) {
        drawCover(ctx, honeyOudBgImg, canvas.width, canvas.height);
        if (isMagnifierActive) {
          updateMagnifierView(honeyOudBgImg);
        }
      }
    } else {
      const img = getNearestLoadedImage(currentFrame);
      if (img) {
        drawCover(ctx, img, canvas.width, canvas.height);
        if (isMagnifierActive) {
          updateMagnifierView(img);
        }
      }
    }
  }

  function updateAnimationLoop(now) {
    if (isAnimationPlaying && targetFps > 0) {
      const elapsed = now - lastFrameTime;
      if (elapsed >= frameInterval) {
        lastFrameTime = now - (elapsed % frameInterval);
        currentFrame = (currentFrame + 1) % TOTAL_FRAMES;
        renderCurrentFrame();
      }
    }

    // Parallax & 3D Cards Smooth Lerp
    mouseState.x += (mouseState.targetX - mouseState.x) * 0.08;
    mouseState.y += (mouseState.targetY - mouseState.y) * 0.08;

    const tiltX = -mouseState.y * 7;
    const tiltY = mouseState.x * 9;
    if (heroCard) {
      heroCard.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(10px)`;
    }

    // Gentle camera depth shift on main canvas
    const panX = mouseState.x * -15;
    const panY = mouseState.y * -15;
    canvas.style.transform = `scale(1.03) translate3d(${panX}px, ${panY}px, 0)`;

    // Update 3D Petals, Royal God Rays & Spray
    updateAndDraw3DPetals();
    updateAndDrawRoyalRays(now);
    updateAndDrawSpray();

    requestAnimationFrame(updateAnimationLoop);
  }

  // Progressive Priority Preloader
  function startFramePreloading() {
    // 1. Load First Frame IMMEDIATELY
    const firstImg = new Image();
    firstImg.src = getFrameUrl(0);
    firstImg.onload = () => {
      frameImages[0] = firstImg;
      loadedFramesCount++;
      renderCurrentFrame();

      // Fade out preloader quickly once initial visual is active
      setTimeout(() => {
        loader.classList.add('fade-out');
        showToast('🌸 Welcome to Bellavita Blush: The Flowers Are Living & In Perpetual Motion');
      }, 350);

      // 2. Preload Keyframes (every 5th frame) so playback can start immediately
      preloadKeyframes();
    };
    firstImg.onerror = () => {
      // Fallback if local path differences
      console.warn('Frame 0 load error, retrying...');
      setTimeout(startFramePreloading, 500);
    };
  }

  function preloadKeyframes() {
    const keyframeIndices = [];
    for (let i = 1; i < TOTAL_FRAMES; i += 5) {
      keyframeIndices.push(i);
    }

    let loadedKeyframes = 0;
    keyframeIndices.forEach(idx => {
      const img = new Image();
      img.src = getFrameUrl(idx);
      img.onload = () => {
        frameImages[idx] = img;
        loadedFramesCount++;
        loadedKeyframes++;
        updateProgress();

        if (loadedKeyframes >= Math.min(20, keyframeIndices.length)) {
          // Start background full preload
          preloadAllRemainingFrames();
        }
      };
      img.onerror = () => {
        loadedKeyframes++;
      };
    });
  }

  function preloadAllRemainingFrames() {
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      if (!frameImages[i]) {
        const img = new Image();
        img.src = getFrameUrl(i);
        img.onload = () => {
          frameImages[i] = img;
          loadedFramesCount++;
          updateProgress();
        };
      }
    }
  }

  function updateProgress() {
    const pct = Math.min(100, Math.round((loadedFramesCount / TOTAL_FRAMES) * 100));
    if (loaderBar) loaderBar.style.width = pct + '%';
    if (loaderPercent) loaderPercent.textContent = pct + '%';
  }

  // =========================================================================
  // 3. REAL-TIME 3D BLOSSOM PETALS & GOLDEN POLLEN PARTICLE SYSTEM
  // =========================================================================

  const PETALS_COUNT = 65;
  const petals = [];

  class Petal3D {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      const w = window.innerWidth;
      const h = window.innerHeight;

      this.x = (Math.random() - 0.5) * w * 1.5;
      this.y = initial ? (Math.random() - 0.5) * h * 1.5 : -h * 0.6 - Math.random() * 200;
      this.z = Math.random() * 600 - 100; // 3D depth

      // Velocity
      this.vx = (Math.random() * 0.8 + 0.4) * (targetFps > 35 ? 1.8 : 1);
      this.vy = (Math.random() * 1.2 + 0.8) * (targetFps > 35 ? 1.6 : 1);
      this.vz = (Math.random() - 0.5) * 0.4;

      // 3D Rotations
      this.rotX = Math.random() * Math.PI * 2;
      this.rotY = Math.random() * Math.PI * 2;
      this.rotZ = Math.random() * Math.PI * 2;
      this.vRotX = (Math.random() - 0.5) * 0.04;
      this.vRotY = (Math.random() - 0.5) * 0.05;
      this.vRotZ = (Math.random() - 0.5) * 0.03;

      // Particle Archetypes: Petals, Golden Pollen, 24K Gold Foil, Diamond Sparkles
      const rand = Math.random();
      if (rand < 0.42) {
        this.type = 'petal';
        this.size = Math.random() * 14 + 10;
        this.opacity = Math.random() * 0.5 + 0.45;
      } else if (rand < 0.68) {
        this.type = 'gold_leaf'; // 24K Royal Gilded Gold Leaf
        this.size = Math.random() * 10 + 6;
        this.opacity = Math.random() * 0.4 + 0.55;
      } else if (rand < 0.88) {
        this.type = 'pollen';
        this.size = Math.random() * 3 + 1.5;
        this.opacity = Math.random() * 0.5 + 0.4;
      } else {
        this.type = 'sparkle'; // Royal Diamond Star Glint
        this.size = Math.random() * 7 + 4;
        this.opacity = Math.random() * 0.6 + 0.4;
      }

      this.wobbleSpeed = Math.random() * 0.03 + 0.01;
      this.wobblePhase = Math.random() * Math.PI * 2;
    }

    update() {
      // Wind speed multiplier
      const windFactor = targetFps === 0 ? 0.3 : (targetFps / 30);
      this.x += (this.vx * windFactor) + (mouseState.vx * 0.3);
      this.y += (this.vy * windFactor) + Math.sin(this.wobblePhase) * 0.5;
      this.z += this.vz;

      this.rotX += this.vRotX * windFactor;
      this.rotY += this.vRotY * windFactor;
      this.rotZ += this.vRotZ * windFactor;
      this.wobblePhase += this.wobbleSpeed;

      // Boundary check
      const halfW = window.innerWidth * 0.85;
      const halfH = window.innerHeight * 0.85;
      if (this.y > halfH || this.x > halfW || this.x < -halfW) {
        this.reset(false);
      }
    }

    draw(ctx, cx, cy, fov, dpr) {
      if (!isPetalsEnabled) return;

      const scale = fov / (fov + this.z);
      if (scale <= 0) return;

      const screenX = (cx + this.x * scale) * dpr;
      const screenY = (cy + this.y * scale) * dpr;
      const drawSize = this.size * scale * dpr;

      ctx.save();
      ctx.translate(screenX, screenY);
      ctx.rotate(this.rotZ);
      ctx.scale(Math.cos(this.rotY), Math.sin(this.rotX));

      if (this.type === 'petal') {
        // Delicate soft ivory/blush jasmine petal
        ctx.beginPath();
        ctx.moveTo(0, -drawSize);
        ctx.bezierCurveTo(drawSize * 0.6, -drawSize * 0.5, drawSize * 0.6, drawSize * 0.5, 0, drawSize);
        ctx.bezierCurveTo(-drawSize * 0.6, drawSize * 0.5, -drawSize * 0.6, -drawSize * 0.5, 0, -drawSize);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, -drawSize, 0, drawSize);
        grad.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
        grad.addColorStop(0.5, `rgba(254, 246, 240, ${this.opacity * 0.9})`);
        grad.addColorStop(1, `rgba(240, 215, 205, ${this.opacity * 0.6})`);

        ctx.fillStyle = grad;
        ctx.shadowColor = 'rgba(215, 175, 130, 0.3)';
        ctx.shadowBlur = 4 * dpr;
        ctx.fill();
      } else if (this.type === 'gold_leaf') {
        // 24K Royal Gilded Gold Foil Flake (Irregular polygon with gleaming metallic flash)
        ctx.beginPath();
        ctx.moveTo(-drawSize * 0.6, -drawSize * 0.5);
        ctx.lineTo(drawSize * 0.4, -drawSize * 0.7);
        ctx.lineTo(drawSize * 0.7, drawSize * 0.3);
        ctx.lineTo(drawSize * 0.2, drawSize * 0.8);
        ctx.lineTo(-drawSize * 0.7, drawSize * 0.4);
        ctx.closePath();

        const goldGrad = ctx.createLinearGradient(-drawSize, -drawSize, drawSize, drawSize);
        goldGrad.addColorStop(0, `rgba(255, 235, 160, ${this.opacity})`);
        goldGrad.addColorStop(0.4, `rgba(218, 165, 32, ${this.opacity})`);
        goldGrad.addColorStop(0.7, `rgba(255, 248, 220, ${this.opacity * 1.1})`);
        goldGrad.addColorStop(1, `rgba(184, 134, 11, ${this.opacity * 0.85})`);

        ctx.fillStyle = goldGrad;
        ctx.shadowColor = 'rgba(218, 165, 32, 0.65)';
        ctx.shadowBlur = 6 * dpr;
        ctx.fill();
      } else if (this.type === 'sparkle') {
        // Royal 4-pointed Star Diamond Glint
        const r = drawSize;
        ctx.beginPath();
        ctx.moveTo(0, -r * 1.6);
        ctx.quadraticCurveTo(0, 0, r * 1.6, 0);
        ctx.quadraticCurveTo(0, 0, 0, r * 1.6);
        ctx.quadraticCurveTo(0, 0, -r * 1.6, 0);
        ctx.quadraticCurveTo(0, 0, 0, -r * 1.6);
        ctx.closePath();

        ctx.fillStyle = `rgba(255, 250, 225, ${this.opacity})`;
        ctx.shadowColor = 'rgba(255, 215, 0, 0.9)';
        ctx.shadowBlur = 10 * dpr;
        ctx.fill();
      } else {
        // Sparkling golden sunlit pollen fleck
        ctx.beginPath();
        ctx.arc(0, 0, drawSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 215, 150, ${this.opacity * 0.85})`;
        ctx.shadowColor = 'rgba(235, 195, 110, 0.8)';
        ctx.shadowBlur = 8 * dpr;
        ctx.fill();
      }

      ctx.restore();
    }
  }

  for (let i = 0; i < PETALS_COUNT; i++) {
    petals.push(new Petal3D());
  }

  function updateAndDraw3DPetals() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    pCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);

    if (!isPetalsEnabled) return;

    const cx = window.innerWidth * 0.5;
    const cy = window.innerHeight * 0.5;
    const fov = 400;

    // Sort by depth for correct 3D occlusion
    petals.sort((a, b) => b.z - a.z);

    for (let i = 0; i < petals.length; i++) {
      petals[i].update();
      petals[i].draw(pCtx, cx, cy, fov, dpr);
    }
  }

  // =========================================================================
  // ROYAL GOD RAYS (VOLUMETRIC GOLDEN LIGHT SHAFTS)
  // =========================================================================

  function updateAndDrawRoyalRays(now) {
    if (!rCtx || !royalCanvas || !isRoyalAuraActive) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    rCtx.clearRect(0, 0, royalCanvas.width, royalCanvas.height);

    const w = royalCanvas.width;
    const h = royalCanvas.height;

    // Origin in upper-right / sky quadrant
    const originX = (window.innerWidth * (0.78 + mouseState.x * 0.04)) * dpr;
    const originY = -40 * dpr;

    // Draw 6 radiant golden light shafts
    const rayCount = 6;
    for (let i = 0; i < rayCount; i++) {
      const angleOffset = Math.sin(now * 0.0006 + i * 1.3) * 0.06;
      const baseAngle = 0.55 + (i * 0.14) + angleOffset;
      const rayWidth = (140 + Math.sin(now * 0.001 + i) * 35) * dpr;
      const rayLength = h * 1.5;

      const endX1 = originX - Math.cos(baseAngle) * rayLength - rayWidth * 0.5;
      const endY1 = originY + Math.sin(baseAngle) * rayLength;
      const endX2 = originX - Math.cos(baseAngle) * rayLength + rayWidth * 0.5;
      const endY2 = originY + Math.sin(baseAngle) * rayLength;

      const grad = rCtx.createLinearGradient(originX, originY, (endX1 + endX2) * 0.5, endY1);
      const alpha = 0.12 + Math.sin(now * 0.0012 + i * 0.8) * 0.04;

      grad.addColorStop(0, `rgba(255, 238, 175, ${alpha * 1.5})`);
      grad.addColorStop(0.35, `rgba(224, 185, 95, ${alpha})`);
      grad.addColorStop(0.7, `rgba(203, 163, 88, ${alpha * 0.4})`);
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      rCtx.save();
      rCtx.beginPath();
      rCtx.moveTo(originX, originY);
      rCtx.lineTo(endX1, endY1);
      rCtx.lineTo(endX2, endY2);
      rCtx.closePath();

      rCtx.fillStyle = grad;
      rCtx.fill();
      rCtx.restore();
    }
  }

  // =========================================================================
  // 4. 3D FRAGRANCE SPRAY MIST SIMULATION
  // =========================================================================

  const sprayParticles = [];

  class SprayMistParticle {
    constructor(originX, originY) {
      this.x = originX;
      this.y = originY;
      this.z = 0;

      // Fan out in 3D cone toward the viewer and slightly left/right
      const angle = (Math.random() - 0.5) * 0.8 - Math.PI * 0.5;
      const speed = Math.random() * 8 + 6;

      this.vx = Math.cos(angle) * speed + (Math.random() - 0.5) * 4;
      this.vy = Math.sin(angle) * speed * 0.6 - Math.random() * 3;
      this.vz = Math.random() * 5 + 3; // Coming forward

      this.radius = Math.random() * 2 + 1;
      this.maxRadius = Math.random() * 12 + 6;
      this.life = 1.0;
      this.decay = Math.random() * 0.02 + 0.015;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.z += this.vz;

      this.vx *= 0.94; // Air resistance
      this.vy *= 0.94;
      this.radius += (this.maxRadius - this.radius) * 0.06;
      this.life -= this.decay;
    }

    draw(ctx, dpr) {
      if (this.life <= 0) return;

      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x * dpr, this.y * dpr, this.radius * dpr, 0, Math.PI * 2);

      const alpha = Math.max(0, this.life * 0.5);
      const grad = ctx.createRadialGradient(
        this.x * dpr, this.y * dpr, 0,
        this.x * dpr, this.y * dpr, this.radius * dpr
      );
      grad.addColorStop(0, `rgba(255, 245, 235, ${alpha})`);
      grad.addColorStop(0.5, `rgba(240, 205, 170, ${alpha * 0.5})`);
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = grad;
      ctx.shadowColor = 'rgba(245, 215, 160, 0.4)';
      ctx.shadowBlur = 6 * dpr;
      ctx.fill();
      ctx.restore();
    }
  }

  function triggerSprayMist() {
    // Nozzle position near top center-right where the flacon crown is located
    const originX = window.innerWidth * 0.62;
    const originY = window.innerHeight * 0.38;

    for (let i = 0; i < 150; i++) {
      sprayParticles.push(new SprayMistParticle(originX, originY));
    }

    playSpraySound();
    playRoyalChime();
    showToast('✨ Sprayed Bellavita Blush: Infused with Jasmine Sambac & 24K Golden Mist');
  }

  function updateAndDrawSpray() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    sCtx.clearRect(0, 0, sprayCanvas.width, sprayCanvas.height);

    for (let i = sprayParticles.length - 1; i >= 0; i--) {
      const p = sprayParticles[i];
      p.update();
      p.draw(sCtx, dpr);
      if (p.life <= 0) {
        sprayParticles.splice(i, 1);
      }
    }
  }

  // =========================================================================
  // 5. 3D FLACON MAGNIFIER INSPECTOR LENS
  // =========================================================================

  function getActiveProductImage() {
    if (activeProduct === 'rose') return roseBgImg;
    if (activeProduct === 'white_oud') return whiteOudBgImg;
    if (activeProduct === 'honey_oud') return honeyOudBgImg;
    return getNearestLoadedImage(currentFrame);
  }

  function handleMagnifierMove(e) {
    if (!isMagnifierActive || !magnifierLens) return;

    const x = e.clientX;
    const y = e.clientY;

    magnifierLens.style.left = `${x}px`;
    magnifierLens.style.top = `${y}px`;

    const img = getActiveProductImage();
    if (img && img.complete && img.naturalWidth) {
      updateMagnifierView(img, x, y);
    }
  }

  function updateMagnifierView(img, mx, my) {
    if (!img) {
      img = getActiveProductImage();
    }
    if (!img || !img.complete || !img.naturalWidth) return;
    if (!mx || !my) {
      mx = mouseState.rawX;
      my = mouseState.rawY;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mw = magnifierCanvas.width;
    const mh = magnifierCanvas.height;

    mCtx.clearRect(0, 0, mw, mh);

    // Calculate source rect corresponding to mouse position on main canvas
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) * 0.5;
    const sy = (ch - sh) * 0.5;

    // Relative coords
    const relX = (mx * dpr - sx) / scale;
    const relY = (my * dpr - sy) / scale;

    const zoom = 2.4;
    const srcW = (mw / scale) / zoom;
    const srcH = (mh / scale) / zoom;
    const srcX = relX - srcW * 0.5;
    const srcY = relY - srcH * 0.5;

    mCtx.save();
    // Circular clip
    mCtx.beginPath();
    mCtx.arc(mw * 0.5, mh * 0.5, mw * 0.5 - 2, 0, Math.PI * 2);
    mCtx.clip();

    mCtx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, mw, mh);

    // Glass glare reflection
    const glare = mCtx.createLinearGradient(0, 0, mw, mh);
    glare.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
    glare.addColorStop(0.4, 'rgba(255, 255, 255, 0.05)');
    glare.addColorStop(1, 'rgba(203, 163, 88, 0.15)');
    mCtx.fillStyle = glare;
    mCtx.fill();

    mCtx.restore();
  }

  // =========================================================================
  // 6. SYNTHESIZED WEB AUDIO AMBIENT GARDEN BREEZE & SPRAY
  // =========================================================================

  let audioCtx = null;
  let breezeGain = null;
  let isSoundActive = false;

  function initAudio() {
    if (audioCtx) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();

      // Create gentle wind noise buffer
      const bufferSize = audioCtx.sampleRate * 2;
      const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99 * b0 + white * 0.05;
        b1 = 0.98 * b1 + white * 0.08;
        b2 = 0.95 * b2 + white * 0.12;
        output[i] = (b0 + b1 + b2) * 0.25;
      }

      const whiteNoise = audioCtx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 420;

      breezeGain = audioCtx.createGain();
      breezeGain.gain.value = 0.0;

      whiteNoise.connect(filter);
      filter.connect(breezeGain);
      breezeGain.connect(audioCtx.destination);

      whiteNoise.start(0);
    } catch (e) {
      console.warn('Web Audio not supported:', e);
    }
  }

  function toggleSoundAmbiance() {
    initAudio();
    if (!audioCtx) return;

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    isSoundActive = !isSoundActive;

    const iconOff = document.getElementById('icon-sound-off');
    const iconOn = document.getElementById('icon-sound-on');

    if (isSoundActive) {
      breezeGain.gain.setTargetAtTime(0.08, audioCtx.currentTime, 0.5);
      iconOff.classList.add('hidden');
      iconOn.classList.remove('hidden');
      showToast('🍃 Garden Breeze Ambiance Activated');
    } else {
      breezeGain.gain.setTargetAtTime(0.0, audioCtx.currentTime, 0.3);
      iconOff.classList.remove('hidden');
      iconOn.classList.add('hidden');
      showToast('Ambiance Muted');
    }
  }

  function playSpraySound() {
    if (!audioCtx) initAudio();
    if (!audioCtx) return;

    try {
      if (audioCtx.state === 'suspended') audioCtx.resume();

      // Quick spray puff noise
      const node = audioCtx.createBufferSource();
      const buffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.3, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (audioCtx.sampleRate * 0.06));
      }
      node.buffer = buffer;

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 2400;
      filter.Q.value = 2.0;

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.28);

      node.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);
      node.start();
    } catch (e) {}
  }

  function playRoyalChime() {
    if (!audioCtx) initAudio();
    if (!audioCtx) return;

    try {
      if (audioCtx.state === 'suspended') audioCtx.resume();

      // Royal arpeggio frequencies: C5, E5, G5, B5, D6, E6
      const freqs = [523.25, 659.25, 783.99, 987.77, 1174.66, 1318.51];
      const now = audioCtx.currentTime;

      freqs.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);

        // Soft royal bell envelope
        gain.gain.setValueAtTime(0.0001, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.055, now + idx * 0.05 + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.85);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.9);
      });
    } catch (e) {}
  }

  // =========================================================================
  // 7. TOAST NOTIFICATIONS
  // =========================================================================

  function showToast(msg) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'luxury-toast';
    toast.innerHTML = `<span>${msg}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 3600);
  }

  // =========================================================================
  // 8. INTERACTIVE MODAL & DRAWER CONTROLLER
  // =========================================================================

  function setupModalsAndDrawers() {
    const modalBackdrops = document.querySelectorAll('.modal-backdrop, .drawer-backdrop');

    function closeAllOverlays() {
      modalBackdrops.forEach(el => el.classList.remove('open'));
    }

    // Close buttons
    document.querySelectorAll('.close-modal-btn, .close-drawer-btn').forEach(btn => {
      btn.addEventListener('click', closeAllOverlays);
    });

    // Backdrop click close
    modalBackdrops.forEach(backdrop => {
      backdrop.addEventListener('click', e => {
        if (e.target === backdrop) {
          closeAllOverlays();
        }
      });
    });

    // Escape key close
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeAllOverlays();
    });

    // Nav Links: Collections
    const navCollection = document.getElementById('nav-collection');
    if (navCollection) {
      navCollection.addEventListener('click', () => {
        closeAllOverlays();
        document.getElementById('collection-modal-backdrop').classList.add('open');
      });
    }

    // Nav Links: The Maison / About
    const navAbout = document.getElementById('nav-about');
    if (navAbout) {
      navAbout.addEventListener('click', () => {
        closeAllOverlays();
        document.getElementById('about-modal-backdrop').classList.add('open');
      });
    }

    // Nav Links: Gallery
    const navGallery = document.getElementById('nav-gallery');
    if (navGallery) {
      navGallery.addEventListener('click', () => {
        closeAllOverlays();
        document.getElementById('gallery-modal-backdrop').classList.add('open');
      });
    }

    // Nav Links: Concierge
    const navContact = document.getElementById('nav-contact');
    if (navContact) {
      navContact.addEventListener('click', () => {
        closeAllOverlays();
        document.getElementById('contact-modal-backdrop').classList.add('open');
      });
    }

    // Menu Drawer Toggle
    const btnMenu = document.getElementById('btn-menu');
    if (btnMenu) {
      btnMenu.addEventListener('click', () => {
        closeAllOverlays();
        document.getElementById('menu-drawer-backdrop').classList.add('open');
      });
    }

    // Menu Drawer sublinks
    const menuConcierge = document.getElementById('menu-open-concierge');
    if (menuConcierge) {
      menuConcierge.addEventListener('click', () => {
        closeAllOverlays();
        document.getElementById('contact-modal-backdrop').classList.add('open');
      });
    }

    const menuGallery = document.getElementById('menu-open-gallery');
    if (menuGallery) {
      menuGallery.addEventListener('click', () => {
        closeAllOverlays();
        document.getElementById('gallery-modal-backdrop').classList.add('open');
      });
    }

    const menuEngraving = document.getElementById('menu-open-engraving');
    if (menuEngraving) {
      menuEngraving.addEventListener('click', () => {
        closeAllOverlays();
        document.getElementById('shop-modal-backdrop').classList.add('open');
        const checkEngrave = document.getElementById('check-engraving');
        if (checkEngrave) {
          checkEngrave.checked = true;
          const engField = document.getElementById('engraving-input');
          if (engField) engField.classList.remove('hidden');
        }
      });
    }

    // Search Modal Toggle
    const btnSearch = document.getElementById('btn-search');
    if (btnSearch) {
      btnSearch.addEventListener('click', () => {
        closeAllOverlays();
        document.getElementById('search-modal-backdrop').classList.add('open');
        const sf = document.getElementById('search-field');
        if (sf) sf.focus();
      });
    }

    // Wishlist Drawer Toggle
    const btnWishlist = document.getElementById('btn-wishlist');
    if (btnWishlist) {
      btnWishlist.addEventListener('click', () => {
        closeAllOverlays();
        document.getElementById('wishlist-drawer-backdrop').classList.add('open');
      });
    }

    // Cart Drawer Toggle
    const btnCart = document.getElementById('btn-cart');
    if (btnCart) {
      btnCart.addEventListener('click', () => {
        closeAllOverlays();
        document.getElementById('cart-drawer-backdrop').classList.add('open');
      });
    }

    // =========================================================================
    // PERFUME SWITCHER & SHOP MODAL ENGINE
    // =========================================================================

    function updateShopModalContent() {
      const prod = PRODUCTS[activeProduct];
      if (!prod) return;

      const shopPreview = document.getElementById('shop-bottle-preview');
      const shopTitle = document.getElementById('shop-modal-title');
      const shopDesc = document.getElementById('shop-modal-desc');
      const sizeGrid = document.querySelector('.size-buttons-grid');

      if (shopPreview) {
        shopPreview.className = `flacon-3d-graphic ${activeProduct}`;
      }
      if (shopTitle) shopTitle.textContent = prod.shopModalTitle;
      if (shopDesc) shopDesc.textContent = prod.shopModalDesc;

      if (sizeGrid) {
        sizeGrid.innerHTML = prod.sizes.map((s) => `
          <button class="size-btn ${s.popular ? 'selected' : ''}" data-size="${s.size}" data-price="${s.price}">
            ${s.popular ? '<div class="popular-ribbon">POPULAR</div>' : ''}
            <span class="vol">${s.name}</span>
            <span class="oz">${s.oz}</span>
            <span class="prc">$${s.price.toFixed(0)}</span>
          </button>
        `).join('');

        sizeGrid.querySelectorAll('.size-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            sizeGrid.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedSize = btn.getAttribute('data-size');
            selectedPrice = parseFloat(btn.getAttribute('data-price'));
            const priceDisplay = document.getElementById('modal-price-display');
            if (priceDisplay) {
              priceDisplay.textContent = `$${selectedPrice.toFixed(2)}`;
            }
          });
        });
      }

      selectedSize = prod.size;
      selectedPrice = prod.price;
      const priceDisplay = document.getElementById('modal-price-display');
      if (priceDisplay) {
        priceDisplay.textContent = `$${selectedPrice.toFixed(2)}`;
      }
    }

    function rebindNotePills() {
      const notePillButtons = document.querySelectorAll('.note-pill-btn, #btn-all-notes');
      notePillButtons.forEach(btn => {
        btn.onclick = () => {
          let defaultNote = 'jasmine';
          if (activeProduct === 'rose') defaultNote = 'damask_rose';
          else if (activeProduct === 'white_oud') defaultNote = 'noble_oud';
          else if (activeProduct === 'honey_oud') defaultNote = 'wild_honey';

          const noteKey = btn.getAttribute('data-note') || defaultNote;
          const data = OLFACTORY_DATABASE[noteKey] || OLFACTORY_DATABASE.jasmine;

          const tierEl = document.getElementById('modal-note-tier');
          const nameEl = document.getElementById('modal-note-name');
          const descEl = document.getElementById('modal-note-desc');
          const radValEl = document.getElementById('note-radiance-val');
          const barRadEl = document.getElementById('bar-radiance');
          const longValEl = document.getElementById('note-longevity-val');
          const barLongEl = document.getElementById('bar-longevity');
          const noteShopBtn = document.getElementById('btn-note-shop');

          if (tierEl) tierEl.textContent = data.tier;
          if (nameEl) nameEl.textContent = data.name;
          if (descEl) descEl.textContent = data.desc;
          if (radValEl) radValEl.textContent = data.radiance;
          if (barRadEl) barRadEl.style.width = data.radiance;
          if (longValEl) longValEl.textContent = data.longevity;
          if (barLongEl) barLongEl.style.width = data.barLong + '%';
          if (noteShopBtn) {
            const prod = PRODUCTS[activeProduct] || PRODUCTS.blush;
            noteShopBtn.textContent = `EXPERIENCE THIS ACCORD IN ${prod.title.toUpperCase()}`;
          }

          document.querySelectorAll('.pyramid-step').forEach(s => s.style.opacity = '0.5');
          const activeStep = document.getElementById(data.activeTier);
          if (activeStep) activeStep.style.opacity = '1.0';

          closeAllOverlays();
          document.getElementById('note-modal-backdrop').classList.add('open');
        };
      });
    }

    function switchProduct(productId) {
      if (productId !== 'blush' && productId !== 'rose' && productId !== 'white_oud' && productId !== 'honey_oud') return;
      activeProduct = productId;

      // 1. Update Switcher Pill States
      const btnBlush = document.getElementById('btn-switch-blush');
      const btnRose = document.getElementById('btn-switch-rose');
      const btnWhiteOud = document.getElementById('btn-switch-white-oud');
      const btnHoneyOud = document.getElementById('btn-switch-honey-oud');

      if (btnBlush) btnBlush.classList.toggle('active', productId === 'blush');
      if (btnRose) btnRose.classList.toggle('active', productId === 'rose');
      if (btnWhiteOud) btnWhiteOud.classList.toggle('active', productId === 'white_oud');
      if (btnHoneyOud) btnHoneyOud.classList.toggle('active', productId === 'honey_oud');

      // 2. Automatically Change Website Background & Atmosphere Theme
      document.body.classList.remove('theme-rose', 'theme-white-oud', 'theme-honey-oud');
      if (productId === 'rose') document.body.classList.add('theme-rose');
      if (productId === 'white_oud') document.body.classList.add('theme-white-oud');
      if (productId === 'honey_oud') document.body.classList.add('theme-honey-oud');

      // 3. Shift Main Interface Elements
      const prod = PRODUCTS[productId];
      const heroTitle = document.getElementById('btn-hero-title');
      const heroSub = document.getElementById('hero-subtitle-text');
      const heroDesc = document.getElementById('hero-description-text');
      const heroNotes = document.getElementById('hero-notes-grid');
      const heroPerks = document.getElementById('hero-perks-strip');
      const purchaseBtnText = document.getElementById('purchase-btn-text');

      if (heroTitle) heroTitle.textContent = prod.title;
      if (heroSub) heroSub.textContent = prod.subtitle;
      if (heroDesc) heroDesc.textContent = prod.description;

      if (purchaseBtnText) {
        purchaseBtnText.textContent = `PURCHASE FLACON ($${prod.price.toFixed(2)})`;
      }

      if (heroPerks) {
        heroPerks.innerHTML = prod.perks.map((p, i) => `
          <span class="perk-item">${p}</span>
          ${i < prod.perks.length - 1 ? '<span class="perk-dot">·</span>' : ''}
        `).join('');
      }

      if (heroNotes) {
        const row1 = prod.notes.slice(0, 3);
        const row2 = prod.notes.slice(3, 6);
        heroNotes.innerHTML = `
          <div class="notes-row">
            ${row1.map((n, i) => `
              <button class="note-pill-btn" data-note="${n.key}">
                <span class="note-dot"></span>${n.label}
              </button>
              ${i < row1.length - 1 ? '<span class="note-separator">·</span>' : ''}
            `).join('')}
          </div>
          <div class="notes-row">
            ${row2.map((n, i) => `
              <button class="note-pill-btn" data-note="${n.key}">
                <span class="note-dot"></span>${n.label}
              </button>
              ${i < row2.length - 1 ? '<span class="note-separator">·</span>' : ''}
            `).join('')}
          </div>
        `;
        rebindNotePills();
      }

      // 4. Update Collection Cards Featured Status
      const cardBlush = document.getElementById('card-col-blush');
      const cardRose = document.getElementById('card-col-rose');
      const cardWhiteOud = document.getElementById('card-col-white-oud');
      const cardHoneyOud = document.getElementById('card-col-honey-oud');

      if (cardBlush) cardBlush.classList.toggle('featured', productId === 'blush');
      if (cardRose) cardRose.classList.toggle('featured', productId === 'rose');
      if (cardWhiteOud) cardWhiteOud.classList.toggle('featured', productId === 'white_oud');
      if (cardHoneyOud) cardHoneyOud.classList.toggle('featured', productId === 'honey_oud');

      // 5. Update Drawer Selection Highlight
      document.querySelectorAll('[data-action="select-product"]').forEach(btn => {
        btn.classList.toggle('active-item', btn.getAttribute('data-product') === productId);
      });

      // 6. Update Shop Modal
      updateShopModalContent();

      // 7. Immediately Re-render Cinemagraph/Background
      renderCurrentFrame();

      playRoyalChime();
      const toastMessages = {
        blush: '🌸 Bellavita Blush Selected: 3D Living Floral Sanctuary',
        rose: '🌹 Bellavita Rosé Woman Selected: 50% Off Special Edition',
        white_oud: '🤍 Bellavita White Oud Selected: Noble Alabaster & Amber Resonance',
        honey_oud: '🍯 Bellavita Honey Oud Selected: Liquid Gold & Wild Honeyed Sillage'
      };
      showToast(toastMessages[productId] || 'Creation Selected');

      // Sync Editorial Review Slot Card
      syncEditorialSlot(productId);
    }

    // Flacon Switcher Pill Buttons
    const btnSwitchBlush = document.getElementById('btn-switch-blush');
    const btnSwitchRose = document.getElementById('btn-switch-rose');
    const btnSwitchWhiteOud = document.getElementById('btn-switch-white-oud');
    const btnSwitchHoneyOud = document.getElementById('btn-switch-honey-oud');

    if (btnSwitchBlush) {
      btnSwitchBlush.addEventListener('click', () => switchProduct('blush'));
    }
    if (btnSwitchRose) {
      btnSwitchRose.addEventListener('click', () => switchProduct('rose'));
    }
    if (btnSwitchWhiteOud) {
      btnSwitchWhiteOud.addEventListener('click', () => switchProduct('white_oud'));
    }
    if (btnSwitchHoneyOud) {
      btnSwitchHoneyOud.addEventListener('click', () => switchProduct('honey_oud'));
    }

    // Hero Title Button (Click to toggle through all 4)
    const btnHeroTitle = document.getElementById('btn-hero-title');
    if (btnHeroTitle) {
      btnHeroTitle.style.cursor = 'pointer';
      btnHeroTitle.addEventListener('click', () => {
        const order = ['blush', 'rose', 'white_oud', 'honey_oud'];
        const nextIdx = (order.indexOf(activeProduct) + 1) % order.length;
        switchProduct(order[nextIdx]);
      });
    }

    // Collection Modal & Drawer Product Selectors
    document.querySelectorAll('[data-action="select-product"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const prodId = btn.getAttribute('data-product');
        closeAllOverlays();
        if (prodId === 'rose' || prodId === 'blush' || prodId === 'white_oud' || prodId === 'honey_oud') {
          switchProduct(prodId);
        } else {
          showToast(`Viewing ${btn.textContent.trim()} in Atelier Collection`);
          document.getElementById('collection-modal-backdrop').classList.add('open');
        }
      });
    });

    document.querySelectorAll('.card-cta-btn[data-buy]').forEach(btn => {
      btn.addEventListener('click', () => {
        const buyId = btn.getAttribute('data-buy');
        closeAllOverlays();
        if (buyId === 'rose' || buyId === 'blush' || buyId === 'white_oud' || buyId === 'honey_oud') {
          switchProduct(buyId);
        } else {
          document.getElementById('shop-modal-backdrop').classList.add('open');
        }
      });
    });

    // Shop Now Buttons
    const btnShopNow = document.getElementById('btn-shop-now');
    if (btnShopNow) {
      btnShopNow.addEventListener('click', () => {
        closeAllOverlays();
        updateShopModalContent();
        document.getElementById('shop-modal-backdrop').classList.add('open');
      });
    }

    // Spray Scent Button
    const btnSprayScent = document.getElementById('btn-spray-scent');
    if (btnSprayScent) {
      btnSprayScent.addEventListener('click', () => {
        triggerSprayMist();
      });
    }

    // Flacon Magnifier Inspector Button
    const btnInspectFlacon = document.getElementById('btn-inspect-flacon');
    if (btnInspectFlacon) {
      btnInspectFlacon.addEventListener('click', () => {
        isMagnifierActive = !isMagnifierActive;
        const textSpan = document.getElementById('inspect-btn-text');

        if (isMagnifierActive) {
          magnifierLens.classList.add('active');
          btnInspectFlacon.classList.add('active');
          if (textSpan) textSpan.textContent = 'LENS ON';
          showToast('🔍 Flacon Inspector Active: Move cursor over perfume to inspect details');
        } else {
          magnifierLens.classList.remove('active');
          btnInspectFlacon.classList.remove('active');
          if (textSpan) textSpan.textContent = 'INSPECT';
          showToast('Flacon Inspector Dismissed');
        }
      });
    }

    // Breeze Speed Controls (Gentle, Breeze, Still)
    const breezeButtons = document.querySelectorAll('.breeze-btn');
    breezeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        breezeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const setting = btn.getAttribute('data-breeze');

        if (setting === 'normal') {
          targetFps = 30;
          frameInterval = 1000 / targetFps;
          isAnimationPlaying = true;
          showToast('🍃 Gentle Morning Breeze: Flowers sway in natural motion');
        } else if (setting === 'fresh') {
          targetFps = 45;
          frameInterval = 1000 / targetFps;
          isAnimationPlaying = true;
          showToast('💨 Fresh Summer Gust: Flowers flutter energetically');
        } else if (setting === 'still') {
          isAnimationPlaying = false;
          showToast('📷 Still Life Mode: Flowers paused to inspect flacon stillness');
        }
      });
    });

    // Royal Golden Aura & 24K Dust Toggle
    const btnRoyalAura = document.getElementById('btn-royal-aura');
    if (btnRoyalAura) {
      btnRoyalAura.addEventListener('click', () => {
        isRoyalAuraActive = !isRoyalAuraActive;
        const label = document.getElementById('royal-aura-label');
        if (isRoyalAuraActive) {
          btnRoyalAura.classList.add('active');
          if (royalAuraEl) royalAuraEl.classList.remove('hidden');
          if (royalCanvas) royalCanvas.classList.remove('hidden');
          if (label) label.textContent = 'ROYAL AURA ON';
          playRoyalChime();
          showToast('👑 Royal Golden Aura: 24K Gilded Flakes & Volumetric Palace Rays');
        } else {
          btnRoyalAura.classList.remove('active');
          if (royalAuraEl) royalAuraEl.classList.add('hidden');
          if (royalCanvas) royalCanvas.classList.add('hidden');
          if (label) label.textContent = 'ROYAL AURA OFF';
          showToast('Royal Aura Dismissed');
        }
      });
    }

    // 3D Petals Density Toggle
    const btnTogglePetals = document.getElementById('btn-toggle-petals');
    if (btnTogglePetals) {
      btnTogglePetals.addEventListener('click', () => {
        isPetalsEnabled = !isPetalsEnabled;
        const label = document.getElementById('petals-toggle-label');
        if (label) {
          label.textContent = isPetalsEnabled ? '3D PETALS ON' : '3D PETALS OFF';
        }
        showToast(isPetalsEnabled ? '🌸 3D Floating Blossom Petals Enabled' : 'Petals Cleared');
      });
    }

    // Ambient Sound Toggle
    const btnAudio = document.getElementById('btn-audio');
    if (btnAudio) {
      btnAudio.addEventListener('click', toggleSoundAmbiance);
    }

    // Mood Tagline Buttons
    const moodButtons = document.querySelectorAll('.tagline-btn');
    const heroDesc = document.getElementById('hero-description-text');
    moodButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        moodButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const mood = btn.getAttribute('data-mood');

        if (activeProduct === 'rose') {
          if (mood === 'radiant') {
            if (heroDesc) heroDesc.textContent = 'An intoxicating symphony of velvety Damask rose and sun-kissed wild berries. Accented with radiant pink pepper and warm golden amber, capturing pure feminine royalty in a slender, travel-luxe flacon.';
          } else if (mood === 'feminine') {
            if (heroDesc) heroDesc.textContent = 'Sweet wild Alpine strawberries dance with Turkish rose essence and creamy bourbon vanilla, creating an intimate second-skin aura that lingers like soft velvet.';
          } else if (mood === 'timeless') {
            if (heroDesc) heroDesc.textContent = 'A sovereign declaration of luxury, crowned with 24K gold and steeped in precious rose absolu. Designed for effortless glamour wherever life leads.';
          }
        } else if (activeProduct === 'white_oud') {
          if (mood === 'radiant') {
            if (heroDesc) heroDesc.textContent = 'An imperial harmony of smoky agarwood and blooming white orchids, kissed by Italian lemon and crisp morning artemisia on a sunlit marble terrace.';
          } else if (mood === 'feminine') {
            if (heroDesc) heroDesc.textContent = 'A pristine sanctuary of soft floral whispers and ethereal agarwood veil, evoking timeless dignity, poise, and whisper-soft skin radiance.';
          } else if (mood === 'timeless') {
            if (heroDesc) heroDesc.textContent = 'A masterpiece of architectural purity. Rare Indonesian oud and golden amber resin enshrined within an alabaster white flacon of eternal sovereignty.';
          }
        } else if (activeProduct === 'honey_oud') {
          if (mood === 'radiant') {
            if (heroDesc) heroDesc.textContent = 'Liquid amber gold infused with sun-drenched wildflower honey, blooming florals, and rich resinous oud dancing in warm Mediterranean evening light.';
          } else if (mood === 'feminine') {
            if (heroDesc) heroDesc.textContent = 'An opulent, velvety veil of caramelized wild honey, Turkish rose, and spiced cinnamon melting into a sensual bourbon vanilla embrace.';
          } else if (mood === 'timeless') {
            if (heroDesc) heroDesc.textContent = 'Centuries of royal perfumery captured in luminous golden crystal. Rare Cambodian agarwood steeped in sweet golden nectar for an enduring legacy.';
          }
        } else {
          if (mood === 'radiant') {
            if (heroDesc) heroDesc.textContent = 'A luminous celebration of dewy white blossoms bathed in warm Mediterranean sunlight. The delicate jasmine petals dance perpetually in the soft breeze, cradling a timeless flacon of crystalline elegance.';
          } else if (mood === 'feminine') {
            if (heroDesc) heroDesc.textContent = 'An intimate, velvety bouquet of blushing petals, sun-warmed peach nectar, and whispered Italian romance. Crafted to wrap the wearer in enduring luxury and graceful allure.';
          } else if (mood === 'timeless') {
            if (heroDesc) heroDesc.textContent = 'Anchored by rich golden amber and silky cedarwood. While nature breathes and blossoms sway in continuous rhythm, the heavy glass flacon stands in eternal poise.';
          }
        }
        showToast(`Scent Aura: ${mood.toUpperCase()}`);
      });
    });

    // Initialize Note Pills
    rebindNotePills();

    const btnNoteShop = document.getElementById('btn-note-shop');
    if (btnNoteShop) {
      btnNoteShop.addEventListener('click', () => {
        closeAllOverlays();
        updateShopModalContent();
        document.getElementById('shop-modal-backdrop').classList.add('open');
      });
    }

    // Custom Engraving Checkbox
    const checkEngraving = document.getElementById('check-engraving');
    const engravingInput = document.getElementById('engraving-input');
    if (checkEngraving && engravingInput) {
      checkEngraving.addEventListener('change', () => {
        if (checkEngraving.checked) {
          engravingInput.classList.remove('hidden');
          engravingInput.focus();
        } else {
          engravingInput.classList.add('hidden');
        }
      });
    }

    // Add to Luxury Bag Button
    const btnAddToBag = document.getElementById('btn-add-to-bag');
    if (btnAddToBag) {
      btnAddToBag.addEventListener('click', () => {
        cartCount++;
        updateCartDisplay();
        closeAllOverlays();
        document.getElementById('cart-drawer-backdrop').classList.add('open');
        const prod = PRODUCTS[activeProduct] || PRODUCTS.blush;
        showToast(`✨ Added ${prod.title} (${selectedSize.toUpperCase()}) to Luxury Bag`);
      });
    }

    // Wishlist Move to Bag
    const btnWishlistMove = document.getElementById('btn-wishlist-move');
    if (btnWishlistMove) {
      btnWishlistMove.addEventListener('click', () => {
        cartCount++;
        wishlistCount = Math.max(0, wishlistCount - 1);
        updateCartDisplay();
        document.getElementById('wishlist-badge').textContent = wishlistCount;
        document.getElementById('wishlist-count-header').textContent = wishlistCount;
        const wishItem = document.getElementById('wishlist-item-main');
        if (wishItem) wishItem.innerHTML = '<p style="font-style:italic; color:#6e6259; padding:1rem;">Your saved creations have been moved to your shopping bag.</p>';
        const prod = PRODUCTS[activeProduct] || PRODUCTS.blush;
        showToast(`Moved ${prod.title} to Shopping Bag`);
      });
    }

    // Cart Quantity Steppers
    const btnQtyMinus = document.getElementById('btn-qty-minus');
    const btnQtyPlus = document.getElementById('btn-qty-plus');
    const cartQtyVal = document.getElementById('cart-qty-val');
    const removeCartItem = document.querySelector('.remove-cart-item');

    if (btnQtyPlus && cartQtyVal) {
      btnQtyPlus.addEventListener('click', () => {
        cartCount++;
        cartQtyVal.textContent = cartCount;
        updateCartDisplay();
      });
    }

    if (btnQtyMinus && cartQtyVal) {
      btnQtyMinus.addEventListener('click', () => {
        if (cartCount > 1) {
          cartCount--;
          cartQtyVal.textContent = cartCount;
          updateCartDisplay();
        }
      });
    }

    if (removeCartItem) {
      removeCartItem.addEventListener('click', () => {
        cartCount = 0;
        updateCartDisplay();
        const container = document.getElementById('cart-items-list');
        if (container) {
          container.innerHTML = '<p style="font-style:italic; color:#6e6259; padding:1.5rem; text-align:center;">Your shopping bag is currently empty.</p>';
        }
        showToast('Removed from bag');
      });
    }

    // Checkout button
    const btnCheckout = document.getElementById('btn-checkout');
    if (btnCheckout) {
      btnCheckout.addEventListener('click', () => {
        if (cartCount === 0) {
          showToast('Your luxury bag is empty.');
          return;
        }
        closeAllOverlays();
        showToast('🔒 Proceeding to Atelier Secure Checkout with VIP Delivery...');
      });
    }

    // Concierge Form Submission
    const conciergeForm = document.getElementById('concierge-form');
    if (conciergeForm) {
      conciergeForm.addEventListener('submit', () => {
        closeAllOverlays();
        showToast('⚜️ Consultation Request Received. An Atelier Scent Stylist will connect with you.');
      });
    }

    // Search Autocomplete
    const searchField = document.getElementById('search-field');
    const searchResults = document.getElementById('search-results');
    const sugTags = document.querySelectorAll('.sug-tag');

    function performSearch(query) {
      if (!searchResults) return;
      query = query.toLowerCase().trim();
      if (!query) {
        searchResults.innerHTML = '';
        return;
      }

      const accords = [
        { name: 'Jasmine Sambac Accord', type: 'Floral Heart Note · Dawn Harvest', price: '$75.00' },
        { name: 'Calabrian Italian Mandarin', type: 'Citrus Top Note · Cold Pressed', price: '$75.00' },
        { name: 'Dewy Peach Nectar', type: 'Fruity Top Note · Velvety Blush', price: '$75.00' },
        { name: 'Golden Amber Extrait', type: 'Warm Base Note · Mediterranean Sun', price: '$80.00' },
        { name: 'Bellavita Blush 100ml Flacon', type: 'Full Size Heavy Crystal Presentation', price: '$75.00' },
        { name: 'Bellavita Blush Pocket Spray 20ml', type: 'Handbag Travel Atomizer', price: '$24.00' }
      ];

      const matches = accords.filter(a => a.name.toLowerCase().includes(query) || a.type.toLowerCase().includes(query));

      if (matches.length === 0) {
        searchResults.innerHTML = `<p style="padding:1rem; color:#6e6259; font-style:italic;">No botanical accords matching "${query}". Try searching "Jasmine" or "100ml".</p>`;
      } else {
        searchResults.innerHTML = matches.map(m => `
          <div class="cart-item" style="margin-bottom:0.8rem; cursor:pointer;" onclick="document.getElementById('shop-modal-backdrop').classList.add('open')">
            <div class="cart-item-details">
              <h4 class="cart-item-name">${m.name}</h4>
              <span class="cart-item-size">${m.type}</span>
              <span class="cart-item-price">${m.price}</span>
            </div>
          </div>
        `).join('');
      }
    }

    if (searchField) {
      searchField.addEventListener('input', e => {
        performSearch(e.target.value);
      });
    }

    sugTags.forEach(tag => {
      tag.addEventListener('click', () => {
        const q = tag.getAttribute('data-query');
        if (searchField) {
          searchField.value = q;
          performSearch(q);
        }
      });
    });
  }

  function updateCartDisplay() {
    const badge = document.getElementById('cart-badge');
    const headerCount = document.getElementById('cart-count-header');
    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');

    if (badge) badge.textContent = cartCount;
    if (headerCount) headerCount.textContent = cartCount;

    const subtotal = cartCount * selectedPrice;
    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${subtotal.toFixed(2)}`;

    const prod = PRODUCTS[activeProduct] || PRODUCTS.blush;
    const prodName = prod.title;
    const cartItemName = document.querySelector('.cart-item-name');
    const cartItemSize = document.querySelector('.cart-item-size');
    const cartItemPrice = document.querySelector('.cart-item-price');
    const cartItemImg = document.querySelector('.cart-item-img');

    if (cartItemName) cartItemName.textContent = prodName;
    if (cartItemSize) cartItemSize.textContent = `${selectedSize.toUpperCase()} · EAU DE PARFUM`;
    if (cartItemPrice) cartItemPrice.textContent = `$${(selectedPrice * (cartCount || 1)).toFixed(2)}`;
    if (cartItemImg) {
      if (activeProduct === 'rose') {
        cartItemImg.style.backgroundImage = "url('assets/bellavita-rose-woman-cutout.png')";
        cartItemImg.style.backgroundSize = "contain";
        cartItemImg.style.backgroundColor = "#fff0f3";
      } else if (activeProduct === 'white_oud') {
        cartItemImg.style.backgroundImage = "url('assets/bellavita-white-oud-thumb.png')";
        cartItemImg.style.backgroundSize = "contain";
        cartItemImg.style.backgroundColor = "#f8fafc";
      } else if (activeProduct === 'honey_oud') {
        cartItemImg.style.backgroundImage = "url('assets/bellavita-honey-oud-thumb.png')";
        cartItemImg.style.backgroundSize = "contain";
        cartItemImg.style.backgroundColor = "#fffbeb";
      } else {
        cartItemImg.style.backgroundImage = "url('frames/ezgif-frame-001.jpg')";
        cartItemImg.style.backgroundSize = "cover";
        cartItemImg.style.backgroundColor = "#f0e2d5";
      }
    }
  }

  // =========================================================================
  // 9. EVENT LISTENERS & INITIALIZATION
  // =========================================================================

  function handleMouseMove(e) {
    const w = window.innerWidth;
    const h = window.innerHeight;

    mouseState.rawX = e.clientX;
    mouseState.rawY = e.clientY;

    const prevTargetX = mouseState.targetX;
    const prevTargetY = mouseState.targetY;

    mouseState.targetX = (e.clientX / w - 0.5) * 2;
    mouseState.targetY = (e.clientY / h - 0.5) * 2;

    mouseState.vx = mouseState.targetX - prevTargetX;
    mouseState.vy = mouseState.targetY - prevTargetY;

    if (cursorGlow) {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    }

    if (isMagnifierActive) {
      updateMagnifierPosition(e);
    }
  }

  function handleTouch(e) {
    if (e.touches && e.touches.length > 0) {
      const touch = e.touches[0];
      handleMouseMove({
        clientX: touch.clientX,
        clientY: touch.clientY
      });
    }
  }

  window.addEventListener('mousemove', handleMouseMove, { passive: true });
  window.addEventListener('touchmove', handleTouch, { passive: true });
  window.addEventListener('touchstart', handleTouch, { passive: true });

  // Gyroscopic Tilt Parallax for Mobile & Tablet Devices
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', (e) => {
      if (e.gamma !== null && e.beta !== null) {
        const targetX = Math.max(-1, Math.min(1, e.gamma / 25));
        const targetY = Math.max(-1, Math.min(1, (e.beta - 40) / 25));
        mouseState.targetX = targetX;
        mouseState.targetY = targetY;
      }
    }, { passive: true });
  }

  window.addEventListener('resize', resizeAllCanvases);

  // =========================================================================
  // 10. EDITORIAL REVIEWS & SLOT ANIMATIONS CONTROLLER
  // =========================================================================

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, m => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    })[m]);
  }

  function syncEditorialSlot(productId) {
    // 1. Sync pill nav
    document.querySelectorAll('.editorial-slot-pill').forEach(pill => {
      pill.classList.toggle('active', pill.getAttribute('data-slot') === productId);
    });

    // 2. Sync showcase cards
    document.querySelectorAll('.editorial-slot-card').forEach(card => {
      card.classList.toggle('active', card.id === `editorial-card-${productId}`);
    });
  }

  function setupEditorialReviews() {
    // 1. Slot Pill Click Handler
    const slotPills = document.querySelectorAll('.editorial-slot-pill');
    slotPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const slot = pill.getAttribute('data-slot');
        if (slot) {
          switchProduct(slot);
        }
      });
    });

    // 2. Hero Smooth Scroll-Down Indicator Button
    const heroScrollBtn = document.getElementById('hero-scroll-btn');
    if (heroScrollBtn) {
      heroScrollBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSec = document.getElementById('editorial-reviews-section');
        if (targetSec) {
          targetSec.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // 3. "Find Your Signature Scent" Buttons inside editorial cards
    document.querySelectorAll('[data-action="explore-slot"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const slot = btn.getAttribute('data-product');
        if (slot) {
          switchProduct(slot);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          const prod = PRODUCTS[slot] || PRODUCTS.blush;
          showToast(`⚜ Now exploring ${prod.title} in the Royal Atelier`);
        }
      });
    });

    // 4. "Order / Quick Add" inside bottom-right corner badge
    document.querySelectorAll('[data-action="quick-add"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const slot = btn.getAttribute('data-product');
        if (slot && PRODUCTS[slot]) {
          switchProduct(slot);
          cartCount++;
          updateCartDisplay();
          const cartDrawer = document.getElementById('cart-drawer-backdrop');
          if (cartDrawer) {
            cartDrawer.classList.add('open');
          }
          showToast(`👑 ${PRODUCTS[slot].title} added to Luxury Bag`);
        }
      });
    });

    // 5. Scrolled Navbar Backdrop State
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    }, { passive: true });

    // 6. Write a Royal Review Modal Controller
    setupReviewModal();
  }

  function setupReviewModal() {
    const modalBackdrop = document.getElementById('review-modal-backdrop');
    const openBtn = document.getElementById('btn-open-review-modal');
    const form = document.getElementById('royal-review-form');
    const starPicker = document.getElementById('review-star-picker');
    const ratingValInput = document.getElementById('review-rating-value');
    const ratingFeedback = document.getElementById('rating-text-feedback');

    if (!modalBackdrop) return;

    const ratingDescriptions = {
      1: '1.0 / 5.0 · Subtle Scent Profile',
      2: '2.0 / 5.0 · Pleasant Floral Accord',
      3: '3.0 / 5.0 · Delightful Sillage',
      4: '4.0 / 5.0 · Highly Commended Luxury',
      5: '5.0 / 5.0 · Sovereign Excellence'
    };

    if (openBtn) {
      openBtn.addEventListener('click', () => {
        const select = document.getElementById('review-slot-select');
        if (select && activeProduct) {
          select.value = activeProduct;
        }
        modalBackdrop.classList.add('open');
      });
    }

    // Star Rating Interactivity
    if (starPicker) {
      const stars = starPicker.querySelectorAll('span');
      stars.forEach((star, index) => {
        star.addEventListener('mouseenter', () => {
          stars.forEach((s, i) => s.classList.toggle('hovered', i <= index));
        });

        star.addEventListener('mouseleave', () => {
          stars.forEach(s => s.classList.remove('hovered'));
        });

        star.addEventListener('click', () => {
          const rating = index + 1;
          if (ratingValInput) ratingValInput.value = rating;
          stars.forEach((s, i) => s.classList.toggle('active', i < rating));
          if (ratingFeedback) {
            ratingFeedback.textContent = ratingDescriptions[rating] || `${rating}.0 / 5.0`;
          }
        });
      });
    }

    // Form Submission
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const slot = document.getElementById('review-slot-select').value;
        const rating = parseInt(ratingValInput ? ratingValInput.value : '5', 10);
        const name = document.getElementById('review-author-name').value.trim();
        const loc = document.getElementById('review-author-location').value.trim() || 'Global Patron';
        const headline = document.getElementById('review-headline').value.trim();
        const body = document.getElementById('review-body').value.trim();

        const starsStr = '★'.repeat(rating) + '☆'.repeat(5 - rating);
        const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'RP';

        const slotLabels = {
          blush: 'BLUSH',
          rose: 'ROSÉ WOMAN',
          white_oud: 'WHITE OUD',
          honey_oud: 'HONEY OUD'
        };

        // Add to Continuous Marquee Track
        const marqueeTrack = document.getElementById('reviews-marquee-track');
        if (marqueeTrack) {
          const card = document.createElement('div');
          card.className = 'marquee-review-card';
          card.innerHTML = `
            <div class="marquee-card-top">
              <div class="marquee-stars">${starsStr}</div>
              <span class="marquee-slot-tag">${slotLabels[slot] || 'BELLAVITA'}</span>
            </div>
            <h4 class="marquee-card-title">${escapeHtml(headline)}</h4>
            <p class="marquee-card-body">"${escapeHtml(body)}"</p>
            <div class="marquee-card-footer">
              <div class="marquee-author-box">
                <div class="marquee-avatar">${initials}</div>
                <div class="marquee-author-meta">
                  <span class="marquee-author-name">${escapeHtml(name)}</span>
                  <span class="marquee-author-loc">${escapeHtml(loc)}</span>
                </div>
              </div>
              <span class="marquee-verified-pill">✓ Verified</span>
            </div>
          `;
          marqueeTrack.insertBefore(card, marqueeTrack.firstChild);
        }

        // Update the slot testimonial box
        const slotTestimonial = document.getElementById(`testimonial-${slot}`);
        if (slotTestimonial) {
          const quote = slotTestimonial.querySelector('.testimonial-quote');
          const author = slotTestimonial.querySelector('.author-name');
          const stars = slotTestimonial.querySelector('.testimonial-stars');
          if (quote) quote.textContent = `"${body}"`;
          if (author) author.textContent = name;
          if (stars) stars.textContent = starsStr;
        }

        // Switch to that slot so the customer sees their review instantly
        switchProduct(slot);

        playRoyalChime();
        showToast(`👑 Royal Review Published! Thank you, ${name}.`);

        form.reset();
        modalBackdrop.classList.remove('open');
      });
    }
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    resizeAllCanvases();
    startFramePreloading();
    setupModalsAndDrawers();
    setupEditorialReviews();
    requestAnimationFrame(updateAnimationLoop);
  });

})();

