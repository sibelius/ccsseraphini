export const getArticles = (messageContent: string): string[] => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const links = messageContent.match(urlRegex) ?? [];
  return filterBlockedDomains(links);
};
