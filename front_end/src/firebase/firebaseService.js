import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { storage } from "./firebaseConfig";

export const firebase_single_upload = async (file) => {
  const imageRef = ref(storage, `image/${file.name}`);
  let snapshot = await uploadBytes(imageRef, file);
  let uploadUrl = await getDownloadURL(snapshot.ref);
  return uploadUrl;
};

export const firebase_multiple_upload = async (listFile) => {
  let tempArr = [];

  for (let i = 0; i < listFile.length; i++) {
    const element = listFile[i];
    let url = await firebase_single_upload(element);
    tempArr.push(url);
  }
  return tempArr;
};