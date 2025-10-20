<template>
  <div class="register-container">
    <h1>Registro de Usuario</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label>Nombre:</label>
        <input v-model="form.name" type="text" required />
      </div>

      <div class="form-group">
        <label>Email:</label>
        <input v-model="form.email" type="email" required />
      </div>

      <div class="form-group">
        <label>Tipo de usuario:</label>
        <select v-model="form.type">
          <option value="aseguradora">Aseguradora</option>
          <option value="productor">Productor</option>
        </select>
      </div>

      <div class="form-group" v-if="form.type === 'aseguradora'">
        <label>CUIT de la empresa:</label>
        <input v-model="form.cuit" type="text" required />
      </div>

      <div class="form-group" v-if="form.type === 'productor'">
        <label>Matrícula:</label>
        <input v-model="form.matricula" type="text" required />
      </div>

      <div class="form-group">
        <label>Contraseña:</label>
        <input v-model="form.password" type="password" required />
      </div>

      <button type="submit">Registrarse</button>
      <p class="center-link">¿Ya tenés una cuenta? <router-link to="/login">Iniciá sesión aquí</router-link></p>
    </form>

    <div v-if="successMessage" class="success">
      {{ successMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      form: {
        name: "",
        email: "",
        type: "aseguradora",
        cuit: "",
        matricula: "",
        password: ""
      },
      successMessage: ""
    };
  },
  methods: {
    submitForm() {
      this.successMessage = "Registro completado con éxito!. Ahora podés iniciar sesión.";
      console.log("Datos enviados:", this.form);
    }
  }
};
</script>

<style scoped>
/* Contenedor principal */
.register-container {
  max-width: 450px;
  margin: 50px auto;
  padding: 30px;
  border-radius: 12px;
  background: #111; /* fondo negro */
  color: #fff;      /* texto blanco */
  box-shadow: 0 0 15px rgba(0,0,0,0.5);
  font-family: Arial, sans-serif;
}

/* Título */
h1 {
  text-align: center;
  margin-bottom: 25px;
  font-size: 2rem;
  color: #f5f5f5;
}

/* Grupos de inputs */
.form-group {
  margin-bottom: 18px;
}

/* Labels */
label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
}

/* Inputs y selects */
input, select {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: none;
  background-color: #222; /* gris oscuro */
  color: #fff;
  font-size: 1rem;
  transition: 0.3s;
}

input:focus, select:focus {
  outline: 2px solid #fff;
}

/* Botón */
button {
  width: 100%;
  padding: 12px;
  background-color: #000;
  color: #fff;
  font-size: 1.1rem;
  font-weight: bold;
  border: 2px solid #fff;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background-color: #fff;
  color: #000;
  border-color: #000;
}

/* Mensaje de éxito */
.success {
  margin-top: 15px;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  background-color: #fff;
  color: #000;
  border-radius: 6px;
}

/* Centrar el link de inicio de sesión */
.center-link {
  text-align: center;
  margin-top: 12px;
}
</style>
