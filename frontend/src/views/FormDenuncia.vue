<template>
  <div class="form-container">
    <h1>Formulario de Denuncia de Siniestro</h1>
    <form @submit.prevent="enviarDenuncia">
      
      <div class="form-group">
        <label for="dni">DNI del Asegurado:</label>
        <input id="dni" v-model="SinisterData.dni" type="text" required />
      </div>

      <div class="form-group">
        <label for="tipo">Tipo de Siniestro:</label>
        <input id="tipo" v-model="SinisterData.description" type="text" required />
      </div>

      <div class="form-group">
        <label for="fecha">Fecha del Siniestro:</label>
        <input id="fecha" v-model="SinisterData.date_sinister" type="date" required />
      </div>

      <div class="form-group">
        <label for="monto">Monto Estimado (USD):</label>
        <input id="monto" v-model.number="SinisterData.amount" type="number" required />
      </div>

      <button type="submit" class="button">Registrar siniestro</button>
    </form>

    <div v-if="mensaje" class="success">{{ mensaje }}</div>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  name: "SinisterForm",
  data() {
    return {
      SinisterData: {
        dni: "",
        description: "",
        date_sinister: "",
        amount: "",
      },
      mensaje: "",
      errorMessage: "",
    };
  },
  methods: {
    async enviarDenuncia() {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const token = localStorage.getItem("token");

      try {
        // 1️⃣ Buscar el asegurado por DNI
        const resInsured = await fetch(`${API_URL}/api/insured/dni/${this.SinisterData.dni}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!resInsured.ok) {
          throw new Error("No se encontró ningún asegurado con ese DNI");
        }

        const insuredData = await resInsured.json();
        const insuredId = insuredData.id; // ID interno del asegurado

        // 2️⃣ Crear el siniestro usando el ID encontrado
        const resSinister = await fetch(`${API_URL}/api/sinister`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            description: this.SinisterData.description,
            amount: this.SinisterData.amount,
            date_sinister: this.SinisterData.date_sinister,
            insuredId: insuredId, // 👈 usamos el ID, no el DNI
          }),
        });

        const data = await resSinister.json();

        if (!resSinister.ok) {
          throw new Error(data.message || "Error al registrar el siniestro");
        }

        this.mensaje = "✅ Siniestro registrado correctamente";
        this.errorMessage = "";

        console.log("Siniestro creado:", data);
        this.$router.push("/sinister");

      } catch (err) {
        console.error("Error al registrar el siniestro:", err);
        this.errorMessage = err.message || "Error al conectar con el servidor.";
      }
    },
  },
};
</script>


<style scoped>
/* Estilos originales mantenidos y ligeramente ajustados */
.form-container {
  max-width: 500px;
  margin: 50px auto;
  padding: 30px;
  background: #111;
  color: white;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0,0,0,0.5);
}
.form-group {
    margin-bottom: 15px;
}
label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}
input[type="text"], input[type="date"], input[type="number"], textarea {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  background: #222;
  color: #fff;
  border: 1px solid #444;
  border-radius: 6px;
  box-sizing: border-box; /* Asegura que padding no afecte el ancho total */
}
textarea {
  min-height: 100px;
  resize: vertical;
}
button {
  margin-top: 15px;
  width: 100%;
  padding: 10px;
  border: 2px solid #fff;
  background: transparent;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
}
button:hover {
  background: #fff;
  color: #000;
}
.success {
  margin-top: 20px;
  background: white;
  color: black;
  padding: 10px;
  border-radius: 6px;
  text-align: center;
}
</style>
