export function getHttpProtocol(host: string) {
  const httpProtocol = ['localhost', ':3000'].some((t) => host.includes(t))
    ? 'http'
    : 'https';
  return httpProtocol;
}
