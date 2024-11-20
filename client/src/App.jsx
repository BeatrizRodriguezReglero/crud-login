
import { BrowserRouter} from 'react-router-dom';
import AuthProvider from './providers/AuthProviders';
import { GlobalStyles } from './styles/GlobalStyles';
import Router from './router/Router';

const App = () => {
	return (
		<>
			<BrowserRouter>
				<AuthProvider>
					<GlobalStyles />
					<Router/>
				</AuthProvider>
			</BrowserRouter>
			
		</>
	);
};

export default App;
