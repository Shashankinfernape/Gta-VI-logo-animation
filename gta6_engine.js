/**
 * GTA VI Trailer Logo Reveal - 100% Accurate Source Code Engine
 * Focused exclusively on the iconic Roman Numeral "VI"
 * 
 * Timeline & Glow Science:
 * 1. Pitch Black Void (0.00s - 0.30s)
 * 2. Neon Outline Strike & Downward Shadow Wipe (0.30s - 1.40s)
 * 3. Peak Glow Plateau & Interior Palms Power-On (1.40s - 2.70s)
 * 4. Glow-Out Phase (2.70s - 4.10s) with S-curve cosine decay
 * 5. Complete Glow Stop & Unobstructed VI Master Lockup (4.10s - 9.10s)
 */

class Gta6AnimationEngine {
  constructor(canvasId, audioId, videoId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d', { alpha: false });
    this.audio = document.getElementById(audioId);
    this.sourceVideo = document.getElementById(videoId);

    // Canvas native resolution (matches original MP4 1080p)
    this.width = 1920;
    this.height = 1080;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    // Timeline state
    this.duration = 9.10; // exact seconds
    this.currentTime = 0;
    this.isPlaying = false;
    this.playbackRate = 1.0;
    this.lastTimestamp = null;
    this.animationFrameId = null;

    // Mode: Focused exclusively on VI
    this.showGtaText = false;

    // Assets container
    this.assets = {
      neonGlow: new Image(),
      viBase: new Image(),
      gtaText: new Image(),
      coming2025: new Image()
    };

    this.assetsLoaded = false;
    this.totalAssets = 4;
    this.loadedAssetsCount = 0;

    // Callbacks
    this.onTimeUpdate = null;
    this.onStateChange = null;

    // Initialize
    this.loadAssets();
    this.setupAudio();
  }

  loadAssets() {
    const assetSources = {
      neonGlow: 'assets/vi_neon_clean.png',
      viBase: 'assets/vi_full_unobstructed.png',
      gtaText: 'assets/gta_text_logo.png',
      coming2025: 'assets/coming_2025_clean.png'
    };

    for (const [key, src] of Object.entries(assetSources)) {
      this.assets[key].onload = () => {
        this.loadedAssetsCount++;
        if (this.loadedAssetsCount >= this.totalAssets) {
          this.assetsLoaded = true;
          this.renderFrame(this.currentTime);
          if (this.onStateChange) this.onStateChange('ready');
        }
      };
      this.assets[key].src = src;
    }
  }

  setupAudio() {
    if (this.audio) {
      this.audio.src = 'audio.mp3';
      this.audio.preload = 'auto';
    }
  }

  play() {
    if (this.currentTime >= this.duration) {
      this.currentTime = 0;
    }
    this.isPlaying = true;
    this.lastTimestamp = performance.now();

    if (this.audio) {
      this.audio.currentTime = this.currentTime;
      this.audio.playbackRate = this.playbackRate;
      this.audio.play().catch(e => console.log('Audio autoplay policy caught:', e));
    }

    if (this.sourceVideo) {
      this.sourceVideo.currentTime = this.currentTime;
      this.sourceVideo.playbackRate = this.playbackRate;
      this.sourceVideo.play().catch(e => console.log('Video autoplay caught:', e));
    }

    this.tick = this.tick.bind(this);
    this.animationFrameId = requestAnimationFrame(this.tick);

    if (this.onStateChange) this.onStateChange('playing');
  }

  pause() {
    this.isPlaying = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    if (this.audio) {
      this.audio.pause();
    }

    if (this.sourceVideo) {
      this.sourceVideo.pause();
    }

    if (this.onStateChange) this.onStateChange('paused');
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  seek(seconds) {
    this.currentTime = Math.max(0, Math.min(this.duration, seconds));

    if (this.audio) {
      this.audio.currentTime = this.currentTime;
    }

    if (this.sourceVideo) {
      this.sourceVideo.currentTime = this.currentTime;
    }

    this.renderFrame(this.currentTime);

    if (this.onTimeUpdate) {
      this.onTimeUpdate(this.currentTime, this.duration);
    }
  }

  setSpeed(rate) {
    this.playbackRate = rate;
    if (this.audio) this.audio.playbackRate = rate;
    if (this.sourceVideo) this.sourceVideo.playbackRate = rate;
  }

  setShowGtaText(show) {
    this.showGtaText = show;
    this.renderFrame(this.currentTime);
  }

  tick(timestamp) {
    if (!this.isPlaying) return;

    const delta = (timestamp - this.lastTimestamp) / 1000;
    this.lastTimestamp = timestamp;

    this.currentTime += delta * this.playbackRate;

    // Adjust audio drift
    if (this.audio && !this.audio.paused && Math.abs(this.audio.currentTime - this.currentTime) > 0.15) {
      this.currentTime = this.audio.currentTime;
    }

    if (this.currentTime >= this.duration) {
      this.currentTime = this.duration;
      this.renderFrame(this.currentTime);
      this.pause();
      if (this.onTimeUpdate) this.onTimeUpdate(this.currentTime, this.duration);
      return;
    }

    this.renderFrame(this.currentTime);

    if (this.onTimeUpdate) {
      this.onTimeUpdate(this.currentTime, this.duration);
    }

    this.animationFrameId = requestAnimationFrame(this.tick);
  }

  /**
   * Glow Science Lifecycle function G(t)
   * 0.00s <= t < 0.30s: 0.000 (Pure Black Void)
   * 0.30s <= t < 1.40s: Glow Growth (sinusoidal ramp 0 -> 1)
   * 1.40s <= t < 2.70s: 1.000 (Peak Glow Plateau)
   * 2.70s <= t < 4.10s: Glow-Out Phase (cosine decay 1 -> 0)
   * t >= 4.10s: 0.000 (Stop Process: Complete Glow Termination)
   */
  getGlowIntensity(t) {
    if (t < 0.30) {
      return 0.0;
    } else if (t < 1.40) {
      const p = (t - 0.30) / (1.40 - 0.30);
      return Math.sin(p * Math.PI * 0.5);
    } else if (t < 2.70) {
      return 1.0;
    } else if (t < 4.10) {
      const p = (t - 2.70) / (4.10 - 2.70);
      return 0.5 * (1 + Math.cos(p * Math.PI));
    } else {
      return 0.0;
    }
  }

  /**
   * Main 60fps frame rendering pipeline focused on the Roman Numeral "VI"
   */
  renderFrame(t) {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    // 1. Clear entire canvas to pure pitch black (#000000)
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, w, h);

    if (!this.assetsLoaded) return;

    // PHASE 1: Pitch Black Silence (0.00s <= t < 0.30s)
    if (t < 0.30) {
      return;
    }

    // PHASE 2 & 3: GLOW SCIENCE (0.30s <= t < 4.10s)
    const glowAlpha = this.getGlowIntensity(t);

    if (glowAlpha > 0.001) {
      ctx.save();
      ctx.globalAlpha = glowAlpha;

      // Draw the neon outline with volumetric god rays
      ctx.drawImage(this.assets.neonGlow, 0, 0, w, h);

      // Downward shadow mask (0.30s <= t < 1.65s)
      if (t < 1.65) {
        const p = Math.max(0, Math.min(1.0, (t - 0.30) / (1.65 - 0.30)));
        const yStart = 340 + p * 530; // 340px down to 870px
        const yEnd = yStart + 110;    // 450px down to 980px

        // Soft shadow gradient cutoff
        const shadowGrad = ctx.createLinearGradient(0, yStart, 0, yEnd);
        shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
        shadowGrad.addColorStop(0.35, 'rgba(0, 0, 0, 0.45)');
        shadowGrad.addColorStop(0.75, 'rgba(0, 0, 0, 0.92)');
        shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 1)');

        ctx.fillStyle = shadowGrad;
        ctx.fillRect(0, yStart, w, yEnd - yStart);

        // Pitch black below yEnd
        if (yEnd < h) {
          ctx.fillStyle = '#000000';
          ctx.fillRect(0, yEnd, w, h - yEnd);
        }
      }
      ctx.restore();
    }

    // PHASE 3 & 4 & 5: Interior Sunset Gradient & Silhouetted Palm Trees (t >= 1.70s)
    // Renders the full, unobstructed VI emblem with zero text interference
    if (t >= 1.70) {
      const p = Math.min(1.0, (t - 1.70) / 1.50); // fades in from 1.70s to 3.20s
      const viAlpha = p * p * (3 - 2 * p); // smoothstep
      ctx.save();
      ctx.globalAlpha = viAlpha;
      ctx.drawImage(this.assets.viBase, 0, 0, w, h);
      ctx.restore();
    }

    // OPTIONAL: GTA Text & Subtitle Reveal (only if user explicitly enables toggle)
    if (this.showGtaText) {
      if (t >= 3.80) {
        const scanStart = 3.80;
        const scanEnd = 5.75;
        const textTop = 265;
        const textBottom = 715;
        const textHeight = textBottom - textTop;

        if (t < scanEnd) {
          const progress = Math.min(1.0, (t - scanStart) / (scanEnd - scanStart));
          const currentY = textTop + progress * textHeight;

          ctx.save();
          ctx.beginPath();
          ctx.rect(0, 0, w, currentY);
          ctx.clip();
          ctx.drawImage(this.assets.gtaText, 0, 0, w, h);
          ctx.restore();

          this.drawLaserScanline(ctx, currentY, progress);
        } else {
          ctx.save();
          ctx.drawImage(this.assets.gtaText, 0, 0, w, h);
          ctx.restore();

          if (t >= 5.75 && t < 5.90) {
            const flareP = 1.0 - (t - 5.75) / 0.15;
            ctx.save();
            ctx.globalCompositeOperation = 'lighter';
            ctx.globalAlpha = flareP * 0.35;
            ctx.fillStyle = '#ff7ef0';
            ctx.fillRect(660, 260, 660, 460);
            ctx.restore();
          }
        }
      }

      if (t >= 6.05) {
        let comingAlpha = 0;
        if (t >= 6.05 && t < 6.35) {
          comingAlpha = (t - 6.05) / 0.30;
        } else {
          comingAlpha = 1.0;
        }
        ctx.save();
        ctx.globalAlpha = Math.min(1.0, comingAlpha);
        ctx.drawImage(this.assets.coming2025, 0, 0, w, h);
        ctx.restore();
      }
    }
  }

  /**
   * Laser scanline helper (used when text overlay is toggled on)
   */
  drawLaserScanline(ctx, y, progress) {
    const leftX = 640;
    const rightX = 1330;
    const beamWidth = rightX - leftX;
    const centerX = (leftX + rightX) / 2;

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';

    const gradBroad = ctx.createRadialGradient(centerX, y, 10, centerX, y, 400);
    gradBroad.addColorStop(0, 'rgba(236, 28, 135, 0.45)');
    gradBroad.addColorStop(0.3, 'rgba(200, 20, 150, 0.20)');
    gradBroad.addColorStop(0.7, 'rgba(120, 10, 140, 0.08)');
    gradBroad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradBroad;
    ctx.fillRect(leftX - 100, y - 45, beamWidth + 200, 90);

    const gradBeam = ctx.createLinearGradient(leftX, y, rightX, y);
    gradBeam.addColorStop(0, 'rgba(255, 120, 200, 0)');
    gradBeam.addColorStop(0.15, 'rgba(255, 45, 140, 0.9)');
    gradBeam.addColorStop(0.5, 'rgba(255, 230, 255, 1.0)');
    gradBeam.addColorStop(0.85, 'rgba(255, 45, 140, 0.9)');
    gradBeam.addColorStop(1, 'rgba(255, 120, 200, 0)');

    ctx.fillStyle = gradBeam;
    ctx.fillRect(leftX, y - 3, beamWidth, 6);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(leftX + 40, y - 1, beamWidth - 80, 2);

    ctx.restore();
  }
}

// Export for usage in window or modules
window.Gta6AnimationEngine = Gta6AnimationEngine;
