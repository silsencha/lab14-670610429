import type { Registrant } from "../libs/Registrant";

export default function UserRegisterCard({
  fullName,
  gender,
  plan,
  total = 0,
  item,
}: Registrant) {
  const genderDisplay =
    gender === "male" ? "👨 Male" : gender === "female" ? "👩 Female" : gender;

  return (
    <div className="card p-3">
      <div className="d-flex justify-content-between">
        <span className="fw-semibold">{fullName}</span>
        <span>{total.toLocaleString()} THB</span>
      </div>
      <small className="text-muted">
        {plan} &bull; {genderDisplay}
      </small>
      {item && item.length > 0 && (
        <div className="mt-1 d-flex flex-wrap gap-1">
          {item.map((itm, idx) => (
            <span key={idx} className="badge text-bg-light border">
              {itm}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
