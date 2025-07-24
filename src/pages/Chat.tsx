import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Send,
  Paperclip,
  Smile,
  Phone,
  Video,
  MoreVertical,
  Search,
  Users,
  Settings,
  Plus,
  Hash,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  MessageSquare
} from "lucide-react";

interface Message {
  id: number;
  content: string;
  sender: string;
  timestamp: string;
  isOwn: boolean;
  avatar?: string;
}

interface Chat {
  id: number;
  name: string;
  type: 'direct' | 'group';
  avatar?: string;
  lastMessage?: string;
  timestamp?: string;
  unread?: number;
  online?: boolean;
  members?: number;
}

export default function Chat() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chats: Chat[] = [
    {
      id: 1,
      name: "Sarah Wilson",
      type: "direct",
      avatar: "/avatars/sarah.png",
      lastMessage: "Thanks for the update!",
      timestamp: "2m ago",
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: "Dev Team",
      type: "group",
      avatar: "/avatars/team.png",
      lastMessage: "Meeting at 3 PM",
      timestamp: "15m ago",
      unread: 0,
      members: 8
    },
    {
      id: 3,
      name: "Alex Johnson",
      type: "direct",
      avatar: "/avatars/alex.png",
      lastMessage: "Let's catch up later",
      timestamp: "1h ago",
      unread: 1,
      online: true
    },
    {
      id: 4,
      name: "Design Team",
      type: "group",
      avatar: "/avatars/design.png",
      lastMessage: "New mockups ready",
      timestamp: "2h ago",
      unread: 0,
      members: 5
    },
    {
      id: 5,
      name: "Maria Garcia",
      type: "direct",
      avatar: "/avatars/maria.png",
      lastMessage: "Great work on the project!",
      timestamp: "1d ago",
      unread: 0,
      online: false
    }
  ];

  const messages: Message[] = selectedChat ? [
    {
      id: 1,
      content: "Hey! How's the project coming along?",
      sender: selectedChat.name,
      timestamp: "10:30 AM",
      isOwn: false,
      avatar: selectedChat.avatar
    },
    {
      id: 2,
      content: "Going well! Just finished the authentication module. The real-time features are working perfectly.",
      sender: "You",
      timestamp: "10:32 AM",
      isOwn: true
    },
    {
      id: 3,
      content: "That's awesome! Can't wait to see it in action.",
      sender: selectedChat.name,
      timestamp: "10:33 AM",
      isOwn: false,
      avatar: selectedChat.avatar
    },
    {
      id: 4,
      content: "I'll demo it in our next video call. The interface looks really clean!",
      sender: "You",
      timestamp: "10:35 AM",
      isOwn: true
    },
    {
      id: 5,
      content: "Perfect! Thanks for the update!",
      sender: selectedChat.name,
      timestamp: "10:36 AM",
      isOwn: false,
      avatar: selectedChat.avatar
    }
  ] : [];

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() && selectedChat) {
      // In a real app, this would send the message via WebSocket/Supabase
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex bg-background">
      {/* Sidebar */}
      <div className="w-80 border-r border-border bg-card/30 flex flex-col">
        {/* Search Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Messages</h2>
            <Button size="sm" variant="ghost">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Chat List */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-smooth hover:bg-muted/50 ${
                  selectedChat?.id === chat.id ? 'bg-muted' : ''
                }`}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={chat.avatar} />
                    <AvatarFallback>
                      {chat.type === 'group' ? (
                        <Users className="w-4 h-4" />
                      ) : (
                        chat.name.slice(0, 2)
                      )}
                    </AvatarFallback>
                  </Avatar>
                  {chat.online && chat.type === 'direct' && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-online-status rounded-full border-2 border-background"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium truncate">
                      {chat.type === 'group' && <Hash className="w-3 h-3 inline mr-1" />}
                      {chat.name}
                    </p>
                    <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                    {chat.unread && chat.unread > 0 && (
                      <Badge variant="destructive" className="h-4 w-4 flex items-center justify-center p-0 text-xs">
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                  {chat.type === 'group' && (
                    <p className="text-xs text-muted-foreground">{chat.members} members</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="h-16 border-b border-border bg-card/30 flex items-center justify-between px-6">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={selectedChat.avatar} />
                  <AvatarFallback>
                    {selectedChat.type === 'group' ? (
                      <Users className="w-4 h-4" />
                    ) : (
                      selectedChat.name.slice(0, 2)
                    )}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">
                    {selectedChat.type === 'group' && <Hash className="w-4 h-4 inline mr-1" />}
                    {selectedChat.name}
                  </h3>
                  {selectedChat.type === 'direct' ? (
                    <p className="text-xs text-muted-foreground">
                      {selectedChat.online ? 'Online' : 'Last seen 2h ago'}
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground">{selectedChat.members} members</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={() => setIsMuted(!isMuted)}>
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
                <Button variant="ghost" size="sm">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Video className="w-4 h-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Search className="mr-2 h-4 w-4" />
                      Search in chat
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Chat settings
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex space-x-2 max-w-[70%] ${msg.isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      {!msg.isOwn && (
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={msg.avatar} />
                          <AvatarFallback>{msg.sender.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                      )}
                      <div className={`space-y-1 ${msg.isOwn ? 'items-end' : 'items-start'} flex flex-col`}>
                        <div
                          className={`px-4 py-2 rounded-2xl ${
                            msg.isOwn
                              ? 'bg-chat-bubble text-white rounded-br-md'
                              : 'bg-chat-bubble-secondary rounded-bl-md'
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                        </div>
                        <span className="text-xs text-muted-foreground px-2">{msg.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t border-border bg-card/30">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pr-12"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2"
                  >
                    <Smile className="w-4 h-4" />
                  </Button>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsMicMuted(!isMicMuted)}
                >
                  {isMicMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
                <Button
                  size="sm"
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="gradient-primary"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-background">
            <div className="text-center">
              <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Select a conversation</h3>
              <p className="text-muted-foreground">Choose a chat from the sidebar to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}