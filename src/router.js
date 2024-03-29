import { createBrowserRouter } from 'react-router-dom';
import Exam from './components/Exam';
import ExamLayout from './components/ExamLayout';
import ExamTest from './components/ExamTest';
import Error from './components/Error';
import Test from './components/Test';
import ExamsResult from './components/ExamsResult';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Error error="Для загрузки теста введите правильный URL" />,
  },
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
        element: <Error error="Для загрузки экзамена введите правильный URL" />,
      },
      {
        path: ':testName',
        element: <Exam />,
      },
      {
        path: ':testName/test',
        element: <ExamTest />,
      },
    ],
  },
  {
    path: 'results/:examsList',
    element: <ExamsResult />,
  },
]);

export default router;
