import { FC, memo } from "react";

import "./Login/login-style.scss";

interface IErrorBlock {
  error: string;
}

const ErrorBlock: FC<IErrorBlock> = ({ error }) => {
  if (!error) {
    return null;
  }

  return <div className="error-message">{error}</div>;
};

export default memo(ErrorBlock);
