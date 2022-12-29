import { useState } from "react";

const useTrackLocation = () => {
  const [locationMessage, setLocationMessage] = useState("");
  const [latLong, setLatLong] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isFindingLocation, setIsFindingLocation] = useState(false);

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLatLong(`${latitude},${longitude}`);
    setErrorMessage("");
    setIsFindingLocation(false);
  };

  const error = () => {
    setErrorMessage("Unable to retrieve your location.");
    setIsFindingLocation(false);
  };

  const handleTrackLocation = () => {
    setIsFindingLocation(true);

    if (!navigator.geolocation) {
      setLocationMessage("Geolocation is not supported by your browser");
    } else {
      // status.textContent = "Locating…";
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    latLong,
    handleTrackLocation,
    errorMessage,
    isFindingLocation,
  };
};

export default useTrackLocation;
