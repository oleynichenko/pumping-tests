import { createContext, useEffect, useState } from 'react';
import * as Realm from 'realm-web';

const RealmContext = createContext();

const RealmProvider = ({ children }) => {
  const [database, setDatabase] = useState(null);

  useEffect(() => {
    const app = new Realm.App({ id: process.env.REACT_APP_REALM_APP_ID });
    const credentials = Realm.Credentials.anonymous();

    app.logIn(credentials).then(() => {
      const client = app.currentUser.mongoClient('mongodb-atlas');

      setDatabase(client.db('quiz'));
    });
  }, []);

  return (
    <RealmContext.Provider
      value={{
        testsCol: database && database.collection('tests'),
        questionsCol: database && database.collection('questions'),
      }}
    >
      {children}
    </RealmContext.Provider>
  );
};

export { RealmProvider, RealmContext };
