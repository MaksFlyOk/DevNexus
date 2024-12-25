import {
  AccentColorsEnumType,
  AccentColorsTextBgType,
  AccentColorsType
} from '@types'

type ColorConvertObjType = {
  [key in AccentColorsEnumType]: AccentColorsTextBgType
}

export function convertBgColor(
  color: AccentColorsType
): AccentColorsTextBgType {
  const colorConvertObj: ColorConvertObjType = {
    [AccentColorsEnumType.green]: AccentColorsTextBgType.text_bg_success,
    [AccentColorsEnumType.red]: AccentColorsTextBgType.text_bg_danger,
    [AccentColorsEnumType.yellow]: AccentColorsTextBgType.text_bg_warning,
    [AccentColorsEnumType.blue]: AccentColorsTextBgType.text_bg_info
  }

  return colorConvertObj[color]
}
