import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { getEmotionConfig } from '../utils/emotions';

function MoodChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-500 text-sm">
        No mood data yet. Start chatting to see your emotion breakdown!
      </div>
    );
  }

  const chartData = data.map((item) => ({
    ...item,
    label: getEmotionConfig(item.emotion).label,
    color: getEmotionConfig(item.emotion).color,
    emoji: getEmotionConfig(item.emotion).emoji,
  }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
      >
        <XAxis
          type="number"
          domain={[0, 100]}
          tickFormatter={(v) => `${v}%`}
          tick={{ fill: '#94a3b8', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="label"
          tick={{ fill: '#94a3b8', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          width={75}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#16162a',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            color: '#e2e8f0',
          }}
          formatter={(value, name, props) => [
            `${value}% (${props.payload.count} sessions)`,
            'Percentage',
          ]}
        />
        <Bar dataKey="percentage" radius={[0, 6, 6, 0]} barSize={20}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default MoodChart;
