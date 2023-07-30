import { createContext, useEffect, useState } from 'react';
import * as Realm from 'realm-web';

const RealmContext = createContext();

const RealmProvider = ({ children }) => {
  const [database, setDatabase] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const app = new Realm.App({ id: process.env.REACT_APP_REALM_APP_ID });
    const credentials = Realm.Credentials.anonymous();

    app.logIn(credentials).then((user) => {
      const client = app.currentUser.mongoClient('mongodb-atlas');

      setDatabase(client.db('quiz'));
      setUser(user);
    });
  }, []);

  return (
    <RealmContext.Provider
      value={{
        realmFunctions: user && user.functions,
        testsCol: database && database.collection('tests'),
        questionsCol: database && database.collection('questions'),
        passesCol: database && database.collection('passes'),
      }}
    >
      {children}
    </RealmContext.Provider>
  );
};

export { RealmProvider, RealmContext };
