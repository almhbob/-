import { Router } from "express";

export const driversRouter = Router();

const drivers = [
  { id: "driver_1", name: "محمد أحمد", vehicle: "ركشة زرقاء", rating: 4.8, isOnline: true, zone: "السوق" },
  { id: "driver_2", name: "علي الطيب", vehicle: "ركشة صفراء", rating: 4.7, isOnline: true, zone: "المستشفى" }
];

driversRouter.get("/", (_req, res) => {
  res.json(drivers);
});

driversRouter.patch("/:id/online", (req, res) => {
  const driver = drivers.find((d) => d.id === req.params.id);
  if (!driver) return res.status(404).json({ error: "Driver not found" });

  driver.isOnline = Boolean(req.body.isOnline);
  res.json(driver);
});
