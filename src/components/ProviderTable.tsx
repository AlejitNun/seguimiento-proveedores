import { useState } from 'react'
import type { Provider } from '../types/provider'
import Swal from 'sweetalert2'

interface ProviderTableProps {
  providers: Provider[]
  onEdit: (p: Provider) => void
  onDelete: (id: number) => void
  onClearAll: () => void
}

export const ProviderTable: React.FC<ProviderTableProps> = ({ providers, onEdit, onDelete, onClearAll }) => {
  const [filter, setFilter] = useState('')

  const filtered = providers.filter(p => {
    const q = filter.trim().toLowerCase()
    if (!q) return true
    return [p.nombre, p.contacto, p.email, p.telefono, p.categoria ?? ''].some(field =>
      field?.toLowerCase().includes(q)
    )
  })

  function confirmDelete(id: number) {
    Swal.fire({
      title: '¿Eliminar proveedor?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(result => {
      if (result.isConfirmed) onDelete(id)
    })
  }

  function confirmClearAll() {
    if (providers.length === 0) return
    Swal.fire({
      title: '¿Eliminar todos los proveedores?',
      text: 'Se borrarán todos los proveedores guardados',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar todo',
      cancelButtonText: 'Cancelar',
    }).then(result => {
      if (result.isConfirmed) onClearAll()
    })
  }

  return (
    <div className="bg-white rounded-xl shadow p-4 md:p-6">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Buscar proveedor..."
          className="border rounded px-3 py-2 text-sm w-full md:w-1/3"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
        <button
          onClick={confirmClearAll}
          className="ml-2 px-3 py-2 bg-pink-500 text-white rounded hover:bg-pink-700 text-sm"
        >
          Borrar todos
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-gray-500">No hay proveedores que coincidan.</p>
      ) : (
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2 text-left">Nombre</th>
              <th className="px-3 py-2 text-left">Contacto</th>
              <th className="px-3 py-2 text-left">Email</th>
              <th className="px-3 py-2 text-left">Teléfono</th>
              <th className="px-3 py-2 text-left">Categoría</th>
              <th className="px-3 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} className="border-b">
                <td className="px-3 py-2">{p.nombre}</td>
                <td className="px-3 py-2">{p.contacto}</td>
                <td className="px-3 py-2">{p.email}</td>
                <td className="px-3 py-2">{p.telefono}</td>
                <td className="px-3 py-2">{p.categoria}</td>
                <td className="px-3 py-2 flex gap-2">
                  <button
                    onClick={() => onEdit(p)}
                    className="px-2 py-1 bg-pink-500 text-white rounded hover:bg-pink-600 text-xs"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => confirmDelete(p.id)}
                    className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
