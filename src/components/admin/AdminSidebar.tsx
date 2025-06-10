
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Users, 
  Gift, 
  UserCheck, 
  BarChart3, 
  Settings,
  Home,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuth();

  const menuItems = [
    {
      label: 'Dashboard',
      path: '/admin',
      icon: BarChart3,
    },
    {
      label: 'Usuários',
      path: '/admin/users',
      icon: Users,
    },
    {
      label: 'Indicações',
      path: '/admin/referrals',
      icon: UserCheck,
    },
    {
      label: 'Resgates',
      path: '/admin/redeems',
      icon: Gift,
    },
    {
      label: 'Catálogo',
      path: '/admin/catalog',
      icon: Settings,
    },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-xl font-bold">Painel Admin</h1>
        <p className="text-gray-300 text-sm">Studio Rachid Club</p>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Button
                key={item.path}
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full justify-start text-left ${
                  isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
                onClick={() => navigate(item.path)}
              >
                <Icon className="h-4 w-4 mr-3" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-700 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white"
          onClick={() => navigate('/dashboard')}
        >
          <Home className="h-4 w-4 mr-3" />
          Voltar ao App
        </Button>
        
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-red-400"
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4 mr-3" />
          Sair
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
