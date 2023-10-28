import { TopClient, TopProfession } from "../../interfaces/admin.interfaces";
import "./card.css";

interface Props {
  client?: TopClient | null;
  profession?: TopProfession | null;
  title: string;
}

export const Card = (props: Props) => {
  const name = props.client?.name || props.profession?.profession;
  const amount = props.client?.totalCost || props.profession?.amount;
  return (
    <div className="card">
      <div key={`${name}_${amount}`} className="card-item">
        <h2>{name}</h2>
        <p>
          {props.title} ${amount}
        </p>
      </div>
    </div>
  );
};
