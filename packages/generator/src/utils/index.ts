export * from './appendFileSafely';
export * from './formatFile';
export * from './writeFileSafely';

export const uppercaseFirstLetter = (stringToUppercase: string) =>
  stringToUppercase[0].toUpperCase() + stringToUppercase.slice(1);
