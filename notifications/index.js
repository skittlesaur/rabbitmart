import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import notifications from "./routes/notifications.js";
import sgMail from '@sendgrid/mail';

const app = express();
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_KEY);

app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use('/notifications', notifications);

app.get('/', (req, res) => {
    res.status(200).json({
        team_name: "Curious Monkeys",
        dev_team: ["Baraa A.", "Eman S.", "Sary N.", "Youssef S."].sort()
    })
});

const PORT = process.env.PORT || 5000;

const handleServerStartup = () => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
}

handleServerStartup();

export default app