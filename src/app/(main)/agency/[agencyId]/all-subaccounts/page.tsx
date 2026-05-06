'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { getAuthUserDetails } from '@/lib/queries'
import { SubAccount } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import DeleteButton from './_components/delete-button'
import CreateSubaccountButton from './_components/create-subaccount-btn'

type Props = {
  params: { agencyId: string }
}

const AllSubaccountsPage = ({ params }: Props) => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getAuthUserDetails()
      setUser(data)
      setLoading(false)
    }
    fetchUser()
  }, [])

  if (loading) return <div className="p-6">Loading subaccounts...</div>
  if (!user) return <div>No user found</div>

  return (
    <div className="flex flex-col">
      <CreateSubaccountButton
        user={user}
        id={params.agencyId}
        className="w-[200px] self-end m-6"
      />

      <Command className="rounded-xl bg-card border shadow-sm pointer-events-auto">
        <CommandInput placeholder="Search Account..." className="h-12" />

        <CommandList>
          <CommandEmpty>No Results Found.</CommandEmpty>
          <CommandGroup heading="Sub Accounts">
            {user.Agency?.SubAccount?.length ? (
              user.Agency.SubAccount.map((subaccount: SubAccount) => (
                <CommandItem
                  key={subaccount.id}
                  value={subaccount.name}
                  className="h-32 bg-background my-2 border border-border p-4 rounded-xl hover:bg-muted/80 transition-all group relative overflow-hidden pointer-events-auto"
                  onSelect={() => { }}
                >
                  {/* Clickable Card Area */}
                  <Link
                    href={`/subaccount/${subaccount.id}`}
                    className="flex gap-4 w-full h-full pointer-events-auto"
                  >
                    <div className="relative w-32 flex-shrink-0">
                      <Image
                        src={subaccount.subAccountLogo || '/placeholder.svg'}
                        alt="subaccount logo"
                        fill
                        className="rounded-md object-contain bg-muted/50 p-4"
                      />
                    </div>
                    <div className="flex flex-col justify-between flex-1 min-w-0 py-1">
                      <div>
                        <p className="font-semibold truncate">{subaccount.name}</p>
                        <span className="text-muted-foreground text-xs truncate">
                          {subaccount.address}
                        </span>
                      </div>
                    </div>
                  </Link>

                  {/* Delete Button */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-auto"
                      >
                        Delete
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the
                          subaccount and all related data.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-destructive hover:bg-destructive">
                          <DeleteButton subaccountId={subaccount.id} />
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CommandItem>
              ))
            ) : (
              <div className="text-muted-foreground text-center p-8">
                No Sub accounts yet
              </div>
            )}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  )
}

export default AllSubaccountsPage