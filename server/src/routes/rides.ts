import { Router } from "express";
import type { Server } from "socket.io";
import { estimateFare } from "../lib/fare.js";

const rides = new Map<string, any>();

export function ridesRouter(io: Server) {
  const router = Router();

  router.get("/", (_req, res) => {
    res.json(Array.from(rides.values()).reverse());
  });

  router.post("/", (req, res) => {
    const distanceKm = Number(req.body.distanceKm || 2);
    const ride = {
      id: `ride_${Date.now()}`,
      passengerName: req.body.passengerName || "راكب جمبك",
      pickupLabel: req.body.pickupLabel || "السوق",
      destinationLabel: req.body.destinationLabel || "المستشفى",
      distanceKm,
      estimatedFare: estimateFare(distanceKm),
      status: "REQUESTED",
      createdAt: new Date().toISOString()
    };

    rides.set(ride.id, ride);
    io.emit("ride:requested", ride);
    res.status(201).json(ride);
  });

  router.patch("/:id/status", (req, res) => {
    const ride = rides.get(req.params.id);
    if (!ride) return res.status(404).json({ error: "Ride not found" });

    ride.status = req.body.status || ride.status;
    ride.driverName = req.body.driverName || ride.driverName;
    ride.updatedAt = new Date().toISOString();

    rides.set(ride.id, ride);
    io.emit(`ride:${ride.id}`, ride);
    res.json(ride);
  });

  return router;
}
