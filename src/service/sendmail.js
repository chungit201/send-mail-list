import instance from "./instance";

export const sendMailAuto = (data) => {
  let url = `/support/mail`;
  return instance.post(url, data)
}

export const login = (data) =>{
  let url = `/user/login`;
  return instance.post(url, data)
}
