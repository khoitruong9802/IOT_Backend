import user from "./UserRouter.js";
import station from "./StationRouter.js";
import schedule from "./ScheduleRouter.js";
import fertilizerDevice from "./FertilizerDeviceRouter.js"

const initWebRoutes = (app) => {
  app.use("/api/v1/user", user);
  app.use("/api/v1/schedule", schedule);
  app.use("/api/v1/station", station);
  app.use("/api/v1/fertilizerDevice", fertilizerDevice);
}

export default initWebRoutes;