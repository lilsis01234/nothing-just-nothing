import { Typography } from '@mui/material';
import { useTheme } from '@mui/styles';
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';

function DirectionItemHeader({formValues}) {
    const methods = useFormContext();
    const { formState, watch, getValues } = methods ? methods : {};
    const { isValid, dirtyFields } = formState ? formState : {}
    const { nomDirection } = formValues;
    const theme = useTheme();
    const navigate = useNavigate();



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
                        to="/business/manage/direction"
                        color="inherit"
                    >
                        <FuseSvgIcon size={20}> 
                            {theme.direction === 'ltr'
                                ? 'heroicons-outline:arrow-sm-left'
                                : 'heroicons-outline:arrow-sm-right'}
                        </FuseSvgIcon>
                        <span className="flex mx-4 font-medium">Direction</span>
                    </Typography>
                </motion.div>
                <div className="flex items-center max-w-full">
                    <motion.div
                          className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
                          initial={{ x: -20 }}
                          animate={{ x: 0, transition: { delay: 0.3 } }}
                    >
                        <Typography className="text-16 sm:text-20 truncate font-semibold">{nomDirection || 'New Direction'} </Typography>
                        <Typography variant="caption" className="font-medium"> Direction Detail </Typography>
                    </motion.div>   
                </div>
            </div>
        </div>
    )
}

export default DirectionItemHeader
