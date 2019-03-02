module.exports = new Map([
  // push value
  ['OP_0', function (context) {
    context.stack.push(Buffer.from('00', 'hex'))
    context.programCounter += 1
  }],
  ['OP_FALSE', function (context) {

  }],
  ['OP_PUSHDATA1', function (context) {

  }],
  ['OP_PUSHDATA2', function (context) {

  }],
  ['OP_PUSHDATA4', function (context) {

  }],
  ['OP_1NEGATE', function (context) {

  }],
  ['OP_RESERVED', function (context) {

  }],
  ['OP_1', function (context) {

  }],
  ['OP_TRUE', function (context) {

  }],
  ['OP_2', function (context) {

  }],
  ['OP_3', function (context) {

  }],
  ['OP_4', function (context) {

  }],
  ['OP_5', function (context) {

  }],
  ['OP_6', function (context) {

  }],
  ['OP_7', function (context) {

  }],
  ['OP_8', function (context) {

  }],
  ['OP_9', function (context) {

  }],
  ['OP_10', function (context) {

  }],
  ['OP_11', function (context) {

  }],
  ['OP_12', function (context) {

  }],
  ['OP_13', function (context) {

  }],
  ['OP_14', function (context) {

  }],
  ['OP_15', function (context) {

  }],
  ['OP_16', function (context) {

  }],

  // control
  ['OP_NOP', function (context) {

  }],
  ['OP_VER', function (context) {

  }],
  ['OP_IF', function (context) {

  }],
  ['OP_NOTIF', function (context) {

  }],
  ['OP_VERIF', function (context) {

  }],
  ['OP_VERNOTIF', function (context) {

  }],
  ['OP_ELSE', function (context) {

  }],
  ['OP_ENDIF', function (context) {

  }],
  ['OP_VERIFY', function (context) {

  }],
  ['OP_RETURN', function (context) {

  }],

  // stack ops
  ['OP_TOALTSTACK', function (context) {

  }],
  ['OP_FROMALTSTACK', function (context) {

  }],
  ['OP_2DR[OP', function (context) {

  }],
  ['OP_2DUP', function (context) {

  }],
  ['OP_3DUP', function (context) {

  }],
  ['OP_2OVER', function (context) {

  }],
  ['OP_2ROT', function (context) {

  }],
  ['OP_2SWAP', function (context) {

  }],
  ['OP_IFDUP', function (context) {

  }],
  ['OP_DEPTH', function (context) {

  }],
  ['OP_DR[OP', function (context) {

  }],
  ['OP_DUP', function (context) {

  }],
  ['OP_NIP', function (context) {

  }],
  ['OP_OVER', function (context) {

  }],
  ['OP_PICK', function (context) {

  }],
  ['OP_ROLL', function (context) {

  }],
  ['OP_ROT', function (context) {

  }],
  ['OP_SWAP', function (context) {

  }],
  ['OP_TUCK', function (context) {

  }],

  // splice ops
  ['OP_CAT', function (context) {

  }],
  ['OP_SUBSTR', function (context) {

  }],
  ['OP_LEFT', function (context) {

  }],
  ['OP_RIGHT', function (context) {

  }],
  ['OP_SIZE', function (context) {

  }],

  // bit logic
  ['OP_INVERT', function (context) {

  }],
  ['OP_AND', function (context) {

  }],
  ['OP_OR', function (context) {

  }],
  ['OP_XOR', function (context) {

  }],
  ['OP_EQUAL', function (context) {

  }],
  ['OP_EQUALVERIFY', function (context) {

  }],
  ['OP_RESERVED1', function (context) {

  }],
  ['OP_RESERVED2', function (context) {

  }],

  // numeric
  ['OP_1ADD', function (context) {

  }],
  ['OP_1SUB', function (context) {

  }],
  ['OP_2MUL', function (context) {

  }],
  ['OP_2DIV', function (context) {

  }],
  ['OP_NEGATE', function (context) {

  }],
  ['OP_ABS', function (context) {

  }],
  ['OP_NOT', function (context) {

  }],
  ['OP_0NOTEQUAL', function (context) {

  }],

  ['OP_ADD', function (context) {

  }],
  ['OP_SUB', function (context) {

  }],
  ['OP_MUL', function (context) {

  }],
  ['OP_DIV', function (context) {

  }],
  ['OP_MOD', function (context) {

  }],
  ['OP_LSHIFT', function (context) {

  }],
  ['OP_RSHIFT', function (context) {

  }],

  ['OP_BOOLAND', function (context) {

  }],
  ['OP_BOOLOR', function (context) {

  }],
  ['OP_NUMEQUAL', function (context) {

  }],
  ['OP_NUMEQUALVERIFY', function (context) {

  }],
  ['OP_NUMNOTEQUAL', function (context) {

  }],
  ['OP_LESSTHAN', function (context) {

  }],
  ['OP_GREATERTHAN', function (context) {

  }],
  ['OP_LESSTHANOREQUAL', function (context) {

  }],
  ['OP_GREATERTHANOREQUAL', function (context) {

  }],
  ['OP_MIN', function (context) {

  }],
  ['OP_MAX', function (context) {

  }],

  ['OP_WITHIN', function (context) {

  }],

  // crypto
  ['OP_RIPEMD160', function (context) {

  }],
  ['OP_SHA1', function (context) {

  }],
  ['OP_SHA256', function (context) {

  }],
  ['OP_HASH160', function (context) {

  }],
  ['OP_HASH256', function (context) {

  }],
  ['OP_CODESEPARATOR', function (context) {

  }],
  ['OP_CHECKSIG', function (context) {

  }],
  ['OP_CHECKSIGVERIFY', function (context) {

  }],
  ['OP_CHECKMULTISIG', function (context) {

  }],
  ['OP_CHECKMULTISIGVERIFY', function (context) {

  }],

  // expansion
  ['OP_NOP1', function (context) {

  }],
  ['OP_NOP2', checkLocktimeVerify],
  ['OP_CHECKLOCKTIMEVERIFY', checkLocktimeVerify],
  ['OP_NOP3', checkSequenceVerify],
  ['OP_CHECKSEQUENCEVERIFY', checkSequenceVerify],
  ['OP_NOP4', function (context) {

  }],
  ['OP_NOP5', function (context) {

  }],
  ['OP_NOP6', function (context) {

  }],
  ['OP_NOP7', function (context) {

  }],
  ['OP_NOP8', function (context) {

  }],
  ['OP_NOP9', function (context) {

  }],
  ['OP_NOP10', function (context) {

  }],

  ['OP_INVALID[OPCODE', function (context) {
    throw Error(`Invalid opcode ${context.script.at(this.programCounter).toString(16)}`)
  }]
])

function checkLocktimeVerify (context) {

}

function checkSequenceVerify (context) {

}
