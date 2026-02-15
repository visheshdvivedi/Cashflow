import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import React from "react"
import { DialogHeader } from "../ui/dialog";
import { Button } from "../ui/button";

type DeleteModalProps = {
    title: string,
    message: string,
    onDelete: () => void,
    children: React.ReactNode;
}

export function DeleteModal({ title, message, onDelete, children }: DeleteModalProps) {

    const [open, setOpen] = React.useState<boolean>(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <p>{message}</p>
                <div className="flex justify-end space-x-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button type="button" variant="destructive" onClick={() => {
                        onDelete();
                        setOpen(false);
                    }}>Delete</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}