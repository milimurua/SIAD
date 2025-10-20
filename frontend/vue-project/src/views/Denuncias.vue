<template>
  <div class="denuncias-container">
    <h1>Denuncias Registradas</h1>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Fecha</th>
          <th>Tipo</th>
          <th>Estado</th>
          <th>Descripción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="denuncia in denuncias" :key="denuncia.id">
          <td>{{ denuncia.id }}</td>
          <td>{{ denuncia.fecha }}</td>
          <td>{{ denuncia.tipo }}</td>
          <td>{{ denuncia.estado }}</td>
          <td>{{ denuncia.descripcion }}</td>
        </tr>
      </tbody>
    </table>

    <button class="back" @click="$router.push('/home')">Volver al Inicio</button>
  </div>
</template>

<script>
export default {
  name: "Denuncias",
  data() {
    return {
      denuncias: [
        {
          id: 1,
          fecha: "2025-10-20",
          tipo: "Robo de vehículo",
          estado: "Pendiente",
          descripcion: "Robo en zona céntrica durante la noche",
        },
        {
          id: 2,
          fecha: "2025-10-18",
          tipo: "Accidente de tránsito",
          estado: "Procesada",
          descripcion: "Colisión menor sin heridos",
        },
      ],
    };
  },
};
</script>

<style scoped>
.denuncias-container {
  background-color: #111;
  color: #fff;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
  font-family: Arial, sans-serif;
}

h1 {
  margin-bottom: 30px;
}

table {
  width: 90%;
  margin: 0 auto 30px;
  border-collapse: collapse;
  background-color: #222;
  border-radius: 10px;
  overflow: hidden;
}

th, td {
  padding: 12px;
  border-bottom: 1px solid #444;
}

th {
  background-color: #000;
  color: #fff;
}

tr:hover {
  background-color: #333;
}

.back {
  padding: 10px 20px;
  border: 2px solid #fff;
  border-radius: 8px;
  background-color: transparent;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;
}

.back:hover {
  background-color: #fff;
  color: #000;
}
</style>
