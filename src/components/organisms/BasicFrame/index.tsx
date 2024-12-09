import React from 'react'
// COMPONENTS
import { ColumnGroup } from 'reactive-bulma'
import { TitleProps } from 'reactive-bulma/dist/interfaces/atomProps'
import { ChildrenType } from '@interfaces/components'

interface BasicFrameProps {
  header?: TitleProps
  children: ChildrenType
}

const BasicFrame: React.FC<BasicFrameProps> = ({
  // header,
  children = []
}) => {
  // const headerStyles = {
  //   marginTop: '30px',
  //   marginBottom: '15px'
  // }
  // const renderHeader = () =>
  //   header ? (
  //     <>
  //       {header.icon ? <Icon key="header-icon" {...header.icon} /> : null}
  //       {header.title ? (
  //         <TitleHeader key="header-title-header" {...{ ...header.title, style: headerStyles }} />
  //       ) : null}
  //     </>
  //   ) : null

  return (
    <ColumnGroup
      listOfColumns={[
        // { children: header ?? undefined },
        { children }
      ]}
    />
  )
}

export default BasicFrame
