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
  protected softDelete = true
  protected timestamps = false

  constructor() {
    super('app3.db', 'users', tableSchema)
  }
}
