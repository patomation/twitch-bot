import { sendToClient } from '../api/connect'

let voteInProgress = false
let voteTopic: string

type Votes = {
    [name: string]: number
}

let votes: Votes = {}

type Results = {
  [key: number]: number
}

const collectResults = () => {
  const results: Results = {}
  Object.values(votes).forEach((vote) => {
    if (Object.prototype.hasOwnProperty.call(results, vote)) {
      results[vote]++
    } else {
      results[vote] = 1
    }
  })
  return results
}

const clearVote = () => {
  // get results
  sendToClient({
    voteClear: true
  })
}

const updateOverlay = () => {
  const results = collectResults()

  sendToClient({
    vote: {
      topic: voteTopic,
      yes: results[1] || 0,
      no: results[2] || 0,
      time: timeLeft
    }
  })
}

let coolDown = 0
const startCoolDown = () => {
  coolDown = 30
  const interval = setInterval(() => {
    if (coolDown > 0) {
      coolDown--
    } else {
      clearInterval(interval)
      coolDown = 0
      clearVote()
    }
  }, 1000)
}

let timeLeft = 60 // seconds
const startVoting = () => {
  // set voting in progress
  voteInProgress = true
  // reset votes
  votes = {}
  // Start timer
  const interval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--
      updateOverlay()
    } else {
      // Stop voting timer
      clearInterval(interval)
      // reset  time
      timeLeft = 30
      // Start cool down
      startCoolDown()
      // voting over
      voteInProgress = false
    }
  }, 1000)
}

/**
 * trigger vote command
 * @param topic string voting topic
 */
export const initiateVote = (topic: string): void => {
  if (!voteInProgress && coolDown === 0 && topic && topic !== '') {
    console.log('starting vote', topic)
    voteTopic = topic
    startVoting()
  }
}

export const castVote = (name: string, value: number): void => {
  if (voteInProgress) {
    console.log(name, 'votes for', value)
    votes[name] = value
    updateOverlay()
  } else {
    console.log('!!!! vote is not in progress')
  }
}
