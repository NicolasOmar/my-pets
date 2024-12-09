import React from 'react'
// COMPONENTS
import BasicFrame from '../../organisms/BasicFrame'
import FormLayout from '../../organisms/FormLayout'
import { ProgressBar } from 'reactive-bulma'
import { TitleProps } from 'reactive-bulma/dist/interfaces/atomProps'
import { FormLayoutProps } from '@interfaces/components'

interface FormTemplateProps extends FormLayoutProps {
  header?: TitleProps
  isFetching: boolean
}

const FormTemplate: React.FC<FormTemplateProps> = ({
  header,
  isLoading,
  isFetching = false,
  errors,
  inputs,
  buttons,
  onSubmit
}) => {
  const formConfig: FormLayoutProps = {
    isLoading,
    errors,
    inputs,
    buttons,
    onSubmit: onSubmit ?? undefined
  }

  return (
    <BasicFrame
      {...{
        header,
        children: isFetching ? (
          <ProgressBar key="form-progressBar" />
        ) : (
          <FormLayout key="form-layout" {...formConfig} />
        )
      }}
    />
  )
}

export default FormTemplate