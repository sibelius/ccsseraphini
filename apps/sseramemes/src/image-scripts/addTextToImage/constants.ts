import sharp from 'sharp';

export const POSITIONS = {
  'top-left': {
    x: 0.05,
    y: 0.05,
  },
  'top-center': {
    x: 0.3,
    y: 0.05,
  },
  'top-right': {
    x: 0.7,
    y: 0.05,
  },
  'middle-left': {
    x: 0.05,
    y: 0.3,
  },
  'middle-center': {
    x: 0.4,
    y: 0.4,
  },
  'middle-right': {
    x: 0.7,
    y: 0.3,
  },
  'bottom-left': {
    x: 0.05,
    y: 0.7,
  },
  'bottom-center': {
    x: 0.3,
    y: 0.7,
  },
  'bottom-right': {
    x: 0.7,
    y: 0.7,
  },
} as const;
export const LOCATIONS = {
  // sharp binds
  north: sharp.gravity.north,
  northeast: sharp.gravity.northeast,
  west: sharp.gravity.west,
  centre: sharp.gravity.center,
  east: sharp.gravity.east,
  southwest: sharp.gravity.southwest,
  south: sharp.gravity.south,
  southeast: sharp.gravity.southeast,
  nil: 3.14, // weird number just to be sure that it will not be used
} as const;
export const WHITE_FONT = 'white';
export const BLACK_FONT = 'black';
export const SIZE = {
  small: 1,
  medium: 1.3,
  large: 1.6,
  xlarge: 2,
};
export const TEXT_COLORS = {
  'small-white': {
    font: WHITE_FONT,
    size: SIZE.small,
  },
  'medium-white': {
    font: WHITE_FONT,
    size: SIZE.medium,
  },
  'large-white': {
    font: WHITE_FONT,
    size: SIZE.large,
  },
  'xlarge-white': {
    font: WHITE_FONT,
    size: SIZE.xlarge,
  },
  'small-black': {
    font: BLACK_FONT,
    size: SIZE.small,
  },
  'medium-black': {
    font: BLACK_FONT,
    size: SIZE.medium,
  },
  'large-black': {
    font: BLACK_FONT,
    size: SIZE.large,
  },
  'xlarge-black': {
    font: BLACK_FONT,
    size: SIZE.xlarge,
  },
} as const;
export type Positions = typeof POSITIONS;
export type TextColors = typeof TEXT_COLORS;
export type Locations = typeof LOCATIONS;
