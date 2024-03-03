// The below questions can come from some api

const questionSetOne = [
    {
        id: 1,
        question: "How you feel today?",
        name: 'how_you_feel_today',
        totalVotes: 10,
        options: [
            {
                label: "Brilliant! I have so much energy",
                value: "brilliant",
                votes: 4
            },
            {
                label: "Always can be worse.",
                value: "worse",
                votes: 3
            },
            {
                label: "Please, end my misery.",
                value: "misery",
                votes: 3
            }
        ]
    },
    {
        id: 2,
        question: "How you like the Opinary test?",
        name: 'opinary-test',
        totalVotes: 4,
        options: [
            {
                label: "It was great and so challenging.",
                value: "great-and-challenging",
                votes: 1
            },
            {
                label: "Not bad, but you can improve",
                value: "can-improve",
                votes: 0
            },
            {
                label: "It was a nightmare, never again.",
                value: "nightmare",
                votes: 3
            }
        ]
    },
    // Add more question objects here
];

const questionSetTwo = [
    {
        id: 1,
        question: "What design tool do you use the most?",
        description: "Asked by anonymous by 3 hours ago",
        name: 'design-tool',
        totalVotes: 8,
        options: [
            {
                label: "Photoshop",
                value: "photoshop",
                votes: 3
            },
            {
                label: "Sketch",
                value: "sketch",
                votes: 0
            },
            {
                label: "Adobe XD",
                value: "adobe-xd",
                votes: 5
            },
            {
                label: "Figma",
                value: "figma",
                votes: 0
            }
        ]
    },
    {
        id: 2,
        question: "What's your favorite cartoon?",
        name: 'favorite-cartoon',
        totalVotes: 8,
        options: [
            {
                label: "Tom & Jerry",
                value: "tom-and-jerry",
                votes: 1
            },
            {
                label: "Oswald",
                value: "oswald",
                votes: 2
            },
            {
                label: "Pokemon",
                value: "pokemon",
                votes: 3
            },
            {
                label: "Bey Blade",
                value: "bey-blade",
                votes: 1
            }
        ]
    },
    // Add more question objects here
];

export const pollQuestionsLibrary = {
    1: questionSetOne,
    2: questionSetTwo,
}