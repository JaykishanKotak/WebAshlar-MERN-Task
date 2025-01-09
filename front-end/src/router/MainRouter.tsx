import { Route, Routes } from 'react-router-dom';
import { Home, Calendar, Meeting } from '@pages/index';
import { Const } from '@utils/Const';
import ProtectedRoute from './ProtectedRoute';

const MainRouter: React.FC = () => {
    return (
        <Routes>
            <Route element={<ProtectedRoute />}>
                <Route path={Const.ROUTES.HOME
                } element={<Home />} />
                <Route path={Const.ROUTES.CALANDER
                } element={<Calendar />} />
                <Route path={Const.ROUTES.MEETING} element={<Meeting />} />
                <Route path={Const.ROUTES.ANY} element={<Home />} />
            </Route>
        </Routes>
    );
};

export default MainRouter;
