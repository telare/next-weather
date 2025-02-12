
import { Layout } from '@/shared/types/Layout';
import { Space_Grotesk } from 'next/font/google';
const space_grotesk = Space_Grotesk({
  subsets:['latin'],
  weight:'400'
})

export default function FavoriteLayout({ children }: Layout) {
  return (
    <html lang="en">
      <body className={space_grotesk.className} style={{backgroundColor:'inherit'}}>
        {/* Layout UI */}
        {/* Place children where you want to render a page or nested layout */}
        <div>{children}</div>
      </body>
    </html>
  );
}
