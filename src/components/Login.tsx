import { Dispatch, FormEvent, useContext, useRef, useState } from "react";
import { Button, Modal, Box, TextField, Typography } from "@mui/material";
import { Action, userContext } from "./User";
import { modalStyle } from "./styles";
import axios from "axios";
import Home from "./Home";
const Login = () => {
    const [myUser, UsersDispatch] = useContext(userContext);
    const [open, setOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [typeConnection, setTypeConnection] = useState('');
    return (
        <>
            {!isLogin ? ( <AuthButtons setOpen={setOpen} setTypeConnection={setTypeConnection} />) : (<Home />)}
            <AuthModal 
                open={open}
                setOpen={setOpen}
                typeConnection={typeConnection}
                UsersDispatch={UsersDispatch}
                setIsLogin={setIsLogin}
            />
        </>
    );
};
const AuthButtons = ({ setOpen, setTypeConnection }: { 
    setOpen: React.Dispatch<React.SetStateAction<boolean>>; 
    setTypeConnection: React.Dispatch<React.SetStateAction<string>>; 
}) => (<>
        <Button 
            style={{ backgroundColor: 'lightgreen', margin: '10px', padding: '10px' }} 
            color="primary" 
            variant="contained" 
            onClick={() => { setOpen(true); setTypeConnection('SignIn'); }}>
            Sign In
        </Button>
        <Button 
            style={{ backgroundColor: 'lightgreen', margin: '10px', padding: '10px' }} 
            color="primary" 
            variant="contained" 
            onClick={() => { setOpen(true); setTypeConnection('SignUp'); }}>
            Sign Up
        </Button>
    </>
);
const AuthModal = ({ open, setOpen, typeConnection, UsersDispatch, setIsLogin }: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    typeConnection: string;
    UsersDispatch: Dispatch<Action>;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const passwordRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const handleSubmitSign = async (e: FormEvent) => {
        e.preventDefault();
        const url = typeConnection === 'SignUp' ? 'http://localhost:3000/api/user/register' : 'http://localhost:3000/api/user/login';
        try {
            const res = await axios.post(url, {
                email: emailRef.current?.value,
                password: passwordRef.current?.value
            });
            UsersDispatch({
                type: 'ADD',
                data: {
                    id: res.data.userId || res.data.user?.id,
                    email: emailRef.current?.value || "",
                    password: passwordRef.current?.value || ""
                }
            });
            setOpen(false);
            setIsLogin(true);
        } catch (error: any) {
            if (error.response) {
                const messages: { [key: number]: string } = {
                    400: "Invalid request. Please check your input.",
                    401: "Unauthorized. Please check your email or password.",
                    404: "Server not found. Please try again later.",
                    500: "Server error. Please try again later."
                };
                alert(messages[error.response.status] || `Unexpected error: ${error.response.status}`);
            }
        }
    };
    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <Box sx={modalStyle}>
                <Typography id="modal-modal-title" variant="h6" component={'span'}>
                    Enter Your Details
                </Typography>
                <Box component="form" onSubmit={handleSubmitSign}>
                    <TextField type="password" label='Password' inputRef={passwordRef} fullWidth margin="normal" />
                    <TextField label='Email' inputRef={emailRef} fullWidth margin="normal" />
                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                </Box>
            </Box>
        </Modal>
    );
};
export default Login;