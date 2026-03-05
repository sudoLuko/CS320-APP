import { DatabaseConnection } from './DatabaseConnection';
import { Column } from '../../shared/types';

class ColumnRepository {
    
    private db: DatabaseConnection

    constructor() {
        this.db = DatabaseConnection.getInstance('kanflow.db')
    }

    public save(column: Column) {
        return this.db.execute(
            `INSERT INTO columns (title, position, createdAt, boardID) VALUES (?, ?, ?, ?)`, 
            [   column.title, 
                column.position, 
                column.createdAt,
                column.boardID
            ]
        )
    }

    public findByID(column_id: number) {
        return this.db.query(`SELECT * FROM columns WHERE id = ?`, [column_id])
    }

    public findByBoard(board_id: number) {
        return this.db.query(`SELECT * FROM columns WHERE boardID = ?`, [board_id])
    }

    public update(column: Column) {
        return this.db.execute(
            `UPDATE columns set title = ?, position = ? WHERE id = ?`,
            [   column.title, 
                column.position,
                column.id
            ]
        )
    }

    public delete(id: number) {
        return this.db.execute(`DELETE FROM columns WHERE id = ?`, [id])
    }

}