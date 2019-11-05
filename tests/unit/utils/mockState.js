export default {
  state: {
    activeTask: null,
    newModalIsOpen: false,
    categories: [
      {
        id: 'c1',
        title: 'Oczekujące',
        tasks: [
          {
            id: '2e037380-d748-12e6-99be-5b4b2b69f7e9',
            categoryId: 'c1',
            description: 'Opis zadania #1',
            type: 'feature',
            status: 'Oczekujące'
          },
          {
            id: '1de39732-f109-11e9-98be-1b5b2a69b7e9',
            categoryId: 'c1',
            description: 'Opis zadania #2',
            type: 'bugfix',
            status: 'Oczekujące'
          },
          {
            id: '8ee39380-d450-32e0-03bb-0b232a69b89a',
            categoryId: 'c1',
            description: 'Opis zadania #3',
            type: 'default',
            status: 'Oczekujące'
          }
        ]
      },
      {
        id: 'c2',
        title: 'W realizacji',
        tasks: []
      },
      {
        id: 'c3',
        title: 'Wykonane',
        tasks: []
      }
    ]
  }
}
