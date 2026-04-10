import { ipcMain } from 'electron';
import { BoardRepository } from './database/BoardRepo';
import { ColumnRepository } from './database/ColumnRepo';
import { CardRepository } from './database/CardRepo';
import { exportToJSON } from './database/Export';
import { Board, Column, Card } from '../shared/types';


export function registerBoardHandlers() {
    ipcMain.handle('board:create', async(_event, board) => {
        const boardRepo = new BoardRepository()
        const createdAt = Date.now()

        const newBoard: Board = {
            id: 0,
            title: board.title,
            description: board.description,
            createdAt: createdAt,
            userID: board.userID
        }

        return boardRepo.save(newBoard)
    })

    ipcMain.handle('board:getByUser', async(_event, userID) => {
        const boardRepo = new BoardRepository()
        return boardRepo.findByUser(userID)
    })

    ipcMain.handle('board:getByBoardID', async(_event, boardID) => {
        const boardRepo = new BoardRepository()
        return boardRepo.findByID(boardID)
    })

    ipcMain.handle('board:update', async(_event, board) => {
        const boardRepo = new BoardRepository()

        const updatedBoard: Board = {
            id: board.id,
            title: board.title,
            description: board.description,
            createdAt: board.createdAt,
            userID: board.userID
        }
        return boardRepo.update(updatedBoard)
    })

    ipcMain.handle('board:delete', async(_event, boardID) => {
        const boardRepo = new BoardRepository()
        return boardRepo.delete(boardID)
    })

    ipcMain.handle('board:export', async(_event, boardID) => {
        return exportToJSON(boardID)
    })


}

export function registerColumnHandlers() {
    ipcMain.handle('column:create', async(_event, column) => {
        const columnRepo = new ColumnRepository()
        const createdAt = Date.now()

        const newColumn = {
            id: 0,
            title: column.title,
            createdAt: createdAt,
            position: column.position,
            boardID: column.boardID
        }

        return columnRepo.save(newColumn)
    })

    ipcMain.handle('column:getByBoard', async(_event, boardID) => {
        const columnRepo = new ColumnRepository()
        return columnRepo.findByBoard(boardID)
    })

    ipcMain.handle('column:update', async(_event, column) => {
        const columnRepo = new ColumnRepository()

        const updatedColumn = {
            id: column.id,
            title: column.title,
            createdAt: column.createdAt,
            position: column.position,
            boardID: column.boardID
        }

        return columnRepo.update(updatedColumn)
    })

    ipcMain.handle('column:delete', async(_event, columnID) => {
        const columnRepo = new ColumnRepository()
        return columnRepo.delete(columnID)
    })
}

export function registerCardHandlers() {
    ipcMain.handle('card:create', async(_event, card) => {
        const cardRepo = new CardRepository()
        const createdAt = Date.now()

        const newCard = {
            id: 0,
            title: card.title,
            description: card.description,
            createdAt: createdAt,
            position: card.position,
            columnID: card.columnID
        }

        return cardRepo.save(newCard)
    })

    ipcMain.handle('card:getByColumn', async(_event, columnID) => {
        const cardRepo = new CardRepository()
        return cardRepo.findByColumn(columnID)
    })

    ipcMain.handle('card:update', async(_event, card) => {
        const cardRepo = new CardRepository()

        const updatedCard = {
            id: card.id,
            title: card.title,
            description: card.description,
            createdAt: card.createdAt,
            position: card.position,
            columnID: card.columnID
        }

        return cardRepo.update(updatedCard)
    })

    ipcMain.handle('card:delete', async(_event, cardID) => {
        const cardRepo = new CardRepository()
        return cardRepo.delete(cardID)
    })
}