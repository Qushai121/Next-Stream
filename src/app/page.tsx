import {redirect} from 'next/navigation'
import Image from 'next/image'

export default function Home() {
  
//   const route = useRouter()
//  return route.push()
  return redirect('/admin/crud');
    
  
}
