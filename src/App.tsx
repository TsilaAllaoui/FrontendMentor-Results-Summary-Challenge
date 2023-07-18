import { useEffect, useState } from "react";
import "./App.scss";
import reaction from "./assets/images/icon-reaction.svg";
import memory from "./assets/images/icon-memory.svg";
import verbal from "./assets/images/icon-verbal.svg";
import visual from "./assets/images/icon-visual.svg";
import datas from "./data.json";

interface Stat {
  color: string;
  icon: string;
  name: string;
  value: number;
}

const StatComponent = ({ stat }: { stat: Stat }) => {
  return (
    <div className="stat" style={{ backgroundColor: stat.color }}>
      <div>
        <img src={stat.icon} alt={stat.icon} />
        <p style={{ color: stat.color.replace(",.05", "") }}>{stat.name}</p>
      </div>
      <div>
        <p>{stat.value}</p>
        <p>/ 100</p>
      </div>
    </div>
  );
};

function App() {
  const [stats, setStats] = useState<Stat[]>([]);

  useEffect(() => {
    const icons = [reaction, memory, verbal, visual];
    const colors = [
      "rgb(255,0,0,.05)",
      "rgb(235,186,84,.05)",
      "rgb(0,255,0,.05)",
      "rgb(0,0,255,.05)",
    ];
    let parsedData: Stat[] = [];
    datas.forEach((data, index) => {
      parsedData.push({
        name: data.category,
        value: data.score,
        icon: icons[index],
        color: colors[index],
      });
    });
    setStats(parsedData);
  }, []);

  return (
    <div id="app">
      <div id="left">
        <p>Your result</p>
        <div id="circle">
          <p id="percent">76</p>
          <p id="percent-total">of 100</p>
        </div>
        <p>Great</p>
        <p>
          Your scored higher than 65% of the people who have taken these tests.
        </p>
      </div>
      <div id="right">
        <p>Summary</p>
        <div id="stats">
          {stats &&
            stats.map((stat) => <StatComponent key={stat.name} stat={stat} />)}
        </div>
        <button>Continue</button>
      </div>
    </div>
  );
}

export default App;
