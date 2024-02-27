import Select from 'react-select'
import {provinceType} from '../modules/authentication/core/_model'
const CustomeSelectSearch = ({
  onChange,
  options,
  value,
  className,
  isLoading,
  isLoadTrueFalse,
  placeholder,
}: any) => {
  const defaultValue = (options: any, value: any) => {
    return options ? options.find((option: any) => option === value) : ''
  }
  return (
    <div className={className}>
      <Select
        placeholder={placeholder}
        value={defaultValue(options, value)}
        onChange={(value) => {
          onChange(value ? value : '')
        }}
        options={options}
        getOptionLabel={(options: provinceType) => options.name}
        getOptionValue={(options: provinceType) => options.id}
        backspaceRemovesValue={true}
        isLoading={isLoadTrueFalse ? isLoading : false}
        isClearable={true}
      />
    </div>
  )
}

export default CustomeSelectSearch
