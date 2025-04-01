import express, { Request, Response } from "express";
import { PORT } from "./secretes";
import { authRouter } from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

// Applications
const app = express();

// middlewares
app.use(express.json());

// default route
app.get("/", (req: Request, res: Response) => {
  res.send("Ecommerce");
});

// routes
app.use("/api", authRouter);

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
