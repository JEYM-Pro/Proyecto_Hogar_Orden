import React, { useState } from 'react';

function App() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [prioridad, setPrioridad] = useState('ALTA');
  const [fecha, setFecha] = useState('');
  const [estado, setEstado] = useState('PENDIENTE');
  const [asignado, setAsignado] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const nuevaTarea = {
      nombre: nombre,
      descripcion: descripcion,
      prioridad: prioridad,
      fecha_limite: fecha,
      estado: estado,
      asignado_a: asignado // Asegúrate que en Django el campo se llame igual
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/tareas/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaTarea)
      });

      if (response.ok) {
        alert("¡Tarea creada con éxito!");
        // Limpiar campos
        setNombre(''); setDescripcion(''); setFecha(''); setAsignado('');
      } else {
        alert("Error al guardar. Verifica que los nombres de los campos coincidan en Django.");
      }
    } catch (error) {
      alert("No hay conexión con el servidor.");
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial', maxWidth: '500px', margin: 'auto', backgroundColor: '#f4f4f4', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center' }}>Nuevo Registro - HU-10</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        
        {/* 1. Nombre */}
        <div>
          <label><b>Nombre:</b></label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required style={{width: '100%', padding: '8px'}} />
        </div>

        {/* 2. Descripción */}
        <div>
          <label><b>Descripción:</b></label>
          <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} rows="3" style={{width: '100%', padding: '8px'}} />
        </div>

        {/* 3. Prioridad */}
        <div>
          <label><b>Prioridad:</b></label>
          <select value={prioridad} onChange={(e) => setPrioridad(e.target.value)} style={{width: '100%', padding: '8px'}}>
            <option value="BAJA">Baja</option>
            <option value="MEDIA">Media</option>
            <option value="ALTA">Alta</option>
          </select>
        </div>

        {/* 4. Fecha Límite */}
        <div>
          <label><b>Fecha límite:</b></label>
          <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required style={{width: '100%', padding: '8px'}} />
        </div>

        {/* 5. Estado */}
        <div>
          <label><b>Estado:</b></label>
          <select value={estado} onChange={(e) => setEstado(e.target.value)} style={{width: '100%', padding: '8px'}}>
            <option value="PENDIENTE">Pendiente</option>
            <option value="EN_PROCESO">En Proceso</option>
            <option value="COMPLETADA">Completada</option>
          </select>
        </div>

        {/* 6. Asignado a */}
        <div>
          <label><b>Asignado a:</b></label>
          <input type="text" value={asignado} onChange={(e) => setAsignado(e.target.value)} style={{width: '100%', padding: '8px'}} />
        </div>

        <button type="submit" style={{ 
          marginTop: '10px', padding: '10px', backgroundColor: '#337ab7', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'
        }}>
          POST
        </button>
      </form>
    </div>
  );
}

export default App;