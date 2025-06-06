import {
  AccentColorsBorderType,
  AccentColorsEnumType,
  AccentColorsType
} from '@types'

type ColorConvertObjType = {
  [key in AccentColorsEnumType]: AccentColorsBorderType
}

export function convertBorderColor(
  color: AccentColorsType | undefined
): AccentColorsBorderType {
  const colorConvertObj: ColorConvertObjType = {
    [AccentColorsEnumType.green]: AccentColorsBorderType.border_success,
    [AccentColorsEnumType.red]: AccentColorsBorderType.border_danger,
    [AccentColorsEnumType.yellow]: AccentColorsBorderType.border_warning,
    [AccentColorsEnumType.blue]: AccentColorsBorderType.border_info
  }

  if (color) {
    return colorConvertObj[color]
  }

  return colorConvertObj['blue']
}
