# GTA VI Logo Animation — MP4 to Source Code Reconstructor

A 100% accurate, high-performance HTML5 Canvas & WebGL reverse-engineered recreation of the official **Grand Theft Auto VI** reveal logo animation (1080p Full HD @ 60 FPS, with synchronized audio).

---

## 🌟 Features

* **Pure Roman Numeral "VI" Focus:**
  * Exact reproduction of the iconic Vice City / Miami sunset gradient (Indigo &rarr; Fuchsia &rarr; Golden Amber).
  * High-fidelity silhouetted tropical palm tree fronds through both the "V" and the "I".
  * Double-stroke borders: `#5e0d7c` (royal violet outer) and `#fca311` (neon gold inner).
* **Accurate Glow Science Lifecycle:**
  * **Phase 1 (0.00s &ndash; 0.30s):** Pitch black silence (`#000000`).
  * **Phase 2 (0.30s &ndash; 1.40s):** Neon outline strike with a downward shadow mask wipe ($Y=340\text{px} \to 870\text{px}$) and volumetric god rays radiating into the dark void.
  * **Phase 3 (1.40s &ndash; 2.70s):** Peak glow plateau while the interior sunset gradient smoothly illuminates from pitch black.
  * **Phase 4 (2.70s &ndash; 4.10s):** Glow-Out phase with smooth cosine S-curve bloom dissipation.
  * **Phase 5 (4.10s &ndash; 9.10s):** Glow Stop Process & Unobstructed Master VI Lockup against pure `#000000` black.
* **Evaluation & Comparison Suite:**
  * **Pure VI View:** Full-screen 60 FPS Canvas rendering.
  * **Side-by-Side View:** Runs the original `logo.mp4` video side-by-side with the code engine in lockstep.
  * **Diff Parity Mode:** Overlays the video and code engine using difference blending.
  * **Transport Deck:** Scrubber (0.01s precision), frame stepping (`-1 Frame`, `+1 Frame`), playback speeds (`0.25x` to `2.0x`), audio toggle, and fullscreen.
  * **Optional GTA Text Overlay:** Toggle button to inspect with or without the 3-line "grand theft auto" laser wipe.

---

## 🚀 Quick Start

### Option 1: Double-Click Launcher (Windows)
Double-click `start_server.bat` to launch the local HTTP server and automatically open the application in your browser.

### Option 2: Python HTTP Server
```bash
python -m http.server 8085
```
Then navigate to: **[http://localhost:8085](http://localhost:8085)**

### Option 3: Standalone File
Open `standalone_animation.html` directly in any modern web browser.

---

## 🛠️ Project Structure

```
├── assets/
│   ├── vi_full_unobstructed.png   # Unobstructed 1080p master Roman Numeral VI
│   ├── vi_neon_clean.png          # High-resolution neon outline & god rays
│   ├── gta_text_logo.png          # Transparent 3-line GTA title logo
│   └── coming_2025_clean.png      # "COMING 2025" subtitle asset
├── audio.mp3                      # Synced audio track (Tom Petty - Love Is A Long Road)
├── gta6_engine.js                 # 60 FPS animation engine & glow science lifecycle
├── index.html                     # Interactive multi-view evaluation suite
├── standalone_animation.html      # Zero-dependency standalone player
├── styles.css                     # Dark neon theme & responsive 16:9 layout
├── start_server.bat               # Windows quick-launcher script
└── logo.mp4                       # Ground-truth source video for side-by-side verification
```

---

## 📄 License
MIT
