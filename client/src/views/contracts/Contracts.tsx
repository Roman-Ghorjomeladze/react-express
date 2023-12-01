import { Contract } from "../../interfaces/contract.interfaces";
import { User } from "../../interfaces/user.interfaces";
import {CandidateSelect} from '../../utils/types/dashboard';

interface Props {
  data: Contract[];
  isClient: boolean;
  user: User;
  updateUserBalance: (balance: number) => void;
  selectedCandidate: CandidateSelect | null;
  resetSelectedCandidate: () => void
}

export const Contracts = (props: Props) => {

  return (
    <>
      <div className="headingCont">
        <h3>Contracts</h3>
        {props.selectedCandidate && <span>{props.selectedCandidate.name}<button onClick={props.resetSelectedCandidate}>X</button></span>}
      </div>
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
                <td>{contract.contractorId}</td>
                <td>{contract.clientId}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {props.data.length === 0 && <p>No contracts found!</p>}
      
    </>
  );
};
