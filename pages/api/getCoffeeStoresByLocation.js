import { fetchCoffeeStores } from "../../lib/coffee-stores";

const getCoffeeStoresByLocation = async (req, res) => {
  try {
    const { latLong, limit } = req.query;
    console.log("latlong", {latLong, limit})
    const response = await fetchCoffeeStores(latLong, limit);
    res.status(200);
    res.json(response);
  } catch (error) {
    console.log("There was an error", error);
    res.status(500);
    res.json({message: "Oh no! Something went wrong!"})
  }
};

export default getCoffeeStoresByLocation;
