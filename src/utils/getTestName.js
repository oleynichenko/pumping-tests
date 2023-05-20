const getTestName = () => {
  return window.location.pathname.split('/')[1];
};

export default getTestName;