import express, { type Request, type Response } from "express";
import cors from "cors";
import veterinarioRoutes from "./Route/VeterinarioRoute.js";

const app = express();
const PORT = Number(process.env.PORT ?? 3000);

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        mensaje: "API veterinaria funcionando"
    });
});

app.use("/api/veterinarios", veterinarioRoutes);

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
