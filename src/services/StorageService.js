import * as store from 'store';

class StoreService {
  getItem = (key) => {
    return store.get(key);
  };

  getPass = (key) => {
    const testData = store.get(key);
    return testData && testData.pass;
  };

  getTest = (key) => {
    const testData = store.get(key);
    return testData && testData.test;
  };

  getTestValues = (key) => {
    const testData = store.get(key);
    return testData && testData.testValues;
  };

  getTestResults = (key) => {
    const testData = store.get(key);
    return testData && testData.testResults;
  };

  setItem = (key, payload) => {
    return store.set(key, payload);
  };

  setPass = (key, payload) => {
    const data = store.get(key);

    return store.set(key, { ...data, pass: payload });
  };

  setTest = (key, payload) => {
    const data = store.get(key);

    return store.set(key, { ...data, test: payload });
  };

  setTestValues = (key, payload) => {
    const data = store.get(key);

    return store.set(key, { ...data, testValues: payload });
  };

  setTestResults = (key, payload) => {
    const data = store.get(key);

    return store.set(key, { ...data, testResults: payload });
  };

  removeItem = (key) => {
    store.remove(key);
  };
}

const storageService = new StoreService();

export default storageService;
