import {test, expect, describe, beforeEach, afterEach} from 'vitest';
import {JSDOM} from 'jsdom';
import {handlePollOptionClick, getHardcodedPollQuestions, createOption, createPollElement} from '../js/poll-widget';

describe('test poll widget functionality', () => {
    let pollQuestionsFromStorage;
    let copyOfPollQuestions;
    let pollResultsKey;

    beforeEach(() => {
        const dom = new JSDOM('<!DOCTYPE html><html><body><div id="poll-container"></div></body></html>');
        global.document = dom.window.document;
        global.window = dom.window;

        // Initialize variables before each test
        pollQuestionsFromStorage = [
            {
                id: 1,
                totalVotes: 9,
                name: 'mock-data',
                options: [
                    {value: 'option1', votes: 5},
                    {value: 'option2', votes: 4}
                ]
            }
        ];

        copyOfPollQuestions = [...pollQuestionsFromStorage];
        pollResultsKey = 'poll-results-key';
    });

    afterEach(() => {
        delete global.document;
        delete global.window;
    });

    /**
     * @vitest-environment jsdom
     */
    test('createPollElement function creates poll element correctly', () => {
        const questionData = {
            id: 1,
            options: [
                {value: 'option1', votes: 10, label: 'Option 1'},
                {value: 'option2', votes: 5, label: 'Option 2'}
            ],
            name: 'poll1',
            totalVotes: 15,
            question: 'Sample Question',
            description: 'Sample Description'
        };

        const pollElement = createPollElement(questionData);

        expect(pollElement).toBeDefined();
        expect(pollElement.classList.contains('poll')).toBe(true);
        expect(pollElement.getAttribute('question-id')).toBe('1');
        expect(pollElement.innerHTML).toContain('<h2>Sample Question</h2>');
        expect(pollElement.innerHTML).toContain('<p class="description">Sample Description</p>');
        expect(pollElement.innerHTML).toContain('<div class="options-container">');
        expect(pollElement.innerHTML).toContain('<p class="total-votes">Total Votes: 15</p>');
    });

    /**
     * @vitest-environment jsdom
     */
    test('createOption function creates option HTML correctly', () => {
        const option = {value: 'option1', votes: 10, label: 'Option 1'};
        const totalVotes = 20;
        const name = 'poll1';

        const optionHTML = createOption(option, totalVotes, name);

        // Assertions
        expect(optionHTML).toBeDefined();
        expect(optionHTML).toContain('<input type="radio" name="poll1" value="option1" required>');
        expect(optionHTML).toContain('<span>Option 1</span>');
        expect(optionHTML).toContain('<span class="range-percent-text">50%</span>');
        expect(optionHTML).toContain('<div class="range-percent" style="width: 50%"></div>');
        expect(optionHTML).toContain('<p class="number-of-votes">10 votes</p>');
    });

    /**
     * @vitest-environment jsdom
     */
    test('getHardcodedPollQuestions function returns correct values', () => {
        global.window = Object.create(window);
        Object.defineProperty(window, 'location', {
            value: {
                search: '?pollId=1'
            }
        });

        const {pollResultsKey, hardcodedPollQuestions} = getHardcodedPollQuestions();

        expect(pollResultsKey).toBe('poll-results-1');
        // Assuming there's data for 'pollId' 1 in pollQuestionsLibrary
        expect(hardcodedPollQuestions).toBeDefined();
    });

    /**
     * @vitest-environment jsdom
     */
    test('handlePollOptionClick updates poll data correctly', () => {
        const pollContainer = global.document.getElementById("poll-container");

        pollQuestionsFromStorage.forEach(questionData => {
            const pollElement = createPollElement(questionData);
            pollContainer.appendChild(pollElement)
        });

        // Simulate a click event
        const option = global.document.querySelector('.option');
        const event = new Event('click');
        option.dispatchEvent(event);

        // Call the function
        handlePollOptionClick(event, pollQuestionsFromStorage, copyOfPollQuestions, pollResultsKey);

        // Check if the poll data and localStorage are updated correctly
        expect(JSON.parse(localStorage.getItem(pollResultsKey))).toEqual([
            {
                id: 1,
                totalVotes: 10,
                name: 'mock-data',
                options: [
                    {value: 'option1', votes: 6},
                    {value: 'option2', votes: 4}
                ]
            }
        ]);

        expect(global.document.querySelector('.total-votes').textContent).toBe('Total Votes: 10');

        const [firstOptionNoOfVotes, secondOptionNoOfVotes] = [...global.document.querySelectorAll('.number-of-votes')]
        expect(firstOptionNoOfVotes.textContent).toBe('6 votes');
        expect(secondOptionNoOfVotes.textContent).toBe('4 votes');

        const [firstOptionRangePercentText, secondOptionRangePercentText] = [...global.document.querySelectorAll('.range-percent-text')]
        expect(firstOptionRangePercentText.textContent).toBe('60%');
        expect(secondOptionRangePercentText.textContent).toBe('40%');

        const [firstOptionRangePercent, secondOptionRangePercent] = [...global.document.querySelectorAll('.range-percent')]
        expect(firstOptionRangePercent.style.width).toBe('60%');
        expect(secondOptionRangePercent.style.width).toBe('40%');
    });
});
