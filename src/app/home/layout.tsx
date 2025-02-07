
import { Space_Grotesk } from 'next/font/google';
const space_grotesk = Space_Grotesk({
  subsets:['latin'],
  weight:'400'
})
type HomeLayout = {
  children: React.ReactNode;
};
export default function HomeLayout({ children }: HomeLayout) {
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
