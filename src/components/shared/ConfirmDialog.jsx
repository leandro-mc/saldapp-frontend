function ConfirmDialog({ isOpen, message, onConfirm, onCancel }) {
    if (!isOpen) return null

    return (
        <div>
            <p>{message}</p>
            <button onClick={onConfirm}>Confirmar</button>
            <button onClick={onCancel}>Cancelar</button>
        </div>
    )
}

export default ConfirmDialog