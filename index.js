const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 3000;

// Middleware
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

/* 
heritage-nest
9PJRSoqYsTPzoCY5
*/

const uri =
  "mongodb+srv://heritage-nest:9PJRSoqYsTPzoCY5@firstpractice.poejscf.mongodb.net/?retryWrites=true&w=majority&appName=FirstPractice";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // Database collection
    const userCollection = client.db("heritage").collection("user");

    // Collection's routes

    // User's signup route
    app.post("/api/signUp", async (req, res) => {
      const userInfo = req.body;
      const result = await userCollection.insertOne(userInfo);
      console.log("signup result__", result);
      res.send(result);
    });

    app.get("/api/signUp", async (req, res) => {
      const result = await userCollection.findOne();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// Basic route for checking
app.get("/", (req, res) => {
  res.send("Hello Heritage-Nest!");
});

// Start server
app.listen(port, () => {
  console.log(`Heritage-back-end server running on port ${port}`);
});
