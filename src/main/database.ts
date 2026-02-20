import Database from 'better-sqlite3';

class DatabaseConnection {

    private static instance: DatabaseConnection;
    private db: Database
    private  dbPath: string;

    private constructor(dbPath: string) {
        this.dbPath = dbPath
        this.db = new Database(dbPath)
        this.db.pragma('foreign_keys = ON') 
        this.initializeSchema()
    }

    private initializeSchema() {

        this.db.prepare(`
            CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            created_at INTEGER,
            username TEXT,
            password TEXT
            )
        `).run()

        this.db.prepare(`
            CREATE TABLE IF NOT EXISTS boards (
            id INTEGER PRIMARY KEY,
            created_at INTEGER,
            title TEXT,
            description TEXT,
            userID INTEGER,
            FOREIGN KEY (userID) REFERENCES users(id)
            )
        `).run()

        this.db.prepare(`
            CREATE TABLE IF NOT EXISTS columns (
            id INTEGER PRIMARY KEY,
            created_at INTEGER,
            title TEXT, 
            position INTEGER,
            boardID INTEGER,
            FOREIGN KEY (boardID) REFERENCES boards(id)
            )
        `).run()

        this.db.prepare(`
            CREATE TABLE IF NOT EXISTS cards (
            id INTEGER PRIMARY KEY,
            created_at INTEGER,
            title TEXT, 
            description TEXT,
            position INTEGER,
            columnID INTEGER,
            FOREIGN KEY (columnID) REFERENCES columns(id)
            )
        `).run()

    }

    
    public static getInstance(dbPath: string) {
        if ( DatabaseConnection.instance == null ) {
            DatabaseConnection.instance = new DatabaseConnection(dbPath)
        }
        return DatabaseConnection.instance
    }

    public query(SQL: string, params:Array<any>) {
        return this.db.prepare(SQL).all(params)
    }

    public execute(SQL: string, params: Array<any>) {
        return this.db.prepare(SQL).run(params)
    }

    public beginTransaction() {
        this.db.prepare('BEGIN').run()
    }

    public commit() {
        this.db.prepare('COMMIT').run()
    }

    public rollback() {
        this.db.prepare('ROLLBACK').run()
    }

    public close() {
        this.db.close()
    }

}




