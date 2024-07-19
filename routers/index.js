import customer from "./CustomerRouter.js";
import station from "./StationRouter.js";
import schedule from "./ScheduleRouter.js";

const initWebRoutes = (app) => {
  app.use("/api/v1/customer", customer);
  app.use("/api/v1/schedule", schedule);
  app.use("/api/v1/station", station);
}

export default initWebRoutes;