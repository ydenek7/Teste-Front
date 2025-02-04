import React from 'react';
import { UserProvider } from './context/UserContext.tsx';
import UserList from './components/UserList.tsx';


const App: React.FC = () => {
    return (
        <UserProvider>
            <div>
                <UserList/>
            </div>
        </UserProvider>
    );
};

export default App;
