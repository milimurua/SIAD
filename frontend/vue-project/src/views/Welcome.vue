<template>
  <div class="welcome-container">
    <h1>Bienvenido a SIAD</h1>
    <p>
      Es un sistema integral para la gestión de denuncias en el sector asegurador,
      con base de datos central en PostgreSQL, backend en Node.js, frontend en Vue.js,
      seguridad con JWT y cifrado, soporte de búsquedas rápidas en NoSQL e integración
      con APIs externas para validación de datos.
    </p>

    <div class="buttons">
      <button @click="$router.push('/login')">Iniciar Sesión</button>
      <button @click="$router.push('/register')">Registrarse</button>
    </div>
  </div>
</template>

<style scoped>
.welcome-container {
  min-height: 100vh;
  background-color: #111;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

p {
  max-width: 800px;
  font-size: 1.1rem;
  color: #ccc;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.buttons {
  display: flex;
  gap: 20px;
}

button {
  padding: 12px 25px;
  font-size: 1.1rem;
  border: 2px solid #fff;
  background-color: transparent;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background-color: #fff;
  color: #000;
}
</style>
