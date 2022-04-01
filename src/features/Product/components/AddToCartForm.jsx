import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Dialog, DialogContentText, IconButton, makeStyles } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import QuantityField from 'components/form-controls/QuantityField';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

AddToCartForm.propTypes = {
  onSubmit: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: '40px 30px 30px',
    color: theme.palette.primary.main,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    color: theme.palette.grey[500],
    zIndex: 1,
  },
}));
function AddToCartForm({ onSubmit = null }) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [canAdd,setCanAdd] = useState(false)
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .required('Please enter quantity')
      .min(1, 'Minimum value is 1')
      .typeError('Please enter a number'),
  });
  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    if (onSubmit&& localStorage.length>0) {
      setCanAdd(true)
      await onSubmit(values);
    }
    
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <QuantityField name="quantity" label="Quantity" form={form} />

      <Button type="submit" variant="contained" color="primary" style={{ width: '250px' }} size="large"  onClick={handleOpen}>
        Add to cart
      </Button>
{canAdd===false&&  <Dialog
              disableBackdropClick
              disableEscapeKeyDown
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
              
            >
              <IconButton className={classes.closeButton} >
                <Close onClick={handleClose} />
              </IconButton>

             
                <DialogContentText className={classes.dialog}>
                  Hãy đăng nhập để tiếp tục mua sắm!
                </DialogContentText>
            
              
            </Dialog>}
    </form>
  );
}

export default AddToCartForm;
