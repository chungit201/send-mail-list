import React, {useState} from "react";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {decodeJwt, encodeJwt} from "../../component/utils";
import {setAccountData} from "../../stores/userSlice";
import {login} from "../../service/sendmail";

const background = require("../../assets/images/image-article-en.png");
const LoginPage = () => {
  const [email, setAddress] = useState("");
  const [pw, setPw] = useState("");


  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = {
      UserName: email,
      Password: pw
    }
    await login({value:await encodeJwt(user)})
      .then(async (res)=>{
        const decode = await decodeJwt(res.data);
        console.log(decode)
        if(decode.success === true){
          dispatch(setAccountData(decode.data))
          localStorage.setItem('accessToken',decode.data.access_token)
          navigate('/',{replace:true})
        }
      })
  }

  return (
    <div
      style={{
        background: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        position: "relative",
        alignItems: "center"
      }}
    >
      <Row className={"w-100 d-flex justify-content-center"}>
        <Col xl={4} xs={8} sm={6}>
          <div className={"form-login"}>
            <Form className={"p-5"}>
              <h4 className={"text-center"}>SLIME SEND MAIL FAST</h4>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Wallet address</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setAddress(e.target.value)
                  }}
                  type="address"
                  placeholder="Enter address"/>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setPw(e.target.value)
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
              </Form.Group>
              <div className={"text-center "}>
                <Button onClick={handleSubmit} className={"btn-signup mt-3"} style={{fontWeight: "600"}}
                        variant="primary" type="submit">
                  Sign up
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>

    </div>
  )
}

export default LoginPage
