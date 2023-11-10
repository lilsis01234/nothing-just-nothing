import { Typography } from '@mui/material';
import { useTheme } from '@mui/styles';
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';
import axios from 'axios';
import Button from '@mui/material/Button';

function CollaborateurItemHeader({formValues}) {
    const methods = useFormContext();
    const { formState, watch, getValues } = methods ? methods : {};
    const { isValid, isDirty  } = formState ? formState : {}

    const {id, nom, prenom, dateNaissance, lieuNaissance, sexe, 
            lot, quartier, ville, adresse2, tel, tel2, telurgence, 
            CIN, dateDelivrance, lieuDelivrance, statutmatrimoniale, nbEnfant, 
            dateEmbauche, site, image, entreprise, numCNAPS, shift, poste, poste2,
            departement, departement2, projet, projet2, equipe, equipe2, email
        } = formValues




 
    const theme = useTheme();
    const navigate = useNavigate();

    const data = {
            nom, prenom, dateNaissance, lieuNaissance, sexe, 
            lot, quartier, ville, adresse2, tel, tel2, telurgence, 
            CIN, dateDelivrance, lieuDelivrance, statutmatrimoniale, nbEnfant, 
            dateEmbauche, site, image, entreprise, numCNAPS, shift, poste, poste2,
            departement, departement2, projet, projet2, equipe, equipe2, email
    }



    const handleSaveCollaborateur = async () => {
        if (id){
            try {
                await axios.put(`http://localhost:4000/api/collaborateur/edit/${id}`, data)
                alert('Collaborator Update succesfully')
                navigate('/manage/collaborator')
            } catch (error){
                console.log(error)
            }
        } else {
            try {
                await axios.post('http://localhost:4000/api/collaborateur/new', data)
                alert('Collaborator create succesfully')
                navigate('/manage/collaborator')
            } catch (error){
                console.log(error)
            }
        }
    }



    return (
        <div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-32 px-24 md:px-32">
            <div className="flex flex-col items-center sm:items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
                >
                    <Typography
                        className="flex items-center sm:mb-12"
                        component={Link}
                        role="button"
                        to="/manage/collaborator"
                        color="inherit"
                    >
                        <FuseSvgIcon size={20}> 
                            {theme.direction === 'ltr'
                                ? 'heroicons-outline:arrow-sm-left'
                                : 'heroicons-outline:arrow-sm-right'}
                        </FuseSvgIcon>
                        <span className="flex mx-4 font-medium">Collaborator</span>
                    </Typography>
                </motion.div>
                <div className="flex items-center max-w-full">
                    <motion.div
                          className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
                          initial={{ x: -20 }}
                          animate={{ x: 0, transition: { delay: 0.3 } }}
                    >
                        <Typography className="text-16 sm:text-20 truncate font-semibold">{nom || 'New Collaborator'} </Typography>
                        <Typography variant="caption" className="font-medium"> Collaborator Detail </Typography>
                    </motion.div>   
                </div>
            </div>
            <motion.div
                 className="flex"
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
            >
                <Button 
                     className="whitespace-nowrap mx-4"
                     variant="contained"
                     color="secondary"
                    //  disabled={!isDirty  || !isValid}
                     onClick={handleSaveCollaborateur}
                >
                    Save
                </Button>
            </motion.div>
        </div>
    )
}

export default CollaborateurItemHeader