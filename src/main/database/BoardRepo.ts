import { DatabaseConnection } from './DatabaseConnection';
import { Board, Column, Card } from '../../shared/types';

class BoardRepository {
    private db: DatabaseConnection

    constructor() {
        this.db = DatabaseConnection.getInstance('kanflow.db')
    }

    public save(Board: Board) {
        
    }

    public findByID() {

    }

    public update(Board: Board) {

    }

    public delete(Board: Board) {
        
    }





}

