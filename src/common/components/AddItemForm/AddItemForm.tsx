// @flow
import * as React from "react";
type Props = {
  callback: (value: string) => void;
  disabled?: boolean

};

export const AddItemForm = ({ callback, disabled }: Props) => {
  const [inputValue, setInputValue] = React.useState("");
  const [error, setError] = React.useState<null | string>(null);

  const changeInputValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);

    error && setError(null)
  };

  const callBackHandler = () => {
    if (inputValue.trim() !== "") {
      callback(inputValue.trim());
      setInputValue("")
    } else {
      setError("Title is required");
    }
  };

  const keyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      callBackHandler()
    }
  }

  return (
    <div className="addItemForm">
      <div className="formNav">
        <div className="formInput">
          <label>Label</label>
          <input
            value={inputValue}
            onChange={changeInputValueHandler}
            onKeyDown={keyPressHandler}
            type="text"
            disabled={disabled}
          />
        </div>

        <button className="formButton" disabled={disabled} onClick={callBackHandler}> + </button>
      </div>
      {
        error && <div className="textError">Error </div>
      }
      
    </div>
  );
};
