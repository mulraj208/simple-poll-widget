import {delegate} from "./utils";
import '../css/style.css'
import {pollQuestionsLibrary} from "./constants.js";

const pollContainer = document.getElementById("poll-container");

function createPoll(questionData) {
    const {options, id, name, totalVotes} = questionData

    const pollElement = document.createElement("div");
    pollElement.classList.add("poll");
    pollElement.setAttribute('question-id', id)

    const questionTitle = document.createElement("h2");
    questionTitle.textContent = questionData.question;
    pollElement.appendChild(questionTitle);

    if (questionData.description) {
        const questionDescription = document.createElement("p");
        questionDescription.classList.add("description");
        questionDescription.textContent = questionData.description;
        pollElement.appendChild(questionDescription);
    }

    const optionsContainer = document.createElement("div");
    optionsContainer.classList.add("options-container");

    for (let i = 0; i < options.length; i++) {
        const option = options[i]
        const votePercentage = Math.round((option.votes / totalVotes) * 100) || 0

        optionsContainer.insertAdjacentHTML('beforeend',
            `<label class="option-wrapper">
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
        </label>`
        );
    }

    pollElement.appendChild(optionsContainer);
    pollElement.insertAdjacentHTML('beforeend', `<p class="total-votes">Total Votes: ${totalVotes}</p>`);
    pollContainer.appendChild(pollElement);
}

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const pollId = urlParams.get("pollId");
    const pollResultsKey = `poll-results-${pollId}`
    const hardcodePollQuestions = pollQuestionsLibrary[pollId]

    // Add more condition for better error handling

    const pollQuestionsFromStorage = JSON.parse(localStorage.getItem(pollResultsKey)) || hardcodePollQuestions
    const copyOfPollQuestions = [...pollQuestionsFromStorage]

    pollQuestionsFromStorage.forEach(createPoll);

    delegate('click', '.option', function (e) {
        const {target} = e
        const radio = target.closest('.option-wrapper').querySelector('input')
        const poll = target.closest('.poll')
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

                    if (option.value === radio.value) {
                        const votes = option.votes + 1
                        const votePercentage = Math.round((votes / totalVotes) * 100) || 0

                        numberOfVotesEle.textContent = `${votes} votes`
                        rangePercentTextEle.textContent = `${votePercentage}%`
                        rangePercentEle.style.width = `${votePercentage}%`

                        return {...option, votes}
                    } else {
                        const votePercentage = Math.round((option.votes / totalVotes) * 100) || 0

                        numberOfVotesEle.textContent = `${option.votes} votes`
                        rangePercentTextEle.textContent = `${votePercentage}%`
                        rangePercentEle.style.width = `${votePercentage}%`
                    }

                    return option
                })

                totalVotesEle.textContent = `Total Votes: ${totalVotes}`

                copyOfPollQuestions[index] = {...question, options, totalVotes}
            }
        })

        localStorage.setItem(pollResultsKey, JSON.stringify(copyOfPollQuestions))
    })
})
