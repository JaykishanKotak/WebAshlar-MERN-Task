import React from 'react';
import { Button } from '@mui/material';

interface CommonButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'text' | 'contained' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean
  sx?: any
}

const CommonButton: React.FC<CommonButtonProps> = ({
  label,
  onClick,
  variant = 'contained',
  size = 'medium',
  color = 'primary',
  disabled = false,
  type = 'button',
  fullWidth = false,
  sx
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      color={color}
      disabled={disabled}
      onClick={onClick}
      type={type}
      fullWidth={fullWidth}
      sx={sx}
    >
      {label}
    </Button>
  );
};

export default CommonButton;