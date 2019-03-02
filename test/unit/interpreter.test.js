const fixtures = require('./fixtures/interpreterTests.json')
const Interpreter = require('../../src/interpreter')
const expect = require('chai').expect
const Script = require('../../src/script')

describe('Interpreter Tests', function () {
  describe('Valid Fixtures Tests', function () {
    fixtures.success.forEach(function (scriptFixture) {
      it(`should evaluate successfully, have top stack element of ${scriptFixture.stacktop}, and return true`, function () {
        // Test execution
        let script = new Script(Buffer.from(scriptFixture.hex, 'hex'))
        let interpreter = new Interpreter(script)
        let evalResult = interpreter.evaluate()
        expect(evalResult).to.be.true
        expect(interpreter.stack[interpreter.stack.length - 1].toString('hex')).to.equal(scriptFixture.stacktop)
      })
    })
    fixtures.fail.forEach(function (scriptFixture) {
      it(`should evaluate successfully, have top stack element of ${scriptFixture.stacktop}, and return false`, function () {
        let script = new Script(Buffer.from(scriptFixture.hex, 'hex'))
        let interpreter = new Interpreter(script)
        let evalResult = interpreter.evaluate()
        expect(evalResult).to.be.false
        expect(interpreter.stack[interpreter.stack.length - 1].toString('hex')).to.equal(scriptFixture.stacktop)
      })
    })
  })
  describe('Invalid Fixtures Tests', function () {
    fixtures.invalid.forEach(function (scriptFixture) {
      it(`should throw ${scriptFixture.error_msg}`, function () {
        // Test execution
        let script = new Script(Buffer.from(scriptFixture.hex, 'hex'))
        let interpreter = new Interpreter(script)
        expect(interpreter.evaluate.bind(interpreter)).to.throw(scriptFixture.error_msg)
      })
    })
    // Invalid opcodes
    for (let i = 0xba; i <= 0xff; i++) {
      it(`should throw Invalid opcode ${i.toString(16)}`, function () {
        // Test execution
        let buf = Buffer.alloc(1)
        buf.writeUInt8(i)
        let script = new Script(buf)
        let interpreter = new Interpreter(script)
        expect(interpreter.evaluate.bind(interpreter)).to.throw(`Invalid opcode ${i.toString(16)}`)
      })
    }
  })
  describe('Error tests', function () {
    it(`should throw Error: script must be instance of Script`, function () {
      expect(() =>
        new Interpreter('something')
      ).to.throw('script must be instance of Script')
    })
  })
})
