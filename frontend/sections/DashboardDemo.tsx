import React from "react";

const colors = {
  blue: "#0D63F3",
  blueHover: "#0A4CC7",
  lightBlue: "#E6F0FF",
  darkBg: "#0A101E",
  darkCard: "#121A2A",
  darkBorder: "#222B3F",
  grayText: "#A0AEC0",
};

const data = [
  { month: "Jan", revenue: 4000, users: 2400, leads: 1500, churn: 5 },
  { month: "Feb", revenue: 3000, users: 1398, leads: 1200, churn: 3 },
  { month: "Mar", revenue: 2000, users: 9800, leads: 1800, churn: 6 },
  { month: "Apr", revenue: 2780, users: 3908, leads: 2200, churn: 4 },
  { month: "May", revenue: 1890, users: 4800, leads: 2000, churn: 7 },
  { month: "Jun", revenue: 2390, users: 3800, leads: 2500, churn: 5 },
  { month: "Jul", revenue: 3490, users: 4300, leads: 3000, churn: 4 },
];

const maxRevenue = Math.max(...data.map((d) => d.revenue));
const maxUsers = Math.max(...data.map((d) => d.users));
const maxLeads = Math.max(...data.map((d) => d.leads));

function scale(value: number, max: number, height: number) {
  return (value / max) * height;
}

const DashboardDemo: React.FC = () => {
  return (
    <div
      className="p-8 rounded-xl max-w-full overflow-auto"
      style={{ backgroundColor: colors.darkBg, color: colors.lightBlue }}
    >
      <h1
        className="text-5xl font-extrabold mb-8 select-none"
        style={{ color: colors.blue }}
      >
        Painel Klyro
      </h1>

      {/* Estatísticas principais */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <StatCard
          title="Faturamento"
          value="R$ 1.200.000"
          icon="💰"
          color={colors.blue}
          description="↑ 12% no último mês"
        />
        <StatCard
          title="Usuários Ativos"
          value="3.450"
          icon="👥"
          color={colors.blueHover}
          description="↓ 2% no último mês"
        />
        <StatCard
          title="Novos Leads"
          value="1.280"
          icon="📈"
          color={colors.lightBlue}
          description="↑ 18% no último mês"
        />
        <StatCard
          title="Churn Rate"
          value="5%"
          icon="⚠️"
          color="#F56565" // vermelho Tailwind
          description="Meta: abaixo de 6%"
        />
      </section>

      {/* Gráficos */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        <LineChart data={data} colors={colors} />
        <BarChart data={data} colors={colors} />
      </section>

      {/* Tabela */}
      <section className="bg-[#121A2A] rounded-lg shadow-lg p-6 overflow-auto">
        <h2
          className="text-2xl font-semibold mb-4"
          style={{ color: colors.lightBlue }}
        >
          Dados detalhados por mês
        </h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              {["Mês", "Faturamento", "Usuários", "Leads", "Churn (%)"].map(
                (header) => (
                  <th
                    key={header}
                    className="py-3 px-4 border-b border-[#222B3F]"
                    style={{ color: colors.grayText }}
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {data.map(({ month, revenue, users, leads, churn }) => (
              <tr
                key={month}
                className="hover:bg-[#0D184F] transition-colors cursor-default"
              >
                <td className="py-3 px-4 border-b border-[#222B3F]">{month}</td>
                <td className="py-3 px-4 border-b border-[#222B3F]">
                  R${revenue.toLocaleString("pt-BR")}
                </td>
                <td className="py-3 px-4 border-b border-[#222B3F]">
                  {users.toLocaleString("pt-BR")}
                </td>
                <td className="py-3 px-4 border-b border-[#222B3F]">
                  {leads.toLocaleString("pt-BR")}
                </td>
                <td
                  className={`py-3 px-4 border-b border-[#222B3F] font-semibold ${
                    churn > 6 ? "text-red-500" : "text-green-400"
                  }`}
                >
                  {churn}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Call to Action */}
      <section className="mt-12 text-center">
        <button
          className="bg-klyro-blue hover:bg-klyro-blue-hover transition-colors text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg shadow-klyro-blue/50"
          style={{
            backgroundColor: colors.blue,
            boxShadow: `0 8px 20px ${colors.blue}80`,
          }}
          onClick={() => alert("Pronto para assinar a Klyro!")}
        >
          Comece Agora - Teste Grátis
        </button>
      </section>
    </div>
  );
};

export default DashboardDemo;

// ----- COMPONENTES AUXILIARES -----

const StatCard: React.FC<{
  title: string;
  value: string;
  icon: string;
  color: string;
  description?: string;
}> = ({ title, value, icon, color, description }) => (
  <div
    className="p-6 rounded-lg shadow-lg flex flex-col items-start"
    style={{
      backgroundColor: colors.darkCard,
      border: `1px solid ${colors.darkBorder}`,
      boxShadow: `0 6px 15px ${color}60`,
      color,
      userSelect: "none",
    }}
  >
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-lg font-bold">{title}</h3>
    <p className="text-3xl font-extrabold my-2">{value}</p>
    {description && <p className="text-sm opacity-70">{description}</p>}
  </div>
);

const LineChart: React.FC<{
  data: typeof data;
  colors: typeof colors;
}> = ({ data, colors }) => {
  const width = 600;
  const height = 300;
  const padding = 50;

  const maxValue = Math.max(...data.map((d) => Math.max(d.revenue, d.users)));

  // calcula pontos normalizados para receita e usuários
  const pointsRevenue = data
    .map(
      (d, i) =>
        `${padding + (i * (width - padding * 2)) / (data.length - 1)},${height -
          padding -
          (d.revenue / maxValue) * (height - padding * 2)}`
    )
    .join(" ");

  const pointsUsers = data
    .map(
      (d, i) =>
        `${padding + (i * (width - padding * 2)) / (data.length - 1)},${height -
          padding -
          (d.users / maxValue) * (height - padding * 2)}`
    )
    .join(" ");

  return (
    <div
      className="p-4 rounded-lg shadow-lg"
      style={{ backgroundColor: colors.darkCard, border: `1px solid ${colors.darkBorder}` }}
    >
      <h3 className="text-xl font-semibold mb-4" style={{ color: colors.lightBlue }}>
        Receita e Usuários
      </h3>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Gráfico de linhas mostrando receita e usuários"
        className="w-full"
      >
        {/* Linhas guia horizontais */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1={padding}
            y1={padding + i * ((height - padding * 2) / 4)}
            x2={width - padding}
            y2={padding + i * ((height - padding * 2) / 4)}
            stroke={colors.darkBorder}
            strokeDasharray="5 5"
          />
        ))}

        {/* Eixos */}
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke={colors.lightBlue} />
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke={colors.lightBlue} />

        {/* Pontos receita */}
        <polyline
          fill="none"
          stroke={colors.blue}
          strokeWidth={3}
          points={pointsRevenue}
          style={{ transition: "all 0.3s ease" }}
        />
        {data.map((d, i) => {
          const cx = padding + (i * (width - padding * 2)) / (data.length - 1);
          const cy = height - padding - (d.revenue / maxValue) * (height - padding * 2);
          return (
            <circle
              key={`rev-${i}`}
              cx={cx}
              cy={cy}
              r={6}
              fill={colors.blueHover}
              stroke="#fff"
              strokeWidth={2}
            />
          );
        })}

        {/* Pontos usuários */}
        <polyline
          fill="none"
          stroke={colors.blueHover}
          strokeWidth={3}
          points={pointsUsers}
          style={{ transition: "all 0.3s ease" }}
        />
        {data.map((d, i) => {
          const cx = padding + (i * (width - padding * 2)) / (data.length - 1);
          const cy = height - padding - (d.users / maxValue) * (height - padding * 2);
          return (
            <circle
              key={`usr-${i}`}
              cx={cx}
              cy={cy}
              r={6}
              fill={colors.blue}
              stroke="#fff"
              strokeWidth={2}
            />
          );
        })}

        {/* Labels eixo x */}
        {data.map((d, i) => (
          <text
            key={`label-${i}`}
            x={padding + (i * (width - padding * 2)) / (data.length - 1)}
            y={height - padding + 20}
            fill={colors.lightBlue}
            fontSize="14"
            textAnchor="middle"
          >
            {d.month}
          </text>
        ))}
      </svg>
    </div>
  );
};

const BarChart: React.FC<{
  data: typeof data;
  colors: typeof colors;
}> = ({ data, colors }) => {
  const width = 600;
  const height = 300;
  const padding = 50;

  const maxValue = Math.max(...data.map((d) => d.leads));

  return (
    <div
      className="p-4 rounded-lg shadow-lg"
      style={{ backgroundColor: colors.darkCard, border: `1px solid ${colors.darkBorder}` }}
    >
      <h3 className="text-xl font-semibold mb-4" style={{ color: colors.lightBlue }}>
        Novos Leads Mensais
      </h3>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Gráfico de barras mostrando novos leads mensais"
        className="w-full"
      >
        {/* Linhas guia horizontais */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1={padding}
            y1={padding + i * ((height - padding * 2) / 4)}
            x2={width - padding}
            y2={padding + i * ((height - padding * 2) / 4)}
            stroke={colors.darkBorder}
            strokeDasharray="5 5"
          />
        ))}

        {/* Eixos */}
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke={colors.lightBlue} />
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke={colors.lightBlue} />

        {/* Barras */}
        {data.map((d, i) => {
          const barWidth = 40;
          const barHeight = (d.leads / maxValue) * (height - padding * 2);
          const x = padding + i * (barWidth + 20);
          const y = height - padding - barHeight;
          return (
            <rect
              key={`bar-${i}`}
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill={colors.blue}
              rx={6}
              ry={6}
            />
          );
        })}

        {/* Labels eixo x */}
        {data.map((d, i) => (
          <text
            key={`label-${i}`}
            x={padding + i * (40 + 20) + 20}
            y={height - padding + 20}
            fill={colors.lightBlue}
            fontSize="14"
            textAnchor="middle"
          >
            {d.month}
          </text>
        ))}
      </svg>
    </div>
  );
};
    