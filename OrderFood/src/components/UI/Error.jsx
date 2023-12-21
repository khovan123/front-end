export default function Error({ title, message }) {
  return (
    <div className="error">
      <div className="error-contents">
        <h2>{title}</h2>
        <p>{message}</p>
      </div>
    </div>
  );
}
