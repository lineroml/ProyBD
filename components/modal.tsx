import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
    },
    closeButton: {
      color: theme.palette.grey[500],
    },
    body: {
      placeSelf: 'center',
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <div className='flex px-2'>
        <div className='text-xl lg:text-2xl font-medium  self-center text-morado w-5/6'>
          {children}
        </div>
        <div className='text-center w-1/6'>
          <IconButton
            aria-label='close'
            className={classes.closeButton}
            onClick={onClose}
            style={{ outline: 'none' }}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </div>
    </MuiDialogTitle>
  );
});
const DialogContent = withStyles(() => ({
  root: {
    placeSelf: 'center',
    width: '100%',
    height: 'auto',
    maxHeight: '100%',
    overflow: 'visible !important',
  },
}))(MuiDialogContent);

const Modal = ({ open, setOpen, children, modalTitle = '' }) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' maxWidth={false}>
      {modalTitle && (
        <DialogTitle id='customized-dialog-title' onClose={handleClose}>
          {modalTitle}
        </DialogTitle>
      )}
      <DialogContent dividers>
        <>{children}</>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
