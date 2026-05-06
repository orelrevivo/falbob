'use client'
import { NotificationWithUser } from '@/lib/types'
import { UserButton } from '@clerk/nextjs'
import { Role } from '@prisma/client'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { ModeToggle } from './mode-toggle'

type Props = {
  notifications: NotificationWithUser | []
  role?: Role
  className?: string
  subAccountId?: string
  user: any
}

const InfoBar = ({ notifications, subAccountId, className, role, user }: Props) => {

  return (
    <>
      <div
        className={twMerge(
          'fixed z-[20] bg-background/80 backdrop-blur-xl border-b-[1px] md:left-[300px] left-0 right-0 top-0 p-4 flex gap-4 items-center justify-between',
          className
        )}
      >
        <div className="flex items-center gap-3">
          <UserButton afterSignOutUrl="/" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{user?.name || user?.firstName}</span>
            <span className="text-xs text-muted-foreground">{user?.email || user?.emailAddresses?.[0]?.emailAddress}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </>
  )
}

export default InfoBar

