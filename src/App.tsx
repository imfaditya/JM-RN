import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

import './global.css';
import {HomeScreen} from './screens/Home';

// The requirement doesnt need multiple pages, so I'm not set up the navigation
function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView className="flex-1">
        <BottomSheetModalProvider>
          <HomeScreen />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
