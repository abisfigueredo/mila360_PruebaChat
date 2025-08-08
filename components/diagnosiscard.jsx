import { motion } from "framer-motion";

// Esta función toma un string con viñetas (•) y lo convierte en un array limpio
const parseList = (text) => {
  if (!text) return [];
  return text
    .split("•") // Divido el texto por el símbolo de viñeta
    .map((item) => item.trim()) // Elimino espacios innecesarios
    .filter((item) => item.length > 0); // Me aseguro de que no haya elementos vacíos
};

export const DiagnosisCard = ({ diagnosis }) => {
  if (!diagnosis) return null; // Si no hay diagnóstico, no renderizo nada

  // Transformo las brechas y recomendaciones en arrays para mostrarlas como listas
  const brechasList = parseList(diagnosis.brechas);
  const recomendacionesList = parseList(diagnosis.recomendaciones);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }} // 🎬 Animación de entrada: aparece con escala reducida
      animate={{ opacity: 1, scale: 1 }} // 🔄 Animación final: escala normal y opacidad completa
      transition={{ duration: 0.5 }} // ⏱️ Duración de la animación
      className="bg-gradient-to-br from-[#1a1f2b] to-[#2c3e50] border border-teal-400/30 rounded-xl p-6 shadow-lg text-cyan-100 font-orbitron space-y-4"
    >
      {/* Título del diagnóstico */}
      <h3 className="text-white text-lg uppercase tracking-wide">
        📊 Diagnóstico completo
      </h3>

      <div className="space-y-2">
        {/* Riesgo */}
        <p className="text-white">
          🔺 <strong className="text-red-400">Riesgo:</strong> {diagnosis.riesgo || "No especificado"}
        </p>

        {/* Brechas */}
        <div className="text-white">
          📌 <strong className="text-orange-300">Brechas:</strong>
          <ul className="list-disc list-inside mt-1 space-y-1">
            {brechasList.length > 0 ? (
              brechasList.map((item, idx) => (
                <li key={idx}>{item}</li> // Renderizo cada brecha como un ítem de lista
              ))
            ) : (
              <li>Sin brechas detectadas</li> // Mensaje por defecto si no hay brechas
            )}
          </ul>
        </div>

        {/* Recomendaciones */}
        <div className="text-white">
          ✅ <strong className="text-[#00ffc3]">Recomendaciones:</strong>
          <ul className="list-disc list-inside mt-1 space-y-1">
            {recomendacionesList.length > 0 ? (
              recomendacionesList.map((item, idx) => (
                <li key={idx}>{item}</li> // Renderizo cada recomendación como ítem
              ))
            ) : (
              <li>No hay recomendaciones en este momento</li> // Mensaje por defecto
            )}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};
