import React from "react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ManualCategorizationRequest, OptionType, Transaction } from "@/types/transaction";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tag } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import { updateMCRService, updateTransactionService } from "@/services/transaction";

interface ResolveCategorizationRequestModalProps {
    children: React.ReactNode,
    mcr: ManualCategorizationRequest,
    transaction: Transaction,
    categories: OptionType[],
    refreshData: () => void
}

export function ResolveCategorizationRequestModal({ children, mcr, transaction, categories, refreshData }: ResolveCategorizationRequestModalProps) {

    const [open, setOpen] = React.useState<boolean>(false);

    const [description, setDescription] = React.useState<string>(transaction?.description);
    const [category, setCategory] = React.useState<string>(transaction?.category);

    const handleSave = async () => {
        try {
            
            // update transaction
            const newTransactionData = { ...transaction, description, category };
            await updateTransactionService(
                newTransactionData.uid, newTransactionData.amount, newTransactionData.date,
                newTransactionData.description, newTransactionData.account.uid, newTransactionData.category,
                newTransactionData.payment_method, newTransactionData.notes, newTransactionData.is_recurring
            )

            // update request
            await updateMCRService(mcr.uid, mcr.transaction, mcr.narration, 'closed');
            toast({
                title: "Request closed successfully",
                description: "Request closed successfullys"
            })

            setOpen(false);

            // refresh MCR requests
            refreshData();

        } catch (error) {
            toast({
                title: "Failed to update request",
                description: "Failed to update request",
                variant: "destructive"
            })
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Resolve Request</DialogTitle>
                </DialogHeader>
                <form className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">

                        <div className="space-y-2">
                            <Label htmlFor="narration">Narration</Label>
                            <Input type="text" value={mcr.narration} disabled />
                        </div>

                    </div>
                    <div className="grid grid-cols-2 gap-4">

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Input type="text" value={description} onChange={e => setDescription(e.target.value)} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Category</Label>
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

                    </div>
                </form>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}