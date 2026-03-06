// White Box Unit Test - Statement Coverage:
// -    most of the code I have written is wrappers around SQLite database functions
//      so I will be testing the exportToJSON() function again for my white box. 
//     
// -    every statement in exportToJson is expected to be executed when a board has
//      at least one column and one card. The loop inside of this function is dependent 
//      on the number of columns returned by columnRepo.findByBoard(board_id). In order
//      to ensure full coverage, a test board is inserted with one column and card.
//
//   function tested ( 4 assertions ):
//  
//   export function exportToJSON(board_id: number) {
//   
//       const boardRepo = new BoardRepository()
//       const columnRepo = new ColumnRepository()
//       const cardRepo = new CardRepository()
//   
//       let boardExp: BoardExport
//       let columnExp: ColumnExport [] = []
//   
//       const columns = columnRepo.findByBoard(board_id)
//   
//       for (const c of columns) {
//           const cards = cardRepo.findByColumn(c.id)
//           columnExp.push({column: c, cards: cards})
//       }
//   
//       boardExp = {
//           board: boardRepo.findByID(board_id),
//           columns: columnExp
//       }
//   
//       return JSON.stringify(boardExp, null, 2)
//   
//   }

import { setupTestDB } from './TestSetupDB'
import { exportToJSON } from '../Export'

beforeEach(() => {
    setupTestDB()
})

test("ensure each statement in exportToJSON is ran", () => {
    const json = exportToJSON(1)
    const parse = JSON.parse(json)

    expect(parse).toHaveProperty('board')
    expect(parse).toHaveProperty('columns')
    expect(parse.columns[0]).toHaveProperty('cards')
    expect(parse.columns[0].cards.length).toBeGreaterThan(0)

})







