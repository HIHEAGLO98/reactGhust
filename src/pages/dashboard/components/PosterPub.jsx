import React from 'react'
import {Box, Stack, Typography, TextField, Button} from "@mui/material"
import { useForm } from "react-hook-form"
import axios from 'axios'
import {toast} from "react-hot-toast"
import { useQueryClient, useMutation } from "@tanstack/react-query"



export default function PosterPub() {
    const {handleSubmit, register, reset, formState: {errors } } = useForm();
    const user = JSON.parse(localStorage.getItem("user"));
    const useQuery = useQueryClient();

    const mutation = useMutation({
        mutationFn: (pub) => {
          return axios.post("http://localhost:3004/posts", pub)
        },
        onError: (error) => {
            toast.error('Une erreur est survenue lors de la publication de votre poste!',
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            )
        },
        onSuccess: () => {
            reset();
            useQuery.invalidateQueries("posts");
            toast.success('Votre publication a été postée avec succès!',
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
        }
    });

    const onSubmit = data => {
        const post = {
            ...data,
            userId: user.id,
            datePub: new Date(),
            likePub: 0,
            auteur: user.username,
        };

       mutation.mutate(post);
    };



  return (
    <Stack width={"70%"} margin={"auto"}>
        <h1>Ajouter une publication</h1>

        <form style={{
            marginTop: 15
         }} 
         onSubmit={handleSubmit(onSubmit)}

        >
            <Stack gap={2}>
                <TextField id='filled-basic' label="Parlez-nous de votre journée" 
                variant='outlined' 
                fullWidth size='small'
                multiline
                rows={4} 
                type='text'
                {...register("postPub", {required: true, minLength: {value: 5}})}

                />
                <TextField id='filled-basic' label="Saisir l'url de votre image" 
                variant='outlined' 
                fullWidth size='small'
                type='text'
                {...register("imageUrl", {required: true})}
                />

                <Button variant="contained" type="submit" sx={{
                      marginTop: 0.5,
                  }}
                  >
                      Publier
                </Button>

            </Stack>
        </form>
        
    </Stack>

    )
}
