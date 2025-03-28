import {forwardRef, PropsWithChildren, useCallback} from 'react';
import {
  BottomSheetModal as GorhomBottomSheet,
  BottomSheetModalProps,
  BottomSheetBackdropProps,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

export const BottomSheetModal = forwardRef<
  GorhomBottomSheet,
  PropsWithChildren<BottomSheetModalProps>
>(({children}, ref) => {
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.25}
      />
    ),
    [],
  );

  return (
    <GorhomBottomSheet
      maxDynamicContentSize={1000}
      enableDynamicSizing
      ref={ref}
      backdropComponent={renderBackdrop}>
      {children}
    </GorhomBottomSheet>
  );
});
