import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { cartTotalSelector, cartItemsSelector, } from './selectors';
import { Box, Dialog, DialogContentText, Grid, IconButton, makeStyles, Paper } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { resetCart } from 'features/Cart/cartSlice';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(8),
  },
  left: {
    width: '900px',
  },
  right: {
    flex: '1 1 0',
    marginLeft: '40px',
  },
  title: {
    marginBottom: theme.spacing(2),
    fontSize: '20px',
    fontWeight: '500',
  },
  about: {
    listStyleType: 'none',
    display: 'flex',
    marginBottom: '18px',
  },
  label: {
    display: 'flex',
    padding: ' 9px 16px',
    borderRadius: '4px',
    fontWeight: '400',
    fontSize: '14px',
    marginBottom: '12px',
  },
  pay: {
    padding: '20px',
  },
  paid: {
    marginTop: '20px',
    background: 'rgb(255, 66, 78)',
    color: 'white',
    fontSize: '16px',
    padding: '13px 10px',
    textAlign: 'center',
    borderRadius: '4px',
    border: 'none',
    width: '100%',
    cursor: 'pointer',
  },
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

function CartFeature(props) {
  const cartTotal = useSelector(cartTotalSelector);
  const cartItems = useSelector(cartItemsSelector);
  const cartReset = useSelector(resetCart);
  const dispatch = useDispatch();
  const handlePaid = () => {
    
      dispatch(cartReset);
    
  };
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <div className={classes.title}> GIỎ HÀNG</div>
      <Grid container>
        <Grid item className={classes.left}>
          <Paper elevation={0} className={classes.label}>
            <div style={{ width: 398 }}>Sản phẩm</div>
            <div style={{ width: 190 }}>Đơn giá</div>
            <div style={{ width: 150 }}>Số lượng</div>
            <div style={{ width: 130 }}>Thành tiền</div>
          </Paper>
          {cartItems.length > 0 && (
            <Paper elevation={0} style={{ padding: 10 }}>
              {cartItems.map((item) => (
                <ul className={classes.about}>
                  <li style={{ width: 373 }}>{item.product.name}</li>
                  <li style={{ width: 194 }}>{item.product.salePrice}</li>
                  <li style={{ width: 150 }}>{item.quantity}</li>
                  <li style={{ width: 120 }}>{item.product.salePrice * item.quantity}</li>
                </ul>
              ))}
            </Paper>
          )}
        </Grid>
        <Grid item className={classes.right}>
          <Paper elevation={0} className={classes.pay}>
            <div>Tổng tiền : {cartTotal}</div>
            <button className={classes.paid} type="button" onClick={handleOpen}>
              Thanh toán
            </button>

            <Dialog
              disableBackdropClick
              disableEscapeKeyDown
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <IconButton className={classes.closeButton} onClick={handlePaid}>
                <Close onClick={handleClose} />
              </IconButton>

              {cartItems.length > 0 && (
                <DialogContentText className={classes.dialog}>
                  Chúc mừng, bạn đã thanh toán thành công!
                </DialogContentText>
              )}

{cartItems.length === 0 && (
                <DialogContentText className={classes.dialog}>
                  Bạn không có đơn hàng nào!
                </DialogContentText>
              )}
              
            </Dialog>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CartFeature;
