import Select from 'react-select'
import {provinceType} from '../modules/authentication/core/_model'
const CustomeSelectEditByName = ({
  onChange,
  options,
  value,
  className,
  isLoading,
  isLoadTrueFalse,
}: any) => {
  const defaultValue = (options: any, value: number) => {
    return options ? options.find((option: any) => option.name === value) : ''
  }
  return (
    <div className={className}>
      <Select
        placeholder={'انتخاب نماید'}
        value={defaultValue(options, value)}
        onChange={(value) => {
          onChange(value ? value : 0)
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

export default CustomeSelectEditByName
