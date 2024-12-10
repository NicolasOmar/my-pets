// COMPONENTS
import { Card, Column, ColumnGroup, Icon, Input, ProgressBar, Title } from 'reactive-bulma'
// INTERFACES
import { CardProps } from 'reactive-bulma/dist/interfaces/organismProps'
import { InputProps, TitleProps } from 'reactive-bulma/dist/interfaces/atomProps'
import React from 'react'
import { ChildrenType } from 'reactive-bulma/dist/types/domTypes'

interface CardListTemplateProps {
  /**`Attribute` `Required` List of `Card` configuration objects that will be displayed */
  cardsListData: CardProps[]
  /** `Attribute` Header configuration object to show a `TitleHeader` above the rest of the components that will compose the template */
  cardsListTitle?: TitleProps
  /** `Attribute` Sets a `BasicInput` config object to make custom search when the user is writing */
  searchInput?: InputProps
  /** `Attribute` Text configuration object to show a `TitleHeader` that will be shown in case there is no data */
  noDataText?: TitleProps
  /** `Styling` Adds a spinner on the form and disable the screen (to avoid additional user behavior with the cards) */
  isFetching?: boolean
  /** `Styling` Will center the list of cards according the screen or a father container */
  centerList?: boolean
}

enum SectionType {
  Section = 'section',
  icon = 'icon',
  title = 'title'
}

interface RenderCardSectionProps {
  type: SectionType
  key: string
  classes: string
  content: any
}

interface RenderCardSectionProps {
  cardSection: ChildrenType | ChildrenType[]
  mapFn: (_sectionContent: ChildrenType | ChildrenType[], _sectionIndex: number) => void
}

// const renderCardSectionContent: (props: RenderCardSectionProps) => React.ReactElement = ({ type, key, classes = null, content }) => {
//   switch (type) {
//     case SectionType.Section:
//       return (
//         <section key={key} className={classes ?? ''}>
//           {content}
//         </section>
//       )
//     case SectionType.icon:
//       return <Icon key={key} {...content} />
//     case SectionType.title:
//       return <Title key={key} {...content} />
//     default:
//       return content ?? null
//   }
// }

const renderCardsGroup: (cardListData: CardProps[]) => React.ReactElement[] = cardsListData =>
  cardsListData?.map((cardData, cardIndex) => <Card key={`card-${cardIndex}`} {...cardData} />) ?? [
    null
  ]

const CardsListTemplate: React.FC<CardListTemplateProps> = ({
  cardsListData,
  cardsListTitle = null,
  searchInput = null,
  noDataText = {
    testId: 'test-no-data-title',
    titleText: 'No data'
  },
  isFetching = false,
  centerList = true
}) => {
  const searchInputConfig = searchInput ? { ...searchInput, value: searchInput.text ?? null } : null
  const noDataConfig = {
    ...noDataText,
    childWidth: 12,
    isCentered: true
  }
  const parseCardsList = () =>
    isFetching
      ? [<ProgressBar key={`card-progress-bar`} isLoading={true} />]
      : cardsListData.length > 0
        ? renderCardsGroup(cardsListData)
        : [<Title key={`card-title-header`} {...noDataConfig} />]

  return (
    <>
      {cardsListTitle ? (
        <Column
          {...{
            _key: 'test-card-list-header',
            testId: 'test-card-list-header',
            width: 12,
            children: [<Title key="cards-title" {...cardsListTitle} />]
          }}
        />
      ) : null}
      {searchInputConfig ? (
        <Column
          {...{
            _key: 'test-card-list-search',
            testId: 'test-card-list-search',
            width: 3,
            isCentered: true,
            style: {
              margin: '0 auto'
            },
            cssClasses: 'pb-4',
            children: [<Input key={`card-basic-input`} {...searchInputConfig} />]
          }}
        />
      ) : null}
      <ColumnGroup
        {...{
          centerGrid: centerList,
          style: {
            margin: '0 2.5%'
          },
          listOfColumns: parseCardsList()
        }}
      />
    </>
  )
}

export default CardsListTemplate
