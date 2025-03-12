import express, { Request, Response } from "express";
import { authRouter } from "./routes";
import { errorMiddleware } from "./middlewares/errors";

const app = express();
const PORT = 3000;

// middleware
app.use(express.json());

// default route in order to check server
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Ecommerce" });
});

// routes
app.use("/api", authRouter);

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`server is running on ${PORT}`));
