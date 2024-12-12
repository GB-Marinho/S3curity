import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'

export default function UserProfileSection() {
  return (
    <div className='flex gap-2 px-2'>
        <Avatar className='h-[53px] w-[53px]'>
            <AvatarImage/>
            <AvatarFallback className='bg-zinc-600'>User</AvatarFallback>
        </Avatar>
        <div className='flex flex-col justify-center'>
            <div className='text-lg font-bold'>Eu usuário</div>
            <div className='text-xs text-zinc-400'>usuário@gmail.com</div>
        </div>
    </div>
  )
}
