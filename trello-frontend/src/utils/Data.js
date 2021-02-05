
const cards = [
    {
        id: 'card-1',
        date: '29 Jan, 2021',
        title: 'Learning how to cook',
    },
    {
        id: 'card-2',
        date: '14 Jan, 2021',
        title: 'Making sandwich',
    },
    {
        id: 'card-3',
        date: '24 Jan, 2021',
        title: 'Taking the trash out',
    },
];

const data = {
    lists: {
        'list_1': {
            id: 'list_1',
            title: 'Todo',
            cards,
        },
        
    },
    listIds: ['list_1'],
};

export default data;