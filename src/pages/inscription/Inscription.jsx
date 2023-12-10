import React from 'react'
import {Box, Stack, Typography, TextField, Button} from "@mui/material"
import { useForm } from "react-hook-form"
import {toast} from "react-hot-toast"
import axios from 'axios'
import { useNavigate } from "react-router-dom"



export default function Inscription() {
    const navigate = useNavigate();
    const {handleSubmit, register, formState: {errors } } = useForm();

    const onSubmit = data => {
        if(data.userPassword !== data.userConfirmPassword){
            toast.error('Les mots de passe ne coresspondent pas!!',
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
        }else{
            axios.get(`http://localhost:3004/utilisateurs?email=${data.email}`)
            .then((res) => {
                if(res.data.length > 0){
                    toast.error('Un compte existe déjà avec cette adresse mail!',
                        {
                            style: {
                                borderRadius: '10px',
                                background: '#333',
                                color: '#fff',
                            },
                        }
                    );
                }else{
                    axios.post("http://localhost:3004/utilisateurs", data)
                    .then((res) => {
                        console.log(data)
                        toast.success('Inscription réussie!',
                            {
                                style: {
                                    borderRadius: '10px',
                                    background: '#333',
                                    color: '#fff',
                                },
                            }
                        );
                        navigate("/connexion");
                    }).catch((error) => {
                        console.log(error)
                        toast.error('Une erreur est survenue!',
                        {
                            style: {
                                borderRadius: '10px',
                                background: '#333',
                                color: '#fff',
                            },
                        })
                    });
                }
            })
     
        }

    };

  return (
    <Stack alignItems={"center"} justifyContent={"center"} width={"100%"} height={"100vh"}>
        <Box width={400} sx={{
            backgroundColor: '#eef4ff',
            padding: 3,
        }}
        >
        <Typography  variant="h5">Inscription</Typography>
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
                <TextField id="filled-prenom" label="Veuillez saisir votre prenom" variant="outlined" 
                fullWidth
                size='small'
                autoComplete='on'
                {...register("username", {required: true, minLength: {value: 4, message: "Veuillez saisir un nom de plusde 5 caractères"}})}
                />

                <TextField id="filled-password" label="Veuillez saisir votre mot de passe" variant="outlined" 
                fullWidth
                size='small'
                type='password'
                autoComplete='on'
                {...register("userPassword", {required: true, minLength: {value: 8, message: "Veuillez saisir un mot de passe d'au moins 8 caractères"}})}

                />
                <TextField id="filled-confirm-password" label="Veuillez confirmer votre mot de passe" variant="outlined" 
                fullWidth
                size='small'
                type='password'
                autoComplete='on'
                {...register("userConfirmPassword", {required: true, minLength: {value: 8, message: "Veuillez saisir un mot de passe d'au moins 8 caractères"}})}

            />
            </Stack>
            <Button variant="contained" type="submit" sx={{
                marginTop: 2,
            }}>
                Inscription
            </Button>
        </form>
        </Box>
    </Stack>
  )
}
