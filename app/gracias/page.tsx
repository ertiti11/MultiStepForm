import Layout from '../layout'

export default function Gracias() {
  // Asegúrate de que no haya lógica de redirección aquí.
  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF7F2]">
        <img className="w-24 mb-10" src="https://altamiranofloristas.com/wp-content/uploads/2024/10/LogoVertical.svg" alt="" />
        <h1 className="text-4xl text-center font-serif text-[#4A4A4A] mb-4">
          ¡Gracias por enviar tu solicitud!
        </h1>
        <p className="text-lg text-[#6B6B6B] text-center">
          Nos pondremos en contacto contigo lo antes posible para ayudarte a planificar tu boda soñada.
        </p>
      </div>
    </Layout>
  );
}
