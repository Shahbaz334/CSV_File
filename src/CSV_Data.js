import './Post.css';
import { useState } from 'react';
import logo from './cat.jpg'
import cross from './cross.png';
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
function Post() {
    const [show, setShow] = useState(false);
    const [FirstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [Email, setEmail] = useState('')
    const [Age, setAge] = useState('')
    const [isUpdate, setIsUpdate] = useState(false)
    const [id, setId] = useState(-2)
    const [data, setData] = useState([])
    const headers = [
        { label: "First Name", key: "firstName" },
        { label: "Last Name", key: "lastName" },
        { label: "Email", key: "email" },
        { label: "Age", key: "age" }
    ];
    const csvReport = {
        data: data,
        headers: headers,
        filename: 'Report.csv'
    };
    const createData = (obj) => {
        if (id) {
            const temp = data;
            const index = data.findIndex(item => item.id == id)
            temp[index] = { ...temp[index], ...obj }
            setData(temp)
            setIsUpdate(false)
            setId('')
        } 
        else {
            setData([obj, ...data])
            setFirstName("")
            setLastName("")
            setEmail("")
            setAge("")
        }
    }
    const updateData = (obj) => {
        setFirstName(obj.FirstName)
        setLastName(obj.LastName)
        setEmail(obj.Email)
        setAge(obj.Age)
        setId(obj.id)
        setIsUpdate(true)
    }
    const deleteData = (id) => {
        setData(data.filter(item => item.id != id))
    }
    return (
        <div>
            <div className="container" style={{ borderWidth: 5, borderColor: 'black' }}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="box">
                            <div className="circle">
                                <img src={logo} />
                            </div>
                            <div className="text" onClick={() => setShow(true)}>
                                <input type="text" placeholder="What's on your mind" />
                            </div>
                        </div>
                    </div>
                </div>
                {show ?
                    <div className="col-lg-12">
                        <div className='input' >
                            <div>
                                <div onClick={() => setShow(false)} >
                                    <img style={{ width: 20, height: 20, marginLeft: 500, marginTop: 20 }} src={cross} />
                                </div>
                                <label>FirstName</label>
                                <input
                                    value={FirstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    type="text"
                                    className="form-control"
                                    placeholder="FirstName"
                                />
                                <label>LastName</label>
                                <input
                                    value={LastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    type="text"
                                    className="form-control"
                                    placeholder="LastName"
                                />
                                <label>Email</label>
                                <input
                                    value={Email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="Email"
                                    className="form-control"
                                    placeholder="Email"
                                />
                                <label>Age</label>
                                <input
                                    value={Age}
                                    onChange={(e) => setAge(e.target.value)}
                                    type="text"
                                    accessKey='number'
                                    className="form-control"
                                    placeholder="Age"
                                />
                            </div>
                            <div className='Button'>
                                <button
                                    className="btn btn-primary" onClick={() => createData({
                                        firstName: FirstName,
                                        lastName: LastName,
                                        email: Email,
                                        age: Age,
                                        id: Math.random()
                                    })}>{isUpdate ? "Update" : "Submit"}</button>
                            </div>
                        </div>
                    </div>
                    : null}
            </div>
            <Link style={{ marginLeft: '20%' }} to="/import">ImportCSV</Link>
            <span style={{ marginLeft: '50%', borderWidth: 2, borderRadius: 30 }}>
                <CSVLink {...csvReport}>Export to CSV</CSVLink>
            </span>
            <table>
                <tbody>
                    {data?.map((item, index) => (
                        <tr key={index + item.id.toString()}>
                            <td>{item.FirstName}</td>
                            <td>{item.LastName}</td>
                            <td>{item.id}</td>
                            <td>
                                <button
                                    className="btn btn-primary" onClick={() => updateData(item)}>Update</button>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteData(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default Post;