'use client'
import { useCallback, useEffect, useState } from 'react'
import { userModel, IUserModel } from '@/database/UserModel'
import UserTable from '@/components/UserTable'
import Button from '@/components/Button'

export default function DatabasePage() {
  const [users, setUsers] = useState<IUserModel[] | undefined>()
  const [selectedUser, setSelectedUser] = useState<IUserModel | undefined>()

  const fetchUsers = async () => {
    const users = await userModel.all()
    // users.map((user) => {
    //   user
    // }
    console.log(users)
    setUsers(users)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const createUser = useCallback(async () => {
    await userModel.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
    })

    fetchUsers()
  }, [])

  const deleteUser = useCallback(async (id: number) => {
    const result = await userModel.delete(id)

    console.log(result, 'Deleted')

    fetchUsers()
  }, [])

  const initUpdateUser = useCallback(async (user: IUserModel) => {
    setSelectedUser(user)
  }, [])

  const setSelectedUserValue = useCallback(
    (key: keyof IUserModel, value: string) => {
      setSelectedUser((prev) => {
        if (!prev) {
          return prev
        }

        return {
          ...prev,
          [key]: value,
        }
      })
    },
    [],
  )

  const updateUser = useCallback(async (user: IUserModel) => {
    const result = await userModel.update(user.id, user)

    console.log(result, 'Updated')
    await fetchUsers()
    setSelectedUser(undefined)
  }, [])

  return (
    <>
      <h1 className="text-xl font-medium underline">Users</h1>
      {!users && <div>No users</div>}
      {users && !selectedUser && (
        <UserTable
          users={users}
          deleteUser={deleteUser}
          initUpdateUser={initUpdateUser}
        />
      )}

      {!selectedUser && <Button onClick={createUser}>Create User</Button>}

      {selectedUser && (
        <>
          ID: {selectedUser.id} <br />
          Name:
          <input
            type="text"
            value={selectedUser.name}
            onChange={(e) =>
              setSelectedUserValue('name', e.currentTarget.value)
            }
          />
          Email:
          <input
            type="text"
            value={selectedUser.email}
            onChange={(e) =>
              setSelectedUserValue('email', e.currentTarget.value)
            }
          />
          <Button onClick={() => setSelectedUser(undefined)}>Cancel</Button>
          <Button onClick={() => updateUser(selectedUser)}>Update</Button>
        </>
      )}
    </>
  )
}
