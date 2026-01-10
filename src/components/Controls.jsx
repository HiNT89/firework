import React from "react";

function Controls({
  paused,
  soundEnabled,
  hideControls,
  onPause,
  onSound,
  onSettings,
  pauseBtnIcon,
  soundBtnIcon,
}) {
  return (
    <div className={`controls ${hideControls ? "hide" : ""}`}>
      <div className="btn pause-btn" onClick={() => onPause()}>
        <svg fill="white" width="24" height="24">
          <use
            href={`#icon-${pauseBtnIcon}`}
            xlinkHref={`#icon-${pauseBtnIcon}`}
          ></use>
        </svg>
      </div>
      <div className="btn sound-btn" onClick={() => onSound()}>
        <svg fill="white" width="24" height="24">
          <use
            href={`#icon-${soundBtnIcon}`}
            xlinkHref={`#icon-${soundBtnIcon}`}
          ></use>
        </svg>
      </div>
      <div className="btn settings-btn" onClick={() => onSettings()}>
        <svg fill="white" width="24" height="24">
          <use href="#icon-settings" xlinkHref="#icon-settings"></use>
        </svg>
      </div>
    </div>
  );
}

export default Controls;
