import express from "express";
import { AppDataSource } from "./config/data-source";
import { json } from "body-parser";

import busRoutes from "./routes/busRoutes";
import stopRoutes from "./routes/StopRoutes";
import routeRoutes from "./routes/routeRoutes";
import scheduleRoutes from "./routes/scheduleRoutes";



const app = express();
app.use(json());

app.use("/api/buses", busRoutes);
app.use("/api/stops", stopRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/schedules", scheduleRoutes);




const PORT = process.env.PORT || 4000;

AppDataSource.initialize()
    .then(() => {
        console.log("✅ Data Source initialized");

        app.get("/", (_req, res) => {
            res.send("🚌 API is running");
        });

        app.listen(PORT, () => {
            console.log(`🚀 Server on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ Data Source error:", err);
    });
