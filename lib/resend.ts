"use server";

import { Resend } from "resend";

const resend = new Resend('re_fmEviVfX_PxHMyd4hAwBGJ1KAfhMYh44L');

export const sendEmail = async (data) => {
  try {
    console.log(data)
    await resend.emails.send({
      from: 'altamirano floristas <info@altamiranofloristas.com>',
      to: 'info@altamiranofloristas.com',
      subject: 'Tienes una nueva Solicitud de Flores para Boda!',
      html: `
        <h2>Detalles de la Solicitud:</h2>
        <p><strong>Nombres:</strong> ${data.partnerNames}</p>
        <p><strong>Fecha:</strong> ${data.weddingDate}</p>
        <p><strong>Lugar:</strong> ${data.venueLocation}</p>
        <p><strong>Tipo de Lugar:</strong> ${data.venueType}</p>
        <p><strong>Invitados:</strong> ${data.guestCount}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Teléfono:</strong> ${data.phone}</p>
      `,
    });
    console.log("Correo enviado con éxito");
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    throw new Error("No se pudo enviar el correo. Verifica los datos y la configuración.");
  }
};