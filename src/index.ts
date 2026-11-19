import express, { type Request, type Response } from "express";
import cors from "cors";
import historialVisitasRoutes from "./routes/historialVisitasRoutes";

const app = express();
const PORT = Number(process.env.PORT ?? 3000);


app.use(cors());
app.use(express.json());

app.use('/api/historial-visitas', historialVisitasRoutes);
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        mensaje: "API veterinaria funcionando"
    });
});

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});