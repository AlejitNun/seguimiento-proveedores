import { useState, useEffect } from 'react'
import { Input } from './Imput'
import type { Provider } from '../types/provider'
import Swal from 'sweetalert2'

interface ProviderFormProps {
  onCreate: (data: Omit<Provider, 'id'>) => void
  onUpdate: (id: number, changes: Partial<Provider>) => void
  editing?: Provider | null
  onCancelEdit?: () => void
}

export const ProviderForm: React.FC<ProviderFormProps> = ({ onCreate, onUpdate, editing = null, onCancelEdit }) => {
  const [nombre, setNombre] = useState('')
  const [contacto, setContacto] = useState('')
  const [direccion, setDireccion] = useState('')
  const [telefono, setTelefono] = useState('')
  const [email, setEmail] = useState('')
  const [categoria, setCategoria] = useState('')

  useEffect(() => {
    if (editing) {
      setNombre(editing.nombre)
      setContacto(editing.contacto)
      setDireccion(editing.direccion)
      setTelefono(editing.telefono)
      setEmail(editing.email)
      setCategoria(editing.categoria ?? '')
    } else {
      setNombre('')
      setContacto('')
      setDireccion('')
      setTelefono('')
      setEmail('')
      setCategoria('')
    }
  }, [editing])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!nombre || !contacto || !direccion || !telefono || !email) {
      Swal.fire('Error', 'Por favor completa todos los campos obligatorios.', 'error')
      return
    }

    const telClean = telefono.replace(/\s+/g, '')
    if (!/^\d{6,15}$/.test(telClean)) {
      Swal.fire('Error', 'Teléfono inválido (solo dígitos, 6-15 caracteres).', 'error')
      return
    }

    const data = { nombre, contacto, direccion, telefono, email, categoria }

    if (editing) {
      onUpdate?.(editing.id, data)
      onCancelEdit?.()
    } else {
      onCreate(data)
    }

    // Limpiar formulario
    setNombre('')
    setContacto('')
    setDireccion('')
    setTelefono('')
    setEmail('')
    setCategoria('')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-5 mb-6 border border-slate-200">
      <h2 className="text-lg font-semibold mb-4">{editing ? 'Editar Proveedor' : 'Nuevo Proveedor'}</h2>

      <Input label="Nombre" name="nombre" value={nombre} onChange={setNombre} required />
      <Input label="Contacto" name="contacto" value={contacto} onChange={setContacto} required />
      <Input label="Dirección" name="direccion" value={direccion} onChange={setDireccion} required />
      <Input label="Teléfono" name="telefono" value={telefono} onChange={setTelefono} required />
      <Input label="Email" name="email" value={email} onChange={setEmail} required />
      <Input label="Categoría" name="categoria" value={categoria} onChange={setCategoria} />

      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-700"
        >
          {editing ? 'Actualizar' : 'Crear'}
        </button>
        {editing && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}
