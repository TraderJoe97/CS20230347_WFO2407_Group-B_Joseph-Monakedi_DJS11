import { Link } from "react-router-dom"

export default function Sidebar(){
    return (
        <aside className="w-64 bg-secondary p-4 hidden md:block overflow-y-auto">
          <nav>
            <ul>
              <li><Link to="/" className="block py-2 hover:underline">Home</Link></li>
            </ul>
          </nav>
        </aside>
    )
}