import { Router } from "express";
import { estimateFare } from "../lib/fare.js";

export const pricingRouter = Router();

pricingRouter.post("/estimate", (req, res) => {
  const distanceKm = Number(req.body.distanceKm || 2);
  const zoneMultiplier = Number(req.body.zoneMultiplier || 1);

  res.json({
    currency: "SDG",
    distanceKm,
    estimatedFare: estimateFare(distanceKm, zoneMultiplier)
  });
});
