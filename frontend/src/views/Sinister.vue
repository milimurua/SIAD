<template>
<div class="sinister-container">
    <header class="sinister-header">
        <h1>Siniestros</h1>
        <button v-if="userType === 'insurance'" @click="goToForm">
            Registrar nuevo siniestro
        </button>
    </header>

    <div class="search-container">
        <input
            v-model="searchTerm"
            type="text"
            placeholder="Buscar por DNI del asegurado"
            @keyup.enter="buscarSiniestros"
        />
        <button @click="buscarSiniestros">Buscar</button>
    </div>

    <div v-if="sinisters.length">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>DNI</th>
                    <th>Descripción</th>
                    <th>Monto</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="s in sinisters" :key="s.id">
                    <td>{{ s.id }}</td>
                    <td>{{ s.insured?.dni || 'N/A' }}</td>
                    <td>{{ s.description }}</td>
                    <td>{{ s.amount }}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <p v-else>No se encontraron siniestros.</p>
</div>
</template>

<script>
export default {
    data() {
        return {
            searchTerm: "", // Se enlaza con el input del buscador [cite: 45]
            sinisters: [],  // Almacena los resultados de la API [cite: 46]
            // Obtiene el tipo de usuario del localStorage (insurance o producer) [cite: 47]
            userType: localStorage.getItem("userType") || "" 
        };
    },
    
    methods: {
        async buscarSiniestros() {
            try {
                // 1. Verificación y Obtención del Token
                const token = localStorage.getItem("token");
                if (!token) throw new Error("No hay token");

                const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
                
                // 2. Petición al Backend
                let url = `${API_URL}/api/sinister`;
                
                // Si hay un término de búsqueda, buscar por DNI del asegurado
                if (this.searchTerm && this.searchTerm.trim()) {
                    // Usar el endpoint específico para buscar por DNI
                    url = `${API_URL}/api/sinister/by-dni/${this.searchTerm.trim()}`;
                }

                const res = await fetch(url, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (!res.ok) {
                    const errorData = await res.json().catch(() => ({}));
                    throw new Error(errorData.message || "Error al buscar siniestros");
                }
                
                const data = await res.json();
                
                // 3. Manejar la respuesta según el endpoint usado
                if (this.searchTerm && this.searchTerm.trim()) {
                    // El endpoint de búsqueda por DNI devuelve { dni, total, sinisters }
                    this.sinisters = data.sinisters || [];
                } else {
                    // El endpoint general devuelve un array directo
                    this.sinisters = data;
                }
            } catch (err) {
                console.error("Error al buscar siniestros:", err);
                alert(`No se pudieron cargar los siniestros: ${err.message || 'Error desconocido'}`);
                this.sinisters = [];
            }
        },
        
        goToForm() {
            // Navega a la ruta del formulario de denuncia al hacer clic en el botón [cite: 68]
            this.$router.push("/form-denuncia"); 
        }
    }
};
</script>

<style scoped>
/*
 * Diseño Estético y Moderno (Dark Theme)
 * Colores: Principal (Gris Oscuro/Negro), Acento (Azul Eléctrico), Texto (Claro)
 */

/* Contenedor Principal */
.sinister-container {
    padding: 30px;
    background: #1e1e2f; /* Gris muy oscuro, casi negro */
    color: #f0f0f5; /* Blanco suave para el texto */
    min-height: 100vh;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Encabezado y Botón de Registro */
.sinister-header {
    display: flex;
    justify-content: space-between; /* Alinea título y botón en los extremos */
    align-items: center;
    margin-bottom: 30px;
    padding-bottom: 15px;
    border-bottom: 2px solid #3c3c5c; /* Línea separadora sutil */
}

.sinister-header h1 {
    font-size: 2em;
    font-weight: 600;
    color: #7986cb; /* Título en color de acento */
}

/* Contenedor de Búsqueda */
.search-container {
    display: flex;
    gap: 10px; /* Espacio entre input y botón */
    margin-bottom: 25px;
}

/* Estilo de Inputs (Buscador) */
.search-container input {
    flex-grow: 1;
    padding: 10px 15px;
    border: 1px solid #3c3c5c;
    border-radius: 8px;
    background: #28283e; /* Fondo del input un poco más claro que el fondo general */
    color: #f0f0f5;
    transition: border-color 0.3s;
}

.search-container input::placeholder {
    color: #a0a0b9;
}

.search-container input:focus {
    border-color: #5e72e4; /* Borde azul al enfocar */
    outline: none;
}

/* Estilo de Botones (Buscar y Registrar) */
button {
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    background: #5e72e4; /* Color de acento (Azul Eléctrico) */
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.1s;
    /* Asegura que todos los botones se vean, incluyendo el del header */
    white-space: nowrap; /* Evita que el texto del botón se rompa */
}

button:hover {
    background: #7986cb; /* Un tono más claro al pasar el mouse */
    transform: translateY(-1px); /* Efecto sutil de levantamiento */
}

/* Tabla de Resultados */
table {
    width: 100%;
    border-collapse: separate; /* Permite border-radius */
    border-spacing: 0;
    margin-top: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    overflow: hidden; /* Para que el border-radius se aplique a los bordes de la tabla */
}

thead {
    background: #3c3c5c; /* Fondo de la cabecera */
    color: white;
}

th, td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #3c3c5c; /* Separador de filas */
}

th:first-child, td:first-child { text-align: center; } /* ID centrado */
th:last-child, td:last-child { text-align: right; } /* Monto alineado a la derecha */

/* Filas del cuerpo */
tbody tr {
    background: #28283e; /* Fondo de las filas de datos */
    transition: background-color 0.3s;
}

tbody tr:hover {
    background: #3c3c5c; /* Fondo de la fila al pasar el mouse */
}

/* Mensaje de no resultados */
p {
    text-align: center;
    margin-top: 40px;
    font-style: italic;
    color: #a0a0b9;
}
</style>