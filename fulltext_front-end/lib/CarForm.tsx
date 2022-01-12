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
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", width: "30vw" }}
    >
      <label htmlFor="make">Make</label>
      <input
        name="make"
        type="text"
        style={{
          borderColor: "gray",
          backgroundColor: "lightgray",
          height: 50,
          marginTop: 10,
        }}
      />

      <label htmlFor="model">Model</label>
      <input
        name="model"
        type="text"
        style={{
          borderColor: "gray",
          backgroundColor: "lightgray",
          height: 50,
          marginTop: 10,
        }}
      />
      <label htmlFor="image">Image</label>
      <input
        name="image"
        type="text"
        style={{
          borderColor: "gray",
          backgroundColor: "lightgray",
          height: 50,
          marginTop: 10,
        }}
      />
      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        style={{
          borderColor: "gray",
          backgroundColor: "lightgray",
          height: 50,
          marginTop: 10,
        }}
      />

      <button style={{ marginTop: 20, marginBottom: 20 }} type="submit">
        Create Car
      </button>
    </form>
  );
}
