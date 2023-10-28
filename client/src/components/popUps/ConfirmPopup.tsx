import { BUTTON_TYPES } from "../../interfaces/common.interfaces";
import { Button } from "../buttons/Button";

interface Props {
  title: string;
  cancel: () => void;
  proceed: () => void;
}

export const ConfirmPopup = (props: Props) => {
  return (
    <div className="absolute">
      <h2>{props.title}</h2>
      <div>
        <Button
          title="Cancel"
          onClick={props.cancel}
          type={BUTTON_TYPES.PRIMARY_CANCEL}
        />
        <Button
          title="Proceed"
          onClick={props.proceed}
          type={BUTTON_TYPES.PRIMARY_SUBMIT}
        />
      </div>
    </div>
  );
};
