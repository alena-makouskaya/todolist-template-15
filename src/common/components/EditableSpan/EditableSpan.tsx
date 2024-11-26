// @flow
import * as React from "react";
type Props = {
  title: string;
  callback: (title: string) => void;
};

export const EditableSpan = ({ title, callback }: Props) => {
  const [editMode, setEditMode] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>("");

  const activateEditMode = () => {
    setEditMode(true);
    setInputValue(title);
  };

  const activateViewMode = () => {
    setEditMode(false);
    callback(inputValue);
  };

  const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      activateViewMode();
    }
  };

  return (
    <div>
      {editMode ? (
        <input
          type="text"
          value={inputValue}
          onChange={changeInputValue}
          onKeyDown={onKeyPressHandler}
          onBlur={activateViewMode}
          className="editableSpanInput"
          autoFocus
        />
      ) : (
        <span onDoubleClick={activateEditMode}>{title}</span>
      )}
    </div>
  );
};
