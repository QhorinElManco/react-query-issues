export const sleep = (seconds: number): Promise<boolean> => {
  return new Promise((resolse) => {
    setTimeout(() => {
      resolse(true);
    }, seconds * 1000);
  });
};
