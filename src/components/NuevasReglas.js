function NuevasReglas(props) {

  return (
    <>
    <div className="create-control">
    <label> Reglas del torneo </label>
      {props.inputs.map((item, index) => (
        <div className="rules-container" key={index}>
          <input
            name="rule"
            type="text"
            maxLength="200"
            value={item.rule}
            onChange={(event) => props.handleChange(event, index)}
          />
          {props.inputs.length > 1 && (
            <button onClick={() => props.handleDeleteInput(index)}> - </button>
          )}
          {index === props.inputs.length - 1 && (
            <button onClick={() => props.handleAddInput()}> + </button>
          )}
        </div>
      ))}
    </div>
    </>
  );
}

export default NuevasReglas;