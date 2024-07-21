interface AlertProps {
  children: React.ReactNode;
  onDismiss: () => void;
}

function Alert({ children, onDismiss }: AlertProps) {
  return (
    <div className="alert alert-primary alert-dismissible" role="alert">
      {children}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={onDismiss}
      ></button>
    </div>
  );
}

export default Alert;
