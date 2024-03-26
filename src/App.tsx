import { Main } from './pages/Main';

import './i18n';
import { BG } from './components';

export default function App() {
  return (
    <div style={{position: 'relative'}}>
      <BG style={{position: 'absolute', width: '100%', height: '100%'}}/>
      <Main/>
    </div>
  );
}