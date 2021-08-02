import "./loading-style.scss";

export const Loading = (): JSX.Element => (
  <div className="loading-screen">
    Loading
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);
