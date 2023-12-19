import { IUserModel } from '@/database/UserModel'
import React from 'react'

interface IUserTable {
  users?: IUserModel[]
  deleteUser: (id: number) => void
  initUpdateUser: (user: IUserModel) => void
}

export default function UserTable({
  users,
  deleteUser,
  initUpdateUser,
}: React.PropsWithChildren<IUserTable>) {
  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th className="px-4 py-2">ID</th>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Email</th>
        </tr>
      </thead>
      <tbody>
        {users &&
          users.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.id}</td>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">
                <span
                  className="cursor-pointer p-1 text-sm underline"
                  onClick={() => initUpdateUser(user)}
                >
                  edit
                </span>
                |
                <span
                  className="cursor-pointer p-1 text-sm underline"
                  onClick={() => deleteUser(user.id)}
                >
                  delete
                </span>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}
