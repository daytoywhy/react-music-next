import './search-input.scss'
export default function SearchInput({modelValue,updateModelValue}){
  const clear = () => {
    updateModelValue('') // 更新modelValue的值
  }

  const handleInput = (e) => {
    const inputText = e.target.value
    updateModelValue(inputText)
  }
  return   <div className="search-input">
  <i className="icon-search"></i>
  <input
    className="input-inner"
    value={modelValue}
    placeholder="搜索"
    onChange={e => handleInput(e)}
  />
  {
    modelValue ? <i
    className="icon-dismiss"
    onClick={clear}
  ></i> : ''
  }
</div>
}