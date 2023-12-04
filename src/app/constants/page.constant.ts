/** Costante per il menù di navigazione laterale */
export const SIDENAV_MENU_CONSTANT = [
  {
    name: 'Spettacoli',
    icon: 'group',
    childrenPath: [
      '/gestionale/utenti/lista'
    ],
    children: [
      {
        wip: false, // Booleana per il controllo se la pagina è in work in progress
        name: 'Tutti gli spettacoli',
        path: '/gestionale/profilo/profilo-admin-spettacoli',
      },
      {
        wip: false, // Booleana per il controllo se la pagina è in work in progress
        name: 'Aggiungi nuovo',
        path: '/gestionale/profilo/aggiungi-spettacolo',
      },
    ],
  },
  {
    name: 'Prenotazioni',
    icon: 'shopping_cart',
    childrenPath: [
      '/gestionale/profilo'
    ],
    children: [
      {
        wip: false, // Booleana per il controllo se la pagina è in work in progress
        name: 'Storico prenotazioni',
        path: '/prenotazione/storico',
      }
    ]
  },
  {
    name: 'Profilo',
    icon: 'group',
    childrenPath: [
      '/gestionale/profilo'
    ],
    children: [
      {
        wip: false, // Booleana per il controllo se la pagina è in work in progress
        name: 'Il mio profilo',
        path: '/gestionale/profilo',
      }
    ]
  }

]
