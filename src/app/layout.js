// import './globals.css'
import { Inter } from 'next/font/google'
import '../styles/app.scss'
import Header from '../components/header'
import Footer from '../components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mark Jelfs Carpentry & Joinery',
  description: 'Mark Jelfs Carpentry & Joinery',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header/>
        {children}
        <Footer/>
        </body>
    </html>
  )
}
