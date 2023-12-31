import { useTheme } from '@mui/styles';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Button, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';

function PermissionItemHeader({ formValues }) {
    const methods = useFormContext();
    const { formState, watch, getValues } = methods ? methods : {};
    const { isValid, isDirty } = formState ? formState : {}

    const theme = useTheme();
    const navigate = useNavigate();

    // const { id, permission, role } = formValues;

    const { id } = formValues
    const {permission} = formValues
    const {role} = formValues


    console.log(formValues)
  
    let roleData = [];
    if (Array.isArray(role)) {
        roleData = role.map((role) => role.id)
    }


    const data = {
        permission,
        role: roleData
    }

    const handleSavePermission = async () => {
        if (id) {
            try {
                await axios.put(`http://localhost:4000/api/permission/${id}/edit`, data)
                alert('Permission mise à jour avec succès')
                navigate('/manage/permission')
            } catch (error) {
                console.log(error)
            }
        } else {
            console.log('Ajout nouvelle poste poste')
            try {
                await axios.post(`http://localhost:4000/api/permission/new`, data)
                alert('Permission ajoutée avec succès')
                navigate('/manage/permission')
            } catch (error) {
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
                        to="/manage/permission"
                        color="inherit"
                    >
                        <FuseSvgIcon size={20}>
                            {theme.direction === 'ltr'
                                ? 'heroicons-outline:arrow-sm-left'
                                : 'heroicons-outline:arrow-sm-right'}
                        </FuseSvgIcon>
                        <span className="flex mx-4 font-medium">Permissions</span>
                    </Typography>
                </motion.div>
                <div className="flex items-center max-w-full">
                    <motion.div
                        className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
                        initial={{ x: -20 }}
                        animate={{ x: 0, transition: { delay: 0.3 } }}
                    >
                        <Typography className="text-16 sm:text-20 truncate font-semibold">{permission || 'Nouvelle Permission'} </Typography>
                        <Typography variant="caption" className="font-medium"> Détail de la permission</Typography>
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
                    onClick={handleSavePermission}
                >
                    Enregistrer
                </Button>
            </motion.div>

        </div>
    )
}

export default PermissionItemHeader
