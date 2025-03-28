import {FC, useRef, useState} from 'react';
import {Image, Pressable, View} from 'react-native';
import {Text} from 'react-native-gesture-handler';

import {TJokeRecord} from '@/types/jokeApi';

import {Loader} from '@/assets/gifs';
import {BottomSheetModal} from '@/components/BottomSheetModal';
import {
  BottomSheetView,
  BottomSheetModal as GorhomBottomSheet,
} from '@gorhom/bottom-sheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  jokes: TJokeRecord[];
  loadMore: () => void;
  canLoadMore: boolean;
  isLoading: boolean;
};

export const JokesListContent: FC<Props> = ({
  jokes,
  loadMore,
  canLoadMore,
  isLoading,
}) => {
  const insets = useSafeAreaInsets();
  const viewDetailBottomSheet = useRef<GorhomBottomSheet>(null);
  const [selectedJoke, setSelectedJoke] = useState<TJokeRecord | null>(null);

  const handleViewDetail = (joke: TJokeRecord) => {
    setSelectedJoke(joke);
    viewDetailBottomSheet.current?.present();
  };

  const handleClose = () => {
    setSelectedJoke(null);
    viewDetailBottomSheet.current?.dismiss();
  };

  return (
    <>
      <View className="flex">
        {jokes.map((joke, index) => (
          <Pressable
            className="border-y border-t-0 border-x py-2 px-3 border-jm-gray"
            onPress={() => handleViewDetail(joke)}
            key={index}>
            <Text>{joke?.joke}</Text>
          </Pressable>
        ))}
        {canLoadMore && (
          <Pressable
            className="border-b border-jm-gray border-x py-2"
            onPress={loadMore}>
            {isLoading ? (
              <Image
                source={Loader}
                resizeMode="contain"
                className="w-6 h-6 mx-auto"
              />
            ) : (
              <Text className="text-center font-semibold">Load More</Text>
            )}
          </Pressable>
        )}
      </View>
      <BottomSheetModal
        ref={viewDetailBottomSheet}
        onChange={index => {
          if (index === -1) {
            handleClose();
          }
        }}>
        <BottomSheetView
          className="px-5 pt-5"
          style={{
            paddingBottom: insets.bottom + 20,
          }}>
          <View className="flex-col gap-2 mb-5">
            <Text className="font-semibold">
              Category {selectedJoke?.category}
            </Text>
            <Text className="font-semibold">
              Language <Text className="uppercase">{selectedJoke?.lang}</Text>
            </Text>
            <View className="flex-row gap-2 flex-wrap">
              {Object.entries(selectedJoke?.flags ?? {})?.map(value => (
                <Text className="capitalize px-2 py-1 bg-jm-gray-light rounded-md">
                  {value}
                </Text>
              ))}
            </View>
          </View>

          <Text>{selectedJoke?.joke}</Text>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};
