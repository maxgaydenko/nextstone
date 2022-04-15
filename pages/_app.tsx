import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div style={{
      background: '#e3f7f1',
      padding: '3em',
    }}>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
