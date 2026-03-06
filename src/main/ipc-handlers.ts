import { ipcMain } from 'electron';
import { BoardRepository } from './database/BoardRepo';
import { ColumnRepository } from './database/ColumnRepo';
import { CardRepository } from './database/CardRepo';
import { exportToJSON } from './database/Export';
import { Board, Column, Card } from '../shared/types';


// export function registerIPCHandlers
//  will contain all IPC APIs:
//   ipcMain.handle('board:create', async (event, board: Board) => {
//      return boardRepo.save(board);
//   });
//
//   all other functions ...
//