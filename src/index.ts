import express, { Request, Response } from "express";
import { authRouter } from "./routes";

const app = express();
const PORT = 3000;

// default route in order to check server
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Ecommerce" });
});

// routes
app.use("/api", authRouter);

app.listen(PORT, () => console.log(`server is running on ${PORT}`));
