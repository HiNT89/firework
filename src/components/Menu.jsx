import React from "react";

const shellTypes = ["Random", "Crackle", "Palm", "Ring"];
const shellSizes = [
  { value: "1", label: "Small" },
  { value: "2", label: "Normal" },
  { value: "3", label: "Large" },
  { value: "4", label: "X-Large" },
];
const qualities = [
  { value: "1", label: "Low" },
  { value: "2", label: "Normal" },
  { value: "3", label: "High" },
];
const skyLightings = [
  { value: "0", label: "None" },
  { value: "1", label: "Dim" },
  { value: "2", label: "Normal" },
];
const scaleFactors = [
  { value: "0.5", label: "0.5x" },
  { value: "0.75", label: "0.75x" },
  { value: "0.9", label: "0.9x" },
  { value: "1", label: "1x" },
  { value: "1.25", label: "1.25x" },
  { value: "1.5", label: "1.5x" },
];

function Menu({ isOpen, config, onClose, onConfigChange, onHelpClick }) {
  const handleSelectChange = (field) => (e) => {
    onConfigChange({ [field]: e.target.value });
  };

  const handleCheckboxChange = (field) => (e) => {
    onConfigChange({ [field]: e.target.checked });
  };

  return (
    <div className={`menu ${!isOpen ? "hide" : ""}`}>
      <div className="menu__inner-wrap">
        <div className="btn btn--bright close-menu-btn" onClick={onClose}>
          <svg fill="white" width="24" height="24">
            <use href="#icon-close" xlinkHref="#icon-close"></use>
          </svg>
        </div>
        <div className="menu__header">Settings</div>
        <div className="menu__subheader">For more info, click any label.</div>
        <form>
          <div className="form-option form-option--select">
            <label
              className="shell-type-label"
              onClick={() => onHelpClick("shellType")}
            >
              Shell Type
            </label>
            <select
              className="shell-type"
              value={config.shell}
              onChange={handleSelectChange("shell")}
            >
              {shellTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="form-option form-option--select">
            <label
              className="shell-size-label"
              onClick={() => onHelpClick("shellSize")}
            >
              Shell Size
            </label>
            <select
              className="shell-size"
              value={config.size}
              onChange={handleSelectChange("size")}
            >
              {shellSizes.map((size) => (
                <option key={size.value} value={size.value}>
                  {size.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-option form-option--select">
            <label
              className="quality-ui-label"
              onClick={() => onHelpClick("quality")}
            >
              Quality
            </label>
            <select
              className="quality-ui"
              value={config.quality}
              onChange={handleSelectChange("quality")}
            >
              {qualities.map((q) => (
                <option key={q.value} value={q.value}>
                  {q.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-option form-option--select">
            <label
              className="sky-lighting-label"
              onClick={() => onHelpClick("skyLighting")}
            >
              Sky Lighting
            </label>
            <select
              className="sky-lighting"
              value={config.skyLighting}
              onChange={handleSelectChange("skyLighting")}
            >
              {skyLightings.map((sl) => (
                <option key={sl.value} value={sl.value}>
                  {sl.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-option form-option--select">
            <label
              className="scaleFactor-label"
              onClick={() => onHelpClick("scaleFactor")}
            >
              Scale
            </label>
            <select
              className="scaleFactor"
              value={config.scaleFactor}
              onChange={handleSelectChange("scaleFactor")}
            >
              {scaleFactors.map((sf) => (
                <option key={sf.value} value={sf.value}>
                  {sf.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-option form-option--checkbox">
            <label
              className="auto-launch-label"
              onClick={() => onHelpClick("autoLaunch")}
            >
              Auto Fire
            </label>
            <input
              className="auto-launch"
              type="checkbox"
              checked={config.autoLaunch}
              onChange={handleCheckboxChange("autoLaunch")}
            />
          </div>

          <div className="form-option form-option--checkbox form-option--finale-mode">
            <label
              className="finale-mode-label"
              onClick={() => onHelpClick("finaleMode")}
            >
              Finale Mode
            </label>
            <input
              className="finale-mode"
              type="checkbox"
              checked={config.finale}
              onChange={handleCheckboxChange("finale")}
            />
          </div>

          <div className="form-option form-option--checkbox">
            <label
              className="hide-controls-label"
              onClick={() => onHelpClick("hideControls")}
            >
              Hide Controls
            </label>
            <input
              className="hide-controls"
              type="checkbox"
              checked={config.hideControls}
              onChange={handleCheckboxChange("hideControls")}
            />
          </div>

          <div className="form-option form-option--checkbox">
            <label
              className="long-exposure-label"
              onClick={() => onHelpClick("longExposure")}
            >
              Open Shutter
            </label>
            <input
              className="long-exposure"
              type="checkbox"
              checked={config.longExposure}
              onChange={handleCheckboxChange("longExposure")}
            />
          </div>
        </form>
        <div className="credits">
          Passionately built by{" "}
          <a
            href="https://cmiller.tech/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Caleb Miller
          </a>
          .
        </div>
      </div>
    </div>
  );
}

export default Menu;
