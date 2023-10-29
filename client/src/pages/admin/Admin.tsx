import { useEffect, useState } from "react";

import { TopClient, TopProfession } from "../../interfaces/admin.interfaces";
import { getApiUrl } from "../../utils/helpers/general";
import { useFeedback } from "../../context/FeedbackContext";
import { useAuth } from "../../context/AuthContext";
import "./admin.css";
import { Card } from "../../components/cards/Card";

export const AdminPage = () => {
  const [topProfession, setTopProfession] = useState<TopProfession | null>(
    null
  );
  const [topClients, setTopClients] = useState<TopClient[]>([]);
  const [perPage, setPerPage] = useState(2);
  const { addError } = useFeedback();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    fetch(getApiUrl(`admin/best-clients?limit=${perPage}`), {
      headers: { profile_id: String(user.id) },
    })
      .then((res) => res.json())
      .then(
        (json: {
          data: TopClient[];
          ok: boolean;
          error?: { message: string };
        }) => {
          if (!json.ok && json.error) {
            addError(json.error?.message);
          } else {
            setTopClients(json.data);
          }
        }
      )
      .catch((err) => {
        addError("Something went wrong, couldn't load resources");
      });
  }, [perPage]);

  useEffect(() => {
    if (!user) return;
    fetch(getApiUrl(`admin/best-profession`), {
      headers: { profile_id: String(user.id) },
    })
      .then((res) => res.json())
      .then(
        (json: {
          data: TopProfession;
          ok: boolean;
          error?: { message: string };
        }) => {
          if (!json.ok && json.error) {
            addError(json.error?.message);
          } else {
            setTopProfession(json.data);
          }
        }
      )
      .catch((err) => {
        addError("Something went wrong, couldn't load resources");
      });
  }, []);

  return (
    <div className="admin">
      <div>
        {topProfession && (
          <Card title="Top Profession" profession={topProfession} />
        )}
      </div>
      <div>
        <div className="flexSwitch">
          <button onClick={() => setPerPage(2)}>2</button>
          <button onClick={() => setPerPage(4)}>4</button>
          <button onClick={() => setPerPage(20)}>20</button>
        </div>
        {topClients.length > 0 &&
          topClients.map((client) => (
            <Card key={client.name} title="Top Client" client={client} />
          ))}
      </div>
    </div>
  );
};
