import { useEffect } from "react";
import { useSettlement } from "../../hooks/useSettlement";
import LoadingState from "../shared/LoadingState";
import ErrorMessage from "../shared/ErrorMessage";
import SettlementList from "./SettlementList";

function SettlementSection({ groupId, isClosed, groupCurrency, showSettlement, onToggle, refreshTrigger  }) {
    const { settlements, loading, error, loadSettlement } = useSettlement(groupId)

    useEffect(() => {
        if (isClosed || (showSettlement && refreshTrigger > 0)) loadSettlement()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isClosed, refreshTrigger])

    if (loading) return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <LoadingState />
        </div>
    )

    if (error) return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <ErrorMessage />
        </div>
    )

    if (isClosed) return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-3 border-b border-blue-700 pb-2">
                <h3 className="text-xl font-bold text-blue-700">Liquidación Final</h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs
                                 font-medium bg-red-100 text-red-700">
                    Grupo cerrado
                </span>                
            </div>
            <SettlementList settlements={settlements} groupCurrency={groupCurrency}/>
        </div>
    )

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center border-b mb-3 border-blue-700 pb-2">
                {showSettlement && (  
                    <h3 className="text-xl font-bold text-blue-700">Liquidación estimada</h3>
                )}
                <button 
                    onClick={() => {
                        onToggle()
                        if (!showSettlement) loadSettlement()
                    }}
                    className="text-sm bg-blue-50 text-blue-600 px-4 py-2 rounded
                                border border-blue-200 hover:bg-blue-100 transition-colors"
                >
                    {showSettlement ? 'Ocultar liquidación' : 'Ver liquidación actual'}
                </button>
            </div>

            {showSettlement && (                   
                <SettlementList settlements={settlements} groupCurrency={groupCurrency} />                
            )}
        </div>
    )
}

export default SettlementSection
