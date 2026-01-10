import { useState, useEffect } from "react";

export function useStore(initialState) {
  const [state, setState] = useState(() => {
    // Load from localStorage
    const serializedData = localStorage.getItem("cm_fireworks_data");
    if (serializedData) {
      try {
        const { schemaVersion, data } = JSON.parse(serializedData);
        if (schemaVersion === "1.2") {
          return {
            ...initialState,
            config: {
              ...initialState.config,
              quality: data.quality,
              size: data.size,
              skyLighting: data.skyLighting,
              scaleFactor: data.scaleFactor,
            },
          };
        }
      } catch (e) {
        console.error("Error loading saved config:", e);
      }
    }
    return initialState;
  });

  // Persist to localStorage
  useEffect(() => {
    const config = state.config;
    localStorage.setItem(
      "cm_fireworks_data",
      JSON.stringify({
        schemaVersion: "1.2",
        data: {
          quality: config.quality,
          size: config.size,
          skyLighting: config.skyLighting,
          scaleFactor: config.scaleFactor,
        },
      })
    );
  }, [state.config]);

  const togglePause = (toggle) => {
    setState((prev) => ({
      ...prev,
      paused: typeof toggle === "boolean" ? toggle : !prev.paused,
    }));
  };

  const toggleSound = (toggle) => {
    setState((prev) => ({
      ...prev,
      soundEnabled: typeof toggle === "boolean" ? toggle : !prev.soundEnabled,
    }));
  };

  const toggleMenu = (toggle) => {
    setState((prev) => ({
      ...prev,
      menuOpen: typeof toggle === "boolean" ? toggle : !prev.menuOpen,
    }));
  };

  const updateConfig = (nextConfig) => {
    setState((prev) => ({
      ...prev,
      config: { ...prev.config, ...nextConfig },
    }));
  };

  const toggleFullscreen = () => {
    if (document.fullscreenEnabled) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        document.documentElement.requestFullscreen();
      }
    }
  };

  const setHelpTopic = (topic) => {
    setState((prev) => ({
      ...prev,
      openHelpTopic: topic,
    }));
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setState((prev) => ({
        ...prev,
        fullscreen: !!document.fullscreenElement,
      }));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return {
    state,
    togglePause,
    toggleSound,
    toggleMenu,
    updateConfig,
    toggleFullscreen,
    setHelpTopic,
  };
}
