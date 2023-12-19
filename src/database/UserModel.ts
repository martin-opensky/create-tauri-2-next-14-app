import { SqliteType, DatabaseModel, CoreTableFields } from './DatabaseModel'

interface CreateUserModel {
  name: string
  email: string
  password?: string
}

export interface IUserModel extends CreateUserModel, CoreTableFields {}

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

export class UserModel extends DatabaseModel<CreateUserModel> {
  protected dbName = 'example_app.db'
  protected tableName = 'example_users'
  protected softDelete = true
  protected timestamps = true

  constructor() {
    super(tableSchema)
  }
}
