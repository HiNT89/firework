import React, { useState, useEffect, useRef } from "react";
import Controls from "./components/Controls";
import Menu from "./components/Menu";
import HelpModal from "./components/HelpModal";
import { useStore } from "./hooks/useStore";
import { initFireworks } from "./fireworks/fireworks";

const IS_MOBILE = window.innerWidth <= 640;
const IS_DESKTOP = window.innerWidth > 800;
const IS_HEADER = IS_DESKTOP && window.innerHeight < 300;

const IS_HIGH_END_DEVICE = (() => {
  const hwConcurrency = navigator.hardwareConcurrency;
  if (!hwConcurrency) return false;
  const minCount = window.innerWidth <= 1024 ? 4 : 8;
  return hwConcurrency >= minCount;
})();

const QUALITY_LOW = 1;
const QUALITY_NORMAL = 2;
const QUALITY_HIGH = 3;
const SKY_LIGHT_NORMAL = 2;

function getDefaultScaleFactor() {
  if (IS_MOBILE) return 0.9;
  if (IS_HEADER) return 0.75;
  return 1;
}

function App() {
  const [loading, setLoading] = useState(true);
  const [loadingStatus, setLoadingStatus] = useState("Assembling Shells");
  const trailsCanvasRef = useRef(null);
  const mainCanvasRef = useRef(null);

  const {
    state,
    togglePause,
    toggleSound,
    toggleMenu,
    updateConfig,
    toggleFullscreen,
    setHelpTopic,
  } = useStore({
    paused: true,
    soundEnabled: false,
    menuOpen: false,
    openHelpTopic: null,
    fullscreen: false,
    config: {
      quality: String(IS_HIGH_END_DEVICE ? QUALITY_HIGH : QUALITY_NORMAL),
      shell: "Random",
      size: IS_DESKTOP ? "3" : IS_HEADER ? "1.2" : "2",
      autoLaunch: true,
      finale: false,
      skyLighting: SKY_LIGHT_NORMAL + "",
      hideControls: IS_HEADER,
      longExposure: false,
      scaleFactor: getDefaultScaleFactor(),
    },
  });

  useEffect(() => {
    if (trailsCanvasRef.current && mainCanvasRef.current) {
      const cleanup = initFireworks(
        trailsCanvasRef.current,
        mainCanvasRef.current,
        state,
        {
          onLoaded: () => {
            setLoading(false);
            togglePause(false);
          },
          updateConfig,
        }
      );

      return cleanup;
    }
  }, []);

  const pauseBtnIcon = state.paused ? "play" : "pause";
  const soundBtnIcon = state.soundEnabled ? "sound-on" : "sound-off";

  return (
    <div className="container">
      {/* SVG Spritesheet */}
      <div
        style={{
          height: 0,
          width: 0,
          position: "absolute",
          visibility: "hidden",
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg">
          <symbol id="icon-play" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </symbol>
          <symbol id="icon-pause" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </symbol>
          <symbol id="icon-close" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </symbol>
          <symbol id="icon-settings" viewBox="0 0 24 24">
            <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
          </symbol>
          <symbol id="icon-sound-on" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </symbol>
          <symbol id="icon-sound-off" viewBox="0 0 24 24">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
          </symbol>
        </svg>
      </div>

      {loading ? (
        <div className="loading-init">
          <div className="loading-init__header">Loading</div>
          <div className="loading-init__status">{loadingStatus}</div>
        </div>
      ) : (
        <div className={`stage-container ${loading ? "remove" : ""}`}>
          <div className={`canvas-container ${state.menuOpen ? "blur" : ""}`}>
            <canvas ref={trailsCanvasRef} id="trails-canvas"></canvas>
            <canvas ref={mainCanvasRef} id="main-canvas"></canvas>
          </div>

          <Controls
            paused={state.paused}
            soundEnabled={state.soundEnabled}
            hideControls={state.config.hideControls}
            onPause={togglePause}
            onSound={toggleSound}
            onSettings={toggleMenu}
            pauseBtnIcon={pauseBtnIcon}
            soundBtnIcon={soundBtnIcon}
          />

          <Menu
            isOpen={state.menuOpen}
            config={state.config}
            onClose={() => toggleMenu(false)}
            onConfigChange={updateConfig}
            onHelpClick={setHelpTopic}
          />

          <HelpModal
            topic={state.openHelpTopic}
            onClose={() => setHelpTopic(null)}
          />
        </div>
      )}
    </div>
  );
}

export default App;
