import express from "express"
import bodyParser from "body-parser"
import viewEngine from "./config/viewEngine"
import initWebRoute from "./route/web"
require("dotenv").config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoute(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});