const { writeFile: _writeFile } = require('fs')
const { resolve } = require('path')
const { promisify } = require('util')
const fetch = require('node-fetch')
const cheerio = require('cheerio')

const writeFile = promisify(_writeFile)

const SCRAPE_URL = 'https://en.bitcoin.it/wiki/Script'
const OUT_PATH = 'data/opcode_info.json'

fetch(SCRAPE_URL)
  .then((res) => {
    if (res.ok) {
      return res.text()
    }
    throw new Error(`Could not load the html page: ${res.status}`)
  })
  .then((html) => {
    const $ = cheerio.load(html)
    const tableEls = $('table.wikitable')

    const out = []

    tableEls.each((idx, el) => {
      const headers = Array.from(
        $(el).find('th').map((idx, el) => $(el).text().trim().toLowerCase())
      )

      if (!headers.includes('opcode')) {
        // ignore the table since it does not describe an opcode
        return
      }

      const rows = $(el).find('tr')
      rows.each((idx, row) => {
        if (idx === 0) {
          // skip header row
          return
        }

        const rowData = {}

        const tds = $(row).find('td')
        let headerIdx = 0
        for (let idx = 0; idx < tds.length; idx += 1) {
          const td = tds[idx]
          rowData[headers[headerIdx]] = $(td).text().trim()

          // this handles a special case where for a few opcodes
          // the table cell for the input spans two columns
          const colspan = parseInt($(td).attr('colspan')) || 1
          headerIdx += colspan
        }

        out.push(normalizeRowData(rowData))
      })
    })

    return out
  })
  .then((data) => JSON.stringify(data, null, 2))
  .then((data) => writeFile(resolve(__dirname, '..', OUT_PATH), data, 'utf8'))

function normalizeRowData (row) {
  if (typeof row['when used...'] !== 'undefined') {
    row.description = row['when used...']
    delete row['when used...']
  }

  row.opcodes = parseOpCodes(row.opcode)
  row.disabled = row.description.endsWith('. disabled.')

  return row
}

function parseOpCodes (opcodeStr) {
  if (opcodeStr.includes(',')) {
    // handles a comma separated list of opcodes or opcode ranges
    return opcodeStr.split(',')
      .map((subStr) => parseOpCodes(subStr.trim()))
      .reduce((out, piece) => out.concat(piece), [])
  } else if (opcodeStr.includes('-')) {
    // handles opcode ranges
    const [startStr, endStr] = opcodeStr.split('-')
    let start = parseInt(startStr)
    const end = parseInt(endStr)
    const out = []
    while (start <= end) {
      out.push(start)
      start += 1
    }

    return out
  }

  return [parseInt(opcodeStr)]
}
