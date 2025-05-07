import React from "react";

const Loader = ({ loading }) => {
  return (
    <>
      {loading && (
        <div className="loader-backdrop">
          <div className="loader-content">
            <div className="rotating-cross">✚</div>
            <div className="heartbeat-line">
              <span></span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Loader;
