import { BUTTON_TYPES } from "../../interfaces/common.interfaces";
import { Button } from "../buttons/Button";
import { ChangeEvent, useState } from "react";

interface Props {
  cancel: () => void;
  proceed: (amount: number) => void;
}

export const DepositPopup = (props: Props) => {
  const [selectedAmount, setSelectedAmount] = useState<number | string>(0);

  const deposit = () => {
    if (selectedAmount && selectedAmount !== 0) {
      props.proceed(Number(selectedAmount));
    }
  };

  const handleChangeDepositAmount = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedAmount(Number(e.target.value));
  };

  return (
    <div className="absolute">
      <h2>
        Enter amount and deposit money to selected contractor. You should enter
        valid number which is more than 0 and less than 25% of your unpaid jobs.
      </h2>
      <input
        max={1000000}
        min={0}
        type="number"
        value={selectedAmount}
        onChange={handleChangeDepositAmount}
      />
      <div>
        <Button
          onClick={props.cancel}
          title="Cancel"
          type={BUTTON_TYPES.PRIMARY_CANCEL}
        />
        <Button
          onClick={deposit}
          title="Proceed"
          type={BUTTON_TYPES.PRIMARY_SUBMIT}
        />
      </div>
    </div>
  );
};
