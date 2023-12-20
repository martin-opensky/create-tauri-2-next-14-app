import { SqliteType, DatabaseModel, CoreTableFields } from './DatabaseModel'

// The interface used to create & update a new user
interface CreateUserModel {
  name: string
  email: string
  password?: string
}

// The interface used to read a user from the database
export interface IUserModel extends CreateUserModel, CoreTableFields {}

// The table schema for the user table
// The ID field is automatically added by the DatabaseModel class
// Soft delete & timestamps are also automatically added (if set to true)
const tableSchema = {
  name: {
    type: SqliteType.TEXT,
  },

  email: {
    type: SqliteType.TEXT,
  },

  password: {
    type: SqliteType.TEXT,
  },
}

class UserModel extends DatabaseModel<CreateUserModel> {
  protected dbName = 'example_app.db'
  protected tableName = 'example_users'
  protected softDelete = true
  protected timestamps = true

  constructor() {
    super(tableSchema)
  }

  // Example of a custom method - simply pass the where clause to the query method
  // Response will be typed as IUserModel[]
  getDeletedUsers() {
    return this.query(`deleted_at IS NOT NULL`)
  }
}

// Instantiate the class here, to initialize the database and create the table (if it doesn't exist) before exporting it
export const userModel = new UserModel()
