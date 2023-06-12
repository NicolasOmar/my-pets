import React from 'react'
import UserHeader from '.'
import { MockedProvider } from '@apollo/client/testing'
// CONTEXT
import { UserContext } from '../../../context'
// MOCKS
import { testConfig } from './index.mocks.json'

export default {
  title: 'MyPets/Templates/UserHeader',
  component: UserHeader,
  args: { name: testConfig.name }
}

const Template = args => (
  <UserContext.Provider value={{ setUserData: () => { } }}>
    <MockedProvider mocks={[]} addTypename={false}>
      <UserHeader {...args} />
    </MockedProvider>
  </UserContext.Provider>
)

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const LongName = Template.bind({})
LongName.storyName = 'Long Name'
LongName.args = {
  name: 'UserNameIsReally Long'
}
