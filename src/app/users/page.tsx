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

export default function Database() {
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectUsers)

  const getUsers = useCallback(async () => {
    const _users: IUser[] = await invoke('get_users', { name: 'World' })

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

  return (
    <div className="ml-6 flex w-full flex-col gap-2 p-2">
      <UsersTable users={users} />
      <div className="-ml-4 flex justify-start">
        <Button onClick={createUser}>Insert User</Button>
      </div>
    </div>
  )
}

interface UsersTableProps {
  users: IUser[]
}

function UsersTable({ users }: UsersTableProps) {
  return (
    <div className="w-full">
      <Table
        bleed
        dense
        grid
        striped
        className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]"
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
                <Button color="red">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
