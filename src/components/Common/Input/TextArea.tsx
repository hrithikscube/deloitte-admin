import React from 'react'

interface Props {
  placeholder?: string
  id?: string
  name?: string
  rows: number
  className?: string
  value?: string
  error?: boolean
  handleChange?: any
  readOnly?: any
  helperText?: string
}
const TextArea: React.FC<Props> = ({
  placeholder,
  id,
  name,
  rows,
  className,
  value,
  error,
  handleChange,
  helperText,
  readOnly,
}) => (
  <div className='relative'>
    <textarea
      readOnly={readOnly}
      className={`w-full border border-border  ${
        className ? className : 'bg-transparent'
      } rounded-lg  text-SpaceCadet p-4 placeholder-placeholder focus:outline focus:outline-themetext placeholder:text-Comet focus:border-primarBtn hover:border-SpaceCadet ${className}  ${
        error && 'border-GlowingBrakeDisc placeholder:text-GlowingBrakeDisc'
      }`}
      name={name}
      id={id}
      rows={rows}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
    {helperText && (
      <p className='absolute -bottom-3 ml-4 text-GlowingBrakeDisc text-xs'>{helperText}</p>
    )}
  </div>
)

export default TextArea

TextArea.defaultProps = {
  placeholder: '',
  id: '',
  name: '',
  className: '',
  value: '',
  error: false,
  handleChange: function test() {},
  helperText: '',
}
