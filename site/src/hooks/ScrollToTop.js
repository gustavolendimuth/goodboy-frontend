/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import Context from '../context/Context';

export default function ScrollToTop() {
  // const { setAlert } = useContext(Context);
  const { pathname } = useLocation();

  useEffect(() => {
    // setAlert();
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
