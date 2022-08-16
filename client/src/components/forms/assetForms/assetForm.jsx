import "./assetForm.scss";

function AssetForm({ body, handleSubmit }) {
  return (
    <div className="add-form">
      <form className="form-group" onSubmit={handleSubmit}>
        {body}
      </form>
    </div>
  );
}

export default AssetForm;
