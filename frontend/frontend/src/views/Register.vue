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
          <option value="insurance">Aseguradora</option>
          <option value="producer">Productor</option>
        </select>
      </div>

      <div v-if="form.type === 'insurance'">
        <div class="form-group">
          <label>CUIT de la empresa:</label>
          <input v-model="form.cuit" type="text" required />
        </div>
        <div class="form-group">
          <label>Nombre de la empresa:</label>
          <input v-model="form.company_name" type="text" required />
        </div>
        <div class="form-group">
          <label>Dirección:</label>
          <input v-model="form.address" type="text" required />
        </div>
        <div class="form-group">
          <label>Teléfono (opcional):</label>
          <input v-model="form.phone" type="text" />
        </div>
      </div>

      <div v-if="form.type === 'producer'">
        <div class="form-group">
          <label>Matrícula:</label>
          <input v-model="form.matricula" type="text" required />
        </div>
        <div class="form-group">
          <label>País:</label>
          <input v-model="form.country" type="text" required />
        </div>
        <div class="form-group">
          <label>Entidad emisora:</label>
          <input v-model="form.emitter_entity" type="text" required />
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
        <input v-model="form.password" type="password" required />
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
      cuit: "",
      company_name: "",
      address: "",
      phone: "",
      matricula: "",
      country: "",
      emitter_entity: "",
      dni: "",
      password: ""
    },
    successMessage: "",
    errorMessage: "" // New property for errors
  };
},
methods: {
  async submitForm() {
          // Basic validation
    if (!this.form.email.includes("@")) {
      this.errorMessage = "Por favor, ingrese un email válido.";
      return;
    }
    if (this.form.password.length < 6) {
      this.errorMessage = "La contraseña debe tener al menos 6 caracteres.";
      return;
    }
    if (this.form.type === "insurance" && !/^\d{11}$/.test(this.form.cuit)) {
      this.errorMessage = "El CUIT debe tener 11 dígitos.";
      return;
    }
    if (this.form.type === "producer" && !this.form.matricula) {
      this.errorMessage = "La matrícula es obligatoria.";
      return;
    }
      const payload = {
        email: this.form.email,
        password: this.form.password,
        type: this.form.type,
        name: this.form.name,
        ...(this.form.type === "insurance" && {
          cuit: this.form.cuit,
          company_name: this.form.company_name,
          address: this.form.address,
          phone: this.form.phone || undefined
        }),
        ...(this.form.type === "producer" && {
          matricula: this.form.matricula,
          country: this.form.country,
          emitter_entity: this.form.emitter_entity,
          dni: this.form.dni,
          phone: this.form.phone || undefined
        })
    };

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
      body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error desconocido al registrar.");
      }

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

    localStorage.setItem("token", data.data.token);
    localStorage.setItem("userType", data.data.user.type);
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


.error {
  color: #f00;
  margin-top: 20px;
}
</style>
