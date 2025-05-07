import { Button } from '@my-relax-app/shared-ui';
import Link from 'next/link';


const page = () => {
  return (
    <div>
      <h1 className='text-3xl'>Find your ideal place to relax</h1>
      <Button asChild>
        <Link href='/' className='capitalize m-8 bg-green-800 rounded w-40 text-white'>
          Click me
        </Link>
      </Button>
    </div>
  )
}

export default page