
const cards = [
    {
        id: 'card-1',
        title: 'Learning how to cook',
    },
    {
        id: 'card-2',
        title: 'Making sandwich',
    },
    {
        id: 'card-3',
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