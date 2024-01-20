// import React, { useEffect, useState } from 'react'
// import Modal from 'react-bootstrap/Modal'
// import Button from 'react-bootstrap/Button'
// import { useNavigate } from 'react-router-dom'

// const Details = () => {

//     const [logindata, setLoginData] = useState([]);


//     const history = useNavigate();

//     const [show, setShow] = useState(false);

//     var todayDate = new Date().toISOString().slice(0, 10);
  

//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);

//     const Birthday = () => {
//         const getuser = localStorage.getItem("user_login");
//         if (getuser && getuser.length) {
//             const user = JSON.parse(getuser);
         
//             setLoginData(user);


//             const userbirth = logindata.map((el, k) => {
//                 return el.date === todayDate
//             });

//             if (userbirth) {
//                 setTimeout(() => {
//                     console.log("ok");
//                     handleShow();
//                 }, 3000)
//             }
//         }
//     }

//     const userlogout = ()=>{
//         localStorage.removeItem("user_login")
//         history("/");
//     }

//     useEffect(() => {
//         Birthday();
//     }, [])

//     return (
//         <>
//             {
//                 logindata.length === 0 ? "errror" :
//                     <>
//                         <h1>Profile page</h1>
//                         <h1>{logindata[0].name}</h1>
//                         <Button onClick={userlogout}>LogOut</Button>

//                 {
//                     logindata[0].date === todayDate ? 
//                     <Modal show={show} onHide={handleClose}>
//                             <Modal.Header closeButton>
//                                 <Modal.Title>{logindata[0].name} 😄</Modal.Title>
//                             </Modal.Header>
//                             <Modal.Body>Wish you many many happy returns of the day ! 🍰</Modal.Body>
//                             <Modal.Footer>
//                                 <Button variant="secondary" onClick={handleClose}>
//                                     Close
//                                 </Button>
//                                 <Button variant="primary" onClick={handleClose}>
//                                     Save Changes
//                                 </Button>
//                             </Modal.Footer>
//                         </Modal>:""
                        
//                 }   
                     
//                     </>
//             }
            
//         </>
//     )
// }

// export default Details

import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const Details = () => {
    const [logindata, setLoginData] = useState([]);
    const [show, setShow] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editedUser, setEditedUser] = useState({});
    const history = useNavigate();
    var todayDate = new Date().toISOString().slice(0, 10);

    const handleClose = () => {
        setShow(false);
        setIsEdit(false);
    };
    
    const handleShow = () => setShow(true);

    const Birthday = () => {
        const getuser = localStorage.getItem("user_login");
        if (getuser && getuser.length) {
            const user = JSON.parse(getuser);
            setLoginData(user);

            const userbirth = user.map((el) => el.date === todayDate);

            if (userbirth) {
                setTimeout(() => {
                    handleShow();
                }, 3000);
            }
        }
    };

    const userlogout = () => {
        localStorage.removeItem("user_login");
        history("/");
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    // Update user details in local storage
    const updateUserDetails = () => {
        const updatedData = logindata.map((user) => {
            if (user.id === editedUser.id) {
                return { ...user, ...editedUser };
            }
            return user;
        });

        localStorage.setItem("user_login", JSON.stringify(updatedData));
        setLoginData(updatedData);
        setIsEdit(false);
    };

    useEffect(() => {
        Birthday();
    }, []);

    return (
        <>
            {logindata.length === 0 ? "error" : (
                <>
                    <h1>Profile page</h1>
                    <h1>{logindata[0].name}</h1>
                    <div style={{ display: "flex" }}>
        
      
                    <Button style={{ marginLeft: "auto" }}
 onClick={userlogout}>Log Out</Button></div>
                    {logindata[0].date === todayDate ? (
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>{logindata[0].name} 😄</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Wish you many happy returns of the day! 🍰</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleClose}>
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    ) : (
                        <div>
                            <Button onClick={() => setIsEdit(true)}>Edit Details</Button>
                            {isEdit && (
                                <Form>
                                    <Form.Group controlId="name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={editedUser.name || ''}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="age">
                                        <Form.Label>Age</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="age"
                                            value={editedUser.age || ''}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="gender">
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="gender"
                                            value={editedUser.gender || ''}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="dob">
                                        <Form.Label>Date of Birth</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="dob"
                                            value={editedUser.dob || ''}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="mobile">
                                        <Form.Label>Mobile</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            name="mobile"
                                            value={editedUser.mobile || ''}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <div className="text-center">
                                        <Button variant="primary" onClick={updateUserDetails}>Save</Button>
                                    </div>
                                </Form>
                            )}
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default Details;






















