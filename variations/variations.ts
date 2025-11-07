interface IVariation {
  key: string;
  filter?: string; // used as header and as songbook shorthand
  name: string;
  title: string;
  itunesId: string;
  navbar: { path: string; icon: string; label: string }[];
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
    navbar: [{ path: '/o-zpevniku', icon: 'info', label: 'O zpěvníku' }],
    showLiturgyApproval: true,
  },
  {
    key: 'ez',
    filter: 'ez',
    name: 'Evangelický zpěvník',
    title: 'Evangelický zpěvník',
    itunesId: '6502984934',
    navbar: [
      { path: '/o-zpevniku', icon: 'info', label: 'O zpěvníku' },
      { path: '/materialy', icon: 'description', label: 'Materiály' },
    ],
    songbook: 58,
    hideTags: true,
    hideAuthorSearch: true,
  },
  {
    key: 'ek',
    filter: 'ek',
    name: 'Evangelický kancionál',
    title: 'Evangelický kancionál',
    itunesId: '',
    navbar: [{ path: '/o-projektu', icon: 'info', label: 'O projektu' }],
    songbook: 63,
    hideTags: true,
    hideAuthorSearch: true,
  },
];

export default variations;
