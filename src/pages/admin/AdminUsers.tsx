
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus, Search } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdminUsers } from '@/hooks/useAdminUsers';

const AdminUsers: React.FC = () => {
  const { users, loading, adjustUserPoints } = useAdminUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [pointsAmount, setPointsAmount] = useState<number>(0);
  const [pointsDescription, setPointsDescription] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const filteredUsers = users.filter(user =>
    user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePointsAdjustment = async (add: boolean) => {
    if (!selectedUser || !pointsAmount || !pointsDescription.trim()) return;

    setIsProcessing(true);
    const amount = add ? pointsAmount : -pointsAmount;
    
    const success = await adjustUserPoints(selectedUser, amount, pointsDescription);
    
    if (success) {
      setIsDialogOpen(false);
      setSelectedUser(null);
      setPointsAmount(0);
      setPointsDescription('');
    }
    
    setIsProcessing(false);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Usuários</h1>
          <p className="text-gray-600">Visualize e gerencie todos os usuários do sistema</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
            <CardDescription>Busque usuários por nome ou telefone</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nome ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Usuários ({filteredUsers.length})</CardTitle>
            <CardDescription>
              Total de usuários encontrados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{user.full_name}</h3>
                        <p className="text-sm text-gray-600">{user.phone || 'Sem telefone'}</p>
                        <p className="text-xs text-gray-400">
                          Cadastrado em {new Date(user.created_at).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <Badge variant="secondary" className="mb-1">
                        {user.points} pontos
                      </Badge>
                      <div className="flex space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {user.total_referrals} indicações
                        </Badge>
                        {user.pending_redeems > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {user.pending_redeems} resgates pendentes
                          </Badge>
                        )}
                      </div>
                    </div>

                    <Dialog open={isDialogOpen && selectedUser === user.id} onOpenChange={(open) => {
                      setIsDialogOpen(open);
                      if (!open) {
                        setSelectedUser(null);
                        setPointsAmount(0);
                        setPointsDescription('');
                      }
                    }}>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedUser(user.id)}
                        >
                          Ajustar Pontos
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Ajustar Pontos - {user.full_name}</DialogTitle>
                          <DialogDescription>
                            Adicione ou remova pontos do usuário. Esta ação criará uma transação de pontos.
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="points">Quantidade de Pontos</Label>
                            <Input
                              id="points"
                              type="number"
                              value={pointsAmount}
                              onChange={(e) => setPointsAmount(Number(e.target.value))}
                              placeholder="Digite a quantidade de pontos"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="description">Motivo do Ajuste</Label>
                            <Input
                              id="description"
                              value={pointsDescription}
                              onChange={(e) => setPointsDescription(e.target.value)}
                              placeholder="Ex: Correção de sistema, bônus especial..."
                            />
                          </div>
                        </div>

                        <DialogFooter className="space-x-2">
                          <Button
                            variant="destructive"
                            onClick={() => handlePointsAdjustment(false)}
                            disabled={!pointsAmount || !pointsDescription.trim() || isProcessing}
                          >
                            <Minus className="h-4 w-4 mr-2" />
                            Remover Pontos
                          </Button>
                          <Button
                            onClick={() => handlePointsAdjustment(true)}
                            disabled={!pointsAmount || !pointsDescription.trim() || isProcessing}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Adicionar Pontos
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}

              {filteredUsers.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Nenhum usuário encontrado com os filtros aplicados.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
