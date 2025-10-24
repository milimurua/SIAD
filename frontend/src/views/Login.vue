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

    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

    <p class="register-link">
      ¿No tenés cuenta?
      <router-link to="/register">Registrate aquí</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: ""
    };
  },
  methods: {
    async login() {
      this.errorMessage = "";

      // URL dinámica del backend
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

      try {
        const res = await fetch(`${API_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Credenciales inválidas");
        }

        // Guardar token y tipo de usuario
        localStorage.setItem("token", data.token);
        localStorage.setItem("userType", data.type);

        console.log("Usuario autenticado:", data);

        // Redirigir después de iniciar sesión
        this.$router.push("/form-denuncia");
      } catch (err) {
        console.error("Error al iniciar sesión:", err);
        this.errorMessage = err.message || "Error al conectar con el servidor.";
      }
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
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
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

.error {
  color: #f00;
  margin-top: 15px;
  font-weight: bold;
}

.register-link {
  margin-top: 20px;
}
</style>