import { createApi } from "unsplash-js";
import axios from "axios";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

export const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "coffee shop",
    perPage: 30,
  });
  const unsplashResults = photos.response.results;

  return unsplashResults.map((result) => result.urls["small"]);
};

export const fetchCoffeeStores = async (latLong = "37.7762724, -122.4424523", limit = 6) => {
  const photos = await getListOfCoffeeStorePhotos();
  const res = await axios.get(getUrlForCoffeeStores(latLong, "coffee", `${limit}`), {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  });

  const fetchedData = res.data.results.map((result, idx) => {
    return {
      id: result.fsq_id,
      address: result.location.address,
      neighborhood: result.location.neighborhood?.length > 0 ? result.location.neighborhood[0] : "",
      name: result.name,
      imgUrl: photos.length > 0 ? photos[idx] : null,
    };
  });

  return fetchedData;
};

const getUrlForCoffeeStores = (latLong, query, limit) => {
  const actualLatLong = latLong.replace(", ", "%2C");
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${actualLatLong}&limit=${limit}`;
};
