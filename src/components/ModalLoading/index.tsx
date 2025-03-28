import {FC} from 'react';
import {Image, Modal, View} from 'react-native';

import {Loader} from '@/assets/gifs';

type Props = {
  visible: boolean;
};

export const ModalLoading: FC<Props> = ({visible}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="py-3.5 px-4 bg-white rounded-lg flex items-center justify-center">
          <Image source={Loader} resizeMode="contain" className="w-14 h-14" />
        </View>
      </View>
    </Modal>
  );
};
