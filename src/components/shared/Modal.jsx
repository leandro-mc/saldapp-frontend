import React from 'react'

function Modal({ isOpen, title, onClose, children }){
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-40" onClick={onClose} />
            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4 p-6 z-10">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">Cerrar</button>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal
