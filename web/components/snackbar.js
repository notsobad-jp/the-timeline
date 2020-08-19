import React, { useContext, useState } from 'react';
import { SnackbarContext } from '../pages/_app';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default function Snack(){
  const [snackbar, setSnackbar] = useContext(SnackbarContext);
  return (
    <Snackbar
      anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
      open={snackbar.open}
      autoHideDuration={5000}
      onClose={()=>{ setSnackbar({open: false, message: ''}); }}
      message={snackbar.message}
      severity="success"
      action={
        <React.Fragment>
          <IconButton size="small" aria-label="close" color="inherit" onClick={()=>{ setSnackbar({open: false, message: ''}); }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  );
};
