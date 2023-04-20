import { View, StatusBar } from 'react-native';

import SignIn from './src/pages/SignIn';

export default function App() {
  return (
    <View>
      <StatusBar backgroundColor="#1b1b1b" barStyle="light-content" translucent={false} />
      <SignIn />
    </View>
  );
}