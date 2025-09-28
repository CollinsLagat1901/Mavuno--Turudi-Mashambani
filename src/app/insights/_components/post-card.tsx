
'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ThumbsUp, MessageSquare } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';

type User = {
    name: string;
    role: string;
    avatar?: string;
}

type Comment = {
    id: number;
    user: User;
    text: string;
}

type Post = {
    id: number;
    user: User;
    content: string;
    timestamp: string;
    likes: number;
    image?: string;
    imageHint?: string;
    comments: Comment[];
}

interface PostCardProps {
    post: Post;
    onLike: (postId: number) => void;
    onComment: (postId: number, commentText: string) => void;
}

const getRoleBadgeVariant = (role: string) => {
    switch (role) {
        case 'Farmer': return 'default';
        case 'Buyer': return 'secondary';
        case 'Transporter': return 'outline';
        case 'Government': return 'destructive';
        default: return 'secondary';
    }
}

const PostCard = ({ post, onLike, onComment }: PostCardProps) => {
    const [commentText, setCommentText] = useState('');
    const [showComments, setShowComments] = useState(false);

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (commentText.trim()) {
            onComment(post.id, commentText);
            setCommentText('');
        }
    }

    return (
        <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-3 p-4">
                <Avatar>
                    <AvatarImage src={post.user.avatar} alt={post.user.name} />
                    <AvatarFallback>{post.user.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-0.5">
                    <p className="font-semibold">{post.user.name}</p>
                    <div className="flex items-center gap-2">
                        <Badge variant={getRoleBadgeVariant(post.user.role)}>{post.user.role}</Badge>
                        <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <p className="mb-4 whitespace-pre-wrap">{post.content}</p>
                {post.image && (
                    <div className="relative h-64 w-full mb-4 rounded-lg overflow-hidden">
                        <Image
                            src={post.image}
                            alt="Post image"
                            fill
                            className="object-cover"
                            data-ai-hint={post.imageHint}
                        />
                    </div>
                )}
                <div className="flex items-center justify-between text-muted-foreground text-sm mb-2">
                    <span>{post.likes} Likes</span>
                    <span>{post.comments.length} Comments</span>
                </div>
                <Separator />
                <Collapsible open={showComments} onOpenChange={setShowComments}>
                    <div className="flex justify-around pt-2">
                        <Button variant="ghost" onClick={() => onLike(post.id)}>
                            <ThumbsUp className="mr-2" /> Like
                        </Button>
                         <CollapsibleTrigger asChild>
                             <Button variant="ghost">
                                <MessageSquare className="mr-2" /> Comment
                            </Button>
                        </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent className="mt-4 space-y-4">
                        {post.comments.map(comment => (
                            <div key={comment.id} className="flex items-start gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>{comment.user.name.substring(0,2)}</AvatarFallback>
                                </Avatar>
                                <div className="bg-muted p-3 rounded-lg flex-1">
                                    <p className="text-sm font-semibold">{comment.user.name} <span className="text-xs text-muted-foreground">({comment.user.role})</span></p>
                                    <p className="text-sm">{comment.text}</p>
                                </div>
                            </div>
                        ))}
                         <form onSubmit={handleCommentSubmit} className="flex items-start gap-3 pt-4">
                            <Avatar className="h-8 w-8">
                                <AvatarFallback>You</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <Textarea 
                                    placeholder="Write a comment..." 
                                    value={commentText} 
                                    onChange={(e) => setCommentText(e.target.value)}
                                    className="min-h-[40px]"
                                 />
                                 <Button type="submit" size="sm" className="mt-2">Post Comment</Button>
                            </div>
                        </form>
                    </CollapsibleContent>
                </Collapsible>
            </CardContent>
        </Card>
    );
};

export default PostCard;
