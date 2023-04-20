import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#1b1b1b" barStyle="light-content" translucent={false} />
      <Routes />
    </NavigationContainer>
  );
}