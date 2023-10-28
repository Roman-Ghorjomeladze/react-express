import { useState } from "react";

import { useAuth } from "../../context/AuthContext";
import { Contract } from "../../interfaces/contract.interfaces";
import { DepositPopup } from "../../components/popUps/DepositPopup";
import { getApiUrl } from "../../utils/helpers/general";
import { User } from "../../interfaces/user.interfaces";
import { useFeedback } from "../../context/FeedbackContext";
import { Button } from "../../components/buttons/Button";
import { BUTTON_TYPES } from "../../interfaces/common.interfaces";
import { useDeposite } from "../../hooks/useDeposit";

interface Props {
  data: Contract[];
  isClient: boolean;
  user: User;
  updateUserBalance: (balance: number) => void;
}

export const Contracts = (props: Props) => {
  const { cancelDeposit, confirmDeposit, handleDeposit, showDepositPopup } =
    useDeposite(props.user.id, props.updateUserBalance);

  return (
    <>
      <h2>Contracts</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Terms</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Contractor ID</th>
            <th>Client ID</th>
            {props.isClient && <th>Action</th>}
          </tr>
        </thead>
        {props.data.length > 0 && (
          <tbody>
            {props.data.map((contract) => (
              <tr key={`contract_${contract.id}`}>
                <td>{contract.id}</td>
                <td>{contract.terms}</td>
                <td>{contract.status}</td>
                <td>2023-09-07T17:17:59.783Z</td>
                <td>2023-09-07T17:17:59.783Z</td>
                <td>{contract.ContractorId}</td>
                <td>{contract.ClientId}</td>
                {props.isClient && (
                  <td>
                    <Button
                      classNames={["payBtn"]}
                      title="Deposit"
                      type={BUTTON_TYPES.PRIMARY_SUBMIT}
                      onClick={() => handleDeposit(contract)}
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {props.data.length === 0 && <p>You don't have contracts</p>}
      {showDepositPopup && (
        <DepositPopup cancel={cancelDeposit} proceed={confirmDeposit} />
      )}
    </>
  );
};
