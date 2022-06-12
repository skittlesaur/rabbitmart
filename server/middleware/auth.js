import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        if (!auth)
            return res.status(401).json({message: "No authorization token was provided"});
        const token = auth.split(' ')[1];
        const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.body.id = decodedData?.id;
        next();
    } catch (e) {
        res.status(401).json({
            message: e.message
        })
    }
}

export default auth;