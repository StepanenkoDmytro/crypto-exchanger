import './App.css';
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';
import Partners from './components/ui/Partners';
import Exchanger from './components/Exchanger';
import HowItWorks from './components/ui/HowItWorks';


function App() {
	
	return (
		<>
			<Header/>
			<main className='main'>
				<Exchanger />
				<section className='desc'>
					<HowItWorks />
					<Partners />
				</section>
			</main>
			<Footer/>
		</>
	);
}

export default App;
