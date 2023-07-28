import * as store from 'store';

class StoreService {
  getItem = key => {
    return store.get(key);
  };

  setItem = (key, payload) => {
    return store.set(key, payload);
  };

  removeItem = key => {
    store.remove(key);
  };
}

const storageService = new StoreService();

export default storageService;
