import { Space_Grotesk } from 'next/font/google';
import { LayoutProps } from '../../../../.next/types/app/auth/log-in/layout';
const space_grotesk = Space_Grotesk({
  subsets:['latin'],
  weight:'400'
})
export default function layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body style={{margin:"0"}} className={space_grotesk.className}>
        <div>{children}</div>
      </body>
    </html>
  );
}
