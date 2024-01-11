export const getArticles = (messageContent: string): string[] => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const links = messageContent.match(urlRegex) ?? [];
  return filterBlockedDomains(links);
};
/**
 * Websites whose the bot should ignore
 * */
const BLOCKED_DOMAINS = ['twitter.com', 'google.com'];

function filterBlockedDomains(links: string[]) {
  return links.filter(isNotBlocked);
}

function isNotBlocked(link: string) {
  const hasBlockedDomain = BLOCKED_DOMAINS.reduce(
    (acc, domain) => acc || link.includes(domain),
    false,
  );
  return !hasBlockedDomain;
}
