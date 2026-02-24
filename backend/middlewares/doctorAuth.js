import jwt from "jsonwebtoken";
import Doctor from "../models/Doctor.js";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function doctorAuth(req, res, next) {
    const authHeader = req.headers.authorization;

    //check token
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({ success: false, message: "Doctor not authenticated, token missing or invalid." });
    }

    const token = authHeader.split(" ")[1];
    try {
        // verify token
        const payload = jwt.verify(token, JWT_SECRET);

        if(payload.role && payload.role !== "doctor"){
            return res.status(403).json({ success: false, message: "Access denied." });
        }

        // Fetch doctor
        const doctor = await Doctor.findById(payload.id);

        if(!doctor){
            return res.status(401).json({ success: false, message: "Doctor not found." });
        }

        // Attch doctor to req object
        req.doctor = doctor;
        next();
    }catch(error) {
        console.error("Doctor verification failed:", error);
        return res.status(401).json({ success: false, message: "Token invalid or missing or expired." });
    }
}