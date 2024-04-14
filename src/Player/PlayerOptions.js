import classes from "./PlayerOptions.module.css";

import queue from "../images/queue.png";
import devices from "../images/device.png";
import fullScreen from "../images/full-screen.png";

import queueActive from "../images/queue-active.png";
import devicesActiove from "../images/device-active.png";
import { useEffect, useState } from "react";
import Devices from "../PlayerComponents/Device";
import useAvailableDevice from "../Hooks/AvailableDevice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const PlayerOptions = () => {
  const currentDevice = localStorage.getItem("current_device");
  const activeDevice = useSelector((state) => state.player.activeDevice);
  const [isActiveDevice, setIsActiveDevice] = useState(false);
  const [isActiveQueue, setIsActiveQueue] = useState(false);
  const [loading, device] = useAvailableDevice(isActiveDevice);
  const modal = document.getElementById("modal");
  const navigate = useNavigate();

  useEffect(() => {
    if(window.location.pathname === '/queue') {
      setIsActiveQueue(true);
    } else {
      setIsActiveQueue(false);
    }
  }, [window.location.pathname]);

  window.onclick = function (event) {
    if (modal !== event.target.offsetParent && isActiveDevice) {
      setIsActiveDevice(false);
    }
  };

  const showDeviceHandler = () => {
    setIsActiveDevice(!isActiveDevice);
  };

  const showQueueHandler = () => {
    if(!isActiveQueue) {
      navigate('/queue');
      setIsActiveQueue(!isActiveQueue);
    } else {
      navigate(-1);
      setIsActiveQueue(!isActiveQueue);
    }
  }

  return (
    <>
      <div className={classes.container}>
        <img onClick={(e) => {
          e.stopPropagation();
          showQueueHandler();
        }} src={isActiveQueue ? queueActive : queue}></img>
        <img
          onClick={(e) => {
            e.stopPropagation();
            showDeviceHandler();
          }}
          className={classes.device}
          src={
            isActiveDevice || activeDevice !== currentDevice
              ? devicesActiove
              : devices
          }
        ></img>
        <img src={fullScreen}></img>
      </div>
      <modal
        id="modal"
        className={
          isActiveDevice
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
