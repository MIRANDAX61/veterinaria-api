import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import type { Express } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Veterinaria",
      version: "1.0.0",
      description: "Historial de visitas de mascotas",
    },
    servers: [{ url: "http://localhost:3000" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Visita: {
          type: "object",
          properties: {
            id: { type: "number" },
            petId: { type: "string", format: "uuid" },
            fecha: { type: "string", format: "date-time" },
            motivo: { type: "string" },
            sintomas: { type: "string" },
            diagnostico: { type: "string" },
            tratamiento: { type: "string" },
            costo: { type: "number" },
            veterinario: { type: "string" },
            notas: { type: "string" },
            estado: { type: "string", enum: ["pendiente", "completada", "cancelada"] },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: { type: "string" },
            details: { type: "object" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger docs en http://localhost:3000/api-docs");
};   