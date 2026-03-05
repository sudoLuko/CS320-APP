import { DatabaseConnection } from './DatabaseConnection';
import { Board } from '../../shared/types';

class BoardRepository {
    
    private db: DatabaseConnection

    constructor() {
        this.db = DatabaseConnection.getInstance('kanflow.db')
    }

    public save(board: Board) {
        return this.db.execute(
            `INSERT INTO boards (title, description, createdAt, userID) VALUES (?, ?, ?, ?)`, 
            [   board.title, 
                board.description, 
                board.createdAt, 
                board.userID
            ]
        )
    }

    public findByID(id: number) {
        return this.db.query(`SELECT * FROM boards WHERE id = ?`, [id])
    }

    public update(board: Board) {
        return this.db.execute(
            `UPDATE boards set title = ?, description = ? WHERE id = ?`,
            [   board.title, 
                board.description, 
                board.id
            ]
        )
    }

    public delete(id: number) {
        return this.db.execute(`DELETE FROM boards WHERE id = ?`, [id])
    }





}

