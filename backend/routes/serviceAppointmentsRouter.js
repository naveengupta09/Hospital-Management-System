import express from "express";
import { clerkMiddleware, requireAuth } from "@clerk/express";

import { confirmServicePayment, createServiceAppointment, getServiceAppointments, getServiceAppointmentStats, updateServiceAppointment } from "../controllers/serviceAppointmentController";
import { get } from "mongoose";
import { createRef } from "react";

const serviceAppointmentsRouter = express.Router();

serviceAppointmentsRouter.get("/", getServiceAppointments);
serviceAppointmentsRouter.get("/confirm", confirmServicePayment);
serviceAppointmentsRouter.get("/starts/summary", getServiceAppointmentStats);

serviceAppointmentsRouter.post("/", clerkMiddleware(), requireAuth(), createServiceAppointment);

serviceAppointmentsRouter.get("/me", clerkMiddleware(), requireAuth(), getServiceAppointmentStatsByPatient);

serviceAppointmentsRouter.get("/:id", getServiceAppointmentById);
serviceAppointmentsRouter.put("/:id", updateServiceAppointment);
serviceAppointmentsRouter.post("/:id/cancel", cancelServiceAppointment);

export default serviceAppointmentsRouter;