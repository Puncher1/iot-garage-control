import "./styles/App.css";
import Card from "./components/card/Card";
import Auth from "./api/services/Auth";
import { recData } from "./datamodel"


interface RecContentType {
  title: string,
  data: Record<string, any>
}

function RecContent({ title, data }: RecContentType) {
  let model = recData[title];
  const rows = model["rows"].map((row, i) =>
    <tr>
      <th>{row}</th>
      <td>{data[model["dataKeys"][i]]}</td>
    </tr>
  );

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>

  );
}


function App() {
  const authData = Auth.useData();

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row justify-evenly">
          <Card
            title="Authentifizierung"
            recContent={<RecContent title="Authentifizierung" data={authData} />}></Card>
          <Card title="Torsteuerung"></Card>
          <Card title="CO2-Messung"></Card>
        </div>
        <div className="flex flex-row justify-evenly">
          <Card title="Luftqualitätsmessung"></Card>
          <Card title="Lüftungssteuerung"></Card>
        </div>
      </div>
    </>
  );
}

export default App
