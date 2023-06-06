import React from 'react'
import UserHeader from '.'
import { MockedProvider } from '@apollo/client/testing'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
// REDUX
import reducers from '../../../redux/reducers'
// MOCKS
import { testConfig } from './index.mocks.json'

export default {
  title: 'MyPets/Templates/UserHeader',
  component: UserHeader,
  args: { name: testConfig.name }
}

const Template = args => (
  <Provider store={configureStore({ reducer: reducers })}>
    <MockedProvider mocks={[]} addTypename={false}>
      <UserHeader {...args} />
    </MockedProvider>
  </Provider>
)

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const LongName = Template.bind({})
LongName.storyName = 'Long Name'
LongName.args = {
  name: 'UserNameIsReally Long'
}
