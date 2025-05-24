import {
  AccentColorsButtonOutlineType,
  AccentColorsEnumType,
  AccentColorsType
} from '@types'

type ColorConvertObjType = {
  [key in AccentColorsEnumType]: AccentColorsButtonOutlineType
}

export function convertButtonOutlineColor(
  color: AccentColorsType | undefined
): AccentColorsButtonOutlineType {
  const colorConvertObj: ColorConvertObjType = {
    [AccentColorsEnumType.green]:
      AccentColorsButtonOutlineType.button_outline_success,
    [AccentColorsEnumType.red]:
      AccentColorsButtonOutlineType.button_outline_danger,
    [AccentColorsEnumType.yellow]:
      AccentColorsButtonOutlineType.button_outline_warning,
    [AccentColorsEnumType.blue]:
      AccentColorsButtonOutlineType.button_outline_info
  }

  if (color) {
    return colorConvertObj[color]
  }

  return colorConvertObj['blue']
}
