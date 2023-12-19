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
  protected dbName = 'random.db'
  protected tableName = 'users_t_f'
  protected softDelete = true
  protected timestamps = false

  constructor() {
    super(tableSchema)
  }
}
