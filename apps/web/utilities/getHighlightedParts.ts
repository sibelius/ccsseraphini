export const TAG_REPLACEMENT = {
  highlightPreTag: '<mark>',
  highlightPostTag: '</mark>',
};
/**
 * It takes a string and splits it into an array of strings, where each string is either highlighted or not
 * @param {string} highlightedValue - string
 * @returns An array of objects with the value and whether it is highlighted.
 */
export function getHighlightedParts(highlightedValue: string) {
  const { highlightPostTag, highlightPreTag } = TAG_REPLACEMENT;

  const splitByPreTag = highlightedValue.split(highlightPreTag);
  const firstValue = splitByPreTag.shift();
  const elements = !firstValue
    ? []
    : [{ value: firstValue, isHighlighted: false }];

  splitByPreTag.forEach((split) => {
    const splitByPostTag = split.split(highlightPostTag);

    elements.push({
      value: splitByPostTag[0],
      isHighlighted: true,
    });

    if (splitByPostTag[1] !== '') {
      elements.push({
        value: splitByPostTag[1],
        isHighlighted: false,
      });
    }
  });

  return elements;
}
