import { useState } from "react";

const PredictCrime = () => {
  const [form, setForm] = useState({ location: "", time: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Predicting with:", form);
    // TODO: Send to prediction API
  };

  return (
    <section className="section">
      <h1 className="section__title">Predict a Crime</h1>
      <p className="section__subtitle">Enter details to request a prediction</p>
      <form className="grid" onSubmit={handleSubmit}>
        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
        />
        <input
          name="time"
          placeholder="Time"
          value={form.time}
          onChange={handleChange}
        />
        <button className="button" type="submit">Predict</button>
      </form>
    </section>
  );
};
export default PredictCrime;