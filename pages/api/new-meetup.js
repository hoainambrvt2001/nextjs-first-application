import { MongoClient } from "mongodb";

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  // For add new meet-up data
  if (req.method === "POST") {
    // Get input data
    const data = req.body;
    try {
      // Connect to the database:
      const client = await MongoClient.connect(
        "mongodb+srv://nam_vo:Procutelaai123@cluster0.qhkda.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
      );
      // Access to the database:
      const db = client.db();
      // Access to the collection named meetups
      const meetupsCollection = db.collection("meetups");
      // Insert one new document (document is an javascript object):
      const result = await meetupsCollection.insertOne(data);
      console.log(result);
      // Close database:
      client.close();
      // Set response status:
      res.status(201).json({ message: "Meetup inserted!" });
    } catch (e) {
      console.log(e);
    }
  }
}

export default handler;
