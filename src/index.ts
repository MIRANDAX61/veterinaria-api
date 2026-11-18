import express, { type Request, type Response } from "express";
import cors from "cors";
import medicamentoRouter from "./routes/medicamentoRoute";
import recetaRouter from "./routes/recetaRoute";

const app = express();
const PORT = Number(process.env.PORT ?? 3000);


app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        mensaje: "API veterinaria funcionando"
    });
});

app.use("/medicamentos", medicamentoRouter);
app.use("/recetas", recetaRouter);


app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});