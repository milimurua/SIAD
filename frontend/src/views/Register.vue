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
        <select v-model="form.type" required>
          <option value="insurance">Aseguradora</option>
          <option value="producer">Productor</option>
        </select>
      </div>

      <!-- Datos específicos de aseguradora -->
      <div v-if="form.type === 'insurance'">
        <div class="form-group">
          <label>Nombre de la aseguradora:</label>
          <input v-model="form.companyName" type="text" required />
        </div>
      </div>

      <!-- Datos específicos de productor -->
      <div v-if="form.type === 'producer'">
        <div class="form-group">
          <label>Matrícula:</label>
          <input v-model="form.matricula" type="text" required />
        </div>

        <div class="form-group">
          <label>DNI:</label>
          <input v-model="form.dni" type="text" required />
        </div>

        <div class="form-group">
          <label>Teléfono (opcional):</label>
          <input v-model="form.phone" type="text" />
        </div>
      </div>

      <div class="form-group">
        <label>Contraseña:</label>
        <input v-model="form.password" type="password" required minlength="6" />
      </div>

      <button type="submit" class="button">Registrarse</button>
    </form>

    <div v-if="successMessage" class="success">{{ successMessage }}</div>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
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
        type: "insurance",
        companyName: "",
        matricula: "",
        dni: "",
        phone: "",
        password: ""
      },
      successMessage: "",
      errorMessage: ""
    };
  },
  methods: {
    async submitForm() {
      // Validaciones básicas
      if (!this.form.email.includes("@")) {
        this.errorMessage = "Por favor, ingrese un email válido.";
        return;
      }

      if (this.form.password.length < 6) {
        this.errorMessage = "La contraseña debe tener al menos 6 caracteres.";
        return;
      }

      const payload = {
        email: this.form.email,
        password: this.form.password,
        type: this.form.type,
        name: this.form.name,
        ...(this.form.type === "insurance" && {
          name: this.form.companyName
        }),
        ...(this.form.type === "producer" && {
          number: this.form.matricula,
          dni: this.form.dni,
          phone: this.form.phone || undefined
        })
      };

      try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

        const res = await fetch(`${API_URL}/api/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Error desconocido al registrar.");

        localStorage.setItem("token", data.token || "temp-token");
        localStorage.setItem("userType", data.type || this.form.type);
        this.successMessage = "¡Registro completado con éxito! Redirigiendo...";
        this.errorMessage = "";

        setTimeout(() => {
          this.$router.push("/sinister");
        }, 1500);
      } catch (err) {
        console.error("Error en el registro:", err);
        this.errorMessage = `Error: ${err.message || "No se pudo conectar al servidor."}`;
        this.successMessage = "";
      }
    }
  }
};
</script>

<style scoped>
.register-container {
  max-width: 450px;
  margin: 50px auto;
  padding: 30px;
  border-radius: 12px;
  background: #111;
  color: #fff;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 25px;
  font-size: 2rem;
}

.form-group {
  margin-bottom: 18px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
}

input,
select {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: none;
  background-color: #222;
  color: #fff;
  font-size: 1rem;
  transition: 0.3s;
}

input:focus,
select:focus {
  outline: 2px solid #fff;
}

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

.success {
  margin-top: 15px;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  background-color: #fff;
  color: #000;
  border-radius: 6px;
}

.error {
  color: #f00;
  margin-top: 20px;
}
</style>