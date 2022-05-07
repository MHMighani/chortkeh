const ToggleSwitch = ({ handleClick, active }) => {
  return (
    <div
      onClick={handleClick}
      className={`toggle-switch ${active ? "active" : ""}`}
    ></div>
  );
};

export default ToggleSwitch;
