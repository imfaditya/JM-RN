import React, {FC, PropsWithChildren} from 'react';
import {Pressable, View} from 'react-native';
import Collapsible from 'react-native-collapsible';

type Props = {
  trigger: React.ReactNode;
  callbackTrigger: () => void;
  open: boolean;
};

export const Accordion: FC<PropsWithChildren<Props>> = ({
  trigger,
  children,
  callbackTrigger,
  open,
}) => {
  const toggleOpen = () => {
    callbackTrigger();
  };

  return (
    <View>
      <Pressable onPress={toggleOpen}>{trigger}</Pressable>
      <Collapsible duration={200} collapsed={!open}>
        {children}
      </Collapsible>
    </View>
  );
};
