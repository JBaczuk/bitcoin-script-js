const bscript = require('bscript-parser')

const Interpreter = module.exports = class Interpreter {
  constructor (script) {
    this.script = script
    this.pc = 0
    this.pend = script.length
    this.stack = []
  }

  step () {
    if (this.pc >= this.pend) {
      throw Error('Cannot step, no further instructions')
    }
    if (typeof this.script === 'undefined' || this.script.length === 0) {
      throw Error('No script provided')
    }
    // Validate opcode
    if (bscript.opcodes.opcodeIsValid(this.script[this.pc]) && !bscript.opcodes.opcodeIsDisabled(this.script[this.pc])) {
      if (this.script[this.pc] <= 0x4b) {
        this.stack.push(this.script[this.pc])
        this.pc += 1
      }
      let opcode = bscript.opcodes.wordForOpcode(this.script[this.pc])
      // TODO: execute the op_code
      // switch (opcode) {
      //   case 
      // }
    }
  }

  evaluate () {
    if (typeof this.script === 'undefined' || this.script.length === 0) {
      throw Error('No script provided')
    }
    while (this.pc < this.pend) {
      this.step()
    }
    if (this.pc === this.pend) {
      // We are at the end of the script, if top stack item is nonzero, return true
      return this.didSucceed()
    }
  }

  didSucceed () {
    if (this.stack.length === 0) {
      return false
    } else if (this.stack[this.stack.length - 1] === 0) {
      return false
    } else {
      return true
    }
  }
}
