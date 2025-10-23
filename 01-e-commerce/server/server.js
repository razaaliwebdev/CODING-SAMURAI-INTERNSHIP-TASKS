import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDb from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import couponRoutes from './routes/couponRoutes.js';

import dotenv from 'dotenv';
dotenv.config();


const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}));


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons",couponRoutes);


app.get("/", (req, res) => {
    res.send("<h1>API is working fine...</h1>");
});



// Server and DB Call
connectDb().then(() => {
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log("Server is running on the PORT:", port);
    })
}).catch((error) => {
    console.log("DB connection failed.", error);
});


