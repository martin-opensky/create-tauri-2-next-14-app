import Database from '@tauri-apps/plugin-sql'

export enum SqliteType {
  INTEGER = 'INTEGER',
  TEXT = 'TEXT',
  REAL = 'REAL',
  BLOB = 'BLOB',
  NULL = 'NULL',
}

interface TableField {
  type: SqliteType
  primaryKey?: boolean
  autoIncrement?: boolean
  notNull?: boolean
}

interface CoreFields {
  id: number
}

interface TimestampFields {
  created_at: string
  updated_at: string
  deleted_at: string
}

export type CoreTableFields = CoreFields & Partial<TimestampFields>

type TableSchema<T> = { [K in keyof T]: TableField }

export class DatabaseModel<T> {
  private db: Database | undefined
  protected dbName: string = 'app.db'
  protected tableName: string | undefined
  protected softDelete = true
  protected timestamps = true

  constructor(private tableSchema: Partial<TableSchema<T>>) {
    this.init()
  }

  private async init() {
    this.db = await Database.load(`sqlite:${this.dbName}`)

    if (!this.db) {
      throw new Error(`Failed to load database: ${this.dbName}`)
    }

    this.createTable()
  }

  private async createTable() {
    if (
      !this.tableName ||
      !this.tableSchema ||
      Object.keys(this.tableSchema).length === 0
    ) {
      throw new Error('Table schema could not be created')
    }

    // Add ID auto-increment field
    this.tableSchema = {
      ...this.tableSchema,
      id: {
        type: SqliteType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    }

    // Add timestamps fields
    if (this.timestamps) {
      this.tableSchema = {
        ...this.tableSchema,
        created_at: {
          type: SqliteType.TEXT,
        },
        updated_at: {
          type: SqliteType.TEXT,
        },
      }
    }

    // Add soft delete field
    if (this.softDelete) {
      this.tableSchema = {
        ...this.tableSchema,
        deleted_at: {
          type: SqliteType.TEXT,
        },
      }
    }

    const createTableSql = `CREATE TABLE IF NOT EXISTS ${
      this.tableName
    } (${Object.entries(this.tableSchema)
      .map(([fieldName]) => {
        const field = this.tableSchema?.[fieldName as keyof T]
        if (!field) {
          throw new Error('Issue with table schema')
        }

        let fieldSql = `${fieldName} ${field.type}`
        if (field.primaryKey) fieldSql += ' PRIMARY KEY'
        if (field.autoIncrement) fieldSql += ' AUTOINCREMENT'
        if (field.notNull) fieldSql += ' NOT NULL'
        return fieldSql
      })
      .join(', ')})`

    return await this.db?.execute(createTableSql)
  }

  async all(): Promise<Array<T & CoreFields> | undefined> {
    if (!this.tableName || !this.db || !this.tableSchema) {
      throw new Error('Get All: Database not initialized')
    }

    const result: Array<T & CoreFields> | undefined = await this.db.select(
      `SELECT * FROM ${this.tableName}` + (this.softDelete ? ' ' : ''),
    )

    if (!result || result.length === 0) return undefined

    return result
  }

  async get(id: number): Promise<(T & CoreFields) | undefined> {
    if (!this.tableName || !this.db || !this.tableSchema) {
      throw new Error('Get: Database not initialized')
    }

    const result: Array<T & CoreFields> = await this.db.select(
      `SELECT * FROM ${this.tableName} WHERE id=?` +
        (this.softDelete ? ' AND deleted_at IS NULL' : ''),
      [id],
    )

    return result.length > 0 ? result[0] : undefined
  }

  async create(data: { [K in keyof T]: string | number }) {
    if (!this.tableName || !this.db || !this.tableSchema) {
      throw new Error('Create: Database not initialized')
    }

    const keys = Object.keys(data)
    const values = Object.values(data)

    let sql =
      `
      INSERT INTO ${this.tableName} (${keys.join(', ')}` +
      (this.timestamps ? ', created_at, updated_at' : '') +
      `) VALUES (${keys.map(() => '?').join(', ')}` +
      (this.timestamps ? ", datetime('now'), datetime('now')" : '') +
      `)`

    const createQuery = await this.db.execute(sql, values)

    return this.get(createQuery.lastInsertId)
  }

  async update(id: number, data: { [K in keyof T]: string | number }) {
    if (!this.tableName || !this.db || !this.tableSchema) {
      throw new Error('Update: Database not initialized')
    }

    if (!id) throw new Error('Update: ID not provided')

    const keys = Object.keys(data)
    const values = Object.values(data)

    let sql = `UPDATE ${this.tableName} SET ${keys
      .map((key) => `${key}=?`)
      .join(', ')}`
    if (this.timestamps) {
      sql += ", updated_at = datetime('now')"
    }
    sql += ' WHERE id=?'

    return await this.db.execute(sql, [...values, id])
  }

  async delete(id: number) {
    if (!this.tableName || !this.db || !this.tableSchema) {
      throw new Error('Delete: Database not initialized')
    }

    let sql = ''
    if (this.softDelete) {
      sql = `UPDATE ${this.tableName} SET deleted_at = datetime('now')`
      if (this.timestamps) {
        sql += ", updated_at = datetime('now')"
      }
      sql += ' WHERE id=?'
      return await this.db.execute(sql, [id])
    } else {
      sql = `DELETE FROM ${this.tableName} WHERE id=?`
      return await this.db.execute(sql, [id])
    }
  }

  async close() {
    if (this.db) {
      await this.db.close()
    }
  }
}
