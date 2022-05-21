import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
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