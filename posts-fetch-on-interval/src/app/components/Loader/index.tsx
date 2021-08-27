const Loader: React.FC = () => {
  return (
    <>
      <div id="loaderForAPICall" className="loaderHide">
        <div className="cssload-fond">
          <div className="cssload-container-general">
            <div className="cssload-internal">
              <div className="cssload-ballcolor cssload-ball_1" />
            </div>
            <div className="cssload-internal">
              <div className="cssload-ballcolor cssload-ball_2" />
            </div>
            <div className="cssload-internal">
              <div className="cssload-ballcolor cssload-ball_3" />
            </div>
            <div className="cssload-internal">
              <div className="cssload-ballcolor cssload-ball_4" />
            </div>
          </div>
        </div>
        <div>
          <div className="loader-overlay-nav" />
          <div className="loader-overlay" id="loaderNav" />
        </div>
      </div>
    </>
  );
};

export default Loader;
