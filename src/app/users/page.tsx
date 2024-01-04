'use client'

import { useCallback, useEffect } from 'react'
import { Button } from '@/components/button'
import { invoke } from '@tauri-apps/api/core'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/table'
import { IUser, selectUsers, setUsers } from '@/store/users'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Text } from '@/components/text'

export default function Database() {
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectUsers)

  const getUsers = useCallback(async () => {
    const _users = await invoke<IUser[]>('get_users')

    dispatch(setUsers(_users))

    console.log(_users)
  }, [dispatch])

  useEffect(() => {
    getUsers()
  }, [getUsers])

  const createUser = async () => {
    const user = await invoke<IUser>('create_user', {
      name: 'World',
      email: 'test@test.com',
    })

    console.log(user)

    getUsers()
  }

  const deleteUser = async (id: string) => {
    const user = await invoke<IUser>('delete_user', {
      id,
    })

    console.log(user)

    getUsers()
  }

  return (
    <div className="ml-6 flex w-full flex-col gap-2 p-2">
      <UsersTable users={users} deleteUser={deleteUser} />
      <div className="-ml-4 flex justify-start">
        <Button onClick={createUser}>Insert User</Button>
      </div>
    </div>
  )
}

interface UsersTableProps {
  users: IUser[]
  deleteUser: (id: string) => void
}

function UsersTable({ users, deleteUser }: UsersTableProps) {
  if (users.length === 0) return <Text>No users could be found...</Text>

  return (
    <div className="w-full">
      <Table
        bleed
        dense
        grid
        striped
        className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)] "
      >
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Created At</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="text-zinc-500">{user.created_at}</TableCell>
              <TableCell className="flex gap-2">
                <Button outline>Edit</Button>
                <Button color="red" onClick={() => deleteUser(user.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
