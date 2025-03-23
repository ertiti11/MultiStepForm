"use server";

import { Resend } from "resend";

const resend = new Resend('re_fmEviVfX_PxHMyd4hAwBGJ1KAfhMYh44L');

export const sendEmail = async (data) => {
  try {
    console.log(data)
    await resend.emails.send({
      from: 'altamirano floristas <info@altamiranofloristas.com>',
      to: 'info@altamiranofloristas.com',
      subject: 'Nueva Solicitud de Flores para Boda / New Wedding Flower Request',
      html: `
        <h2>Detalles de la Solicitud / Request Details:</h2>
        <p><strong>Nombres / Names:</strong> ${data.partnerNames}</p>
        <p><strong>Fecha / Date:</strong> ${data.weddingDate}</p>
        <p><strong>Lugar / Venue:</strong> ${data.venueLocation}</p>
        <p><strong>Tipo de Lugar / Venue Type:</strong> ${data.venueType}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Teléfono / Phone:</strong> ${data.phone}</p>
      `,
    });
    console.log("Correo enviado con éxito");
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    throw new Error("No se pudo enviar el correo. Verifica los datos y la configuración.");
  }
};