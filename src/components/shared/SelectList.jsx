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
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm
                        bg-white focus:outline-none focus:border-blue-500 focus:ring-1
                        focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
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