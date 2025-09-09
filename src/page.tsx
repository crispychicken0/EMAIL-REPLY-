import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, CircleDollarSign, ShieldCheck, Timer } from 'lucide-react';
import { claims } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DashboardPage() {
  const recentClaim = claims[0];
  const stats = [
    { title: 'Active Claims', value: '12', icon: Activity, change: '+2 from last month' },
    { title: 'At Risk Amount', value: 'AED 3,450', icon: CircleDollarSign, change: '-AED 150 from last month' },
    { title: 'Success Rate', value: '85%', icon: ShieldCheck, change: '+1.2% from last month' },
    { title: 'Avg. Response Time', value: '2.1 Days', icon: Timer, change: '-0.2 days from last month' },
  ];

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Your real-time compensation claims overview." />
      
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </CardContent>
              </Card>
            ))}
        </div>
        <div className="space-y-8">
            <div>
                <h2 className="text-xl font-semibold mb-4">Most Recent Claim</h2>
                <Card className="overflow-hidden">
                    <CardHeader className="flex flex-row items-start justify-between bg-card/50 border-b p-4">
                        <div>
                            <p className="font-semibold">{recentClaim.reason}</p>
                            <p className="text-sm text-muted-foreground">Order: {recentClaim.orderNumber}</p>
                        </div>
                        <Badge variant={recentClaim.status === 'Pending' ? 'destructive' : 'secondary'}>{recentClaim.status}</Badge>
                    </CardHeader>
                    <CardContent className="p-4 md:p-6 grid gap-4">
                       <div className="grid grid-cols-2 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-muted-foreground">Platform</p>
                                <p className="font-medium">{recentClaim.platform}</p>
                            </div>
                             <div>
                                <p className="text-muted-foreground">Amount</p>
                                <p className="font-medium">AED {recentClaim.claimAmount.toFixed(2)}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Claim Date</p>
                                <p className="font-medium">{new Date(recentClaim.claimDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Deadline</p>
                                <p className="font-medium text-destructive">{new Date(recentClaim.deadline).toLocaleDateString()}</p>
                            </div>
                       </div>
                       <div className="bg-amber-100/50 dark:bg-amber-900/20 border-l-4 border-amber-500 text-amber-900 dark:text-amber-200 p-4 rounded-r-md">
                            <h4 className="font-semibold">Recommended Action</h4>
                            <p className="text-sm">This claim has a high chance of success if you provide delivery evidence.</p>
                       </div>
                       <div className="flex gap-2">
                            <Button asChild>
                                <Link href="/dispute">Dispute Now</Link>
                            </Button>
                            <Button variant="outline">Mark as Resolved</Button>
                       </div>
                    </CardContent>
                </Card>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">Daily Summary</h2>
                <Card>
                    <CardHeader>
                        <CardTitle>Today's Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-baseline">
                            <p className="text-muted-foreground">Recovered</p>
                            <p className="text-2xl font-bold text-green-600">+AED 2,340</p>
                        </div>
                         <div className="flex justify-between items-baseline">
                            <p className="text-muted-foreground">At Risk</p>
                            <p className="text-2xl font-bold text-destructive">-AED 450</p>
                        </div>
                         <div className="flex justify-between items-baseline">
                            <p className="text-muted-foreground">New Claims</p>
                            <p className="text-2xl font-bold">3</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
}
