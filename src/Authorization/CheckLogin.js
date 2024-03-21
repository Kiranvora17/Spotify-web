import GetRefreshToken from "./RefreshToken";

const CheckLogin = (url) => {
  const timeStamp = localStorage.getItem("time_stamp");
  const difference = Date.now() - timeStamp;

  const generateToken = async () => {
    await GetRefreshToken();
    localStorage.setItem("time_stamp", Date.now());
  };

  if (difference <= 3500000) {
    return url;
  } else if (difference > 3500000 && difference < 3600000) {
    generateToken();
  } else {
    return `/login`;
  }
  return url;
};

export default CheckLogin;
