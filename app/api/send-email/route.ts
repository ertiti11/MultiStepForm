import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Forzar generación dinámica
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const transporter = nodemailer.createTransport({
      host: "smtp.ionos.com",
      port: 587,
      secure: false, // Cambiar a false si estás usando STARTTLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Enviar correo al negocio
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "info@altamiranofloristas.com",
      subject: "Nueva Solicitud de Flores para Boda / New Wedding Flower Request",
      html: `
        <h2>Detalles de la Solicitud / Request Details:</h2>
        <p><strong>Nombres / Names:</strong> ${data.partnerNames}</p>
        <p><strong>Fecha / Date:</strong> ${data.weddingDate}</p>
        <p><strong>Lugar / Venue:</strong> ${data.venueAddress}</p>
        <p><strong>Tipo de Lugar / Venue Type:</strong> ${data.venueType}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Teléfono / Phone:</strong> ${data.phone}</p>
      `,
    });

    // Enviar correo de confirmación al cliente
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: data.email,
      subject: "Solicitud Recibida - Altamirano Floristas / Request Received",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>¡Gracias por contactarnos! / Thank you for contacting us!</h2>
          
          <p style="color: #666;">
            Español:<br>
            Su petición ha sido recibida en Altamirano Floristas. Pronto nos comunicaremos contigo.
          </p>
          
          <p style="color: #666;">
            English:<br>
            Your request has been received at Altamirano Floristas. We will contact you soon.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
  }
}