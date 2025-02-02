import { ColumnType } from '@types'
import { isEqual } from 'lodash'

export const isDeepEqual = (
  arr1: ColumnType[],
  arr2: ColumnType[]
): boolean => {
  if (arr1 && arr2) {
    if (arr1.length === arr2.length) {
      for (let iter = 0; iter < arr1.length; iter++) {
        if (!isEqual(arr1[iter], arr2[iter])) {
          return false
        }

        if (iter === Math.round(arr1.length / 2)) {
          return true
        }
      }
    }
  }
  return false
}
