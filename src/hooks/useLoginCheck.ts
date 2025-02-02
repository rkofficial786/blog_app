import {useDispatch, useSelector} from 'react-redux';
import {showLogin} from '../store/user';

const useLoginCheck = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: any) => !!state.auth.token);

  const checkLogin = (action: () => void) => {
    if (!isLoggedIn) {
      dispatch(showLogin());
    } else {
      action();
    }
  };

  return checkLogin;
};

export default useLoginCheck;
