import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        let decodedData;

        if (token) {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error)
    }
}

export default auth;