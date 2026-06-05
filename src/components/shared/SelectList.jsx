function SelectList({ options, getLabel, getValue, value, onChange, placeholder, disabled }){
    const handleChange = (e) => {
        const index = e.target.value
        if (index === '') return onChange(null)
        onChange(getValue(options[index]))
    }

    const selectedIndex = options.findIndex(
        opt => JSON.stringify(getValue(opt)) === JSON.stringify(value)
    )

    return (
        <select
            value={selectedIndex === -1 ? '' : selectedIndex}
            onChange={handleChange}
            disabled={disabled}
        >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((opt, i) => (
                <option key={i} value={i}>
                    {getLabel(opt)}
                </option>
            ))}
        </select>
    )
}

export default SelectList