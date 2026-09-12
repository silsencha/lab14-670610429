import { useState, useEffect } from "react";
import UserRegisterCard from "../components/UserRegisterCard";
import type { Registrant } from "../libs/Registrant";

export default function DashboardPage() {
  const [registrants, setRegistrants] = useState<Registrant[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("data");
    if (data) {
      const parsedData = JSON.parse(data);
      setRegistrants(parsedData);
    }
  }, []);

  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>

      {registrants.length === 0 ? (
        <p className="text-muted mt-3">ยังไม่มีผู้ลงทะเบียน</p>
      ) : (
        <div className="mt-3">
          <label className="form-label">
            ผู้ลงทะเบียนแล้ว ({registrants.length} คน)
          </label>
          <div className="d-flex flex-column gap-2">
            {registrants.map((reg: any, index: number) => (
              <UserRegisterCard
                key={reg.id ?? index}
                id={reg.id ?? index}
                fullName={`${reg.fname} ${reg.lname}`}
                gender={reg.gender}
                plan={reg.plan}
                total={reg.totalPayment}
                item={reg.extraItems}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
