import { getMinifiedRecords, table } from "../../lib/airtable";

const createCoffeeStore = async (req, res) => {
  console.log({ req });
  if (req.method === "POST") {
    //find a record
    const { id, name, neighborhood, address, imgUrl, votes } = req.body;

    try {
      if (id) {
        const findCoffeeStoreRecords = await table
          .select({
            filterByFormula: `id="${id}"`,
          })
          .firstPage();

        if (findCoffeeStoreRecords.length !== 0) {
          const records = getMinifiedRecords(findCoffeeStoreRecords);
          res.json(records);
        } else {
          if (name) {
            //create a record
            const createRecords = await table.create([
              {
                fields: {
                  id,
                  name,
                  neighborhood,
                  address,
                  imgUrl,
                  votes,
                },
              },
            ]);
            const records = getMinifiedRecords(createRecords);
            res.json(records);
          } else {
            res.status(400);
            res.json("Missing name or id");
          }
        }
      } else {
        res.status(400);
        res.json("Missing id");
      }
    } catch (error) {
      console.log("akira error");
      res.status(500);
      res.json({ message: "Error creating or finding a store", err });
    }
  }
};

export default createCoffeeStore;
