
'use client';
import { useState } from 'react';
import { Pencil, User, Users, ShoppingBag, Tractor, Landmark, Image as ImageIcon, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import PostCard from './post-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Input } from '@/components/ui/input';

const initialPosts = [
    {
    id: 5,
    user: { name: "Agri Ministry", role: "Government", avatar: "https://avatar.vercel.sh/ministry.png" },
    content: "Announcing the MEGA FARM REVOLUTION! 🚜 We're launching a new initiative to support large-scale farming projects with subsidies on equipment and inputs. Let's build a food-secure Kenya together! #MavunoRevolution #KilimoBora",
    timestamp: "1h ago",
    likes: 52,
    image: "https://nowqwttrqtklrxgjgxid.supabase.co/storage/v1/object/sign/mavuno/photo/advert2.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ODJlZjdiMC00NWVmLTQ3YzgtOTE4Ni0wMWUyNmM2ZGNiYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtYXZ1bm8vcGhvdG8vYWR2ZXJ0Mi5qcGciLCJpYXQiOjE3NTkwODgyOTUsImV4cCI6MTc1OTY5MzA5NX0.J8FkRipUOavnHiES7rEGtczGE-eLHVlyT1B1dfipDzM",
    imageHint: "farming initiative",
    comments: []
  },
  {
    id: 1,
    user: { name: "John Kiptoo", role: "Farmer", avatar: "https://avatar.vercel.sh/john.png" },
    content: "Just harvested 20 bags of grade A maize. Quality guaranteed! Looking for a buyer in the Nakuru region. 🌽",
    timestamp: "2h ago",
    likes: 12,
    image: "https://nowqwttrqtklrxgjgxid.supabase.co/storage/v1/object/sign/mavuno/photo/maize.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ODJlZjdiMC00NWVmLTQ3YzgtOTE4Ni0wMWUyNmM2ZGNiYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtYXZ1bm8vcGhvdG8vbWFpemUuanBnIiwiaWF0IjoxNzU5MDg4MTA1LCJleHAiOjE3NTk2OTI5MDV9.x0Q8wKEVEHiPLVRYgvMOhqaQxB8YdrTOoNkYYJb2Cpg",
    imageHint: "maize harvest",
    comments: [
      { id: 1, user: { name: "Mary Wanjiru", role: "Buyer" }, text: "Interested! DM me your price per bag." },
      { id: 2, user: { name: "Gov Agri Dept", role: "Government" }, text: "Well done, John! Remember to dry your maize properly before storage to prevent aflatoxin." }
    ]
  },
  {
    id: 2,
    user: { name: "Agri Ministry", role: "Government", avatar: "https://avatar.vercel.sh/ministry.png" },
    content: "DISEASE ALERT 🚨: We've received reports of Fall Armyworm in parts of Nakuru county. Farmers are advised to monitor their crops closely and use approved pesticides. Contact your local extension officer for support.",
    timestamp: "5h ago",
    likes: 34,
    image: "https://nowqwttrqtklrxgjgxid.supabase.co/storage/v1/object/sign/mavuno/photo/army%20worm.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ODJlZjdiMC00NWVmLTQ3YzgtOTE4Ni0wMWUyNmM2ZGNiYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtYXZ1bm8vcGhvdG8vYXJteSB3b3JtLmpwZyIsImlhdCI6MTc1OTA4ODc4NCwiZXhwIjoxNzYxNjgwNzg0fQ.ym5pOra7Q4ESVFybifpPmv40rGR_1itOwt790ZOUhhk",
    imageHint: "pest insect",
    comments: []
  },
  {
    id: 3,
    user: { name: "Ali Hassan", role: "Transporter", avatar: "https://avatar.vercel.sh/ali.png" },
    content: "Have a 10-ton truck available for produce delivery from Eldoret to Nairobi this weekend. Competitive rates. DM for booking. 🚚",
    timestamp: "1d ago",
    likes: 8,
    image: "https://nowqwttrqtklrxgjgxid.supabase.co/storage/v1/object/sign/mavuno/photo/truck.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ODJlZjdiMC00NWVmLTQ3YzgtOTE4Ni0wMWUyNmM2ZGNiYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtYXZ1bm8vcGhvdG8vdHJ1Y2suanBnIiwiaWF0IjoxNzU5MDg4NjY3LCJleHAiOjE3NjE2ODA2Njd9.1POTaVNhPppv440FsEYbVk3hZBIgf3a3B5iLDaitsGw",
    imageHint: "truck road",
    comments: []
  },
   {
    id: 4,
    user: { name: "Fresh Produce Inc.", role: "Buyer", avatar: "https://avatar.vercel.sh/fresh-produce.png" },
    content: "We are actively buying avocados for export. Looking for certified farmers in Murang'a and Kiambu. Grade A only. Contact us for a contract.",
    timestamp: "2d ago",
    likes: 22,
    image: "https://nowqwttrqtklrxgjgxid.supabase.co/storage/v1/object/sign/mavuno/photo/ovacados.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ODJlZjdiMC00NWVmLTQ3YzgtOTE4Ni0wMWUyNmM2ZGNiYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtYXZ1bm8vcGhvdG8vb3ZhY2Fkb3MuanBnIiwiaWF0IjoxNzU5MDg4NzYzLCJleHAiOjE3NjE2ODA3NjN9.gfc3YFkYw9k__wUIB6depM669ImB46wuB8X_KDmFRJo",
    imageHint: "avocado box",
    comments: []
  }
];

type Role = "Farmer" | "Buyer" | "Transporter" | "Government" | "All";

const roleOptions: { value: Role, label: string, icon: React.ComponentType<any> }[] = [
    { value: "All", label: "All Posts", icon: Users },
    { value: "Farmer", label: "Farmers", icon: User },
    { value: "Buyer", label: "Buyers", icon: ShoppingBag },
    { value: "Transporter", label: "Transporters", icon: Tractor },
    { value: "Government", label: "Government", icon: Landmark },
]

const Feed = () => {
    const [posts, setPosts] = useState(initialPosts);
    const [filter, setFilter] = useState<Role>("All");
    const [newPostText, setNewPostText] = useState("");
    const [isImageAttached, setIsImageAttached] = useState(false);

    const handleLike = (postId: number) => {
        setPosts(posts.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
    }

    const handleComment = (postId: number, commentText: string) => {
        const newComment = { id: Date.now(), user: { name: "Jembe Haraka", role: "Farmer" }, text: commentText };
        setPosts(posts.map(p => p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p));
    }

     const handleCreatePost = () => {
        if (!newPostText.trim()) return;
        
        let postImage, postImageHint;
        if (isImageAttached) {
            const agriculturalImages = PlaceHolderImages.filter(img => 
                ['kenyan farm', 'maize crop', 'green beans', 'kenyan farmers crops', 'farm work', 'harvest', 'tractor field'].includes(img.imageHint)
            );
            const randomImage = agriculturalImages[Math.floor(Math.random() * agriculturalImages.length)];
            postImage = randomImage.imageUrl;
            postImageHint = randomImage.imageHint;
        }

        const newPost = {
            id: Date.now(),
            user: { name: "Jembe Haraka", role: "Farmer", avatar: "https://avatar.vercel.sh/jembe.png" },
            content: newPostText,
            timestamp: "Just now",
            likes: 0,
            image: postImage,
            imageHint: postImageHint,
            comments: []
        };

        setPosts([newPost, ...posts]);
        setNewPostText("");
        setIsImageAttached(false);
    };
    
    const filteredPosts = posts.filter(post => filter === 'All' || post.user.role === filter);
    
    const IconComponent = roleOptions.find(r => r.value === filter)?.icon;

    return (
        <div className="max-w-3xl mx-auto">
            {/* Header and Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                <h1 className="text-3xl font-bold tracking-tight text-primary">Mavuno Socials</h1>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Select value={filter} onValueChange={(value: Role) => setFilter(value)}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                           <div className="flex items-center gap-2">
                               {IconComponent && <IconComponent className="w-4 h-4" />}
                               <SelectValue />
                           </div>
                        </SelectTrigger>
                        <SelectContent>
                            {roleOptions.map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                   <div className="flex items-center gap-2">
                                     <option.icon className="w-4 h-4" />
                                     {option.label}
                                   </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Create Post Card */}
             <div className="mb-6">
                 <div className="p-4 border rounded-lg bg-card space-y-3">
                    <Textarea 
                        placeholder="Share an update, ask a question, or post a listing..." 
                        value={newPostText}
                        onChange={(e) => setNewPostText(e.target.value)}
                        className="mb-2 border-0 shadow-none focus-visible:ring-0 p-0 text-base" 
                    />
                    <div className="flex justify-between items-center">
                        <div className="flex gap-1">
                             <Button 
                                variant={isImageAttached ? "secondary" : "ghost"} 
                                size="icon" 
                                onClick={() => setIsImageAttached(!isImageAttached)}
                                title="Attach Image"
                            >
                                <ImageIcon className="h-5 w-5" />
                            </Button>
                        </div>
                        <Button size="sm" onClick={handleCreatePost} disabled={!newPostText.trim()}>
                            Post
                        </Button>
                    </div>
                </div>
             </div>

            {/* Feed */}
            <div className="space-y-6">
                {filteredPosts.map(post => (
                    <PostCard key={post.id} post={post} onLike={handleLike} onComment={handleComment} />
                ))}
            </div>
        </div>
    )
}

export default Feed;

    
    