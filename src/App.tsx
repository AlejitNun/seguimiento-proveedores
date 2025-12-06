import { useState, useEffect } from 'react'
import { ProviderForm } from './components/ProviderForm'
import { ProviderTable } from './components/ProviderTable'
import { useProviders } from './hooks/useProviders'
import type { Provider } from './types/provider'
import Swal from 'sweetalert2'


function App() {
const { providers, createProvider, updateProvider, deleteProvider, clearAll } = useProviders()
const [editing, setEditing] = useState<Provider | null>(null)


useEffect(() => {
function onValidation(e: Event) {
const detail = (e as CustomEvent).detail as string
Swal.fire({ icon: 'error', title: 'Error de validación', text: detail })
}
window.addEventListener('app:validation-error', onValidation)
return () => window.removeEventListener('app:validation-error', onValidation)
}, [])


function handleCreate(data: Omit<Provider, 'id'>) {
createProvider(data)
}


function handleUpdate(id: number, changes: Partial<Provider>) {
updateProvider(id, changes)
}


function handleEdit(p: Provider) {
setEditing(p)
window.scrollTo({ top: 0, behavior: 'smooth' })
}


function handleCancelEdit() {
setEditing(null)
}


return (
<div className="min-h-screen bg-pink-100">
<header className="bg-pink-400 text-white py-4 shadow-md">
<div className="max-w-6xl mx-auto px-4">
<h1 className="text-xl md:text-2xl font-semibold">Gestión de Proveedores</h1>
<p className="text-xs md:text-sm text-indigo-100 mt-1">Registra, edita y elimina proveedores. Los datos se guardan en Local Storage.</p>
</div>
</header>


<main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
<ProviderForm onCreate={handleCreate} onUpdate={handleUpdate} editing={editing} onCancelEdit={handleCancelEdit} />
<ProviderTable providers={providers} onEdit={handleEdit} onDelete={deleteProvider} onClearAll={clearAll} />
</main>


<footer className="mt-8 py-4 text-center text-xs text-slate-500">&copy; {new Date().getFullYear()} Tienda Suministros - Gestión de Proveedores</footer>
</div>
)
}


export default App
