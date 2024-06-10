// import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
// import { app, server } from "./socket/socket.js";
import connectToMongoDB from "./database/connectToMongoDB.js";


dotenv.config();

connectToMongoDB();
// job.start();
const app = express();
const PORT = process.env.PORT || 5000;
// const __dirname = path.resolve();

// Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

// Routes
app.use("/authen/users", userRoutes);
app.use("/authen/posts", postRoutes);


// if (process.env.NODE_ENV === "production") {
// 	app.use(express.static(path.join(__dirname, "/frontend/dist")));

// 	// react app
// 	app.get("*", (req, res) => {
// 		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// 	});
// }

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));