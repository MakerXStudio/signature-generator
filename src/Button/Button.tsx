import React, { useState } from 'react';

interface ButtonProps {
  textBefore: string;
  textAfter: string;
  textFailure: string;
  classBefore: string;
  classAfter: string;
  classFailure: string;
  onClickHandler: () => Promise<void>;
}

const Button = (props: ButtonProps) => {
  const {
    textBefore,
    textAfter,
    textFailure,
    classBefore,
    classAfter,
    classFailure,
    onClickHandler,
  } = props;

  const [textState, setTextState] = useState(textBefore);
  const [classState, setClassState] = useState(classBefore);

  const onClick = async () => {
    try {
      await onClickHandler();
      setTextState(textAfter);
      setClassState(classAfter);
    } catch {
      setTextState(textFailure);
      setClassState(classFailure);
    }

    setTimeout(() => {
      setTextState(textBefore);
      setClassState(classBefore);
    }, 1000);
  };

  return (
    <button type="button" className={classState} onClick={onClick}>
      {textState}
    </button>
  );
};

export default Button;
