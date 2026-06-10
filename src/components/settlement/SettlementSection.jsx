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

    if (loading) return <LoadingState />
    if (error) return <ErrorMessage />

    if (isClosed) return (
        <>
            <h3>Liquidación Final</h3>
            <SettlementList settlements={settlements} groupCurrency={groupCurrency}/>
        </>
    )

    return (
        <>
            <button onClick={() => {
                onToggle()
                if (!showSettlement) loadSettlement()
            }}>
                {showSettlement ? 'Ocultar liquidación' : 'Ver liquidación actual'}
            </button>

            {showSettlement && (
                <>
                    <h3>Liquidación estimada</h3>
                    <SettlementList settlements={settlements} groupCurrency={groupCurrency} />
                </>
            )}
        </>
    )
}

export default SettlementSection
