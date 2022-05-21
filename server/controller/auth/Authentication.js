import Users from "../../model/Users.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const login = async (req, res) => {
    const {email, password} = req.body;

    if (!email)
        return res.status(400).json({message: "Email address is not provided"})
    if (!password)
        return res.status(400).json({message: "Password address is not provided"})

    try {
        const user = await Users.findOne({email});

        if (!user)
            return res.status(404).json({message: "User was not found"})

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect)
            return res.status(400).json({message: "Wrong password"})

        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_AUTH_TTL});
        return res.status(200).json({
            user: {
                _id: user._id,
                email: user.email,
                first_name: user.first_name,
                phone: user.phone,
                address: user.address
            },
            token
        });
    } catch (e) {
        return res.status(400).json({message: e.message});
    }
}