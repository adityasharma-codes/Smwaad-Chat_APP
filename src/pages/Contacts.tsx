import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus, MessageSquare, Phone, Video, MoreVertical } from "lucide-react";

export default function Contacts() {
  const [searchQuery, setSearchQuery] = useState("");

  const contacts = [
    { id: 1, name: "Sarah Wilson", email: "sarah@example.com", status: "online", avatar: "/avatars/sarah.png", role: "Designer" },
    { id: 2, name: "Alex Johnson", email: "alex@example.com", status: "away", avatar: "/avatars/alex.png", role: "Developer" },
    { id: 3, name: "Maria Garcia", email: "maria@example.com", status: "offline", avatar: "/avatars/maria.png", role: "Product Manager" },
    { id: 4, name: "David Chen", email: "david@example.com", status: "online", avatar: "/avatars/david.png", role: "Developer" },
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gradient">Contacts</h1>
          <Button className="gradient-primary">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Contact
          </Button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContacts.map((contact) => (
            <Card key={contact.id} className="glass-effect hover:shadow-card transition-smooth">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={contact.avatar} />
                      <AvatarFallback>{contact.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${
                      contact.status === 'online' ? 'bg-online-status' :
                      contact.status === 'away' ? 'bg-away-status' : 'bg-offline-status'
                    }`}></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{contact.name}</h3>
                    <p className="text-sm text-muted-foreground">{contact.role}</p>
                    <p className="text-xs text-muted-foreground">{contact.email}</p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}