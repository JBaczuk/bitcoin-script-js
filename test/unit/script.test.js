const expect = require('chai').expect
const Script = require('../../src/script')
const fixtures = require('./fixtures/scriptTests.json')

describe('Script Tests', function () {
  describe('Valid Script Tests', function () {
    fixtures.valid.forEach((scriptFixture) => {
      it('should return correct length', function () {
        let script = new Script(Buffer.from(scriptFixture.serializedScript, 'hex'))
        expect(script.length).to.equal(parseInt(scriptFixture.length))
      })
      it('should return the correct byte using .at()', () => {
        let serializedScript = scriptFixture.serializedScript
        let script = new Script(Buffer.from(serializedScript, 'hex'))
        for (let i = 0; i < scriptFixture.serializedScript.length / 2; i++) {
          const CHAR_PER_BYTE = 2
          let j = i * CHAR_PER_BYTE
          expect(script.at(i)).to.equal(parseInt(serializedScript.slice(j, j + 2), 16))
        }
      })
      it('should return the correct slice', () => {
        let serializedScript = scriptFixture.serializedScript
        let randSliceSize = Math.floor(Math.random() * 10)
        let randStart = Math.floor(Math.random() * serializedScript.length / 2)
        if (randStart + randSliceSize > serializedScript.length / 2) {
          randStart = 0
        }
        let scriptBuf = Buffer.from(serializedScript, 'hex')
        let expectedSlice = scriptBuf.slice(randStart, randStart + randSliceSize)
        let script = new Script(Buffer.from(serializedScript, 'hex'))
        let actualSlice = script.slice(randStart, randStart + randSliceSize)
        expect(actualSlice.equals(expectedSlice)).to.be.true
      })
    })
  })

  describe('Invalid Fixtures Tests', function () {
    fixtures.invalid.forEach(function (scriptFixture) {
      it('should throw correct error', () => {
        expect(() => {
          new Script(scriptFixture.serializedScript)
        }).to.throw(scriptFixture.error)
      })
    })

    it(`should do something`, function () {
      // Invalid opcodes
      for (let i = 0xba; i <= 0xff; i++) {
        it(`should throw Invalid opcode ${i.toString(16)}`, function () {
          // Test execution
          let buf = Buffer.alloc(1)
          buf.writeUInt8(i)
          expect(Script.validateOpcode(buf)).to.be.false
        })
      }
    })
  })
})
