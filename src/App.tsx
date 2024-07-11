import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { NotFound } from './pages/NotFound';
import { Board } from './pages/Board/Board';
import { Home } from './pages/Home/Home';
import { Layout } from './layout/Layout';
import { BoardDelete } from './pages/BoardDelete';
import { useContext, useEffect } from 'react';
import { NavItemContext } from './context/NavItemContext';

function App() {
  const NavItemContextValues = useContext(NavItemContext);
  const { deleted, setDeleted } = NavItemContextValues?.board || {};

  const navigate = useNavigate();
  useEffect(() => {
    if (deleted) {
      navigate('/notfoundboard');
      if (setDeleted) {
        setDeleted(false);
      }
    }
  }, [deleted]);

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="/board/:boardId"
            element={deleted ? <BoardDelete /> : <Board />}
          />
          <Route path="notfoundboard" element={<BoardDelete />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
