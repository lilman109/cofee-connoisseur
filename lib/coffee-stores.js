import axios from 'axios';

export const fetchCoffeeStores = async () => {
	const res = await axios.get(
		getUrlForCoffeeStores('35.57%2C139.56', 'coffee', '6'),
		{
			headers: {
				Authorization: process.env.FOURSQUARE_API_KEY,
			},
		}
	);

	return res.data.results;
};

const getUrlForCoffeeStores = (latLong, query, limit) => {
	return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};
