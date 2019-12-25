import 'react-native-gesture-handler'
import { AppRegistry, YellowBox } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App)

YellowBox.ignoreWarnings(['Remote debugger'])
