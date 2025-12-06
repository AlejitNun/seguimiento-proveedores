import React from 'react'


interface InputProps {
label: string
name: string
value: string
onChange: (v: string) => void
placeholder?: string
type?: string
required?: boolean
}


export const Input: React.FC<InputProps> = ({ label, name, value, onChange, placeholder, type = 'text', required = false }) => {
return (
<div className="flex flex-col gap-1">
<label htmlFor={name} className="text-sm font-medium text-slate-700">
{label}
</label>
<input
id={name}
name={name}
type={type}
className="rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
value={value}
onChange={e => onChange(e.target.value)}
placeholder={placeholder}
required={required}
/>
</div>
)
}