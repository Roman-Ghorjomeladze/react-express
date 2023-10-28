import { Button } from "../../components/buttons/Button";
import { useAuth } from "../../context/AuthContext"
import { BUTTON_TYPES } from "../../interfaces/common.interfaces";
import './profile.css'


export const Profile = () => {
    const {user, logout} = useAuth();

    return (
        <div className="center">
            <img className="profile-img" src="static/images/logo192.png" alt="Profile Image"/>
            <div className="profile">
                <dl>
                    <dt>First Name</dt>
                    <dd>{user?.firstName}</dd>
                    <dt>Last Name</dt>
                    <dd>{user?.lastName}</dd>
                    <dt>Profession</dt>
                    <dd>{user?.profession}</dd>
                    <dt>Balance</dt>
                    <dd>{user?.balance || 0}</dd>
                    <dt>Registration Date</dt>
                    <dd>{user?.createdAt}</dd>
                    <dt>Type</dt>
                    <dd>{user?.type}</dd>
                </dl>
                <Button classNames={['selfCenterY']} title="Log Out" onClick={logout} type={BUTTON_TYPES.PRIMARY_CANCEL}/>
            </div>
        </div>
    )
}