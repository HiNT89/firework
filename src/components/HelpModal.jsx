import React from "react";

const helpContent = {
  shellType: {
    header: "Shell Type",
    body: 'The type of firework that will be launched. Select "Random" for a nice assortment!',
  },
  shellSize: {
    header: "Shell Size",
    body: "The size of the fireworks. Modeled after real firework shell sizes, larger shells have bigger bursts with more stars, and sometimes more complex effects. However, larger shells also require more processing power and may cause lag.",
  },
  quality: {
    header: "Quality",
    body: "Overall graphics quality. If the animation is not running smoothly, try lowering the quality. High quality greatly increases the amount of sparks rendered and may cause lag.",
  },
  skyLighting: {
    header: "Sky Lighting",
    body: 'Illuminates the background as fireworks explode. If the background looks too bright on your screen, try setting it to "Dim" or "None".',
  },
  scaleFactor: {
    header: "Scale",
    body: "Allows scaling the size of all fireworks, essentially moving you closer or farther away. For larger shell sizes, it can be convenient to decrease the scale a bit, especially on phones or tablets.",
  },
  autoLaunch: {
    header: "Auto Fire",
    body: "Launches sequences of fireworks automatically. Sit back and enjoy the show, or disable to have full control.",
  },
  finaleMode: {
    header: "Finale Mode",
    body: 'Launches intense bursts of fireworks. May cause lag. Requires "Auto Fire" to be enabled.',
  },
  hideControls: {
    header: "Hide Controls",
    body: "Hides the translucent controls along the top of the screen. Useful for screenshots, or just a more seamless experience. While hidden, you can still tap the top-right corner to re-open this menu.",
  },
  longExposure: {
    header: "Open Shutter",
    body: "Experimental effect that preserves long streaks of light, similar to leaving a camera shutter open.",
  },
};

function HelpModal({ topic, onClose }) {
  if (!topic || !helpContent[topic]) return null;

  const { header, body } = helpContent[topic];

  return (
    <div className={`help-modal ${topic ? "active" : ""}`}>
      <div className="help-modal__overlay" onClick={onClose}></div>
      <div className="help-modal__dialog">
        <div className="help-modal__header">{header}</div>
        <div className="help-modal__body">{body}</div>
        <button
          type="button"
          className="help-modal__close-btn"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default HelpModal;
