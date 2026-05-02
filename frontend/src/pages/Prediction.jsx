import { useState, useEffect } from "react";
import useUserStore from "../store/userStore";

const Prediction = () => {
  const user = useUserStore((state) => state.user);
  const user_id = user?.user_id;

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
  const [history, setHistory] = useState([]);

  // handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // submit prediction
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `http://127.0.0.1:8000/predict?user_id=${user_id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          Age: Number(formData.Age),
          RestingBP: Number(formData.RestingBP),
          Cholesterol: Number(formData.Cholesterol),
          FastingBS: Number(formData.FastingBS),
          MaxHR: Number(formData.MaxHR),
          Oldpeak: Number(formData.Oldpeak),
        }),
      },
    );

    const data = await response.json();
    setResult(data);

    // refresh history after prediction
    fetchHistory();
  };

  // fetch history
  const fetchHistory = async () => {
    if (!user_id) return;

    const res = await fetch(`http://127.0.0.1:8000/history/${user_id}`);

    const data = await res.json();
    setHistory(data);
  };

  // load history on page load
  useEffect(() => {
    fetchHistory();
  }, [user_id]);

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      {/* LEFT - FORM */}
      <div style={{ flex: 1 }}>
        <h2>Heart Prediction</h2>

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

          <input name="RestingBP" placeholder="BP" onChange={handleChange} />
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

          <input name="MaxHR" placeholder="Max HR" onChange={handleChange} />
          <br />

          <input name="Oldpeak" placeholder="Oldpeak" onChange={handleChange} />
          <br />

          <button type="submit">Predict</button>
        </form>

        {result && (
          <div>
            <h3>Prediction: {result.prediction}</h3>
            <h3>Probability: {result.probability}</h3>
          </div>
        )}
      </div>

      {/* RIGHT - HISTORY */}
      <div
        style={{ flex: 1, borderLeft: "1px solid #ccc", paddingLeft: "20px" }}
      >
        <h2>History</h2>

        {history.length === 0 ? (
          <p>No history yet</p>
        ) : (
          history.map((item) => (
            <div
              key={item.id}
              style={{
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid gray",
              }}
            >
              <p>Prediction: {item.prediction}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Prediction;
