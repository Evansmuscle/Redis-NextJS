import { FormEvent, FormEventHandler } from "react";

export default function CarForm() {
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    event: FormEvent
  ) => {
    event.preventDefault();

    if (event.currentTarget instanceof HTMLFormElement) {
      const form = new FormData(event.currentTarget);
      const formData = Object.fromEntries(form.entries());

      const res = await fetch("/api/cars", {
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      await fetch("/api/createIndex");

      const result = await res.json();
      console.log(result);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label className="label" htmlFor="make">
        Make
      </label>
      <input className="input" name="make" type="text" />

      <label className="label" htmlFor="model">
        Model
      </label>
      <input className="input" name="model" type="text" />
      <label className="label" htmlFor="image">
        Image
      </label>
      <input className="input" name="image" type="text" />
      <label className="label" htmlFor="description">
        Description
      </label>
      <textarea className="textarea" name="description" />

      <button className="btn-submit" type="submit">
        Create Car
      </button>
    </form>
  );
}
