import {
  AccentColorsEnumType,
  AccentColorsTextType,
  AccentColorsType
} from '@types'

type ColorConvertObjType = {
  [key in AccentColorsEnumType]: AccentColorsTextType
}

export function convertTextColor(
  color: AccentColorsType | undefined
): AccentColorsTextType {
  const colorConvertObj: ColorConvertObjType = {
    [AccentColorsEnumType.green]: AccentColorsTextType.text_success,
    [AccentColorsEnumType.red]: AccentColorsTextType.text_danger,
    [AccentColorsEnumType.yellow]: AccentColorsTextType.text_warning,
    [AccentColorsEnumType.blue]: AccentColorsTextType.text_info
  }

  if (color) {
    return colorConvertObj[color]
  }

  return colorConvertObj['blue']
}
