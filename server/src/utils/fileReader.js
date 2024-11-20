export const fileReaderPromise = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = err => {
      reject(err);
    };
    reader.readAsDataURL(file);
  });
};
