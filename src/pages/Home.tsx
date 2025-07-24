import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  Video, 
  Users, 
  Clock, 
  Plus,
  Phone,
  Calendar,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const recentChats = [
    { id: 1, name: "Sarah Wilson", lastMessage: "Thanks for the update!", time: "2m ago", avatar: "/avatars/sarah.png", online: true, unread: 2 },
    { id: 2, name: "Dev Team", lastMessage: "Meeting at 3 PM", time: "15m ago", avatar: "/avatars/team.png", online: false, unread: 0 },
    { id: 3, name: "Alex Johnson", lastMessage: "Let's catch up later", time: "1h ago", avatar: "/avatars/alex.png", online: true, unread: 1 },
  ];

  const upcomingMeetings = [
    { id: 1, title: "Daily Standup", time: "9:00 AM", participants: 5, type: "video" },
    { id: 2, title: "Client Review", time: "2:00 PM", participants: 3, type: "video" },
    { id: 3, title: "Team Sync", time: "4:30 PM", participants: 8, type: "audio" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-background via-background to-card">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
        <div className="container mx-auto px-4 py-16 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gradient">Connect</span> & <span className="text-gradient">Collaborate</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience seamless real-time communication with our modern chat and video conferencing platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/chat">
                <Button size="lg" className="gradient-primary shadow-glow">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Start Chatting
                </Button>
              </Link>
              <Link to="/video">
                <Button size="lg" variant="outline" className="glass-effect">
                  <Video className="mr-2 h-5 w-5" />
                  Join Video Call
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <Card className="glass-effect hover:shadow-card transition-smooth cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">New Chat</h3>
              <p className="text-sm text-muted-foreground">Start a conversation</p>
            </CardContent>
          </Card>

          <Card className="glass-effect hover:shadow-card transition-smooth cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Video Call</h3>
              <p className="text-sm text-muted-foreground">Start or join meeting</p>
            </CardContent>
          </Card>

          <Card className="glass-effect hover:shadow-card transition-smooth cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Create Group</h3>
              <p className="text-sm text-muted-foreground">Invite team members</p>
            </CardContent>
          </Card>

          <Card className="glass-effect hover:shadow-card transition-smooth cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Schedule</h3>
              <p className="text-sm text-muted-foreground">Plan meetings</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Chats */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Conversations
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </CardTitle>
              <CardDescription>
                Your latest messages and conversations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentChats.map((chat) => (
                <div key={chat.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-smooth cursor-pointer">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={chat.avatar} />
                      <AvatarFallback>{chat.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    {chat.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-online-status rounded-full border-2 border-background"></div>
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{chat.name}</p>
                      <span className="text-xs text-muted-foreground">{chat.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && (
                    <Badge variant="destructive" className="h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {chat.unread}
                    </Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Meetings */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Today's Schedule
                <Button variant="ghost" size="sm">
                  <Calendar className="w-4 h-4" />
                </Button>
              </CardTitle>
              <CardDescription>
                Your upcoming meetings and calls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingMeetings.map((meeting) => (
                <div key={meeting.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-smooth cursor-pointer">
                  <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                    {meeting.type === 'video' ? (
                      <Video className="w-5 h-5 text-accent" />
                    ) : (
                      <Phone className="w-5 h-5 text-accent" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{meeting.title}</p>
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {meeting.time}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {meeting.participants} participants
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    Join
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything you need to stay connected</h2>
            <p className="text-muted-foreground">Powerful features for modern teams</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glass-effect text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Real-time Messaging</h3>
                <p className="text-muted-foreground">
                  Instant messaging with emoji reactions, file sharing, and message search.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Video className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">HD Video Calls</h3>
                <p className="text-muted-foreground">
                  Crystal clear video conferencing with screen sharing and recording.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Team Collaboration</h3>
                <p className="text-muted-foreground">
                  Create groups, manage contacts, and collaborate efficiently.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}