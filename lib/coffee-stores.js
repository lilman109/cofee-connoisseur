import axios from 'axios';

export const fetchCoffeeStores = async () => {
	const res = await axios.get(
		getUrlForCoffeeStores('37.787, -122.426', 'coffee', '6'),
		{
			headers: {
				Authorization: process.env.FOURSQUARE_API_KEY,
			},
		}
	);

	return res.data.results;
};

const getUrlForCoffeeStores = (latLong, query, limit) => {
	const actualLatLong = latLong.replace(', ', '%2C');
	return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${actualLatLong}&limit=${limit}`;
};
