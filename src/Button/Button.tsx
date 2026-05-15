import { useRef, useState, useEffect } from 'react';
import MuiButton from '@mui/material/Button';

export const SUCCESS_FLASH_MS = 1000;

type ButtonColor = 'primary' | 'success' | 'error';

export interface ButtonProps {
  textBefore: string;
  textAfter: string;
  textError?: string;
  colorBefore?: ButtonColor;
  colorAfter?: ButtonColor;
  onClickHandler: () => Promise<boolean> | void;
}

const Button = ({
  textBefore,
  textAfter,
  textError = 'Copy failed',
  colorBefore = 'primary',
  colorAfter = 'success',
  onClickHandler,
}: ButtonProps) => {
  const [text, setText] = useState(textBefore);
  const [color, setColor] = useState<ButtonColor>(colorBefore);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const onClick = async () => {
    const result = onClickHandler();
    let success: boolean;
    if (result instanceof Promise) {
      try {
        success = (await result) !== false;
      } catch {
        success = false;
      }
    } else {
      success = true;
    }

    if (success) {
      setText(textAfter);
      setColor(colorAfter);
    } else {
      setText(textError);
      setColor('error');
    }

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setText(textBefore);
      setColor(colorBefore);
    }, SUCCESS_FLASH_MS);
  };

  return (
    <MuiButton
      type="button"
      variant="contained"
      color={color}
      onClick={onClick}
      sx={{ minWidth: 140, ml: 1 }}
    >
      {text}
    </MuiButton>
  );
};

export default Button;
