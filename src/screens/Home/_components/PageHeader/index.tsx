import {FC} from 'react';
import {Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const PageHeader: FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <View className="bg-jm-red pb-5" style={{paddingTop: insets.top + 5}}>
      <Text className="text-center text-white font-bold text-3xl">
        Jokes <Text className="text-jm-yellow">App</Text>
      </Text>
    </View>
  );
};
