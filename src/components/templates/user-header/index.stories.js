import UserHeader from '.'
import { MockedProvider } from '@apollo/client/testing'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// REDUX
import store from '../../../redux/reducers'
// MOCKS
import { testConfig } from './index.mocks.json'

export default {
  title: `${STORYBOOK_ROUTES.TEMPLATES}/User Header`,
  component: UserHeader,
  args: { name: testConfig.name }
}

const Template = args => (
  <Provider store={createStore(store)}>
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
