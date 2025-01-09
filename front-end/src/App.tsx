import { useEffect } from 'react';
import { setUserInfo } from '@store/user/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import { Footer, Header, Loader } from './layouts';
import { ScrollToTop } from './utils';
import { RootState } from './store/store';
import AuthRouter from './router/AuthRouter';
import MainRouter from './router/MainRouter';


const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.user.userInfo)


  const dispatch = useDispatch();

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('@userInfo');
    if (storedUserInfo) {
      dispatch(setUserInfo(JSON.parse(storedUserInfo)));
    }
  }, [dispatch]);

  return (
    <>
      <ScrollToTop />
      <Header />
      <Loader />
      {isAuthenticated ? <MainRouter /> : <AuthRouter />}
      <Footer />
    </>
  );
};

export default App;
