import clsx from 'clsx';
import {FC} from 'react';
import {Image, Pressable, View} from 'react-native';
import {Text} from 'react-native-gesture-handler';

import {ChevronDown} from '@/assets/icons';

type Props = {
  title: string;
  order: number;
  goToTop: () => void;
  isOpen?: boolean;
};

export const JokesListHeader: FC<Props> = ({title, order, goToTop, isOpen}) => {
  return (
    <View
      className={clsx(
        'flex-row items-center justify-between border border-jm-gray py-2 px-3 rounded-md',
        isOpen && 'rounded-b-none bg-jm-gray-light/20',
      )}>
      <View className="flex-row items-center gap-2">
        <Text className="text-xl font-bold">{order}</Text>
        <Text className="text-xl font-bold capitalize">{title}</Text>
      </View>
      <View className="flex-row items-center gap-2">
        {order === 1 ? (
          <Text className="py-2 px-3 bg-jm-gray-light rounded-md text-sm font-semibold">
            Top
          </Text>
        ) : (
          <Pressable
            onPress={goToTop}
            className="bg-jm-blue py-2 px-3 rounded-md">
            <Text className="text-white text-sm font-semibold">Go Top</Text>
          </Pressable>
        )}
        <Image
          source={ChevronDown}
          key={`chevron-${order}-${title}`}
          className={clsx('w-7 h-7 rotate-0', isOpen && 'rotate-180')}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};
