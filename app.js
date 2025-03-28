const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swaggerDocs");

const userRoute = require("./routes/user.route");
const taskRoute = require("./routes/task.route");

dotenv.config();
mongoose.connect(process.env.MONGODB_URI);
const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/user", userRoute);
app.use("/api/task", taskRoute);

const port = process.env.HOST || 3002;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
