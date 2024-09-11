import { ModeToggle } from '@/app/components/mode-toggle'
import Link from 'next/link'
import ButtonLogout from './button-logout'
import { Button } from './ui/button'

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 border-b">
      <nav>
        <ul className="flex gap-4">
          <li>
          {/* <Link href='/login'>Login</Link> */}
          <Link href='/login'>
            <Button>
              Login
            </Button>
          </Link>
        </li>
        <li>
          {/* <Link href='/register'>Register</Link> */}
          <Link href='/register'>
            <Button>
              Register
            </Button>
          </Link>
        </li>
        <li>
          <ButtonLogout />
        </li>
      </ul>
      </nav>
       {/* <ModeToggle /> */}
    </header>
  )
}