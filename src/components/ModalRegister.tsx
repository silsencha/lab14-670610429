import { useState } from "react";

type RegisterForm = {
  fname: string;
  lname: string;
  plan: string;
  gender: string;
};

const plans = [
  { id: "funrun", label: "Fun run 5.5 Km", price: 500 },
  { id: "mini", label: "Mini Marathon 10 Km", price: 800 },
  { id: "half", label: "Half Marathon 21 Km", price: 1200 },
  { id: "full", label: "Full Marathon 42.195 Km", price: 1500 },
];

const extraItems = [
  { id: "bottle", label: "Bottle 🍼", price: 200 },
  { id: "shoes", label: "Shoes 👟", price: 600 },
  { id: "cap", label: "Cap 🧢", price: 400 },
];

export default function ModalRegister({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<RegisterForm>({
    fname: "",
    lname: "",
    plan: "",
    gender: "",
  });

  const [agree, setAgree] = useState(false);

  const [selectedExtraItems, setSelectedExtraItems] = useState<string[]>([]);

  const [errors, setErrors] = useState({
    fname: false,
    lname: false,
    plan: false,
    gender: false,
  });

  const updateForm = (key: keyof RegisterForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: false }));
  };

  const handleExtraItemChange = (id: string) => {
    if (selectedExtraItems.includes(id)) {
      setSelectedExtraItems(selectedExtraItems.filter((item) => item !== id));
    } else {
      setSelectedExtraItems([...selectedExtraItems, id]);
    }
  };

  const isAllExtraSelected = extraItems.every((item) =>
    selectedExtraItems.includes(item.id),
  );

  const computeTotalPayment = () => {
    let total = 0;
    const selectedPlan = plans.find((p) => p.id === form.plan);
    if (selectedPlan) total += selectedPlan.price;

    let extraTotal = 0;
    extraItems.forEach((item) => {
      if (selectedExtraItems.includes(item.id)) {
        extraTotal += item.price;
      }
    });

    if (isAllExtraSelected) {
      total = (total + extraTotal) * 0.8;
    } else {
      total += extraTotal;
    }

    return total;
  };

  const registerBtnOnClick = () => {
    const newErrors = {
      fname: form.fname === "",
      lname: form.lname === "",
      plan: form.plan === "",
      gender: form.gender === "",
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((isError) => isError);
    if (hasError) return;

    const total = computeTotalPayment();

    const lab14_data = {
      ...form,
      extraItems: selectedExtraItems,
      totalPayment: total,
    };

    const existingData = JSON.parse(localStorage.getItem("data") || "[]");

    localStorage.setItem("data", JSON.stringify([...existingData, lab14_data]));

    setForm({ fname: "", lname: "", plan: "", gender: "" });
    setSelectedExtraItems([]);
    setAgree(false);

    alert(
      `Registration complete. Please pay money for ${total.toLocaleString()} THB.`,
    );
  };

  return (
    <>
      <div className="modal fade show d-block" tabIndex={-1} role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Register CMU Marathon 🏃‍♂️</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body">
              <div className="d-flex gap-2">
                <div>
                  <label className="form-label">First name</label>
                  <input
                    className={`form-control ${errors.fname ? "is-invalid" : ""}`}
                    onChange={(e) => updateForm("fname", e.target.value)}
                    value={form.fname}
                  />

                  <div className="invalid-feedback">Invalid first name</div>
                </div>
                <div>
                  <label className="form-label">Last name</label>
                  <input
                    className={`form-control ${errors.lname ? "is-invalid" : ""}`}
                    onChange={(e) => updateForm("lname", e.target.value)}
                    value={form.lname}
                  />
                  <div className="invalid-feedback">Invalid last name</div>
                </div>
              </div>
              <div className="mt-2">
                <label className="form-label">Plan</label>
                <select
                  className={"form-select" + (errors.plan ? " is-invalid" : "")}
                  onChange={(e) => updateForm("plan", e.target.value)}
                  value={form.plan}
                >
                  <option value="">Please select..</option>
                  {plans.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label} ({p.price.toLocaleString()} THB)
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">Please select a Plan</div>
              </div>
              <div className="mt-2">
                <label className="form-label">Gender</label>
                <div>
                  <input
                    className="me-2 form-check-input"
                    type="radio"
                    checked={form.gender === "male"}
                    onChange={() => updateForm("gender", "male")}
                  />
                  Male 👨
                  <input
                    className="mx-2 form-check-input"
                    type="radio"
                    checked={form.gender === "female"}
                    onChange={() => updateForm("gender", "female")}
                  />
                  Female 👩
                  {errors.gender && (
                    <div className="text-danger">Please select gender</div>
                  )}
                </div>
              </div>
              <div>
                <label className="form-label">Extra Item(s)</label>

                {extraItems.map((item) => (
                  <div key={item.id}>
                    <input
                      className="me-2 form-check-input"
                      type="checkbox"
                      id={item.id}
                      checked={selectedExtraItems.includes(item.id)}
                      onChange={() => handleExtraItemChange(item.id)}
                    />
                    <label className="form-check-label" htmlFor={item.id}>
                      {item.label} ({item.price} THB)
                    </label>
                  </div>
                ))}

                {isAllExtraSelected && (
                  <span className="text-success d-block">(20% Discounted)</span>
                )}
              </div>

              <div className="alert alert-primary mt-3" role="alert">
                Promotion📢 Buy all items to get 20% Discount
              </div>
              <div className="mt-3">
                Total Payment : {computeTotalPayment().toLocaleString()} THB
              </div>
            </div>

            <div className="modal-footer">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />{" "}
              I agree to the terms and conditions
              <button
                className="btn btn-success my-2"
                onClick={registerBtnOnClick}
                disabled={!agree}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show"></div>
    </>
  );
}
