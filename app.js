<<<<<<< Updated upstream
import express from "express";
import logger from "morgan";
import cors from "cors";
import "dotenv/config";
import waterTrackRouter from "./routes/api/water-track-routers.js";
import usersRouter from "./routes/api/users-routers.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: "json" };

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(express.static('public'));

app.use("/users", usersRouter);
app.use("/api/water-track", waterTrackRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  console.log(err);
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({
    message,
  });
});

export default app;
