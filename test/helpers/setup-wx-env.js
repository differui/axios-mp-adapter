global['wx'] = {
  request() {}
};

global['wait'] = function wait(duration) {
  return new Promise(resolve => setTimeout(resolve, duration));
};
