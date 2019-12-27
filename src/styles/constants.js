import { Dimensions } from 'react-native'
import { colors } from './colors'

const rem = 17
const halfRem = 8.5
const { windowWidth, windowHeight } = Dimensions.get('window')
const fullPercentage = '100%'

// Spacing
const spacers = {
  spaceLv0: 0,
  spaceLv1: rem * 0.33,
  spaceLv2: rem * 0.66,
  spaceLv3: rem,
  spaceLv4: rem * 1.33,
  spaceLv5: rem * 1.66,
  spaceLv6: rem * 2,
  spaceLv7: rem * 3,
  spaceLv8: rem * 6,
}

// Borders
const borders = {
  border: 1,
  borderLG: 2,
  borderRadius: halfRem,
  halfBorderRadius: halfRem / 2,
  bottomBorder: { borderBottomWidth: 1, borderBottomColor: colors.lightGray },
}

// Flex
const flex = {
  flexDRow: { flexDirection: 'row' },
  flexDColumn: { flexDirection: 'column' },
  flex0: { flex: 0 },
  flex1: { flex: 1 },
  flex2: { flex: 2 },
  flex3: { flex: 3 },
  flex4: { flex: 4 },
  flex5: { flex: 5 },
  flexWrap: { flexWrap: 'wrap' },
  flexSpaceBetween: { justifyContent: 'space-between' },
}

// Layout

const layout = {
  // Flex
  ...flex,

  // Border
  ...borders,

  // Dimensions
  fullRelativeWidth: { width: fullPercentage },
  fullRelativeHeight: { height: fullPercentage },
  fullAbsoluteWidth: { width: windowWidth },
  fullAbsoluteHeight: { height: windowHeight },

  // Positioning
  positionAbsolute: 'absolute',
  alignItemsCenter: { alignItems: 'center' },
  textAlignCenter: { textAlign: 'center' },
  justifyContentCenter: { justifyContent: 'center' },
  spaceBetween: { justifyContent: 'space-between' },
  centerChild: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Visibility
  displayNone: { opacity: 0 },
  displayBlock: { opacity: 1 },

  // z-Index Level
  zIndex5: 5,
  zIndex10: 10,
}

export { spacers, borders, flex, layout }
