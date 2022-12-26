import { createApi } from "unsplash-js";
import axios from "axios";

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

export const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "coffee shop",
    perPage: 30,
  });
  const unsplashResults = photos.response.results;

  return unsplashResults.map((result) => result.urls["small"]);
};

export const fetchCoffeeStores = async () => {
  const photos = await getListOfCoffeeStorePhotos();
  const res = await axios.get(getUrlForCoffeeStores("37.787, -122.426", "coffee", "6"), {
    headers: {
      Authorization: process.env.FOURSQUARE_API_KEY,
    },
  });

  return res.data.results.map((result, idx) => {
    return {
      id: result.fsq_id,
      address: result.location.address,
      neighborhood: result.location.neighborhood.length > 0 ? result.location.neighborhood[0] : "",
      name: result.name,
      imgUrl: photos.length > 0 ? photos[idx] : null,
    };
  });
};

const getUrlForCoffeeStores = (latLong, query, limit) => {
  const actualLatLong = latLong.replace(", ", "%2C");
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${actualLatLong}&limit=${limit}`;
};
