import { dialog, ipcMain, shell } from "electron";
import fs from "fs";
import path from "path";
//import PDFDocument from "pdfkit";

import { connectDB } from "../database/conection.js";
import { route } from "../database/db.js";

//create_file_by_laboratorio(id, data)
//data {name (string de máximo 250), direction (text)}
//El name es el nombre del archivo con su extensión

export function registerIpcApi() {
  ipcMain.handle("select-sqlite-file", async () => {
    const result = await dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [{ name: "SQLite DB", extensions: ["sqlite", "db"] }],
    });

    if (result.canceled || result.filePaths.length === 0) return null;

    return result.filePaths[0]; // ruta absoluta del archivo
  });

  ipcMain.handle("select-any-file", async () => {
    const result = await dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [],
    });

    if (result.canceled || result.filePaths.length === 0) return null;

    return result.filePaths[0]; // ruta absoluta del archivo
  });
  /*
  ipcMain.handle("select-file-and-save", async (_event, laboratorioId) => {
    try {
      const result = await dialog.showOpenDialog({
        properties: ["openFile"],
        filters: [],
      });

      if (result.canceled || result.filePaths.length === 0) return null;

      const filePath = result.filePaths[0];
      const fileName = path.basename(filePath); // nombre con extensión

      // Guardar en base de datos
      await create_file_by_laboratorio(laboratorioId, {
        name: fileName,
        direction: filePath,
      });

      return { success: true, name: fileName, direction: filePath };
    } catch (error) {
      console.error("Error al guardar archivo en DB:", error);
      //@ts-ignore
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle("select-file-and-update", async (_event, fileId) => {
    try {
      const result = await dialog.showOpenDialog({
        properties: ["openFile"],
        filters: [],
      });

      if (result.canceled || result.filePaths.length === 0) return null;

      const filePath = result.filePaths[0];
      const fileName = path.basename(filePath); // nombre con extensión

      // Actualizar en base de datos
      await update_file(fileId, {
        name: fileName,
        direction: filePath,
      });

      return { success: true, name: fileName, direction: filePath };
    } catch (error) {
      console.error("Error al actualizar archivo en DB:", error);
      //@ts-ignore
      return { success: false, error: error.message };
    }
  });*/

  ipcMain.handle("select-database", async () => {
    const old_route = route;

    // 1. Mostrar diálogo para seleccionar archivo .sqlite
    const result = await dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [{ name: "SQLite DB", extensions: ["sqlite", "db"] }],
    });

    if (result.canceled || result.filePaths.length === 0) return null;

    const selectedPath = result.filePaths[0];

    try {
      // 2. Sustituir la base de datos actual por la copia del archivo seleccionado
      fs.copyFileSync(selectedPath, old_route);

      // 3. Reconectar la base de datos
      connectDB();

      return old_route; // Opcional: puedes devolver la ruta usada
    } catch (error) {
      console.error("Error al sustituir la base de datos:", error);
      return null;
    }
  });

  ipcMain.handle("export-database", async (): Promise<string | null> => {
    // Mostrar diálogo para guardar archivo (permite cambiar el nombre)
    const result = await dialog.showSaveDialog({
      title: "Exportar Base de Datos",
      defaultPath: "database_export.sqlite",
      filters: [{ name: "SQLite Database", extensions: ["sqlite", "db"] }],
    });

    if (result.canceled || !result.filePath) {
      return null;
    }

    const targetPath = result.filePath;

    try {
      fs.copyFileSync(route, targetPath);
      console.log(`Base de datos exportada a: ${targetPath}`);
      return targetPath;
    } catch (error) {
      console.error("Error al exportar la base de datos:", error);
      return null;
    }
  });

  ipcMain.handle("open-file", async (_event, absolutePath: string) => {
    try {
      if (!path.isAbsolute(absolutePath)) {
        throw new Error("La ruta no es absoluta");
      }

      if (!fs.existsSync(absolutePath)) {
        throw new Error("El archivo no existe");
      }

      const result = await shell.openPath(absolutePath);
      if (result) {
        throw new Error(result);
      }

      return { success: true };
    } catch (error) {
      console.error("Error al abrir el archivo:", error);
      return { success: false, error: (error as Error).message };
    }
  });
  /*
  ipcMain.handle(
    "export-receta-pdf",
    async (_event, tratamientoId: string): Promise<string | null> => {
      try {
        const tratamiento = await Tratamiento.findByPk(tratamientoId);
        if (!tratamiento) throw new Error("Tratamiento no encontrado");

        //@ts-ignore
        const consulta = await Consulta.findByPk(tratamiento.consultaId);
        if (!consulta) throw new Error("Consulta no encontrada");

        //@ts-ignore
        const paciente = await Paciente.findByPk(consulta.pacienteId);
        if (!paciente) throw new Error("Paciente no encontrado");

        // ➤ Preguntar logo del consultorio
        const logoDialog = await dialog.showOpenDialog({
          title: "Selecciona el logo del consultorio",
          filters: [{ name: "Imagen", extensions: ["png", "jpg", "jpeg"] }],
          properties: ["openFile"],
        });

        const logoPath = logoDialog.filePaths[0] || null;

        // ➤ Preguntar ruta para guardar el PDF
        const saveDialog = await dialog.showSaveDialog({
          title: "Guardar Receta Médica",
          //@ts-ignore
          defaultPath: `Receta_${paciente.name}_${tratamiento.id}.pdf`,
          filters: [{ name: "PDF", extensions: ["pdf"] }],
        });

        if (saveDialog.canceled || !saveDialog.filePath) return null;
        const pdfPath = saveDialog.filePath;

        const doc = new PDFDocument({ margin: 50 });
        const stream = fs.createWriteStream(pdfPath);
        doc.pipe(stream);

        // ➤ Cabecera: logo + nombre del doctor
        if (logoPath && fs.existsSync(logoPath)) {
          doc.image(logoPath, 50, 40, { width: 80, height: 80 });
        }

        doc.fontSize(18).text("Doctor de prueba del sistema", 150, 70, {
          align: "left",
          continued: false,
        });

        // ➤ Paciente y fecha
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();

        const y = doc.y;
        const leftX = 50;
        const rightXMargin = 50;
        const pageWidth = doc.page.width;

        // Texto: Nombre del paciente
        const pacienteLabel = "Nombre del paciente: ";
        //@ts-ignore
        const pacienteValue = paciente.name;

        // Texto: Fecha
        const fechaLabel = "Fecha: ";
        //@ts-ignore
        const fechaValue = new Date(tratamiento.date).toLocaleDateString();

        // Establecer tamaño de fuente a 12
        doc.fontSize(12);

        // === Escribir Nombre del paciente (izquierda) ===
        doc
          .font("Helvetica-Bold")
          .text(pacienteLabel, leftX, y, { continued: true });
        doc.font("Helvetica").text(pacienteValue, { continued: false });

        // === Medir ancho del label y valor de fecha
        doc.font("Helvetica-Bold");
        const fechaLabelWidth = doc.widthOfString(fechaLabel);
        doc.font("Helvetica");
        const fechaValueWidth = doc.widthOfString(fechaValue);
        const fechaTotalWidth = fechaLabelWidth + fechaValueWidth;

        const xFecha = pageWidth - rightXMargin - fechaTotalWidth;

        // === Escribir Fecha alineada a la derecha ===
        doc
          .font("Helvetica-Bold")
          .text(fechaLabel, xFecha, y, { continued: true });
        doc.font("Helvetica").text(fechaValue);

        // Restaurar posición para contenido normal
        doc.moveDown();

        // === Escribir Nombre del paciente (izquierda) ===
        doc
          .font("Helvetica-Bold")
          .text(pacienteLabel, leftX, y, { continued: true });
        doc.font("Helvetica").text(pacienteValue, { continued: false });

        // === Escribir Fecha (alineada a la derecha) ===
        doc
          .font("Helvetica-Bold")
          .text(fechaLabel, xFecha, y, { continued: true });
        doc.font("Helvetica").text(fechaValue, { continued: false });

        // === A partir de aquí puedes seguir con el contenido normal ===
        doc.moveDown(); // para avanzar una línea si quieres continuar debajo

        // ➤ Línea separadora
        doc.moveDown().moveTo(50, doc.y).lineTo(550, doc.y).stroke();

        // ➤ Contenido
        doc.moveDown();
        doc
          .font("Helvetica-Bold")
          .fontSize(14)
          .text("Prescripción:", rightXMargin);
        doc.moveDown();
        doc
          .font("Helvetica")
          .fontSize(12)
          //@ts-ignore
          .text(tratamiento.prescription || "N/A");
        doc.moveDown(10);

        // ➤ Línea separadora antes de la firma
        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
        doc.moveDown(2);

        // ➤ Firma
        doc
          .font("Helvetica")
          .fontSize(12)
          .text("Firma: ___________________________", {
            align: "left",
          });

        doc.end();

        await new Promise<void>((resolve, reject) => {
          stream.on("finish", resolve);
          stream.on("error", reject);
        });

        console.log("PDF generado en:", pdfPath);
        return pdfPath;
      } catch (err) {
        console.error("Error generando receta:", err);
        return null;
      }
    }
  );
  */
}
