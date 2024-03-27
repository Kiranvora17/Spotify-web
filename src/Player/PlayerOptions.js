import classes from "./PlayerOptions.module.css";

import queue from "../images/queue.png";
import devices from "../images/device.png";
import fullScreen from "../images/full-screen.png";

import queueActive from "../images/queue-active.png";
import devicesActiove from "../images/device-active.png";
import { useState } from "react";
import Devices from "../PlayerComponents/Device";
import useAvailableDevice from "../Hooks/AvailableDevice";
import { useSelector } from "react-redux";

const PlayerOptions = () => {
  const currentDevice = localStorage.getItem("current_device");
  const activeDevice = useSelector((state) => state.player.activeDevice);
  const [isActive, setIsActive] = useState(false);
  const [loading, device] = useAvailableDevice(isActive);
  const modal = document.getElementById("modal");

  window.onclick = function (event) {
    if (modal !== event.target.offsetParent && isActive) {
      setIsActive(false);
    }
  };

  const showDeviceHandler = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <div className={classes.container}>
        <img src={queue}></img>
        <img
          onClick={(e) => {
            e.stopPropagation();
            showDeviceHandler();
          }}
          className={classes.device}
          src={
            isActive || activeDevice !== currentDevice
              ? devicesActiove
              : devices
          }
        ></img>
        <img src={fullScreen}></img>
      </div>
      <modal
        id="modal"
        className={
          isActive
            ? `${classes.dialog} ${classes.dialogActive}`
            : `${classes.dialog}`
        }
      >
        {!loading && <Devices device={device.devices} />}
      </modal>
    </>
  );
};

export default PlayerOptions;
