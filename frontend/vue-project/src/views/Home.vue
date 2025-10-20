<template>
  <div class="home-container">
    <header class="home-header">
      <h1>Bienvenido a SIAD</h1>
      <p>Sistema Integral de Administración de Denuncias</p>
    </header>

    <section class="home-content">
      <h2>¿Qué deseas hacer?</h2>

      <div class="buttons">
        <button @click="goToForm">Cargar Denuncia</button>
        <button @click="goToList">Ver Denuncias</button>
        <button class="logout" @click="logout">Cerrar Sesión</button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    goToForm() {
      this.$router.push("/form-denuncia");
    },
    goToList() {
      this.$router.push("/denuncias");
    },
    logout() {
      // Ejemplo simple: limpiar sesión local y redirigir
      localStorage.removeItem("usuario");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background-color: #111;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: Arial, sans-serif;
}

.home-header h1 {
  font-size: 3rem;
  color: #fff;
  margin-bottom: 10px;
}

.home-header p {
  color: #aaa;
  font-size: 1.2rem;
  margin-bottom: 40px;
}

.home-content h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 250px;
}

button {
  padding: 12px;
  border: 2px solid #fff;
  border-radius: 8px;
  background-color: transparent;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background-color: #fff;
  color: #000;
}

.logout {
  border-color: #f33;
  color: #f33;
}

.logout:hover {
  background-color: #f33;
  color: #fff;
}
</style>
