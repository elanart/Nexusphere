import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="flex justify-between items-center p-4 border-t">
      <span>&copy; {new Date().getFullYear()} Your Company</span>
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link href='#'>About Us</Link>
          </li>
          <li>
            <Link href='#'>Contact</Link>
          </li>
          <li>
            <Link href='#'>Privacy Policy</Link>
          </li>
        </ul>
      </nav>
    </footer>
  )
}
