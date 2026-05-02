import { useState } from "react";

const App = () => {
  const [formData, setFormData] = useState({
    Age: "",
    Sex: "",
    ChestPainType: "",
    RestingBP: "",
    Cholesterol: "",
    FastingBS: "",
    RestingECG: "",
    MaxHR: "",
    ExerciseAngina: "",
    Oldpeak: "",
    ST_Slope: "",
  });

  const [result, setResult] = useState(null);

  // handle input change
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // submit to API
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/predict?user_id=1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          Age: Number(formData.Age),
          RestingBP: Number(formData.RestingBP),
          Cholesterol: Number(formData.Cholesterol),
          FastingBS: Number(formData.FastingBS),
          MaxHR: Number(formData.MaxHR),
          Oldpeak: Number(formData.Oldpeak),
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Heart Disease Prediction</h2>

      <form onSubmit={handleSubmit}>
        <input name="Age" placeholder="Age" onChange={handleChange} />
        <br />

        <select name="Sex" onChange={handleChange}>
          <option value="">Sex</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
        <br />

        <select name="ChestPainType" onChange={handleChange}>
          <option value="">Chest Pain</option>
          <option value="ATA">ATA</option>
          <option value="NAP">NAP</option>
          <option value="ASY">ASY</option>
          <option value="TA">TA</option>
        </select>
        <br />

        <input
          name="RestingBP"
          placeholder="Resting BP"
          onChange={handleChange}
        />
        <br />
        <input
          name="Cholesterol"
          placeholder="Cholesterol"
          onChange={handleChange}
        />
        <br />

        <select name="FastingBS" onChange={handleChange}>
          <option value="">Fasting BS</option>
          <option value="0">0</option>
          <option value="1">1</option>
        </select>
        <br />

        <select name="RestingECG" onChange={handleChange}>
          <option value="">Resting ECG</option>
          <option value="Normal">Normal</option>
          <option value="ST">ST</option>
          <option value="LVH">LVH</option>
        </select>
        <br />

        <input name="MaxHR" placeholder="Max HR" onChange={handleChange} />
        <br />

        <select name="ExerciseAngina" onChange={handleChange}>
          <option value="">Exercise Angina</option>
          <option value="Y">Yes</option>
          <option value="N">No</option>
        </select>
        <br />

        <input name="Oldpeak" placeholder="Oldpeak" onChange={handleChange} />
        <br />

        <select name="ST_Slope" onChange={handleChange}>
          <option value="">ST Slope</option>
          <option value="Up">Up</option>
          <option value="Flat">Flat</option>
          <option value="Down">Down</option>
        </select>
        <br />
        <br />

        <button type="submit">Predict</button>
      </form>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Prediction: {result.prediction}</h3>
          <h3>Probability: {result.probability}</h3>
        </div>
      )}
    </div>
  );
};

export default App;
