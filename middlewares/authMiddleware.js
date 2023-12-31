import jwt from "jsonwebtoken";

const secretKey = "ccp123";

const verifyToken = (req, res, next) => {
    console.log("Verify Token");
    const authHeader = req.headers.authorization;

    if (typeof authHeader !== "undefined") {
        const token = authHeader.split(" ")[1]; // Assuming the header format is "Bearer <token>"
        if (!token) {
            console.log( "Invalid token format")
            return res.status(401).json({ error: "Invalid token format" });
        }

        try {
            const { user } = jwt.verify(token, secretKey);
            req.userRole = user;
            next();
        } catch (err) {
            console.log("Token is not valid")
            return res.status(401).json({ error: "Token is not valid" });
        }
    } else {
        console.log( "Token is missing")
        res.status(401).json({ error: "Token is missing" });
    }
};

export default verifyToken;
