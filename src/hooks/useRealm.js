import { useContext } from 'react';
import { RealmContext } from '../contexts/RealmContext';

const useRealm = () => useContext(RealmContext);

export default useRealm;
