'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'

export default function Navigation() {
  return (
    <>
      <section className="flex flex-col justify-center gap-1">
        <span className="underline">Plugins</span>
        <NavItem text="Invoke" link="invoke" />
        <NavItem text="Dialog" link="dialog" />
        <NavItem text="Files" link="file-system" />
        <NavItem text="Command" link="command" />
      </section>
    </>
  )
}

interface NavItemProps {
  text: string
  link: string
}

const NavItem: React.FC<NavItemProps> = ({ text, link }) => {
  const pathname = usePathname()

  return (
    <Link href={link}>
      <button
        className={classNames({
          'w-full rounded border bg-green-800/50 px-3 py-2 text-slate-100 hover:bg-green-800/70':
            true,
          'border-green-900 bg-green-800/70': pathname.substring(1) === link,
        })}
      >
        {text}
      </button>
    </Link>
  )
}
