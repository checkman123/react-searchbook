export const loadFromLocalStorage = () => {
  //console.log("loadFromLocalStorage");
  try {
    const serializedState = localStorage.getItem("wishList");
    if (serializedState === null) return undefined;
    return serializedState;
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};

export const saveToLocalStorage = (state) => {
  try {
    //console.log("saveToLocalStorage");
    const serializedState = JSON.stringify(state);
    localStorage.setItem("wishList", serializedState);
  } catch (err) {
    console.warn(err);
  }
};
