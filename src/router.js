import Test from './components/Test';
import { createBrowserRouter } from 'react-router-dom';
import Exam from './components/Exam';
import ExamLayout from './components/ExamLayout';

const router = createBrowserRouter([
  {
    path: '/:testName',
    element: <Test />,
  },
  {
    path: 'exam',
    element: <ExamLayout />,
    children: [
      {
        index: true,
        element: <Exam />,
      },
      {
        path: ':testName',
        element: <Exam />,
      },
      {
        path: ':testName/test',
        element: <Test />,
      },
    ],
  },
]);

export default router;
