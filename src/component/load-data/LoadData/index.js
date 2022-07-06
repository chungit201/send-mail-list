import React, {useEffect, useState} from 'react';
import useLoadUserData from "../LoadUserData";
import {useNavigate} from "react-router-dom";

const LoadData = ({children}) => {
  const navigate = useNavigate()
  const {user, loading} = useLoadUserData();

  useEffect(() => {
    checkAccount();
  }, [user, loading]);

  const checkAccount = async () => {
    if (!loading && user === null) {
      await navigate('/login', {replace: true})
    }
    if (user) {

    }
  }
  return (<>
    {loading ? <div>

    </div> : children}
  </>);
}
export default LoadData;
