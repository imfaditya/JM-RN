import {FC, useState} from 'react';
import {FlatList, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Accordion} from '@/components/Accordion';
import {ModalLoading} from '@/components/ModalLoading';
import {BasicSkeleton} from '@/components/BasicSkeleton';

import {useCategoriesData} from '@/hooks/useCategoriesData';
import {useJokesData} from '@/hooks/useJokesData';

import {JokesListHeader} from './_components/JokesListHeader';
import {JokesListContent} from './_components/JokesListContent';
import {PageHeader} from './_components/PageHeader';

export const HomeScreen: FC = () => {
  const [activeAccordionIdx, setActiveAccordionIdx] = useState<number | null>(
    null,
  );

  const {
    loading: loadingCategory,
    categories,
    refetch: refetchCategory,
  } = useCategoriesData();

  const {
    loading: loadingJokes,
    fetching: fetchingJokes,
    jokesData,
    goToTop,
    fetchMore,
  } = useJokesData({
    categories,
  });

  return (
    <SafeAreaView className="flex-1" edges={['bottom', 'left', 'right']}>
      <PageHeader />
      {loadingCategory || loadingJokes ? (
        <BasicSkeleton
          count={5}
          className="w-full h-14 rounded-md"
          containerClassName="flex-col gap-2 p-5"
        />
      ) : (
        <FlatList
          className="m-5"
          refreshing={fetchingJokes}
          onRefresh={() => {
            refetchCategory();
          }}
          data={jokesData}
          keyExtractor={item => `${item.order}-${item.category}`}
          ItemSeparatorComponent={() => <View className="h-2" />}
          renderItem={({item, index}) => {
            const isOpen = activeAccordionIdx === index;
            const {
              order,
              category,
              canLoadMore,
              data: {jokes},
            } = item;

            return (
              <Accordion
                callbackTrigger={() =>
                  setActiveAccordionIdx(prev => (prev === index ? null : index))
                }
                open={isOpen}
                trigger={
                  <JokesListHeader
                    order={order}
                    isOpen={isOpen}
                    title={category}
                    goToTop={() => {
                      goToTop(order);
                      setActiveAccordionIdx(null);
                    }}
                  />
                }>
                <JokesListContent
                  canLoadMore={canLoadMore}
                  jokes={jokes ?? []}
                  isLoading={isOpen ? fetchingJokes : false}
                  loadMore={() => {
                    fetchMore(category);
                  }}
                />
              </Accordion>
            );
          }}
        />
      )}
      <ModalLoading visible={loadingCategory} />
    </SafeAreaView>
  );
};
