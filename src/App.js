import './App.css';
import * as xlsx from "xlsx";
import {useState} from "react";
import {Button, Col, Input, notification, Row, Spin} from "antd";
import axios from "axios";
import TextArea from "antd/es/input/TextArea";


function App() {
  const [data, setData] = useState([]);
  const [file, setFile] = useState();
  const [template, setTemplate] = useState("");
  const [subject, setSubject] = useState("");
  const [loadingFile, setLoadingFile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false)
  const readUploadFile = (e) => {
    setLoadingFile(true)
    console.log(e)
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, {type: "array"});
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        console.log(json);
        setData(json)
        setLoadingFile(file)
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  }

  const sendToEmail = () => {
    setLoading(true)
    axios.post('https://slimeroyale.com/api/v1/user/send-mail-list', {
      template: template,
      subject: subject,
      email: data
    })
      .then(function (response) {
        // handle success
        if (response.status === 200) {
          notification.success({message: "Send mail successfully"});
          setSuccess(true)
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        notification.error({message: "Send mail fail!"})
      })

    setLoading(false)

  }
  const handleChange = (e) => {
    setTemplate(e.target.value)
  }
  const handleChangeTitle = (e) => {
    setSubject(e.target.value)
  }
  return (
    <div className="App">
      <div className={"w-100"}>
        <Row className={"w-100 d-flex justify-content-center"}>

          {/*<h2>Send mail to {data.length} users</h2>*/}
          <Col xl={18}>

            <div className={"box-send-mail"}>
              <h2>SEND EMAIL WITH EXCEL LIST</h2>
              <Row gutter={16} className={"mt-4"}>
                <Col xl={12}>
                  <div>
                    <Input onChange={handleChangeTitle} placeholder={"Enter subject..."}/>
                  </div>
                  <div className="parent-div" style={{marginTop: "50px", cursor: "pointer"}}>
                    <button className="btn-upload">Import excel</button>
                    <input onChange={readUploadFile} type="file" name="upfile"/>
                  </div>
                  <div className={"mt-2"}>
                    <div>Number of emails to send:
                      {loadingFile ?
                        <div><Spin tip="Loading..." className={"mt-2"} spinning={loadingFile} size="large"/></div> :
                        <h1 style={{color: "#1890ff"}}>{data.length}</h1>}

                    </div>
                  </div>
                </Col>
                <Col xl={12}>
                  <div>
                    <TextArea placeholder={"Paste the template..."} onChange={handleChange} rows={8}/>
                  </div>
                </Col>
              </Row>
            </div>
            <Button
              disabled={data.length > 0 && subject !== "" && template !== "" ? false : true}
              onClick={sendToEmail}
              size={"large"}
              type="primary"
              block
            >
              SEND TO EMAIL
            </Button>
          </Col>

        </Row>
        <Row className={"w-100 d-flex justify-content-center"}>
          <Col>

          </Col>
        </Row>
      </div>
    </div>
  );
}

export default App;
