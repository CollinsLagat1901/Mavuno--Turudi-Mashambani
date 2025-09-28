
'use client';
import { useState, useRef, useEffect } from 'react';
import { Send, Phone, MessageSquare, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { auth, db } from '@/lib/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import BuyerDashboardLayout from '../_components/buyer-dashboard-layout';

const mockUsers = [
  { id: 1, name: "John Kiptoo", role: "Farmer", phone: "+254712345678", lastMessage: "I have fresh maize ready", avatar: '/avatars/john.png' },
  { id: 2, name: "Mary Wanjiru", role: "Buyer", phone: "+254798765432", lastMessage: "Looking to buy 20 bags", avatar: '/avatars/mary.png' },
  { id: 3, name: "Ali Hassan", role: "Transporter", phone: "+254701234567", lastMessage: "Available for delivery to Nairobi", avatar: '/avatars/ali.png' },
  { id: 4, name: "Green Valley Farms", role: "Farmer", phone: "+254723456789", lastMessage: "We have avocados for export.", avatar: '/avatars/green-valley.png' },
  { id: 5, name: "AgriLogistics", role: "Transporter", phone: "+254734567890", lastMessage: "Our trucks are ready.", avatar: '/avatars/agri-logistics.png'},
];

const mockMessages: { [key: number]: { from: 'me' | 'them'; text: string }[] } = {
  1: [
    { from: "them", text: "I have fresh maize ready for pickup in Nakuru." },
    { from: "me", text: "Excellent. What's your price per bag and what's the quality?" },
    { from: "them", text: "KES 3,000 per 90kg bag. It's Grade A, very clean." },
  ],
  2: [
    { from: "them", text: "Hi, I am a large-scale buyer from Nairobi. Are you a verified farmer?" },
  ],
  3: [
    { from: "them", text: "My truck is heading to Eldoret empty. Do you have any produce that needs transport back to Nairobi?" },
  ],
  4: [
      { from: "them", text: "Our cooperative has 10 tons of avocados ready for the export market. We are looking for serious buyers."}
  ]
};

export default function BuyerMessagesPage() {
  const [selectedUser, setSelectedUser] = useState(mockUsers[0]);
  const [messages, setMessages] = useState(mockMessages[selectedUser.id]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleUserSelect = (user: typeof mockUsers[0]) => {
    setSelectedUser(user);
    setMessages(mockMessages[user.id] || []);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    setMessages([...messages, { from: 'me', text: newMessage }]);
    setNewMessage('');
  };
  
  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <BuyerDashboardLayout user={user} userData={userData} loading={loading}>
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[350px_1fr] h-[calc(100vh-65px)]">
        {/* Sidebar */}
        <div className="flex-col border-r bg-muted/20 hidden md:flex">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold tracking-tight">Your Network</h2>
             <div className="relative mt-2">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                    placeholder="Search farmers, transporters..." 
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => handleUserSelect(user)}
                className={cn(
                  'flex items-center gap-3 p-3 cursor-pointer hover:bg-muted/50 border-b',
                  selectedUser.id === user.id && 'bg-accent'
                )}
              >
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 truncate">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.role}</p>
                  <p className="text-sm text-muted-foreground truncate">{user.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Panel */}
        <div className="flex flex-col h-full">
          {selectedUser ? (
            <>
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                   <Avatar className="md:hidden">
                        <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                        <AvatarFallback>{selectedUser.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="text-lg font-semibold">{selectedUser.name}</h3>
                        <p className="text-sm text-muted-foreground">{selectedUser.role}</p>
                    </div>
                </div>
                <Button 
                    variant="outline"
                    onClick={() => window.open(`https://wa.me/${selectedUser.phone}`, '_blank')}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Chat on WhatsApp
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="text-center text-xs text-muted-foreground p-2 bg-muted rounded-md">
                  This is a mock conversation. WhatsApp integration is live via the button above.
                </div>
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={cn(
                      'flex items-end gap-2',
                      msg.from === 'me' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    {msg.from === 'them' && <Avatar className="h-8 w-8"><AvatarFallback>{selectedUser.name.substring(0,1)}</AvatarFallback></Avatar>}
                    <div
                      className={cn(
                        'rounded-lg px-3 py-2 max-w-[70%]',
                        msg.from === 'me'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      )}
                    >
                      {msg.text}
                    </div>
                     {msg.from === 'me' && <Avatar className="h-8 w-8"><AvatarFallback>Me</AvatarFallback></Avatar>}
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              <div className="p-4 border-t bg-background">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    autoComplete="off"
                  />
                  <Button type="submit" size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center text-center">
                <div>
                    <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">Start a conversation</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Select a contact from the left to begin.</p>
                </div>
            </div>
          )}
        </div>
      </div>
    </BuyerDashboardLayout>
  );
}
