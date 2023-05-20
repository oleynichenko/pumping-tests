import * as Realm from 'realm-web';

class RealmService {
  constructor() {
    this.app = new Realm.App({ id: process.env.REACT_APP_REALM_APP_ID });
  }

  async init() {
    const credentials = Realm.Credentials.anonymous();

    await this.app.logIn(credentials);

    this.client = this.app.currentUser.mongoClient('mongodb-atlas');
  } 
  
  async getTest() {
    this.client.db('sample_restaurants').collection('restaurants')
  }
}

export default RealmService();
