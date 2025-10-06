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
      <button type="submit">Enviar Denuncia</button>
    </form>
    <div v-if="mensaje" class="success">{{ mensaje }}</div>
  </div>
</template>

<script>
export default {
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
  border: 2px solid #fff;
  background: transparent;
  color: #fff;
  border-radius: 8px;
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
