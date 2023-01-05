import shortUUID from 'short-uuid';

export const Wait = (
  seconds: number,
): Promise<void> => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, seconds * 1000);
});

export const AddSeconds = (dt: Date, seconds: number): Date => {
  const newDate = new Date(dt.getTime() + seconds * 1000);
  return newDate;
};

export const AddDays = (dt: Date, days: number): Date => {
  const newDate = dt;
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

export const capitalizeString = (name: string) => {
  const newStr = name.replace(/(^\w{1})|([\s+-]\w{1})/g, (letter) => letter.toUpperCase());
  return newStr;
};

export const TitleCase = (str: string) => str.toString()
  .toLowerCase()
  .split(' ')
  .map((x) => x.trim())
  .map((word) => word[0] && word[0].toUpperCase() + word.slice(1))
  .join(' ');

export const RandomInt = (min: number, max: number) => {
  const newNum = Math.floor(Math.random() * (max - min) + min);
  return newNum;
};

export const GenerateId = () => shortUUID.generate();
