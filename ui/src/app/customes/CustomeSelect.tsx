import Select from 'react-select'
const CustomeSelect = ({onChange, options, value, className, placeholder}: any) => {
  const defaultValue = (options: any, value: any) => {
    return options ? options.find((option: any) => option.value === value) : ''
  }

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderColor: state.isFocused ? '#e4e6ef' : '#e4e6ef',
      boxShadow: state.isFocused ? '0 0 0 1px #153a81' : 'none',
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      display: 'none',
    }),
    menu: (provided: any) => ({
      ...provided,
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fafafa',
      fontSize: '1rem',
      fontWeight: 'bold',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      color: state.isSelected ? '#fafafa' : 'black',
      backgroundColor: state.isSelected ? '#153a81' : '#f5f5f5',
      ':hover': {
        backgroundColor: '#153a81',
        color: '#fafafa',
      },
      placeholder: (provided: any) => ({
        ...provided,
        fontSize: '1rem',
        color: '#153a81',
      }),
    }),
  }

  return (
    <Select
      key={options}
      placeholder={placeholder}
      value={defaultValue(options, value)}
      onChange={(value: any) => {
        onChange(value ? value : '')
      }}
      options={options}
      getOptionLabel={(options: any) => options.label}
      getOptionValue={(options: any) => options.value}
      backspaceRemovesValue={true}
      isClearable={true}
      styles={customStyles}
      className={className}
    />
  )
}

export default CustomeSelect
