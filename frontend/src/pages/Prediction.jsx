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
  const [chatResponse, setChatResponse] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user_id) return alert("User not logged in");

    const res = await fetch(
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

    const data = await res.json();
    setResult(data);
    setChatResponse(data.suggestions);
    fetchHistory();
  };

  const fetchHistory = async () => {
    if (!user_id) return;

    const res = await fetch(`http://127.0.0.1:8000/history/${user_id}`);
    const data = await res.json();
    setHistory(data);
  };

  useEffect(() => {
    fetchHistory();
  }, [user_id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 text-white p-4 sm:p-6">
      {/* MAIN LAYOUT */}
      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        {/* LEFT - FORM */}
        <div className="w-full lg:w-1/2 bg-white/10 backdrop-blur-lg p-5 sm:p-6 rounded-2xl shadow-xl border border-white/10">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-blue-300">
            🫀 Heart Disease Prediction
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="Age"
              placeholder="Age"
              onChange={handleChange}
              className="w-full p-3 rounded bg-black/30 border border-gray-600"
            />

            <select
              name="Sex"
              onChange={handleChange}
              className="w-full p-3 rounded bg-black/30 border border-gray-600"
            >
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>

            <select
              name="ChestPainType"
              onChange={handleChange}
              className="w-full p-3 rounded bg-black/30 border border-gray-600"
            >
              <option value="">Chest Pain Type</option>
              <option value="ATA">ATA</option>
              <option value="NAP">NAP</option>
              <option value="ASY">ASY</option>
              <option value="TA">TA</option>
            </select>

            <input
              name="RestingBP"
              placeholder="Resting BP"
              onChange={handleChange}
              className="w-full p-3 rounded bg-black/30 border border-gray-600"
            />

            <input
              name="Cholesterol"
              placeholder="Cholesterol"
              onChange={handleChange}
              className="w-full p-3 rounded bg-black/30 border border-gray-600"
            />

            <input
              name="MaxHR"
              placeholder="Max Heart Rate"
              onChange={handleChange}
              className="w-full p-3 rounded bg-black/30 border border-gray-600"
            />

            <input
              name="Oldpeak"
              placeholder="Oldpeak"
              onChange={handleChange}
              className="w-full p-3 rounded bg-black/30 border border-gray-600"
            />

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 transition p-3 rounded font-semibold"
            >
              Predict
            </button>
          </form>

          {/* RESULT */}
          {result && (
            <div className="mt-6 p-4 rounded-xl bg-black/40 border border-blue-500">
              <h3 className="text-lg font-semibold">
                Result:
                <span
                  className={`ml-2 px-3 py-1 rounded-full text-white ${
                    result.prediction === 1 ? "bg-red-500" : "bg-green-500"
                  }`}
                >
                  {result.prediction === 1 ? "High Risk ❗" : "No Risk ✅"}
                </span>
              </h3>

              <p className="mt-2 text-gray-300">
                Probability:
                <span className="text-blue-300 font-semibold ml-2">
                  {result.probability.toFixed(2)}
                </span>
              </p>
            </div>
          )}
        </div>

        {/* RIGHT - HISTORY + AI */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          {/* HISTORY */}
          <div className="bg-white/10 backdrop-blur-lg p-4 sm:p-6 rounded-2xl shadow-xl border border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-blue-300">
              📊 Prediction History
            </h2>

            <div className="max-h-[300px] overflow-y-auto pr-2 space-y-3">
              {history.length === 0 ? (
                <p className="text-gray-400">No history available</p>
              ) : (
                history.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-black/30 border border-gray-700"
                  >
                    <div className="font-bold text-blue-300">{index + 1}</div>

                    <div className="flex-1 ml-3">
                      <p className="text-sm text-gray-300">Result</p>
                      <p
                        className={`font-semibold ${
                          item.prediction === 1
                            ? "text-red-400"
                            : "text-green-400"
                        }`}
                      >
                        {item.prediction === 1
                          ? "High Risk Patient"
                          : "No Risk Detected"}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.prediction === 1 ? "bg-red-500" : "bg-green-500"
                      }`}
                    >
                      {item.prediction}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* AI SUGGESTION */}
          <div className="bg-white/10 max-h-[350px] rounded-2xl overflow-y-auto backdrop-blur-lg p-4 sm:p-6 rounded-2xl shadow-xl border border-white/10 flex-1">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-300 mb-3">
              AI Health Analysis
            </h2>

            <div className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
              {chatResponse ? (
                <div className="space-y-3">
                  {chatResponse
                    .split("\n")
                    .filter((line) => line.trim() !== "")
                    .map((line, index) => {
                      // highlight important words
                      const formattedLine = line
                        .replace(
                          /\b(high risk|low risk|critical|warning|normal)\b/gi,
                          (match) =>
                            `<span class="text-blue-300 font-semibold">${match}</span>`,
                        )
                        .replace(
                          /\b(heart disease|cholesterol|blood pressure|risk)\b/gi,
                          (match) =>
                            `<span class="text-white font-semibold">${match}</span>`,
                        );

                      return (
                        <p
                          key={index}
                          className="leading-6"
                          dangerouslySetInnerHTML={{ __html: formattedLine }}
                        />
                      );
                    })}
                </div>
              ) : (
                <p className="text-gray-400">
                  Submit the form to get personalized health suggestions from
                  our AI assistant.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prediction;
