const express = require("express");
const MongoClient = require("mongodb").MongoClient;

const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./api.json");

const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.use(express.json());

app.use(cors());

app.use("/", require("./routes/user.js"));

//swagger

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//database
const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri, { useNewUrlParser: true });
client
  .connect()
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log("error connecting to mongodb", err));

//PORT Setting

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}..`);
});
