import express from "express";
import indexRouter from "./routes/tasks.routes.js";
import morgan from "morgan";
import cors from "cors";

const app = express();

// Middlewares
app.use(cors()); //Sirve para comunicar el servidor de mi db con el servidor de React
app.use(morgan("dev")); //Sirve para q morgan opere en consola
app.use(express.json()); // Sirve para q express entienda las peticiones post con el body json

// Routes
app.use(indexRouter);

// Handle Errors
app.use((error, req, res, next) => {
  return res.json({
    message: error.message,
  });
});

app.listen(4000);
console.log("Server on port: ", 4000);
