import express from "express";
import { clerkMiddleware, requireAuth } from "@clerk/express";

import {
	cancelServiceAppointment,
	confirmServicePayment,
	createServiceAppointment,
	getServiceAppointmentById,
	getServiceAppointments,
	getServiceAppointmentsByPatient,
	getServiceAppointmentStats,
	updateServiceAppointment,
} from "../controllers/serviceAppointmentController.js";

const serviceAppointmentsRouter = express.Router();

serviceAppointmentsRouter.get("/", getServiceAppointments);
serviceAppointmentsRouter.get("/confirm", confirmServicePayment);
serviceAppointmentsRouter.get("/stats/summary", getServiceAppointmentStats);

serviceAppointmentsRouter.post("/", clerkMiddleware(), requireAuth(), createServiceAppointment);

serviceAppointmentsRouter.get("/me", clerkMiddleware(), requireAuth(), getServiceAppointmentsByPatient);

serviceAppointmentsRouter.get("/:id", getServiceAppointmentById);
serviceAppointmentsRouter.put("/:id", updateServiceAppointment);
serviceAppointmentsRouter.post("/:id/cancel", cancelServiceAppointment);

export default serviceAppointmentsRouter;