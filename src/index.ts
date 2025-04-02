import express, { Request, Response } from "express";
import { PORT } from "./secretes";
import { authRouter, productRouter } from "./routes";
import { errorMiddleWare } from "./middlewares/errors";

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
app.use("/products", productRouter);

app.use(errorMiddleWare);
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
