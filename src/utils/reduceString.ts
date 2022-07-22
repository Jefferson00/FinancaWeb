export const reduceString = (value: string | undefined, maxlength: number) => {
  if (value) {
    if (value.length >= maxlength) {
      return `${value.substring(0, maxlength)}...`;
    } else {
      return value;
    }
  } else {
    return "";
  }
};
