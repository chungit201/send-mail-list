import useSWR from 'swr';
import store from "../../../stores";
import {setAccountData} from "../../../stores/userSlice";
import jwt_decode from "jwt-decode";

const loadUserData = () => {
  return new Promise(async resolve => {
    try {
      const tokens = await localStorage.getItem('accessToken')
      const user = await jwt_decode(tokens);
      store.dispatch(setAccountData(user));
      resolve(user);

    } catch (err) {
      resolve(null);
    }
  })
}


export const loadData = (props) => {
  return new Promise(async (resolve, reject) => {
    const user = await loadUserData();
    resolve({
      userData: user,
    })
  })
}

export default function useLoadUserData() {
  const {data, error} = useSWR("/", loadData);

  const loading = !data && !error;

  return {
    user: data?.userData,
    loading,
  }
}
