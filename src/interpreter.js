const Script = require('./script')
const ops = require('./opcodes')

class Interpreter {
  constructor (script) {
    if (!(script instanceof Script)) {
      throw Error('script must be instance of Script')
    }
    this.script = script
    this.programCounter = 0
    this.programEnd = this.script.length
    this.script = script
    this.programCounter = 0
    this.programEnd = script.length
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
      // Push data bytes
      if (this.script.at(this.programCounter) > 0 && this.script.at(this.programCounter) < ops.OP_PUSHDATA1 ) {
        let bytesToPush = parseInt(this.script.at(this.programCounter), 16)

        // Make sure there are this many bytes left to push
        if (this.script.length - (this.programCounter + 1) < bytesToPush) {
          throw Error(`Push bytes failed: script too small`)
        }

        // Push that many bytes to the stack
        this.stack.push(this.script.slice(this.programCounter + 1, this.programCounter + 1 + bytesToPush))
        this.programCounter += 1 + bytesToPush
      } else {
        let opcode = this.script.at(this.programCounter)
        let word = Script.wordForOpcode(this.script.at(this.programCounter))
        if (Script.wordIsDisabled(word)) {
          throw Error(`Disabled opcode ${word}`)
        }
        // execute the op_code
        switch (opcode) {
          case ops.OP_0:
            this.stack.push(Buffer.from('00', 'hex'))
            this.programCounter += 1
            break;

          case ops.OP_FALSE:
            break;
          case ops.OP_PUSHDATA1:
            break;
          case ops.OP_PUSHDATA2:
            break;
          case ops.OP_PUSHDATA4:
            break;
          case ops.OP_1NEGATE:
            break;
          case ops.OP_RESERVED:
            break;
          case ops.OP_1:
            break;
          case ops.OP_TRUE:
            break;
          case ops.OP_2:
            break;
          case ops.OP_3:
            break;
          case ops.OP_4:
            break;
          case ops.OP_5:
            break;
          case ops.OP_6:
            break;
          case ops.OP_7:
            break;
          case ops.OP_8:
            break;
          case ops.OP_9:
            break;
          case ops.OP_10:
            break;
          case ops.OP_11:
            break;
          case ops.OP_12:
            break;
          case ops.OP_13:
            break;
          case ops.OP_14:
            break;
          case ops.OP_15:
            break;
          case ops.OP_16:
            break;

          // control
          case ops.OP_NOP:
            break;
          case ops.OP_VER:
            break;
          case ops.OP_IF:
            break;
          case ops.OP_NOTIF:
            break;
          case ops.OP_VERIF:
            break;
          case ops.OP_VERNOTIF:
            break;
          case ops.OP_ELSE:
            break;
          case ops.OP_ENDIF:
            break;
          case ops.OP_VERIFY:
            break;
          case ops.OP_RETURN:
            break;

          // stack ops
          case ops.OP_TOALTSTACK:
            break;
          case ops.OP_FROMALTSTACK:
            break;
          case ops.OP_2DROP:
            break;
          case ops.OP_2DUP:
            break;
          case ops.OP_3DUP:
            break;
          case ops.OP_2OVER:
            break;
          case ops.OP_2ROT:
            break;
          case ops.OP_2SWAP:
            break;
          case ops.OP_IFDUP:
            break;
          case ops.OP_DEPTH:
            break;
          case ops.OP_DROP:
            break;
          case ops.OP_DUP:
            break;
          case ops.OP_NIP:
            break;
          case ops.OP_OVER:
            break;
          case ops.OP_PICK:
            break;
          case ops.OP_ROLL:
            break;
          case ops.OP_ROT:
            break;
          case ops.OP_SWAP:
            break;
          case ops.OP_TUCK:
            break;

          // splice ops
          /* Disabled
          case ops.OP_CAT:
            break;
          case ops.OP_SUBSTR:
            break;
          case ops.OP_LEFT:
            break;
          case ops.OP_RIGHT:
            break; */
          case ops.OP_SIZE:
            break;

          // bit logic
          /* Disabled
          case ops.OP_INVERT:
            break;
          case ops.OP_AND:
            break;
          case ops.OP_OR:
            break;
          case ops.OP_XOR:
            break; */
          case ops.OP_EQUAL:
            break;
          case ops.OP_EQUALVERIFY:
            break;
          case ops.OP_RESERVED1:
            break;
          case ops.OP_RESERVED2:
            break;

          // numeric
          case ops.OP_1ADD:
            break;
          case ops.OP_1SUB:
            break;
          /* Disabled
          case ops.OP_2MUL:
            break;
          case ops.OP_2DIV:
            break; */
          case ops.OP_NEGATE:
            break;
          case ops.OP_ABS:
            break;
          case ops.OP_NOT:
            break;
          case ops.OP_0NOTEQUAL:
            break;

          case ops.OP_ADD:
            break;
          case ops.OP_SUB:
            break;
          /* Disabled
          case ops.OP_MUL:
            break;
          case ops.OP_DIV:
            break;
          case ops.OP_MOD:
            break;
          case ops.OP_LSHIFT:
            break;
          case ops.OP_RSHIFT:
            break; */

          case ops.OP_BOOLAND:
            break;
          case ops.OP_BOOLOR:
            break;
          case ops.OP_NUMEQUAL:
            break;
          case ops.OP_NUMEQUALVERIFY:
            break;
          case ops.OP_NUMNOTEQUAL:
            break;
          case ops.OP_LESSTHAN:
            break;
          case ops.OP_GREATERTHAN:
            break;
          case ops.OP_LESSTHANOREQUAL:
            break;
          case ops.OP_GREATERTHANOREQUAL:
            break;
          case ops.OP_MIN:
            break;
          case ops.OP_MAX:
            break;

          case ops.OP_WITHIN:
            break;

          // crypto
          case ops.OP_RIPEMD160:
            break;
          case ops.OP_SHA1:
            break;
          case ops.OP_SHA256:
            break;
          case ops.OP_HASH160:
            break;
          case ops.OP_HASH256:
            break;
          case ops.OP_CODESEPARATOR:
            break;
          case ops.OP_CHECKSIG:
            break;
          case ops.OP_CHECKSIGVERIFY:
            break;
          case ops.OP_CHECKMULTISIG:
            break;
          case ops.OP_CHECKMULTISIGVERIFY:
            break;

          // expansion
          case ops.OP_NOP1:
            break;
          case ops.OP_CHECKLOCKTIMEVERIFY:
            break;
          case ops.OP_NOP2:
            break;
          case ops.OP_CHECKSEQUENCEVERIFY:
            break;
          case ops.OP_NOP3:
            break;
          case ops.OP_NOP4:
            break;
          case ops.OP_NOP5:
            break;
          case ops.OP_NOP6:
            break;
          case ops.OP_NOP7:
            break;
          case ops.OP_NOP8:
            break;
          case ops.OP_NOP9:
            break;
          case ops.OP_NOP10:
            break;

          case ops.OP_INVALIDOPCODE:
            throw Error(`Invalid opcode ${this.script.at(this.programCounter).toString(16)}`)

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
