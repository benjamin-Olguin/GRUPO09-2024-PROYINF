import BoletinesForm from "@/app/components/boletinesForm";

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>

      {/* Sección para gestionar boletines */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Gestión de Boletines</h2>
        <BoletinesForm
          onBoletinAdded={() => {
            // Puedes refrescar la página o manejar la lógica aquí si es necesario
            console.log("Boletín agregado.");
          }}
        />
      </section>

      {/* Puedes agregar más secciones para PDFs, artículos, etc., si es necesario */}
    </div>
  );
};

export default Dashboard;
