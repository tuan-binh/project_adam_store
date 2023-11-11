export const validateBlank = (text) => {
  if (text.toString().trim() === "") {
    return true;
  }
  return false;
};

export const formatDate = (date) => {
  let arr = date.split("-");
  return `${arr[2]}/${arr[1]}/${arr[0]}`;
};

export const formatDateToInput = (date) => {
  let arr = date.split("/");
  return `${arr[2]}-${arr[1]}-${arr[0]}`;
};

export const numberStock = (number) => {
  let check = Number(number);
  if (check <= 0) {
    return true;
  }
  return false;
};

export const numberPrice = (number) => {
  let check = Number(number);
  if (check <= 0) {
    return true;
  }
  return false;
};

export const numberPercent = (number) => {
  let check = Number(number);
  if (check <= 0 || check > 100) {
    return true;
  }
  return false;
};

export const validateDate = (created, dueDate) => {
  if (
    getYear(created) === getYear(dueDate) &&
    getMonth(created) === getMonth(dueDate) &&
    getDay(created) === getDay(dueDate)
  ) {
    return true;
  }
  if (getYear(created) < getYear(dueDate)) {
    return false;
  }
  if (getYear(created) === getYear(dueDate)) {
    if (getMonth(created) < getMonth(dueDate)) {
      return false;
    }
  }
  if (getYear(created) === getYear(dueDate)) {
    if (getMonth(created) === getMonth(dueDate)) {
      if (getDay(created) < getDay(dueDate)) {
        return false;
      }
    }
  }
  return true;
};

// json yyyy-MM-dd
const getDay = (date) => {
  let arr = date.split("-");
  return arr[2];
};

const getMonth = (date) => {
  let arr = date.split("-");
  return arr[1];
};

const getYear = (date) => {
  let arr = date.split("-");
  return arr[0];
};
