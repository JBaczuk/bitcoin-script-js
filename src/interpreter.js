const Script = require('./script')

class Interpreter {
  constructor (script) {
<<<<<<< HEAD
<<<<<<< HEAD
    if (!(script instanceof Script)) {
      throw Error('script must be instance of Script')
    }
    this.script = script
    this.programCounter = 0
    this.programEnd = this.script.length
=======
    if (!Buffer.isBuffer(script)) {
      throw Error('Script must be a buffer')
    }
    this.script = script
    this.programCounter = 0
    this.programEnd = script.length
>>>>>>> fix pushdata
=======
    if (!(script instanceof Script)) {
      throw Error('script must be instance of Script')
    }
    this.script = script
    this.programCounter = 0
    this.programEnd = this.script.length
>>>>>>> squashme
    this.stack = []
  }

  step () {
    if (this.programCounter >= this.programEnd) {
      throw Error('Cannot step, no further instructions')
    }
    if (typeof this.script === 'undefined' || this.script.length === 0) {
      throw Error('No script provided')
    }
    // Validate opcode
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    if (!Script.opcodeIsValid(this.script.at(this.programCounter))) {
      throw Error(`Invalid opcode ${this.script.at(this.programCounter).toString(16)}`)
    } else {
      if (this.script.at(this.programCounter) === 0x00) {
        this.stack.push(Buffer.from('00', 'hex'))
        this.programCounter += 1
      } else if (this.script.at(this.programCounter) <= 0x4b) {
        let bytesToPush = parseInt(this.script.at(this.programCounter), 16)

        // Make sure there are this many bytes left to push
        if (this.script.length - (this.programCounter + 1) < bytesToPush) {
          throw Error(`Push bytes failed: script too small`)
        }

        // Push that many bytes to the stack
        this.stack.push(this.script.slice(this.programCounter + 1, this.programCounter + 1 + bytesToPush))
        this.programCounter += 1 + bytesToPush
      } else {
        let opcode = Script.wordForOpcode(this.script.at(this.programCounter))
        if (Script.wordIsDisabled(opcode)) {
=======
    if (!bscript.opcodes.opcodeIsValid(this.script[this.pc])) {
      throw Error(`Invalid opcode ${this.script[this.pc].toString(16)}`)
=======
    if (!bscript.opcodes.opcodeIsValid(this.script[this.programCounter])) {
      throw Error(`Invalid opcode ${this.script[this.programCounter].toString(16)}`)
>>>>>>> fix pushdata
=======
    console.log('this.script', this.script)
    if (!Script.opcodeIsValid(this.script.at(this.programCounter))) {
      console.error('script invalid')
      throw Error(`Invalid opcode ${this.script.at(this.programCounter).toString(16)}`)
>>>>>>> squashme
    } else {
      console.log('script valid')
      if (this.script.at(this.programCounter) === 0x00) {
        this.stack.push(Buffer.from('00', 'hex'))
        this.programCounter += 1
      } else if (this.script.at(this.programCounter) <= 0x4b) {
        let bytesToPush = parseInt(this.script.at(this.programCounter), 16)

        // Make sure there are this many bytes left to push
        if (this.script.length - (this.programCounter + 1) < bytesToPush) {
          throw Error(`Push bytes failed: script too small`)
        }

        // Push that many bytes to the stack
        this.stack.push(this.script.slice(this.programCounter + 1, this.programCounter + 1 + bytesToPush))
        this.programCounter += 1 + bytesToPush
      } else {
<<<<<<< HEAD
        let opcode = bscript.opcodes.wordForOpcode(this.script[this.programCounter])
        if (bscript.opcodes.wordIsDisabled(opcode)) {
>>>>>>> Add support for detecting invalid or disabled opcodes.
=======
        let opcode = Script.wordForOpcode(this.script.at(this.programCounter))
        if (Script.wordIsDisabled(opcode)) {
>>>>>>> squashme
          throw Error(`Disabled opcode ${opcode}`)
        }
        // TODO: execute the op_code
        switch (opcode) {
          default:
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            throw Error(`Invalid opcode ${this.script.at(this.programCounter).toString(16)}`)
=======
            throw Error(`Invalid opcode ${this.script[this.pc].toString(16)}`)
>>>>>>> Add support for detecting invalid or disabled opcodes.
=======
            throw Error(`Invalid opcode ${this.script[this.programCounter].toString(16)}`)
>>>>>>> fix pushdata
=======
            throw Error(`Invalid opcode ${this.script.at(this.programCounter).toString(16)}`)
>>>>>>> squashme
        }
      }
    }
  }

  evaluate () {
    if (typeof this.script === 'undefined' || this.script.length === 0) {
      throw Error('No script provided')
    }
    while (this.programCounter < this.programEnd) {
      this.step()
    }
    // We are at the end of the script, if top stack item is nonzero, return true
    return this.didSucceed()
  }

  didSucceed () {
    if (this.stack.length === 0) {
      return false
    } else if (this.stack[this.stack.length - 1].toString('hex') === '00') {
      return false
    } else {
      return true
    }
  }
}

module.exports = Interpreter
