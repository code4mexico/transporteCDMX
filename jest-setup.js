import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

__DEV__ = false

configure({ adapter: new Adapter() })
