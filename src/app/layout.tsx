'use client';

import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { claims } from '@/lib/data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Sector } from 'recharts';
import { AlertTriangle, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useMemo, useState } from 'react';

// Process data for charts
const platformData = claims.reduce((acc, claim) => {
    const platform = acc.find(p => p.name === claim.platform);
    if (platform) {
        platform.claims++;
    } else {
        acc.push({ name: claim.platform, claims: 1 });
    }
    return acc;
}, [] as { name: string, claims: number }[]);

const statusData = claims.reduce((acc, claim) => {
    const status = acc.find(p => p.name === claim.status);
    if (status) {
        status.value++;
    } else {
        acc.push({ name: claim.status, value: 1 });
    }
    return acc;
}, [] as { name: string, value: number }[]);

const COLORS = {
    'Pending': 'hsl(var(--destructive))',
    'Disputed': 'hsl(var(--primary))',
    'Resolved': 'hsl(var(--chart-2))',
    'Rejected': 'hsl(var(--muted-foreground))',
};

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="font-bold text-lg">
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="hsl(var(--foreground))">{`${value} Claims`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="hsl(var(--muted-foreground))">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};


export default function AnalysisPage() {
    const [activeIndex, setActiveIndex] = useState(0);

    const priorityClaims = useMemo(() => {
        const now = new Date();
        return claims
            .filter(c => c.status === 'Pending')
            .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
            .slice(0, 3);
    }, []);

    const onPieEnter = (_: any, index: number) => {
        setActiveIndex(index);
    };

    return (
        <div>
            <PageHeader title="Claims Analysis" subtitle="AI-powered insights into your compensation claims." />

            <div className="grid gap-8 mb-8 md:grid-cols-2">
                 <Card>
                    <CardHeader>
                        <CardTitle>Claims by Platform</CardTitle>
                        <CardDescription>Number of active claims per delivery platform.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={platformData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip cursor={{fill: 'hsl(var(--muted))'}} />
                                <Legend />
                                <Bar dataKey="claims" fill="hsl(var(--primary))" name="Active Claims" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Claims by Status</CardTitle>
                        <CardDescription>Distribution of all current claim statuses.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    activeIndex={activeIndex}
                                    activeShape={renderActiveShape}
                                    data={statusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={100}
                                    fill="hsl(var(--accent))"
                                    dataKey="value"
                                    onMouseEnter={onPieEnter}
                                >
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="text-destructive" />
                        AI Priority Queue
                    </CardTitle>
                    <CardDescription>Claims that require your immediate attention based on deadlines and success probability.</CardDescription>
                </CardHeader>
                <CardContent>
                   <div className="space-y-4">
                        {priorityClaims.length > 0 ? priorityClaims.map(claim => (
                            <div key={claim.id} className="p-4 border rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h4 className="font-semibold">{claim.reason} on {claim.platform}</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Order: {claim.orderNumber} | Amount: AED {claim.claimAmount.toFixed(2)}
                                    </p>
                                    <p className="text-sm text-destructive font-medium">
                                        Deadline: {new Date(claim.deadline).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                     <Button asChild size="sm">
                                        <Link href="/dispute">
                                            <TrendingUp className="mr-2 h-4 w-4" />
                                            Dispute Now
                                        </Link>
                                    </Button>
                                    <Button variant="outline" size="sm">View Details</Button>
                                </div>
                            </div>
                        )) : (
                            <p className="text-muted-foreground text-center py-8">No high-priority claims found. Great job!</p>
                        )}
                   </div>
                </CardContent>
            </Card>
        </div>
    );
}
