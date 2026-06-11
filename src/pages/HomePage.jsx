import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useCreateGroup } from '../hooks/useCreateGroup'
import GroupForm from '../components/group/GroupForm'

function HomePage() {
    const navigate = useNavigate()
    const { create, loading, error } = useCreateGroup()
    const [groupId, setGroupId] = useState('')

    async function handleCreate(data) {
        const group = await create(data)
        if (group) navigate(`/groups/${group.id}`)        
    }

    function handleAccess(e) {
        e.preventDefault()
        if (groupId) navigate(`/groups/${groupId}`)
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 md:px-8">
            <div className="text-center mb-10">
                {/* Title */}
                <h1 className="text-4xl font-extrabold text-blue-600">SaldApp</h1>
                <p className="text-gray-500 mt-2">División inteligente de gastos grupales</p>
            </div>

            {/* Two cards: side to side */}
            <div className="flex flex-col md:flex-row gap-8 justify-center items-start">

                {/* Card create group */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 w-full md:w-1/2">                
                    <GroupForm onSubmit={handleCreate} loading={loading} error={error} />
                </div>

                {/* Group access card  */}
                <div className="bg-white p-6 rounded-lg shadow-mb border border-gray-100 w-full md:w-1/3">
                    <h2 className="text-2xl font-bold text-blue-600 mb-6 border-b pb-3">
                        Ingresar a grupo existente
                    </h2>
                    <form onSubmit={handleAccess} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                ID del grupo
                            </label>
                            <input 
                                value={groupId} 
                                onChange={e => setGroupId(e.target.value)} 
                                placeholder='Ej: 1024'
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm
                                            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        
                        <button 
                            type='submit'
                            className="w-full bg-white text-blue-600 border border-blue-600 py-2 px-4 rounded-md
                                        hover:bg-blue-50 transition-colors font-medium"
                        >
                            Ingresar
                        </button>
                    </form>
                </div>
                
            </div>
        </div>
    )
}

export default HomePage