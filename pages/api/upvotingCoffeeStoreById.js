import { findRecordByFilter, getMinifiedRecords, table } from "../../lib/airtable";

const upvotingCoffeeStoreById = async (req, res) => {
  if (req.method === "PUT") {
    try {
      const { id } = req.body;
      if (id) {
        const records = await findRecordByFilter(id);
        if (records.length > 0) {
          const record = records[0];

          const calculateVoting = parseInt(record.votes) + 1;

          const updatedRecord = await table.update([
            {
              id: record.recordId,
              fields: {
                votes: calculateVoting,
                // "name": record.name,
                // "address": record.address,
                // "neighborhood": record.neighborhood,
                // "imgUrl": record.imgUrl,
                // "id": record.id
              },
            },
          ]);

          if (updatedRecord) {
            const minifiedRecord = getMinifiedRecords(updatedRecord)
            res.json(minifiedRecord);
          }
        } else {
          res.json({ message: "coffee store id does not exist" });
        }
      } else {
        res.json({ message: "id is missing" });
      }
    } catch (error) {
      res.status(500);
      res.json({ message: "Error upvoting coffee store", error });
    }
  }
};

export default upvotingCoffeeStoreById;
