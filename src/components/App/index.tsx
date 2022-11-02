import React from 'react';
import { Routes, Route, useNavigate, useLocation, } from "react-router-dom";
import routes from '../../router';
import { check } from '../../utils/api';

import '../../utils/web3';

export const AppContext = React.createContext<{ appToken: string, setAppToken: Function }>({ appToken: '', setAppToken: () => {} });

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [appToken, setAppToken] = React.useState<string>('');

  // @ts-ignore
  const isMetaMaskInstalled = typeof window.ethereum !== 'undefined';

  const checkAuth = async () => {
    const { isAuth, token } = await check();

    if (isAuth) {
      setAppToken(token);

      if (location.pathname === '/auth') {
        navigate('/');
      }
    }
    
    if (!isAuth) {
      navigate('/auth');
    }
  };

  const memoizedIsAuth = React.useCallback(
    () => {
      checkAuth();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  ); 

  React.useEffect(() => {
    memoizedIsAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {
        isMetaMaskInstalled ? (
          <AppContext.Provider value={{ appToken, setAppToken }}>
            <Routes>
              {
                routes.map(({ path, element: Component }) => (
                  <Route
                    key={path}
                    path={path}
                    element={<Component />}
                  />
                ))
              }
            </Routes>
          </AppContext.Provider>
        ) : (
          <div>MetaMask isn't installed!</div>
        )
      }
    </>
    
  );
};

export default App;
