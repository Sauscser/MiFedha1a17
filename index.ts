import { Amplify } from 'aws-amplify';
import amplifyconfig from './src/amplifyconfiguration.json';

// Configure Amplify first, before App is imported
Amplify.configure(amplifyconfig);

import { registerRootComponent } from 'expo';
import App from './App';

registerRootComponent(App);
