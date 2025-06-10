
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Gift, UserCheck, TrendingUp } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdminUsers } from '@/hooks/useAdminUsers';

const AdminDashboard: React.FC = () => {
  const { users, loading } = useAdminUsers();

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const totalUsers = users.length;
  const totalPoints = users.reduce((sum, user) => sum + user.points, 0);
  const totalReferrals = users.reduce((sum, user) => sum + user.total_referrals, 0);
  const pendingRedeems = users.reduce((sum, user) => sum + user.pending_redeems, 0);

  const stats = [
    {
      title: 'Total de Usuários',
      value: totalUsers,
      description: 'Usuários registrados',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Pontos em Circulação',
      value: totalPoints.toLocaleString(),
      description: 'Total de pontos acumulados',
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      title: 'Total de Indicações',
      value: totalReferrals,
      description: 'Indicações criadas',
      icon: UserCheck,
      color: 'bg-purple-500',
    },
    {
      title: 'Resgates Pendentes',
      value: pendingRedeems,
      description: 'Aguardando aprovação',
      icon: Gift,
      color: 'bg-orange-500',
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
          <p className="text-gray-600">Visão geral do sistema Studio Rachid Club</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="relative overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-md ${stat.color}`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Últimos Usuários</CardTitle>
              <CardDescription>
                Usuários registrados recentemente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.slice(0, 5).map((user) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{user.full_name}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(user.created_at).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">{user.points} pts</p>
                      <p className="text-xs text-gray-500">{user.total_referrals} indicações</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resumo de Atividades</CardTitle>
              <CardDescription>
                Atividades recentes do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-blue-500 mr-3" />
                    <span className="text-sm text-gray-700">Novos usuários hoje</span>
                  </div>
                  <span className="font-semibold text-blue-600">
                    {users.filter(u => 
                      new Date(u.created_at).toDateString() === new Date().toDateString()
                    ).length}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm text-gray-700">Pontos médios por usuário</span>
                  </div>
                  <span className="font-semibold text-green-600">
                    {totalUsers > 0 ? Math.round(totalPoints / totalUsers) : 0}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center">
                    <UserCheck className="h-5 w-5 text-purple-500 mr-3" />
                    <span className="text-sm text-gray-700">Indicações por usuário</span>
                  </div>
                  <span className="font-semibold text-purple-600">
                    {totalUsers > 0 ? (totalReferrals / totalUsers).toFixed(1) : 0}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
