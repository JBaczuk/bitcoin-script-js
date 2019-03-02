const bscript = require('bscript-parser')

class Script {

  constructor (serializedScript) {
    if (!Buffer.isBuffer(serializedScript)) {
      throw Error('serializedScript must be a buffer')
    }
    this.serialized = serializedScript
  }

  get length () {
    return this.serialized.length
  }
  
  at (index) {
    return this.serialized[index]
  }

  slice (start, end) {
    return this.serialized.slice(start, end)
  }

  static opcodeIsValid (opcode) {
    if (!bscript.opcodes.opcodeIsValid(opcode)) {
      return false
    }
    return true
  }

  static wordForOpcode (opcode) {
    return bscript.opcodes.wordForOpcode(opcode)
  }

  static wordIsDisabled (opcode) {
    return bscript.opcodes.wordIsDisabled(opcode)
  }
}

module.exports = Script
