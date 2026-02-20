import Database from 'better-sqlite3';

class DatabaseConnection {

    private static instance: DatabaseConnection;
    private db: Database
    private  dbPath: string;

    private constructor(dbPath: string) {
        this.dbPath = dbPath
        this.db = new Database(dbPath)
    }

    public static getInstance(dbPath: string) {
        if ( DatabaseConnection.instance == null ) {
            DatabaseConnection.instance = new DatabaseConnection(dbPath)
        }
        return DatabaseConnection.instance
    }


    




}




