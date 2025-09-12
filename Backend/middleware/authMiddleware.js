import jwt from "jsonwebtoken"
export function authMiddleware(req,res, next){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next();
    }catch(err){
        console.log(err);
        return res.status(400).json({ message: "Invalid token", error: err.message })
    }
}