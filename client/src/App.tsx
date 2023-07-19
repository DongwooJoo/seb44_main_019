import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Suspense, useEffect, useState } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useEffect, useState } from 'react';

import './App.css';
import GlobalStyle from './style/GlobalStyle.ts';
import Footer from './component/footer/Footer.tsx';
import Nav from './component/nav/Nav.tsx';
import HomePage from './page/home/HomePage.tsx';
import MainPage from './page/main/MainPage.tsx';
import SignupPage from './page/signup/SignupPage.tsx';
import AfterSignUp from './page/aftersignup/AfterSignUp.tsx';
import LoginPage from './page/login/LoginPage.tsx';
import ShellCreate from './page/shellcreate/ShellCreate.tsx';
import ShellUpdate from './page/shellupdate/ShellUpdate.tsx';
import ProductShell from './page/productshell/ProductShell.tsx';
import TalentShell from './page/talentshell/TalentShell.tsx';
import ShellDetailPage from './page/shelldetail/ShellDetailPage.tsx';
import MyPage from './page/mypage/MyPage.tsx';
import MyShellsPage from './page/myshells/MyShellsPage.tsx';
import OfferedShellsPage from './page/offeredshells/OfferedShellsPage.tsx';
import DirectMessage from './page/directmessage/DirectMessage.tsx';
import Loading from './common/loading/Loading.tsx';
import { useGetShells } from './hooks/shells/useShellsId.ts';
import { useRecoilState } from 'recoil';
import { userState } from './recoil/atom.ts';

import SearchPage from './page/searchpage/SearchPage.tsx';

function App() {


  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken !== null && accessToken !== undefined) {
      const userData = localStorage.getItem('userData');
      if (userData) {
        setUser(userData);
      }
    }
  }, []);
  return (
    <BrowserRouter>
      <GlobalStyle />
      <main>
            <Nav />
          <div className="inner">
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/aftersignup" element={<AfterSignUp />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/shelllist/product" element={<ProductShell />} />
                <Route path="/shelllist/talent" element={<TalentShell />} />
                <Route path="/shellcreate" element={<ShellCreate />} />
                <Route path="/shellupdate/:id" element={<ShellUpdate />} />
                <Route path="/shelldetail/:id" element={<ShellDetailPage />} />
                <Route path="/member/:id" element={<MyPage />} />
                <Route path="/myshells/:id" element={<MyShellsPage />} />
                <Route path="/offer/:id" element={<OfferedShellsPage />} />
                <Route path="/dm/:id" element={<DirectMessage />} />
                <Route path="/search" element={<SearchPage/>} />

              </Routes>
            </Suspense>
            <Footer />
          </div>
        </main>
      </BrowserRouter>

  );
}

export default App;
