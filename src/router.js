import Test from './components/Test';
import { createBrowserRouter } from 'react-router-dom';
import Exam from './components/Exam';

const router = createBrowserRouter([
  {
    path: '/:testName',
    element: <Test />,
  },
  {
    path: 'exam/:testName',
    element: <Exam />,
  },
]);

export default router;
