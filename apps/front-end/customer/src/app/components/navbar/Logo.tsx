import Link from 'next/link'
import { LuTent } from 'react-icons/lu';
import { Button } from '@my-relax-app/shared-ui';

const Logo = () => {
  return (
    <div className='flex items-center gap-2'>
      <Button size='icon' asChild>
        <Link href='/'>
          <LuTent className='w-6 h-6 text-green-800' />
        </Link>
      </Button>
      <Link href='/'>
        <span className='font-bold text-2xl'>RelaxPlace</span>
      </Link>
    </div>
  )
}

export default Logo