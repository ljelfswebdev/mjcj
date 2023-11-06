// import './globals.css'
import { Inter } from 'next/font/google'
import { GlobalsProvider } from '@/utils/fetchGlobals'
import '../styles/app.scss'
import Header from '../components/header'
import Footer from '../components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pilates',
  description: 'Pilates',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalsProvider>
        <Header/>
        {children}
        <Footer/>
        </GlobalsProvider>
        </body>
    </html>
  )
}
