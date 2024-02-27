const SearchRecordNotFound = (props: any) => {
  return (
    <tr>
      <td colSpan={props.colSpan}>
        <p className='fs-2 text-red message-color'>{props.message}</p>
      </td>
    </tr>
  )
}
export default SearchRecordNotFound
