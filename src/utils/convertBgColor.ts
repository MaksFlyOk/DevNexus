import {
  AccentColorsEnumType,
  AccentColorsTextBgType,
  AccentColorsType
} from '@types'

enum PrimaryEnumColorType {
  primary = 'primary'
}

type AccentColorsEnumWithPrimaryColorType =
  | AccentColorsEnumType
  | PrimaryEnumColorType

enum PrimaryEnumColorTextBgType {
  text_bg_primary = 'text-bg-primary'
}

type AccentColorsWithPrimaryTextBgType =
  | AccentColorsTextBgType
  | PrimaryEnumColorTextBgType

type ColorConvertObjType = {
  [key in AccentColorsEnumWithPrimaryColorType]: AccentColorsWithPrimaryTextBgType
}

const AccentColorsWithPrimaryEnumType = {
  ...AccentColorsEnumType,
  ...PrimaryEnumColorType
} as const

const AccentColorsWithPrimaryTextBgType = {
  ...AccentColorsTextBgType,
  ...PrimaryEnumColorTextBgType
}

// text_bg_primary = 'text_bg_primary'

export function convertBgColor(
  color: AccentColorsType | 'primary' | undefined
): AccentColorsWithPrimaryTextBgType {
  const colorConvertObj: ColorConvertObjType = {
    [AccentColorsWithPrimaryEnumType.green]:
      AccentColorsWithPrimaryTextBgType.text_bg_success,
    [AccentColorsWithPrimaryEnumType.red]:
      AccentColorsWithPrimaryTextBgType.text_bg_danger,
    [AccentColorsWithPrimaryEnumType.yellow]:
      AccentColorsWithPrimaryTextBgType.text_bg_warning,
    [AccentColorsWithPrimaryEnumType.blue]:
      AccentColorsWithPrimaryTextBgType.text_bg_info,
    [AccentColorsWithPrimaryEnumType.primary]:
      AccentColorsWithPrimaryTextBgType.text_bg_primary
  }

  if (color) {
    return colorConvertObj[color]
  }

  return colorConvertObj['blue']
}
