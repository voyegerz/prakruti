
import Avatar from "./Avatar";

export default function Sidebar() {
  return (
    <>
      <ul className="menu row-span-2 rounded-box text-base font-bold" data-theme='dark'>
        <li>
          <Avatar />
        </li>
        <li>
          <a>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20h18L12 4z" /></svg>
            Assessment
          </a>
        </li>
        <li>
          <a className="bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            Chats
          </a>
        </li>
        <li>
          <a>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><path d="M16.2 7.8l-2 6.3-6.4 2.1 2-6.3z" /></svg>
            Explore
          </a>
        </li>
      </ul>
    </>
  );
}
