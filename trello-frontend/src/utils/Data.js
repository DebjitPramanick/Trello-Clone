
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

const data1 = {
    "name": "Debjit Pramanick",
    "email": "debjitpramanick1@gmail.com",
    "lists": [
        {
            "title": "Sample List 1",
            "cards": [
                {
                    "title": "Coding",
                    "content": "I have to learn coding tommorow.",
                    "dateAdded": "10 Feb, 2021"
                },
                {
                    "title": "Study",
                    "content": "I have to study a lot today.",
                    "dateAdded": "9 Feb, 2021"
                },
                {
                    "title": "Eating",
                    "content": "I have to wat at 12 PM.",
                    "dateAdded": "10 Feb, 2021"
                },
                {
                    "title": "Meeting",
                    "content": "I have a meeting at 5 PM.",
                    "dateAdded": "11 Feb, 2021"
                },
            ],
        },

        {
            "title": "Sample List 2",
            "cards": [
                {
                    "title": "Coding",
                    "content": "I have to learn coding tommorow.",
                    "dateAdded": "10 Feb, 2021"
                },
                {
                    "title": "Meeting",
                    "content": "I have a meeting at 5 PM.",
                    "dateAdded": "11 Feb, 2021"
                },
            ],
        },
    ],
}

export default data;