import React, { useEffect } from 'react'
import {Box, Stack, Typography, TextField, Button} from "@mui/material"
import { useForm } from "react-hook-form"
import {toast} from "react-hot-toast"
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"



export default function Connexion() {

    useEffect(()  => {
        if(localStorage.getItem("user")){
            navigate("/");
        }
    })

    const navigate = useNavigate();
    const {handleSubmit, register, formState: {errors } } = useForm();

    const onSubmit = data => {
      
        axios.get(`http://localhost:3004/utilisateurs?email=${data.email}&userPassword=${data.userPassword}`)
            .then((res) => {
                if (res.data.length > 0) {
                    toast.success('Connexion réussie!',
                        {
                            style: {
                                borderRadius: '10px',
                                background: '#333',
                                color: '#fff',
                            },
                        }
                    );
                    localStorage.setItem("user", JSON.stringify(res.data[0]))
                    navigate("/")
                } else {
                    toast.error('Les identifiants ne sont pas corrects!',
                        {
                            style: {
                                borderRadius: '10px',
                                background: '#333',
                                color: '#fff',
                            },
                        }
                    );
                }
            }).catch((error) => {
                toast.error('Un erreur est survenue lors de l\'exécution de la requête',
                    {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                );
            })
    };

  return (
    <Stack alignItems={"center"} justifyContent={"center"} width={"100%"} height={"100vh"}>
        <Box width={400} sx={{
            backgroundColor: '#eef4ff',
            padding: 3,
        }}
        >
        <Typography  variant="h5">Connexion</Typography>
        <form style={{
            marginTop: 5
         }} 
         onSubmit={handleSubmit(onSubmit)}
         >
            <Stack direction={"column"} gap={2}>
                <TextField id="filled-email" label="Veuillez saisir votre adresse email" variant="outlined" 
                fullWidth
                size='small'
                type='email'
                autoComplete='on'
                {...register("email", {required: "Email adress is required", pattern: "/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/"})}
                />
        
                <TextField id="filled-password" label="Veuillez saisir votre mot de passe" variant="outlined" 
                fullWidth
                size='small'
                type='password'
                autoComplete='on'
                {...register("userPassword", {required: true, minLength: {value: 8, message: "Veuillez saisir un mot de passe d'au moins 8 caractères"}})}

                />
            </Stack>
            <Button variant="contained" type="submit" sx={{
                marginTop: 2,
            }}>
                Connexion
            </Button>
            <Typography paddingTop={2}>Voulez-vous créer un compte ? <Link to="/inscription">Cliquez ici</Link></Typography>
        </form>
        </Box>
    </Stack>
  )
}
