import CustomButton from './Common/Button';

import { Link } from 'react-router-dom';

const PasswordSuccess = () => (
  <div>
    <div className=" flex flex-col justify-center items-center p-6 sm:p-12 rounded-lg  ">
      <img src='/assets/images/Dislike.svg' alt="dislike" />

      <p className="text-3xl font-black text-yellow">Done !</p>

      <p className="text-center sm:text-left text-xs text-white mb-8">
        Your New Password has been Saved Successfully!
      </p>

      <CustomButton variant="contained">
        <Link to="/login">Login with New Password</Link>
      </CustomButton>
    </div>
  </div>
);

export default PasswordSuccess;
