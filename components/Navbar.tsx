export default function Navbar() {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        {/* Hero estilo Notion */}
        <div className="relative w-full h-48 md:h-64">
          <img
            src="https://altamiranofloristas.com/wp-content/uploads/2025/04/59e46fd1-0cf8-4c08-b3cf-d45e958ebe1d.jpg"
            alt="Hero Altamirano Floristas"
            className="w-full h-full object-cover"
          />
          {/* Logo centrado con fondo redondo blanco */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white rounded-full p-2 shadow-lg">
            <img
              className="w-16 h-16"
              src="https://altamiranofloristas.com/wp-content/uploads/2024/10/LogoVertical.svg"
              alt="Logo Altamirano Floristas"
            />
          </div>
        </div>
      </div>
    );
  }