import {useMemo} from 'react';

interface PaginationOptions {
  totalCount: number;
  currentPage: number;
  pageSize: number;
}

export const usePagination = ({totalCount, currentPage, pageSize}: PaginationOptions) => {
  const DOTS = 'DOTS';
  const siblingCount = 1;
  // const pageSize = 10;

  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({length}, (_, index) => index + start);
  };

  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);
    // totalPageCount will give us required number of pages according to results
    // (if we have 50 results it will divide it by 10 we get our results divided into 5 pages with each page containing 10 results)
    const totalPageNumbers = siblingCount + 5;
    // totalPageNumbers will show how many pages to be displayed initially like I have set it to 5 + 1

    // If the number of pages are less or equal to total page count (if we get 5 as total pages available it will show range from 1 to 5 as it is..)
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    // We Calculate left sibling index (as we already have firstpage (1) and we know currentpage, we find max value)
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    // if current page is 5 then 5 - 1 = 4 Max value between (4, 1) is 4

    // We Calculate right sibling index (as we already have totalpagecount (10) and we know currentpage, we find min value)
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount,
    );
    // If current page is 5 then 5 + 1 = 6 Min value between (6, 10) here is 6

    // We do not show dots when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount.
    // Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
    const shouldShowLeftDots = leftSiblingIndex > 2; // here 4 is greater than 2 it will show left dots
    const shouldShowRightDots = rightSiblingIndex <= totalPageCount - 2; // here 6 less than 8 it will show right dots

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      // if there is no left dots present, but right dots are present
      let leftItemCount = 3 + 2 * siblingCount; // here 3 denotes (currentPage, firstPage, totalPage) and 2 is multiplied by siblingCount (1)
      // let leftItemCount = 5;
      let leftRange = range(1, leftItemCount); // [1, 2, 3, 4, 5]

      return [...leftRange, DOTS, lastPageIndex]; // [1, 2, 3, 4, 5, ..., 10]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      // if there is no left dots present, but right dots are present
      let rightItemCount = 3 + 2 * siblingCount; //here 3 denotes (currentPage, firstPage, totalPage) and 2 is multiplied by siblingCount (1)
      // let rightItemCount = 5;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount, // rightRange = [6, 7, 8, 9, 10]
      );
      return [firstPageIndex, DOTS, ...rightRange]; // [1, ..., 6, 7, 8, 9, 10]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      // Both left and right dots to be shown if selected page is inbetween the range
      let middleRange = range(leftSiblingIndex, rightSiblingIndex); // [4, 5, 6] // 5 is selected
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]; // [1, ..., 4, 5, 6, ..., 10]
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};
