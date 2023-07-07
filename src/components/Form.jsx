import Input from "./Input";

const Form = ({ className,loginInfo,setloginInfo,handleSubmit }) => {
  const handleChange = ev => {
    const newData = loginInfo.data.map(e => {
      if (e.name === ev.target.name) {
        e.value = ev.target.value;
      }
      return e;
    });

    setloginInfo({data: newData});
  };

  const resetForm = ev => {
    const newData = loginInfo.data.map(e => {
      e.value = "";
      return e;
    });

    setloginInfo({data: newData});
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
        {loginInfo.data.map(field => (
          <Input key={field.id} attr={field} handleChange={handleChange} />
        ))}
        
        <button type="reset" onClick={resetForm}>
            RESET
        </button>
        <button type="submit">SUBMIT</button>
    </form>
  );
}

export default Form;
