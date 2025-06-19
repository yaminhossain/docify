import { FaRegCircleCheck, FaRegCircleXmark } from "react-icons/fa6";

const PasswordValidation = ({ passwordValue }) => {
  return (
    <>
      {passwordValue.length > 0 && (
        <div>
          {/* -------validation 1----------- */}
          <div>
            {/^.{8,}$/.test(passwordValue) ? (
              <p className="text-green-400 flex items-center gap-2">
                <FaRegCircleCheck /> <span>At least 8 characters</span>
              </p>
            ) : (
              <p className="text-red-400 flex items-center gap-2">
                <FaRegCircleXmark /> <span>At least 8 characters</span>
              </p>
            )}
          </div>
          {/* --------validation 2----------- */}
          <div>
            {/^(?=.*[a-z]).*$/.test(passwordValue) ? (
              <p className="text-green-400 flex items-center gap-2">
                <FaRegCircleCheck /> <span>Lower case letters (a-z)</span>
              </p>
            ) : (
              <p className="text-red-400 flex items-center gap-2">
                <FaRegCircleXmark /> <span>Lower case letters (a-z)</span>
              </p>
            )}
          </div>
          {/* ----------validation 3---------- */}
          <div>
            {/^(?=.*[A-Z]).*$/.test(passwordValue) ? (
              <p className="text-green-400 flex items-center gap-2">
                <FaRegCircleCheck /> <span>Upper case letters (A-Z)</span>
              </p>
            ) : (
              <p className="text-red-400 flex items-center gap-2">
                <FaRegCircleXmark /> <span>Upper case letters (A-Z)</span>
              </p>
            )}
          </div>
          {/* ----------validation 4------------ */}
          <div>
            {/^(?=.*\d).*$/.test(passwordValue) ? (
              <p className="text-green-400 flex items-center gap-2">
                <FaRegCircleCheck /> <span>Numbers (0-9)</span>
              </p>
            ) : (
              <p className="text-red-400 flex items-center gap-2">
                <FaRegCircleXmark /> <span>Numbers (0-9)</span>
              </p>
            )}
          </div>
          {/* -------------validation 5------------- */}
          <div>
            {/^(?=.*[!@#$%^&*]).*$/.test(passwordValue) ? (
              <p className="text-green-400 flex items-center gap-2">
                <FaRegCircleCheck /> <span>Special characters (!@#$%^&*)</span>
              </p>
            ) : (
              <p className="text-red-400 flex items-center gap-2">
                <FaRegCircleXmark /> <span>Special characters (!@#$%^&*)</span>
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PasswordValidation;
