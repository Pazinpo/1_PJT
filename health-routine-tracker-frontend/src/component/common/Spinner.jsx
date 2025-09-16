const Spinner = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center py-5"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="d-flex gap-2">
        <div
          className="spinner-grow text-secondary"
          style={{
            width: "0.7rem",
            height: "0.7rem",
            animationDelay: "0s",
          }}
        />
        <div
          className="spinner-grow text-secondary"
          style={{
            width: "0.7rem",
            height: "0.7rem",
            animationDelay: "0.2s",
          }}
        />
        <div
          className="spinner-grow text-secondary"
          style={{
            width: "0.7rem",
            height: "0.7rem",
            animationDelay: "0.4s",
          }}
        />
      </div>
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Spinner;
