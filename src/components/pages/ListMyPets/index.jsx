import React, { useEffect, useState } from 'react'
import './index.scss'
// GRAPHQL CLIENT
import { useQuery } from '@apollo/client'
import { GET_MY_PETS } from '../../../graphql/queries'
// COMPONENTS
import CardDisplayer from '../../templates/CardDisplayer'
import TitleHeader from '../../atoms/TitleHeader'
import { parseBooleanStrings } from '../../../functions/parsers'

const ListMyPets = () => {
  const { loading, data } = useQuery(GET_MY_PETS)
  const [petsInfo, setPetsInfo] = useState([])

  useEffect(() => {
    setPetsInfo(
      data?.getMyPets.map(({ name, petType, isAdopted, hairColors, eyeColors }, i) => {
        const titleName = {
          titleText: name,
          titleSize: 'normal',
          subText: petType.name,
          subSize: 'tiny'
        }
        const parsedEyeColors = `Eyes: ${eyeColors.map(({ name }) => name).join(', ')}`
        const parsedHairColors = `Hair: ${hairColors.map(({ name }) => name).join(', ')}`
        return {
          cardContent: (
            <>
              <TitleHeader {...titleName} />
              {/* <div key={`${i}`}>{birthday && new Date(birthday)}</div> */}
              <div className="card-body" key={`${i}`}>{`Adopted: ${parseBooleanStrings(
                isAdopted,
                'Yes',
                'No'
              )}`}</div>
              {/* <div key={`${i}`}>{adoptionDate}</div> */}
              <div key={`${i}`}>{parsedHairColors}</div>
              <div key={`${i}`}>{parsedEyeColors}</div>
            </>
          ),
          cardFooter: [
            { label: 'Update', link: '/' },
            { label: 'Remove', link: '/' }
          ]
        }
      })
    )
  }, [data])

  return !loading && <CardDisplayer data={petsInfo} />
}

export default ListMyPets
