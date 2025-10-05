interface IVariation {
  key: string;
  filter?: string; // used as header and as songbook shorthand
  name: string;
  title: string;
  itunesId: string;
  songbook?: number;
  hideTags?: boolean;
  hideAuthorSearch?: boolean;
  showLiturgyApproval?: boolean;
}

const variations: IVariation[] = [
  {
    key: 'zps',
    name: 'Zpěvník pro scholy',
    title: 'ProScholy.cz',
    itunesId: '1475375453',
    showLiturgyApproval: true,
  },
  {
    key: 'ez',
    filter: 'ez',
    name: 'Evangelický zpěvník',
    title: 'Evangelický zpěvník',
    itunesId: '6502984934',
    songbook: 58,
    hideTags: true,
    hideAuthorSearch: true,
  },
];

export default variations;
