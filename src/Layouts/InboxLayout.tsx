import React from 'react'
import InboxTabs from '../Components/InboxTabs'
import ChatSelectListItem from '../Components/ChatSelectListItem'

export default function InboxLayout() {
  return (
    <>
      <ul className="menu rounded-box text-base font-bold" data-theme="dark">
        <p className='text-xl m-2 font-bold'>Inbox</p>
        <ChatSelectListItem />
        <InboxTabs />
      </ul >
    </>
  )
}
