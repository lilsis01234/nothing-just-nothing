import { orange } from '@mui/material/colors';
import { lighten, styled } from '@mui/material/styles';
import { Controller, useFormContext } from 'react-hook-form';
import Box from '@mui/material/Box';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';


const Root = styled('div')(({ theme }) => ({
    '& .productImageFeaturedStar': {
        position: 'absolute',
        top: 0,
        right: 0,
        color: orange[400],
        opacity: 0,
    },

    '& .productImageUpload': {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
    },

    '& .productImageItem': {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover': {
            '& .productImageFeaturedStar': {
                opacity: 0.8,
            },
        },
        '&.featured': {
            pointerEvents: 'none',
            boxShadow: theme.shadows[3],
            '& .productImageFeaturedStar': {
                opacity: 1,
            },
            '&:hover .productImageFeaturedStar': {
                opacity: 1,
            },
        },
}}))



function PictureCollab(props) {
    const { methods, formValues } = props;
    const { control, formState } = methods || {};
    const { errors } = formState || {};


    if (!methods) {
        return null;
    }

    return (
        <Root>
            <Controller
                name="image"
                control={control}
                render={({ field: { onChange } }) => (
                    <Box
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? lighten(theme.palette.background.default, 0.4)
                                    : lighten(theme.palette.background.default, 0.02),
                        }}
                        component="label"
                        htmlFor="button-file"
                        className="productImageUpload flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
                    >
                        <input
                            accept="image/*"
                            className="hidden"
                            id="button-file"
                            type="file"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (!file) {
                                    return;
                                }
                                const reader = new FileReader();

                                reader.onload = () => {
                                    const newImage = {
                                        id: 'uniqueID', // Générez un ID unique si nécessaire
                                        url: `data:${file.type};base64,${btoa(reader.result)}`,
                                        type: 'image',
                                    };
                                    onChange(newImage);
                                };

                                reader.readAsBinaryString(file);
                            }}
                        />
                        <FuseSvgIcon size={32} color="action">
                            heroicons-outline:upload
                        </FuseSvgIcon>
                    </Box>
                )}
            />
        </Root>
    )
}

export default PictureCollab
