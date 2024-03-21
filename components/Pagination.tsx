import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';
import {usePagination} from '../hooks/usePagination';

interface PaginationProps {
  setCurrentPage: any;
  totalCount: number;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  setCurrentPage,
  totalCount,
  currentPage,
}) => {
  const pageSize = 10;
  const lastPage = Math.ceil(totalCount / pageSize);
  const paginationRange: any = usePagination({
    currentPage,
    totalCount,
    pageSize
  });

  const onNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const onPrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  // let lastPage = paginationRange[paginationRange.length - 1];
  // console.log(lastPage);

  return (
    <View style={[styles.paginationContainer]}>
      <TouchableOpacity
        testID='leftArrow'
        style={[styles.paginationItem, {opacity: currentPage === 1 ? 0.5 : 1}]}
        onPress={onPrevious}
        disabled={currentPage === 1}>
        <IconButton icon="arrow-left" />
      </TouchableOpacity>
      {paginationRange.map((pageNumber: any, index: any) => {
        if (pageNumber === 'DOTS') {
          return (
            <Text testID={`dots-${index}`} key={index} style={styles.paginationItem}>
              ...
            </Text>
          );
        }
        return (
          <TouchableOpacity
          testID={`currentpg-${pageNumber}`}
          // testID='currentpg-0'
            key={index}
            style={[
              styles.paginationItem,
              {
                backgroundColor:
                  pageNumber === currentPage ? '#836096' : '#FFF3DA',
              },
            ]}
            onPress={() => setCurrentPage(pageNumber)}>
            <Text
              style={[
                styles.pageNumber,
                {color: pageNumber === currentPage ? 'white' : 'black'},
              ]}>
              {pageNumber}
            </Text>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity
      testID='rightArrow'
        style={[
          styles.paginationItem,
          {opacity: currentPage === lastPage ? 0.5 : 1},
        ]}
        onPress={onNext}
        disabled={currentPage === lastPage}>
        <IconButton icon="arrow-right" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DFCCFB',
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 30,
  },
  paginationItem: {
    fontSize: 20,
    paddingHorizontal: 3,
    marginHorizontal: 3,
    color: 'black',
  },
  pageNumber: {
    fontSize: 20,
  },
});

export default Pagination;

