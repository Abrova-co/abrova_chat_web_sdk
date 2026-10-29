import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { AbrovaChatClient, AbrovaChatConfig } from '@abrova/web-chat';
import AbrovaPush from '@abrova/push-web';
import { DemoUser, Order, getOrderById } from './models/types';
import { LoginScreen } from './screens/LoginScreen';
import { OrdersScreen } from './screens/OrdersScreen';
import { OrderChatScreen } from './screens/OrderChatScreen';

let abrovaPush: AbrovaPush | null = null;

/** Your project's public key from Abrova Console, read from `.env.local`. */
const ABROVA_API_KEY = import.meta.env.VITE_ABROVA_API_KEY ?? 'ab_live_YOUR_PUBLIC_KEY';

function AppContent() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<DemoUser | null>(null);
  const [abrovaChatClient, setAbrovaChatClient] = useState<AbrovaChatClient | null>(null);

  const handleLogin = (user: DemoUser) => {
    setCurrentUser(user);

    // Initialize AbrovaChat client
    const config: AbrovaChatConfig = {
      apiKey: ABROVA_API_KEY,
      userId: user.id,
      userInfo: {
        displayName: user.name,
        role: user.role,
      },
    };

    const client = new AbrovaChatClient(config);
    client.connect();
    setAbrovaChatClient(client);

    abrovaPush = new AbrovaPush({
      apiKey: ABROVA_API_KEY,
    });
    abrovaPush.register({ userId: user.id });

    navigate('/orders');
  };

  const handleLogout = () => {
    abrovaChatClient?.disconnect();
    setAbrovaChatClient(null);
    abrovaPush?.unregister();
    abrovaPush = null;
    setCurrentUser(null);
    navigate('/');
  };

  const handleOrderClick = (order: Order) => {
    navigate(`/orders/${order.id}/chat`);
  };

  const handleBackToOrders = () => {
    navigate('/orders');
  };

  if (!currentUser || !abrovaChatClient) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<LoginScreen onLogin={handleLogin} />}
      />
      <Route
        path="/orders"
        element={
          <OrdersScreen
            currentUser={currentUser}
            client={abrovaChatClient}
            onOrderClick={handleOrderClick}
            onLogout={handleLogout}
          />
        }
      />
      <Route
        path="/orders/:orderId/chat"
        element={
          <OrderChatRoute
            currentUser={currentUser}
            client={abrovaChatClient}
            onBack={handleBackToOrders}
          />
        }
      />
    </Routes>
  );
}

interface OrderChatRouteProps {
  currentUser: DemoUser;
  client: AbrovaChatClient;
  onBack: () => void;
}

function OrderChatRoute({ currentUser, client, onBack }: OrderChatRouteProps) {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const order = orderId ? getOrderById(orderId) : undefined;

  if (!order) {
    navigate('/orders');
    return null;
  }

  return (
    <OrderChatScreen
      order={order}
      currentUser={currentUser}
      client={client}
      onBack={onBack}
    />
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
