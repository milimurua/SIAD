<template>
  <div class="login-container">
    <h1>Iniciar sesión</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label>Email:</label>
        <input v-model="email" type="email" required />
      </div>

      <div class="form-group">
        <label>Contraseña:</label>
        <input v-model="password" type="password" required />
      </div>

      <button type="submit">Entrar</button>
    </form>

    <p class="register-link">
      ¿No tenés cuenta? <router-link to="/register">Registrate aquí</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      console.log('Usuario intentando loguearse:', this.email);
      // Luego conectarás esto al backend (JWT)
      this.$router.push('/Home');
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 80px auto;
  padding: 30px;
  border-radius: 12px;
  background: #111;
  color: #fff;
  box-shadow: 0 0 15px rgba(0,0,0,0.5);
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  background: #222;
  color: #fff;
  border: none;
  border-radius: 6px;
}

button {
  width: 100%;
  padding: 10px;
  border: 2px solid #fff;
  background: transparent;
  color: #fff;
  font-weight: bold;
  border-radius: 8px;
  transition: 0.3s;
}

button:hover {
  background: #fff;
  color: #000;
}

.register-link {
  margin-top: 20px;
}
</style>
