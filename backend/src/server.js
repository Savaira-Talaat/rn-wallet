import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionsRoute from "./routes/transactionsRoute.js"

dotenv.config();

const app = express();

app.use(rateLimiter)
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.use("/api/transactions", transactionsRoute);

app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log(`Route registered: ${middleware.route.path}`);
  } else if (middleware.name === 'router') {
    middleware.handle.stack.forEach((handler) => {
      if (handler.route) {
        console.log(`Route registered: ${handler.route.path}`);
      }
    });
  }
});


initDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is up and runnign on PORT:", PORT);
        console.log("API version X loaded");
    });
});
    