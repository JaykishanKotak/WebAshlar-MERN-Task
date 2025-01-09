import { Login, SignUp } from '@pages/index';
import { Const } from '@utils/Const';
import { Route, Routes } from 'react-router-dom';

const AuthRouter: React.FC = () => {
    return (
        <Routes>
            <Route path={Const.ROUTES.LOGIN} element={<Login />} />
            <Route path={Const.ROUTES.REGISTER} element={<SignUp />} />
            <Route path={Const.ROUTES.ANY} element={<Login />} />
        </Routes>
    );
};

export default AuthRouter;
