const Script = require('./script')

class Interpreter {
  constructor (script) {
    if (!(script instanceof Script)) {
      throw Error('script must be instance of Script')
    }
    this.script = script
    this.programCounter = 0
    this.programEnd = this.script.length
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
          throw Error(`Disabled opcode ${opcode}`)
        }
        // TODO: execute the op_code
        switch (opcode) {
          default:
            throw Error(`Invalid opcode ${this.script.at(this.programCounter).toString(16)}`)
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
