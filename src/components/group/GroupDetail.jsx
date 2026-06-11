import { useState } from 'react'
import { formatDate } from '../../utils/dateUtils'
import ConfirmDialog from '../shared/ConfirmDialog'

function GroupDetail({ group, onEdit, onClose, isClosed }) {

    const [dialog, setDialog] = useState({ isOpen: false })

    function handleCloseClick() {
        setDialog({ isOpen: true})
    }

    async function handleConfirm() {
        onClose()
        setDialog({ isOpen: false })
    }

    function handleCancel() {
        setDialog({ isOpen: false })
    }

    const amountPerPerson = group.integrantCount > 0 ? (group.totalExpenses / group.integrantCount).toFixed(2) : 0

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">

            {/* Header: name + status badge */}
            <div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">{group.name}</h1>
                    {group.description && (
                        <p className="text-gray-500 mt-1">{group.description}</p>    
                    )}
                </div>
                <div className="mt-4 md:mt-0 flex items-start gap-3">
                    {/* Status badge */}
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                                    ${isClosed
                                        ? 'bg-red-100 text-red-800'
                                        : 'bg-green-100 text-green-800'
                                    }`}>
                        {isClosed ? 'Cerrado' : 'Abierto'}
                    </span>
                    {/* Buttons: only when it's open */}
                    {!isClosed && (
                        <>
                            <button 
                                onClick={onEdit} 
                                className="px-3 py-1 text-sm rounded-md border border-gray-300 text-gray-700
                                            hover:bg-gray-50 transition-colors"
                            >
                                Editar
                            </button>
                            <button 
                                onClick={handleCloseClick} 
                                className="px-3 py-1 text-sm rounded-md border border-red-300 text-red-600
                                            hover:bg-red-50 transition-colors"
                            >
                                Cerrar Grupo
                            </button>
                        </>
                    )}
                </div>               
            </div>

            {/* Metadata grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
                <div>
                    <p className="text-xs tex-gray-500 uppercase tracking-wide">ID del grupo</p>
                    <p className="font-semibold text-gray-800">{group.id}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Inicio</p>
                    <p className="font-semibold text-gray-800">{formatDate(group.startDate)}</p>
                </div>
                {isClosed && (
                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Cierre</p>
                        <p className="font-semibold text-gray-800">{formatDate(group.endDate)}</p>
                    </div>
                )}
                <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Integrantes</p>
                    <p className="font-semibold text-gray-800">{group.integrantCount}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Total de gastos</p>
                    <p className="font-bold text-blue-600 text-lg">{group.currency}{group.totalExpenses}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Correspondiente p/p</p>
                    <p className="font-bold text-blue-600 text-lg">{group.currency}{amountPerPerson}</p>
                </div>
            </div>

            <ConfirmDialog 
                isOpen={dialog.isOpen}
                message={"¿Estas seguro de que deseas cerrar el grupo? Esta acción no se puede deshacer."}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />

        </div>
    )
}

export default GroupDetail