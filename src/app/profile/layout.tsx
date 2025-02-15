
import { Layout } from '@/shared/types/Layout';
import { Space_Grotesk } from 'next/font/google';
const space_grotesk = Space_Grotesk({
  subsets:['latin'],
  weight:'400'
})

export default function ProfileLayout({ children }: Layout) {
  return (
      <div className={space_grotesk.className} style={{backgroundColor:'inherit'}}>
        <div>{children}</div>
      </div>
  );
}
