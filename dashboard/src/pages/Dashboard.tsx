import { KPICards } from "@/components/dashboard/KPICards";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { FunnelChart } from "@/components/dashboard/FunnelChart";
import { IntelligenceFeed } from "@/components/dashboard/IntelligenceFeed";
import { OrdersTable } from "@/components/dashboard/OrdersTable";
import { SystemStatus } from "@/components/dashboard/SystemStatus";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6 max-w-[1500px]">
      <div>
        <h2 className="text-xl font-bold text-foreground">Dashboard Executivo</h2>
        <p className="text-sm text-muted-foreground">Monitoramento em tempo real — SensoriAI VendaBot</p>
      </div>

      <KPICards />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Left 60% */}
        <div className="lg:col-span-3 space-y-5">
          <SalesChart />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FunnelChart />
            <SystemStatus />
          </div>
        </div>
        {/* Right 40% */}
        <div className="lg:col-span-2 min-h-[460px]">
          <IntelligenceFeed />
        </div>
      </div>

      <OrdersTable />
    </div>
  );
}
