import {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import Bootsplash from 'react-native-bootsplash';

import {HomeScreen} from './screens/Home';

import {ModalLoading} from './components/ModalLoading';

import './global.css';

// The requirement doesnt need multiple pages, so I'm not set up the navigation
function App(): React.JSX.Element {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        await Bootsplash.hide({fade: true});
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  if (loading) {
    return <ModalLoading visible />;
  }

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
