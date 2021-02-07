//import '../styles/globals.css'
import Head from 'next/head'
import Header from '../components/Header';

function MyApp({ Component, pageProps }) {
	return (<>
		<Head>
			<title>Create Next App</title>
			<link rel="icon" href="/favicon.ico" />
			<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossOrigin="anonymous"/>
		</Head>
		<Header/>
		<Component {...pageProps} />
	</>);
}

export default MyApp
