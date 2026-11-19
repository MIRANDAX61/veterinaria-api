import type {Request,Response} from "express"; 
import { getVeterinarios, VeterinarioId, createVeterinarios, updateVeterinario, deleteVeterinario} from "../Model/VeterinarioModel";

export async function Veterinarios(req: Request, res: Response){
 try {
  
  const veterinarios = await getVeterinarios();
     res.status(200).json(veterinarios);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "Error al obtener los veterinarios",
      details: error.message,
    });
  }
}

export async function VeterinariosId(req: Request, res: Response){
  try {
    const id = Number(req.params.id)
    const veterinarios = await VeterinarioId(id)
    if (!veterinarios){
      return res.status(404).json({ error: 'Veterinario no encontrado' })
    }

    res.status(200).json(veterinarios)
  } catch (error: any) {
    console.error(error)
    res
      .status(500)
      .json({ error: 'Error al obtener el veterinario', message: error.message })
  }
}

export async function createVeterinario(req: Request, res: Response) {
  const { nombre, correo, telefono } = req.body;
  try {
    const newVeterinario = await createVeterinarios({
      nombre,
      correo,
      telefono,
    });
    res.status(201).json({
      status: "ok",
      data: newVeterinario,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "Error al crear el veterinario",
      details: error.message,
    });
  }
}
  
export async function updateVeterinarios(req: Request, res: Response){
try {
  const id = Number(req.params.id)
    const data = req.body

    
    const updatedVeterinario = await updateVeterinario(id, data)

    res.status(200).json(updatedVeterinario)
} catch (error: any) {
  if (error.code === 'P2025') {
      return res.status(404).json({ message: 'El veterinario no existe' })
}
res.status(500).json({ error: 'Error al actualizar al veterinario', message: error.message })
 }
 }

 export async function deleteVeterinarios(req: Request, res: Response){
  try {
   const id = Number(req.params.id);
   if (isNaN(id)) {
      return res.status(400).json({ message: "El ID debe ser un número válido" });
    }
    await deleteVeterinario(id);

    res.status(200).json({ message: "Veterinario eliminado correctamente" });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Veterinario no existe" });
    }
    res.status(500).json({ error: "Error al eliminar el Veterinario", message: error.message });
  }
}