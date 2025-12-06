import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import type { Provider } from '../types/provider'

const STORAGE_KEY = 'proveedores'

export function useProviders() {
  const [providers, setProviders] = useState<Provider[]>([])

  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) setProviders(JSON.parse(data))
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(providers))
  }, [providers])

  function createProvider(data: Omit<Provider, 'id'>) {
    const newProvider: Provider = { id: Date.now(), ...data }
    setProviders(prev => [newProvider, ...prev])
    Swal.fire({ icon: 'success', title: 'Proveedor creado', text: 'Se ha agregado un nuevo proveedor' })
  }

  function updateProvider(id: number, changes: Partial<Provider>) {
    setProviders(prev =>
      prev.map(p => (p.id === id ? { ...p, ...changes } : p))
    )
    Swal.fire({ icon: 'success', title: 'Proveedor actualizado', text: 'Se han guardado los cambios' })
  }

  function deleteProvider(id: number) {
    setProviders(prev => prev.filter(p => p.id !== id))
    Swal.fire({ icon: 'success', title: 'Proveedor eliminado' })
  }

  function clearAll() {
    setProviders([])
    Swal.fire({ icon: 'success', title: 'Todos los proveedores eliminados' })
  }

  return { providers, createProvider, updateProvider, deleteProvider, clearAll }
}
