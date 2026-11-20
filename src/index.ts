import express, { type Request, type Response } from "express";
import cors from "cors";
import medicamentoRouter from "./routes/medicamentoRoute";
import recetaRouter from "./routes/recetaRoute";
import mascotaRoutes from "./routes/mascota.routes";
import propietarioRoutes from "./routes/propietario.routes";
import veterinarioRoutes from "./routes/VeterinarioRoute";
import historialVisitasRoutes from "./routes/historialVisitasRoutes";

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
app.use("/api/mascotas", mascotaRoutes);
app.use("/api/propietarios", propietarioRoutes);
app.use("/api/veterinarios", veterinarioRoutes);
app.use("/api/historial-visitas", historialVisitasRoutes);

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});