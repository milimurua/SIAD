<template>
  <div class="form-container">
    <h1>Formulario de Denuncia</h1>

    <form @submit.prevent="enviarDenuncia">
      <div class="form-group">
        <label>Tipo de siniestro:</label>
        <input v-model="denuncia.tipo" required />
      </div>

      <div class="form-group">
        <label>Motivo:</label>
        <textarea v-model="denuncia.motivo" required></textarea>
      </div>

      <button type="submit" class="btn-enviar">Enviar Denuncia</button>
      <!-- botón tipo button para que NO dispare el submit -->
      <button type="button" @click="volverHome" class="btn-volver">Volver al Inicio</button>
    </form>

    <div v-if="mensaje" class="success">{{ mensaje }}</div>
  </div>
</template>

<script>
export default {
  name: "FormDenuncia",
  data() {
    return {
      denuncia: { tipo: '', motivo: '' },
      mensaje: ''
    };
  },
  methods: {
    enviarDenuncia() {
      console.log('Denuncia enviada:', this.denuncia);
      this.mensaje = 'Denuncia enviada correctamente.';
      // si tenés backend, aquí harías el POST con axios
      // axios.post('/api/denuncias', this.denuncia).then(...)

      // opcional: limpiar formulario tras envío
      this.denuncia = { tipo: '', motivo: '' };
    },
    volverHome() {
      // usar this.$router para navegar en Options API
      this.$router.push('/home');
    }
  }
};
</script>

<style scoped>
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
  margin-bottom: 16px;
}
label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
}
input {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: none;
  background: #222;
  color: #fff;
}
textarea {
  width: 100%;
  min-height: 100px;
  background: #222;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px;
}
button {
  margin-top: 15px;
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
  font-weight: bold;
}

/* Enviar */
.btn-enviar {
  border: 2px solid #fff;
  background: transparent;
  color: #fff;
}
.btn-enviar:hover {
  background: #fff;
  color: #000;
}

/* Volver */
.btn-volver {
  margin-top: 10px;
  border: none;
  background-color: black;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
}
.btn-volver:hover {
  background-color: #333;
}

/* Mensaje */
.success {
  margin-top: 20px;
  background: white;
  color: black;
  padding: 10px;
  border-radius: 6px;
  text-align: center;
}
</style>
