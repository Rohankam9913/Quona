import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/home/Home';
import Question from './pages/questions/Question';
import Topics from './pages/topics/Topics';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import TopicName from './pages/topicName/TopicName';
import Answer from './pages/answers/Answer';
import PostAnswer from './pages/postAnswer/PostAnswer';
import Profile from './pages/profile/Profile';
import YourQuestions from './pages/profile/YourQuestions';
import YourAnswers from './pages/profile/YourAnswers';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },

            {
                path: "/askQuestion",
                element: <Question />
            },

            {
                path: "/topics",
                element: <Topics />,
            },

            {
                path: "/topics/:topicName",
                element: <TopicName />
            },

            {
                path: "/answer/:question_name/:questionId",
                element: <Answer />
            },

            {
                path: "/post_answer/:question_name/:questionId",
                element: <PostAnswer />
            },

            {
                path: "/profile/:username/:userId",
                element: <Profile />
            },

            {
                path: "/profile/your_questions",
                element: <YourQuestions />
            },

            {
                path: "/profile/your_answers",
                element: <YourAnswers />
            }
        ]
    },

    {
        path: "/login",
        element: <Login />
    },

    {
        path: "/register",
        element: <Register />
        
    },
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    // <React.StrictMode>
    <RouterProvider router={ router } />
    // </React.StrictMode>
);

