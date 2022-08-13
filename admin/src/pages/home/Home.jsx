import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";

export default function Home() {
  const [stats, setStats] = useState([]);

  const MONTHS = useMemo(() => [
    'jan',
    'feb',
    'mar',
    'april',
    'may',
    'june',
    'july',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec'

  ], []);

  useEffect(() => {
    const getStats = async () => {
      const res = await userRequest.get('users/stats/');
      // const resSort = res.data.sort((a, b) => a._id - b._id);
      res.data.map(item => (
        setStats(prev => [
          ...prev,
          { name: MONTHS[item._id - 1], 'Active User': item.total },
        ])
      ));
    };
    getStats();
  }, [MONTHS]);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={stats} title="User Analytics" grid dataKey="Active User" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
