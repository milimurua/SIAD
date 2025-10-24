<template>
  <div class="form-container">
    <h1>Formulario de Denuncia de Siniestro</h1>
    <form @submit.prevent="enviarDenuncia">
      
      <div class="form-group">
        <label for="dni">DNI del Asegurado:</label>
        <input id="dni" v-model="denuncia.insured_dni" type="text" required />
      </div>

      <div class="form-group">
        <label for="tipo">Tipo de Siniestro:</label>
        <input id="tipo" v-model="denuncia.tipo_siniestro" type="text" required />
      </div>

      <div class="form-group">
        <label for="fecha">Fecha del Siniestro:</label>
        <input id="fecha" v-model="denuncia.date_sinister" type="date" required />
      </div>

      <div class="form-group">
        <label for="monto">Monto Estimado (USD):</label>
        <input id="monto" v-model.number="denuncia.amount_sinister" type="number" required />
      </div>
      
      <div class="form-group">
        <label for="descripcion">Descripción del Siniestro:</label>
        <textarea id="descripcion" v-model="denuncia.description_sinister" required></textarea>
      </div>

      
        <router-link to="/sinister" class="button">Registrar siniestro</router-link>
      
    </form>
    <div v-if="mensaje" class="success">{{ mensaje }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Nuevos campos inicializados
      denuncia: { 
        insured_dni: '', // DNI
        tipo_siniestro: '', 
        description_sinister: '', 
        date_sinister: '',
        amount_sinister: null, // null es mejor para números
        // stay_sinister: false (Este campo generalmente se gestiona en el backend)
      },
      mensaje: ''
    };
  },
  methods: {
    enviarDenuncia() {
      // Por ahora solo muestra los datos en consola.
      // Aquí es donde luego harás la llamada HTTP al backend (axios.post('/api/sinister', this.denuncia))
      
      console.log('Datos de la Denuncia listos para enviar al Backend:', this.denuncia);
      this.mensaje = 'Denuncia enviada correctamente. (Simulación)';

      // Opcional: Limpiar el formulario
      // this.denuncia = { insured_dni: '', tipo_siniestro: '', description_sinister: '', date_sinister: '', amount_sinister: null };
    }
  }
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