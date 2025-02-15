import React, { useCallback } from 'react'

import type { Props } from './types'

import { text } from '../../../../../fields/validations'
import { useConfig } from '../../../utilities/Config'
import { useLocale } from '../../../utilities/Locale'
import useField from '../../useField'
import withCondition from '../../withCondition'
import { isFieldRTL } from '../shared'
import TextInput from './Input'

const Text: React.FC<Props> = (props) => {
  const {
    name,
    admin: {
      className,
      condition,
      description,
      placeholder,
      readOnly,
      rtl,
      style,
      width,
      components: { Error, Label, BeforeInput, AfterInput } = {},
    } = {},
    inputRef,
    label,
    localized,
    maxLength,
    minLength,
    path: pathFromProps,
    required,
    validate = text,
  } = props

  const path = pathFromProps || name
  const locale = useLocale()

  const { localization } = useConfig()
  const isRTL = isFieldRTL({
    fieldLocalized: localized,
    fieldRTL: rtl,
    locale,
    localizationConfig: localization || undefined,
  })

  const memoizedValidate = useCallback(
    (value, options) => {
      return validate(value, { ...options, maxLength, minLength, required })
    },
    [validate, minLength, maxLength, required],
  )

  const { errorMessage, setValue, showError, value } = useField<string>({
    condition,
    path,
    validate: memoizedValidate,
  })

  return (
    <TextInput
      className={className}
      description={description}
      errorMessage={errorMessage}
      inputRef={inputRef}
      label={label}
      name={name}
      onChange={(e) => {
        setValue(e.target.value)
      }}
      path={path}
      placeholder={placeholder}
      readOnly={readOnly}
      required={required}
      rtl={isRTL}
      showError={showError}
      style={style}
      value={value}
      width={width}
      Error={Error}
      Label={Label}
      BeforeInput={BeforeInput}
      AfterInput={AfterInput}
    />
  )
}

export default withCondition(Text)
