import {delegate} from "./utils";
import {pollQuestionsLibrary} from "./constants.js";
import '../css/style.css'

document.addEventListener('DOMContentLoaded', function () {
    const {pollResultsKey, hardcodedPollQuestions} = getHardcodedPollQuestions();

    if (!hardcodedPollQuestions) {
        console.warn('Poll questions not available.');
        return
    }

    const pollQuestionsFromStorage = JSON.parse(localStorage.getItem(pollResultsKey)) || hardcodedPollQuestions;
    const copyOfPollQuestions = [...pollQuestionsFromStorage];
    const pollContainer = document.getElementById("poll-container");

    pollQuestionsFromStorage.forEach(questionData => {
        const pollElement = createPollElement(questionData);
        pollContainer.appendChild(pollElement);
    });

    delegate('click', '.option', function (e) {
        handlePollOptionClick(e, pollQuestionsFromStorage, copyOfPollQuestions, pollResultsKey);
    })
})

export function getHardcodedPollQuestions() {
    const urlParams = new URLSearchParams(window.location.search);
    const pollId = urlParams.get("pollId");
    const pollResultsKey = `poll-results-${pollId}`;
    const hardcodedPollQuestions = pollQuestionsLibrary[pollId];

    return {pollResultsKey, hardcodedPollQuestions};
}

export function createPollElement(questionData) {
    const {options, id, name, totalVotes, question, description} = questionData;
    const pollElement = document.createElement("div");

    pollElement.classList.add("poll");
    pollElement.setAttribute("question-id", id);

    let innerHTML = `<h2>${question}</h2>`;
    if (description) {
        innerHTML += `<p class="description">${description}</p>`;
    }

    const optionsHTML = options
        .map(option => createOption(option, totalVotes, name))
        .join("");
    innerHTML += `<div class="options-container">${optionsHTML}</div>`;
    innerHTML += `<p class="total-votes">Total Votes: ${totalVotes}</p>`;

    pollElement.innerHTML = innerHTML;

    return pollElement;
}

export function createOption(option, totalVotes, name) {
    const votePercentage = Math.round((option.votes / totalVotes) * 100) || 0;

    return `
        <label class="option-wrapper">
            <input type="radio" name="${name}" value="${option.value}" required>
            <div class="option">
                <div class="flex justify-space-between">
                    <span>${option.label}</span>
                    <span class="range-percent-text">${votePercentage}%</span>
                </div>
                <div class="range-wrapper">
                    <div class="range-percent" style="width: ${votePercentage}%"></div>
                </div>
                <p class="number-of-votes">${option.votes} votes</p>
            </div>
        </label>
    `;
}

export function handlePollOptionClick(e, pollQuestionsFromStorage, copyOfPollQuestions, pollResultsKey) {
    const radio = e.target.closest('.option-wrapper').querySelector('input')
    const poll = e.target.closest('.poll')
    const totalVotesEle = poll.querySelector('.total-votes')
    const questionId = parseInt(poll.getAttribute('question-id'), 10)

    pollQuestionsFromStorage.forEach((question, index) => {
        if (question.id === questionId) {
            const totalVotes = question.totalVotes + 1

            const options = question.options.map((option) => {
                const optionWrapperEle = poll.querySelector(`input[value='${option.value}']`).closest('.option-wrapper')
                const numberOfVotesEle = optionWrapperEle.querySelector('.number-of-votes')
                const rangePercentEle = optionWrapperEle.querySelector('.range-percent')
                const rangePercentTextEle = optionWrapperEle.querySelector('.range-percent-text')

                const votes = (option.value === radio.value) ? option.votes + 1 : option.votes;
                const votePercentage = Math.round((votes / totalVotes) * 100) || 0;

                numberOfVotesEle.textContent = `${votes} votes`
                rangePercentTextEle.textContent = `${votePercentage}%`
                rangePercentEle.style.width = `${votePercentage}%`

                return {...option, votes}
            })

            totalVotesEle.textContent = `Total Votes: ${totalVotes}`

            copyOfPollQuestions[index] = {...question, options, totalVotes}
        }
    })

    localStorage.setItem(pollResultsKey, JSON.stringify(copyOfPollQuestions))
}
