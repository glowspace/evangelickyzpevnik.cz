export default function getReportLink(type, statusCode) {
  const { siteUrl } = useRuntimeConfig()?.public;
  const route = useRoute();
  const types = {
    general: 'group/6/create/20',
    song: 'group/1/create/19',
    author: 'group/1/create/21',
  };
  var url = 'https://glowspace.atlassian.net/servicedesk/customer/portal/1/';
  url += types[type ?? 'general'];
  url += '?customfield_10056=' + encodeURIComponent(siteUrl + route.fullPath);

  if (statusCode != null) {
    url += `&summary=Chyba+webu+(${statusCode})`;
  }

  return url;
}
