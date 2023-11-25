import axios from "axios";
export function sendIndi(email,notititle,notimessage){
    axios.post(`https://app.nativenotify.com/api/notification`, {
      subID: email,
      appId: 14881,
      appToken: "JNsN0VrdyjC41kJb7doGS2",
      title: notititle,
      message: notimessage,
    });
}

export function sendGroup(email,notititle, notimessage) {
  axios.post(`https://app.nativenotify.com/api/notification`, {
    subID: email,
    appId: 14881,
    appToken: "JNsN0VrdyjC41kJb7doGS2",
    title: notititle,
    message: notimessage,
  });
}
