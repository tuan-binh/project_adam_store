export const validateBlank = (text) => {
  if (text.toString().trim() === "") {
    return true;
  }
  return false;
};
