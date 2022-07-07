import instance from "./instance";

export const sendMailAuto = (data) => {
  let url = `/support/mail`;
  return instance.post(url, data)
}

