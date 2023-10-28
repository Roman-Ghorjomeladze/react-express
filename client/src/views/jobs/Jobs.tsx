import { Job } from "../../interfaces/contract.interfaces"
import { boolToYesNo } from "../../utils/helpers/general"
import { ConfirmPopup } from "../../components/popUps/ConfirmPopup"
import { Button } from "../../components/buttons/Button"
import { BUTTON_TYPES } from "../../interfaces/common.interfaces"
import { User } from "../../interfaces/user.interfaces"
import {useJobs} from "../../hooks/useJobs"

interface Props {
    data: Job[],
    removeJobFromList: (jobId: number) => void,
    isClient: boolean,
    user: User
}

export const Jobs = (props: Props) => {
    const {
        onShowConfirmation,
        cancelPayment,
        handleConfirm,
        showConfirmation
    } = useJobs(props.user.id, props.removeJobFromList)
    
    return <>
        <h2>Jobs</h2>
        <table className="data-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Paid</th>
                    <th>Payment Date</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Contract ID</th>
                    {props.isClient && <th>Action</th>}
                </tr>
            </thead>
            {
                props.data.length > 0 && (
                    <tbody>
                        {
                            props.data.map(job => (
                                <tr key={`job${job.id}`}>
                                    <td>{job.id}</td>
                                    <td>{job.description}</td>
                                    <td>{job.price}</td>
                                    <td>{boolToYesNo(job.paid)}</td>
                                    <td>{job.paymentDate}</td>
                                    <td>{job.createdAt}</td>
                                    <td>{job.updatedAt}</td>
                                    <td>{job.ContractId}</td>
                                    {props.isClient && (
                                        <td>
                                            <Button 
                                                classNames={['payBtn']} 
                                                title="Pay" 
                                                type={BUTTON_TYPES.PRIMARY_SUBMIT} 
                                                onClick={() => onShowConfirmation(job)}
                                            />
                                        </td>
                                    )}
                                </tr>
                            ))
                        }
                    </tbody>
                )
            }
        </table>
        {
            props.data.length === 0 && <p>You don't have unpaid jobs</p>
        }
        {
            showConfirmation && <ConfirmPopup title="Are you sure that you want to pay for this job?" cancel={cancelPayment} proceed={handleConfirm}/>
        }
    </>
}