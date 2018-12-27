const fixtures = require('./fixtures/interpreterTests.json')
const Interpreter = require('../../src/interpreter')
const expect = require('chai').expect

describe('Interpreter Tests', function () {
  describe('Valid Fixtures Tests', function () {
    it('should evaluate successfully and return true', function () {
      fixtures.success.forEach(function (script) {
        // Test execution
        let interpreter = new Interpreter(Buffer.from(script.hex, 'hex'))
        let evalResult = interpreter.evaluate()
        expect(evalResult).to.be.true
      })
    })
    it('should evaluate successfully and return false', function () {
      fixtures.fail.forEach(function (script) {
        let interpreter = new Interpreter(Buffer.from(script.hex, 'hex'))
        let evalResult = interpreter.evaluate()
        expect(evalResult).to.be.false
      })
    })
  })
  describe('Invalid Fixtures Tests', function () {
    it('should return the appropriate error', function () {
      fixtures.invalid.forEach(function (script) {
        // Test execution
        let interpreter = new Interpreter(Buffer.from(script.hex, 'hex'))
        // expect(function () {
        //   throw Error('Hey')
        // }).to.throw('Hey')
        expect(interpreter.evaluate.bind(interpreter)).to.throw('No script provided')
      })
    })
  })
})
