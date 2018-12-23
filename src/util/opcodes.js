const assert = require('assert')

const words = require('bitcoin-ops')
const opcodes = require('bitcoin-ops/map')

const opcodeInfoMap = require('../../data/opcode_info_map')

function opcodeForWord (word) {
  assert(wordIsValid(word), 'Not a valid term')
  return words[word]
}

function wordForOpcode (opcode) {
  assert(opcodeIsValid(opcode), 'Not a valid opcode')
  return opcodes[opcode]
}

function opcodeIsValid (opcode) {
  return opcode in opcodeInfoMap
}

function wordIsValid (word) {
  return word in words
}

function descriptionForOpcode (opcode) {
  assert(opcodeIsValid(opcode), 'Not a valid opcode')
  return opcodeInfoMap[opcode].description || ''
}

function descriptionForWord (word) {
  assert(wordIsValid(word), 'Not a valid term')
  return descriptionForOpcode(opcodeForWord(word))
}

function inputDescriptionForOpcode (opcode) {
  assert(opcodeIsValid(opcode), 'Not a valid opcode')
  return opcodeInfoMap[opcode].input || ''
}

function inputDescriptionForWord (word) {
  assert(wordIsValid(word), 'Not a valid term')
  return inputDescriptionForOpcode(opcodeForWord(word))
}

function outputDescriptionForOpcode (opcode) {
  assert(opcodeIsValid(opcode), 'Not a valid opcode')
  return opcodeInfoMap[opcode].output || ''
}

function outputDescriptionForWord (word) {
  assert(wordIsValid(word), 'Not a valid term')
  return outputDescriptionForOpcode(opcodeForWord(word))
}

function opcodeIsDisabled (opcode) {
  assert(opcodeIsValid(opcode), 'Not a valid opcode')
  return opcodeInfoMap[opcode].disabled
}

module.exports = {
  opcodeForWord,
  wordForOpcode,
  opcodeIsValid,
  wordIsValid,
  descriptionForOpcode,
  descriptionForWord,
  inputDescriptionForOpcode,
  inputDescriptionForWord,
  outputDescriptionForOpcode,
  outputDescriptionForWord,
  opcodeIsDisabled
}
