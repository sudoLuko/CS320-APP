import { DatabaseConnection } from '../DatabaseConnection'
import { BoardRepository } from '../BoardRepo'
import { ColumnRepository } from '../ColumnRepo'
import { CardRepository } from '../CardRepo'
import { Board, Column, Card } from '../../../shared/types';

export function setupTestDB() {
    DatabaseConnection.resetInstance()
    const db = DatabaseConnection.getInstance(':memory:')

    const boardRepo = new BoardRepository()
    const columnRepo = new ColumnRepository()
    const cardRepo = new CardRepository()

    let testBoard = {title: "board1", description: "some test board1", createdAt: Date.now(), userID: 1} as Board
    let testColumn = {title: "column1", createdAt: Date.now(), position: 1, boardID: 1} as Column
    let testCard = {title: "card1", description: "some test card1", createdAt: Date.now(), position: 1, columnID: 1} as Card


    boardRepo.save(testBoard)
    columnRepo.save(testColumn)
    cardRepo.save(testCard)

    
}