import { useCallback, useEffect, useState } from "react";
import computer from "../images/computer.png";
import computerActive from "../images/computer-active.png";
import smartphone from "../images/smartphone.png";
import smartphoneActive from "../images/smartphone-active.png";
import speaker from "../images/speaker.png";
import speakerActive from "../images/speaker-active.png";
import classes from "./Device.module.css";
import { useDispatch, useSelector } from "react-redux";
import { PlayerAction } from "../store/player-slice";

const Devices = (props) => {
  const activeDevice = useSelector((state) => state.player.activeDevice);
  const currentDevice = localStorage.getItem("current_device");

  return props.device.map((device) => {
    return (
      <div key={device.id} className={classes.list}>
        <img
          src={
            device.type === "Computer"
              ? device.id === activeDevice
                ? computerActive
                : computer
              : device.type === "Smartphone"
              ? device.id === activeDevice
                ? smartphoneActive
                : smartphone
              : device.type === "Speaker"
              ? device.id === activeDevice
                ? speakerActive
                : speaker
              : null
          }
        ></img>
        <div>
          <h3
            className={device.id === activeDevice ? `${classes.active}` : null}
          >
            {currentDevice === device.id ? "This Device" : device.name}
          </h3>
          <p>{device.type}</p>
        </div>
      </div>
    );
  });
};

export default Devices;
