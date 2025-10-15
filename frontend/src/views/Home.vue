<template>
  <div class="home-container">
    <div class="home-content">
      <h1>Bienvenido a <span class="highlight">SIAD</span></h1>

      <div class="buttons">
        <router-link to="/register" class="btn">Registrarse</router-link>
        <router-link to="/login" class="btn secondary">Iniciar sesión</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #111;
  color: white;
  text-align: center;
  font-family: 'Arial', sans-serif;
}

.home-content {
  max-width: 600px;
  padding: 40px;
}

.highlight {
  color: #fff;
  border-bottom: 2px solid white;
}

p {
  margin-top: 20px;
  line-height: 1.6;
  font-size: 1.1rem;
}

.buttons {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  gap: 20px;
}

.btn {
  text-decoration: none;
  padding: 12px 25px;
  border-radius: 8px;
  border: 2px solid #fff;
  color: #fff;
  background: transparent;
  font-weight: bold;
  transition: 0.3s;
}

.btn:hover {
  background: white;
  color: black;
}

.btn.secondary {
  background: #222;
  border-color: #555;
}
</style>
