import { useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { NavItemContext } from './context/NavItemContext';
import { Layout } from './layout/Layout';
import { NotFound } from './pages/NotFound/NotFound';
import { Board } from './pages/Board/Board';
import { Home } from './pages/Home/Home';
import { BoardDelete } from './pages/BoardDelete/BoardDelete';
import './App.css';

function App() {
  const { deleted, setDeleted } = useContext(NavItemContext) || {};

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
