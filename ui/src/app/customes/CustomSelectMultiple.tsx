// -- name: react select multiple.
// -- date: 01-21-2024.
// -- desc: multiple custom select for storing and also use for dependent options.
// -- author: Abdul Rafi Muhammadi.
// -- email: ab.rafimuhammadi@gmail.com

import Select from 'react-select'
const CustomSelectMultiple = ({onChange, options, defaultValues, className, placeholder}: any) => {
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
    <div className={className}>
      <Select
        key={options}
        placeholder={placeholder}
        defaultValue={defaultValues}
        onChange={(value) => {
          onChange(value ? value : '')
        }}
        options={options}
        getOptionLabel={(options: any) => options.label}
        getOptionValue={(options: any) => options.value}
        backspaceRemovesValue={true}
        styles={customStyles}
        isMulti={true}
        isClearable={true}
      />
    </div>
  )
}

export default CustomSelectMultiple
