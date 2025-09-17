import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function StatsChart({ period }) {
  const DUMMY = {
    daily:   { sleep: 80, workout: 60, water: 55 },
    weekly:  { sleep: 70, workout: 65, water: 62 },
    monthly: { sleep: 85, workout: 72, water: 70 },
  };
  const cur = DUMMY[period] ?? {};

  const makeChart = (label, value) => ({
    data: {
      labels: ["달성", "미달성"],
      datasets: [
        {
          data: [value ?? 0, 100 - (value ?? 0)],
          backgroundColor: ["#36A2EB", "#E9ECEF"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      cutout: "60%",
      plugins: { legend: { display: false } },
      responsive: true,
      maintainAspectRatio: false,
    },
    title: (() => {
      if (period === "daily") return `오늘 · 평균 ${label} 달성률`;
      if (period === "weekly") return `이번 주 · 평균 ${label} 달성률`;
      return `이번 달 · 평균 ${label} 달성률`;
    })(),
  });

  const charts = [
    makeChart("수면", cur.sleep),
    makeChart("운동", cur.workout),
    makeChart("음수량", cur.water),
  ];

  const ChartCard = ({ cfg }) => (
    <div className="d-flex flex-column align-items-center mb-4">
      <div style={{ width: 140, height: 140 }}>
        <Doughnut data={cfg.data} options={cfg.options} />
      </div>
      <div className="mt-2 text-muted small text-center">{cfg.title}</div>
    </div>
  );

  return (
    <div className="d-flex flex-column align-items-center">
      {charts.map((c, idx) => (
        <ChartCard key={idx} cfg={c} />
      ))}
    </div>
  );
}
