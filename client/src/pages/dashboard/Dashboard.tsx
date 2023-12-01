import { useAuth } from "../../context/AuthContext";
import { Contracts } from "../../views/contracts/Contracts";
import { Jobs } from "../../views/jobs/Jobs";
import "./dashboard.css";
import { useDeposite } from "../../hooks/useDeposit";
import { DepositPopup } from "../../components/popUps/DepositPopup";
import { Button } from "../../components/buttons/Button";
import { BUTTON_TYPES } from "../../interfaces/common.interfaces";
import { useDashboard } from "../../hooks/useDashboard";
import { PAYMENT_TYPE } from "../../utils/types/job";
import { SearchSelect } from "../../components/select/SearchSelect";

export const Dashboard = () => {
  const { user, isClient, updateUserBalance } = useAuth();
  
  const { cancelDeposit, confirmDeposit, handleDeposit, showDepositPopup } =
    useDeposite(updateUserBalance, user?.id);
    const {
        loadingContacts, 
        jobs, 
        removeJobFromList, 
        loadingJobs, 
        contracts, 
        updatePaymentsFilter, 
        paymentFilter,
        selectCandidate,
        selectedCandidate,
        resetSelectedCandidate,
    } = useDashboard(user);

  return (
    <div className="dashboard">
      <div className="heading">
        <h2>Dashboard</h2>
        <div className="filtersContainer">
            {isClient && <SearchSelect handleSelect={selectCandidate}/>}
          <fieldset>
            <div>
                <input 
                    onChange={updatePaymentsFilter} 
                    type="checkbox" 
                    id="unpaid" 
                    name={PAYMENT_TYPE.UNPAID}
                    value={PAYMENT_TYPE.UNPAID} 
                    checked={PAYMENT_TYPE.UNPAID === paymentFilter} 
                />
              <label htmlFor="unpaid">UnPayed</label>
            </div>

            <div>
                <input 
                    onChange={updatePaymentsFilter} 
                    type="checkbox" 
                    id="paid" 
                    name={PAYMENT_TYPE.PAID}
                    value = {PAYMENT_TYPE.PAID}
                    checked={PAYMENT_TYPE.PAID === paymentFilter} />
                <label htmlFor="paid">Payed</label>
            </div>

            <div>
                <input 
                    onChange={updatePaymentsFilter} 
                    type="checkbox" 
                    id="all" 
                    name={PAYMENT_TYPE.ALL}
                    value={PAYMENT_TYPE.ALL} 
                    checked={PAYMENT_TYPE.ALL === paymentFilter}/>
                <label htmlFor="all">All</label>
            </div>
          </fieldset>
        </div>
        {isClient && (
          <Button
            classNames={["payBtn"]}
            title="Deposit"
            type={BUTTON_TYPES.PRIMARY_SUBMIT}
            onClick={() => handleDeposit()}
          />
        )}
      </div>
      {!loadingContacts && user && (
        <Contracts
          isClient={isClient}
          user={user}
          updateUserBalance={updateUserBalance}
          data={contracts}
          selectedCandidate = {selectedCandidate}
          resetSelectedCandidate={resetSelectedCandidate}
        />
      )}
      {!loadingJobs && user && (
        <Jobs
          isClient={isClient}
          user={user}
          removeJobFromList={removeJobFromList}
          data={jobs}
          selectedCandidate = {selectedCandidate}
          resetSelectedCandidate={resetSelectedCandidate}
        />
      )}
      {showDepositPopup && (
        <DepositPopup cancel={cancelDeposit} proceed={confirmDeposit} />
      )}
    </div>
  );
};
