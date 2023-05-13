import * as Realm from 'realm-web';

class RealmService {
  constructor() {
    this.app = new Realm.App({ id: process.env.REACT_APP_REALM_ID });
  }
}

export default RealmService();
