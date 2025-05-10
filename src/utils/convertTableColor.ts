import {
  AccentColorsEnumType,
  AccentColorsTableBgType,
  AccentColorsType
} from '@types'

type ColorConvertObjType = {
  [key in AccentColorsEnumType]: AccentColorsTableBgType
}

export function convertTableColor(
  color: AccentColorsType | undefined
): AccentColorsTableBgType {
  const colorConvertObj: ColorConvertObjType = {
    [AccentColorsEnumType.green]: AccentColorsTableBgType.table_success,
    [AccentColorsEnumType.red]: AccentColorsTableBgType.table_danger,
    [AccentColorsEnumType.yellow]: AccentColorsTableBgType.table_warning,
    [AccentColorsEnumType.blue]: AccentColorsTableBgType.table_info
  }

  if (color) {
    return colorConvertObj[color]
  }

  return colorConvertObj['blue']
}
