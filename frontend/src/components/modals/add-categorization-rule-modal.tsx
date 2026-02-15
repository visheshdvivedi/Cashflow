import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { OptionType } from "@/types/transaction";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tag } from "lucide-react";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { toast } from "@/hooks/use-toast";
import { createCategorizationRuleService } from "@/services/transaction";

interface AddCategorizationRuleModalProps {
    children: React.ReactNode;
    categories: OptionType[];
}

export function AddCategorizationRuleModal({ children, categories }: AddCategorizationRuleModalProps) {
    const [substring, setSubstring] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [priority, setPriority] = useState(0);
    const [isActive, setIsActive] = useState(true);

    const [open, setOpen] = useState(false);

    const handleSave = async () => {
        if (!substring || !description || !category) {
            toast({
                title: "Insufficient Data",
                description: "Please ensure to fill all required details before creating a rule",
                variant: "destructive"
            })
            return;
        }

        try {
            const data = await createCategorizationRuleService(substring, description, category, priority, isActive);
            toast({
                title: "Rule Created",
                description: "Rule created successfully",
                variant: "default"
            })
            setOpen(false);
        } catch (error) {
            console.error(error);
            toast({
                title: "Failed to create rule",
                description: "Failed to create rule. Please try again later.",
                variant: "destructive"
            })
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Categorization Rule</DialogTitle>
                </DialogHeader>

                <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="substring">Substring</Label>
                            <Input id="substring" value={substring} onChange={(e) => setSubstring(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select value={category} onValueChange={setCategory}>
                                <SelectTrigger>
                                    <Tag className="h-4 w-4 mr-2" />
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map(category => (
                                        <SelectItem key={category.value} value={category.value}>
                                            {category.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="priority">Priority</Label>
                            <Input type="number" value={priority} onChange={e => setPriority(parseInt(e.target.value))} />
                        </div>
                        <div className="space-y-2 flex flex-col">
                            <Label htmlFor="isActive">Is Active</Label>
                            <Switch
                                checked={isActive}
                                onChange={(e) => setIsActive(!isActive)}
                            />
                        </div>
                    </div>
                </form>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button type="button" onClick={handleSave}>Save</Button>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    )
}