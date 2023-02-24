import { Container, Box, CssBaseline, Typography, Grid, TextField, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { api } from './services/api'
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom'

const UserCreate = () => {
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('')

    useEffect(() => {
        show_user()
    },[])

    const navigate = useNavigate()

    const { id } = useParams() 

    const show_user = async () => {
        await axios.get(`${api}/users/${id}`)
        .then((response) => {
            setFname(response.data.user.fname)
            setLname(response.data.user.lname)
            setUsername(response.data.user.username)
            setEmail(response.data.user.email)
            setAvatar(response.data.user.avatar)
        }).catch((err) => {
            console.log(err)
        })
    }

    const edit_user = async (event) => {
        event.preventDefault()
       await axios.put(`${api}/users/update`,{
            "id" : id,
            "fname" : fname,
            "lname" : lname,
            "username" : username,
            "email" : email,
            "avatar" : avatar
        }).then((response) => {
            console.log(response)
        }).catch((err) => {
            console.log(err)
        })
    }

  return (
    <>
        <CssBaseline />
        <Container maxWidth="sm" sx={{ p:2 }}>
            <Typography variant='h6' gutterBottom component="div">
                แก้ไขผู้ใช้
            </Typography>
            <form onSubmit={edit_user}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField id="fname" label="ชื่อจริง" variant='outlined' value={fname}
                        fullWidth required
                        onChange={(e) => setFname(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField id="lname" label="นามสกุล" variant='outlined' value={lname}
                        fullWidth required
                        onChange={(e) => setLname(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField id="username" label="ชื่อผู้ใช้" variant='outlined' value={username}
                        fullWidth required
                        onChange={(e) => setUsername(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField id="email" label="อีเมล" variant='outlined' value={email}
                        fullWidth required
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField id="avatar" label="รูปโปรไฟล์" variant='outlined' value={avatar}
                        fullWidth required
                        onChange={(e) => setAvatar(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant='contained'>
                            ยืนยัน
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    </>
  )
}

export default UserCreate