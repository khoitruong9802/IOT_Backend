import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import initWebRoutes from "./routers/index.js"
import { connectMqtt, publishToTopic, subscribeToTopic } from "./services/MqttService.js";

import { authMiddleware } from "./middlewares/authMiddleware.js";
import { Schedule } from "./models/ScheduleModel.js";


const app = express();

dotenv.config();
const PORT = process.env.PORT;
const URI = process.env.MONGODB_URI;

// Middleware to parse JSON request bodies
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
};
app.use(cors(corsOptions));

app.get('/set-cookie', (req, res) => {
  res.cookie('refresh_token', 'your_token_here', {
    httpOnly: true,
    sameSite: 'Strict',
    path: '/'
  });
  res.send('Cookie is set');
});
app.get('/protected', (req, res) => {
  if (req.cookies.refresh_token) {
    console.log(req.cookies);
    res.send('Protected data');
  } else {
    res.status(401).send('Unauthorized');
  }
});

initWebRoutes(app);
// app.get("/", authMiddleware, (req, res) => {
//   console.log("authen ok");

//   res.json({
//     message: "get content ok"
//   })
// })

mongoose
  .connect(URI)
  .then(() => {
    console.log("Connected to mongodb");
    // Start the server
    // connectMqtt();
    // subscribeToTopic("khoitruong9802/feeds/schedules");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  })


// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// })
