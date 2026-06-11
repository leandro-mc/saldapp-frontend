function ConfirmDialog({ isOpen, message, onConfirm, onCancel }) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            {/* La tarjeta del dialog */}
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-4">
                <p className="text-gray-800 font-medium mb-6">{message}</p>
                <div className="flex gap-3 justify-end">
                    <button 
                        onClick={onConfirm}                        
                        className="px-4 py-2 text-sm rounded-md bg-red-700 text-white
                                    hover:bg-red-900 transition-colors font-medium"
                    >
                        Confirmar
                    </button>
                    <button 
                        onClick={onCancel}
                        className="px-4 py-2 text-sm rounded-md border border-gray-300
                                    text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                        Cancelar
                    </button>
                </div>                
            </div>
        </div>
    )
}

export default ConfirmDialog