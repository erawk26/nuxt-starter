import { company } from '~/site.info.js'
export const state = () => ({
  siteInfo: {
    company
  },
  menus: {
    main: [
      {
        external: false,
        icon: 'home',
        title: 'Intro',
        to: '/'
      },
      {
        external: false,
        icon: 'home',
        title: 'Services',
        to: '/services'
      },
      {
        external: false,
        icon: 'home',
        title: 'Contact',
        to: '/contact'
      },
      {
        external: false,
        icon: 'home',
        title: 'About',
        to: '/about'
      },
      {
        external: false,
        title: 'Projects',
        to: '/projects'
      },
      {
        external: true,
        icon: 'mdi-file-pdf',
        title: 'Resume',
        href: './XXX_Resume.pdf'
      }
    ],
    footer: [
      {
        external: false,
        icon: 'mail_outline',
        to: '/contact',
        title: company.email
      },
      {
        external: true,
        icon: 'mdi-linkedin',
        href: `https://www.linkedin.com/in/${company.linkedin}`,
        title: 'LinkedIn'
      },
      {
        external: true,
        icon: 'mdi-facebook',
        href: `https://www.facebook.com/${company.facebook}`,
        title: 'FaceBook'
      },
      {
        external: true,
        icon: 'mdi-twitter',
        href: `https://twitter.com/${company.twitter}`,
        title: 'Twitter'
      },
      {
        external: true,
        icon: 'mdi-instagram',
        href: `https://www.instagram.com/${company.instagram}`,
        title: 'Instagram'
      }
    ]
  }
})

export const mutations = {
  SET_STATE(state, payload) {
    state[payload.key] = payload.data
  },
  ADD_SUBMENU(state, payload) {
    const i = state.menus.main.map((x) => x.to).indexOf(payload.key)
    state.menus.main[i].submenu = payload.menu.map((x) => ({
      external: false,
      icon: null,
      title: x.title,
      to: payload.key + '/' + x.slug
    }))
  }
}
