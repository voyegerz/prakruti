
import Sidebar from "../Components/Sidebar";
import Header from '../Components/Header';
import InboxLayout from './InboxLayout';
import ChatLayout from './ChatLayout';

export default function MainLayout() {
  return (
    <>
      <div className="grid grid-cols-[16rem,20rem,1fr] grid-rows-[4rem,1fr] gap-4 px-3 py-3 h-screen bg-neutral-700" >
				<Sidebar />
				<Header />
				<InboxLayout />
				<ChatLayout />
			</div>
    </>
  )
}
