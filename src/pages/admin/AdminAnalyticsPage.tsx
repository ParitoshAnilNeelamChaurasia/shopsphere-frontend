import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { month: 'Jan', revenue: 320000, orders: 84 }, { month: 'Feb', revenue: 410000, orders: 103 }, { month: 'Mar', revenue: 460000, orders: 118 }, { month: 'Apr', revenue: 520000, orders: 126 }, { month: 'May', revenue: 630000, orders: 149 }, { month: 'Jun', revenue: 710000, orders: 174 },
];

export default function AdminAnalyticsPage() {
  return <div><div className="admin-page-heading"><div><span className="eyebrow">Business intelligence</span><h2>Analytics</h2><p>Example visualizations built with Recharts; real data will come from backend services later.</p></div></div><div className="dashboard-grid analytics-grid"><section className="admin-card chart-card"><div className="admin-card-heading"><div><span className="eyebrow">Revenue</span><h3>Six-month growth</h3></div></div><ResponsiveContainer width="100%" height={320}><LineChart data={data}><XAxis dataKey="month" axisLine={false} tickLine={false} /><YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value / 100000}L`} /><Tooltip /><Line type="monotone" dataKey="revenue" strokeWidth={3} dot={{ r: 4 }} /></LineChart></ResponsiveContainer></section><section className="admin-card chart-card"><div className="admin-card-heading"><div><span className="eyebrow">Orders</span><h3>Volume by month</h3></div></div><ResponsiveContainer width="100%" height={320}><BarChart data={data}><XAxis dataKey="month" axisLine={false} tickLine={false} /><YAxis axisLine={false} tickLine={false} /><Tooltip /><Bar dataKey="orders" radius={[8, 8, 0, 0]} /></BarChart></ResponsiveContainer></section></div></div>;
}
