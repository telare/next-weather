
import { Space_Grotesk } from 'next/font/google';
import { LayoutProps } from '../../../.next/types/app/home/layout';
const space_grotesk = Space_Grotesk({
  subsets:['latin'],
  weight:'400'
})

export default function HomeLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      {/* <meta http-equiv="Secure-Content-Policy"/> */}
      <body className={space_grotesk.className} style={{backgroundColor:'black'}}>
        {/* Layout UI */}
        {/* Place children where you want to render a page or nested layout */}
        <div>{children}</div>
      </body>
    </html>
  );
}
