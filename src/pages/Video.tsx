import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Video as VideoIcon,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  ScreenShare,
  ScreenShareOff,
  Settings,
  MoreVertical,
  Users,
  MessageSquare,
  Copy,
  UserPlus,
  Maximize,
  Minimize,
  Phone,
  Calendar,
  Clock
} from "lucide-react";

interface Participant {
  id: number;
  name: string;
  avatar?: string;
  isMuted: boolean;
  isVideoOn: boolean;
  isHost: boolean;
  isScreenSharing?: boolean;
}

interface Meeting {
  id: number;
  title: string;
  time: string;
  participants: number;
  type: 'scheduled' | 'instant';
  status: 'upcoming' | 'live' | 'ended';
}

export default function Video() {
  const [isInCall, setIsInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [meetingId, setMeetingId] = useState("");
  const [message, setMessage] = useState("");
  
  const videoRef = useRef<HTMLVideoElement>(null);

  const participants: Participant[] = [
    {
      id: 1,
      name: "You",
      avatar: "/avatars/you.png",
      isMuted: isMuted,
      isVideoOn: isVideoOn,
      isHost: true,
      isScreenSharing: isScreenSharing
    },
    {
      id: 2,
      name: "Sarah Wilson",
      avatar: "/avatars/sarah.png",
      isMuted: false,
      isVideoOn: true,
      isHost: false
    },
    {
      id: 3,
      name: "Alex Johnson",
      avatar: "/avatars/alex.png",
      isMuted: true,
      isVideoOn: true,
      isHost: false
    },
    {
      id: 4,
      name: "Maria Garcia",
      avatar: "/avatars/maria.png",
      isMuted: false,
      isVideoOn: false,
      isHost: false
    }
  ];

  const upcomingMeetings: Meeting[] = [
    {
      id: 1,
      title: "Daily Standup",
      time: "9:00 AM",
      participants: 5,
      type: "scheduled",
      status: "upcoming"
    },
    {
      id: 2,
      title: "Client Review",
      time: "2:00 PM", 
      participants: 3,
      type: "scheduled",
      status: "upcoming"
    },
    {
      id: 3,
      title: "Team Sync",
      time: "Now",
      participants: 8,
      type: "instant",
      status: "live"
    }
  ];

  const chatMessages = [
    { id: 1, sender: "Sarah Wilson", message: "Great presentation!", time: "10:30" },
    { id: 2, sender: "Alex Johnson", message: "Can you share the slides?", time: "10:31" },
    { id: 3, sender: "You", message: "Sure, I'll send them after the call", time: "10:32" }
  ];

  useEffect(() => {
    // Initialize video stream when component mounts
    if (isInCall && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => console.error("Error accessing media devices:", err));
    }
  }, [isInCall]);

  const joinCall = () => {
    setIsInCall(true);
  };

  const leaveCall = () => {
    setIsInCall(false);
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const toggleMute = () => setIsMuted(!isMuted);
  const toggleVideo = () => setIsVideoOn(!isVideoOn);
  const toggleScreenShare = () => setIsScreenSharing(!isScreenSharing);
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  const generateMeetingId = () => {
    const id = Math.random().toString(36).substring(2, 15);
    setMeetingId(id);
  };

  const copyMeetingId = () => {
    navigator.clipboard.writeText(meetingId);
  };

  if (isInCall) {
    return (
      <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'h-[calc(100vh-4rem)]'} bg-video-bg flex flex-col`}>
        {/* Video Grid */}
        <div className="flex-1 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 h-full">
            {participants.map((participant, index) => (
              <Card key={participant.id} className={`relative overflow-hidden bg-video-controls ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
                <CardContent className="p-0 h-full relative">
                  {participant.isVideoOn ? (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      {index === 0 ? (
                        <video
                          ref={videoRef}
                          autoPlay
                          muted
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={participant.avatar} />
                            <AvatarFallback>{participant.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={participant.avatar} />
                        <AvatarFallback>{participant.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                    </div>
                  )}
                  
                  {/* Participant Info */}
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-white text-sm font-medium bg-black/50 px-2 py-1 rounded">
                        {participant.name}
                      </span>
                      {participant.isHost && (
                        <Badge variant="secondary" className="text-xs">Host</Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      {participant.isMuted && (
                        <div className="p-1 bg-destructive rounded-full">
                          <MicOff className="w-3 h-3 text-white" />
                        </div>
                      )}
                      {!participant.isVideoOn && (
                        <div className="p-1 bg-destructive rounded-full">
                          <VideoOff className="w-3 h-3 text-white" />
                        </div>
                      )}
                      {participant.isScreenSharing && (
                        <div className="p-1 bg-primary rounded-full">
                          <ScreenShare className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="p-4 bg-video-controls border-t border-border">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Meeting ID: {meetingId}</span>
              <Button variant="ghost" size="sm" onClick={copyMeetingId}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={isMuted ? "destructive" : "secondary"}
                size="sm"
                onClick={toggleMute}
              >
                {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
              
              <Button
                variant={isVideoOn ? "secondary" : "destructive"}
                size="sm"
                onClick={toggleVideo}
              >
                {isVideoOn ? <VideoIcon className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
              </Button>

              <Button
                variant={isScreenSharing ? "default" : "secondary"}
                size="sm"
                onClick={toggleScreenShare}
              >
                {isScreenSharing ? <ScreenShareOff className="w-4 h-4" /> : <ScreenShare className="w-4 h-4" />}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowChat(!showChat)}
              >
                <MessageSquare className="w-4 h-4" />
              </Button>

              <Button variant="ghost" size="sm">
                <UserPlus className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Users className="mr-2 h-4 w-4" />
                    Participants
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="destructive"
                size="sm"
                onClick={leaveCall}
              >
                <PhoneOff className="w-4 h-4" />
              </Button>
            </div>

            <div className="text-sm text-muted-foreground">
              {participants.length} participants
            </div>
          </div>
        </div>

        {/* Chat Sidebar */}
        {showChat && (
          <div className="fixed right-0 top-0 bottom-0 w-80 bg-card border-l border-border flex flex-col">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold">Meeting Chat</h3>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-3">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{msg.sender}</span>
                      <span className="text-xs text-muted-foreground">{msg.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{msg.message}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button size="sm" className="gradient-primary">
                  Send
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-gradient">Video Conferencing</span>
          </h1>
          <p className="text-muted-foreground">Start or join high-quality video calls</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-effect">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <VideoIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Meeting</h3>
              <p className="text-muted-foreground mb-4">Start a video call right now</p>
              <Button 
                onClick={() => {
                  generateMeetingId();
                  joinCall();
                }} 
                className="gradient-primary w-full"
              >
                Start Meeting
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Join Meeting</h3>
              <p className="text-muted-foreground mb-4">Enter a meeting ID to join</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Join Meeting
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Join Meeting</DialogTitle>
                    <DialogDescription>
                      Enter the meeting ID provided by the host
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Enter meeting ID"
                      value={meetingId}
                      onChange={(e) => setMeetingId(e.target.value)}
                    />
                    <Button 
                      onClick={joinCall}
                      disabled={!meetingId}
                      className="gradient-primary w-full"
                    >
                      Join
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Schedule Meeting</h3>
              <p className="text-muted-foreground mb-4">Plan a meeting for later</p>
              <Button variant="outline" className="w-full">
                Schedule
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent & Upcoming Meetings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Upcoming Meetings</h3>
              <div className="space-y-4">
                {upcomingMeetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-smooth"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                        {meeting.status === 'live' ? (
                          <div className="w-3 h-3 bg-destructive rounded-full animate-pulse" />
                        ) : (
                          <Clock className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{meeting.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {meeting.time} • {meeting.participants} participants
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {meeting.status === 'live' && (
                        <Badge variant="destructive">Live</Badge>
                      )}
                      <Button
                        size="sm"
                        variant={meeting.status === 'live' ? 'default' : 'outline'}
                        onClick={meeting.status === 'live' ? joinCall : undefined}
                        className={meeting.status === 'live' ? 'gradient-primary' : ''}
                      >
                        {meeting.status === 'live' ? 'Join' : 'Details'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Meetings</h3>
              <div className="space-y-4">
                <div className="text-center py-8">
                  <VideoIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No recent meetings</p>
                  <p className="text-sm text-muted-foreground">Your meeting history will appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}