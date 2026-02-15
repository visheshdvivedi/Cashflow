import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";
import {
    SelectContent,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Account } from "@/types/transaction";
import { Upload } from "lucide-react";
import { toast } from "../ui/use-toast";
import { bulkUploadTransactionsService } from "@/services/transaction";

type BulkUploadTransactionModalProps = {
    accounts: Account[];
    children: React.ReactNode;
};

export function BulkUploadTransactionModal({
    accounts, children,
}: BulkUploadTransactionModalProps) {

    const fileInputRef = React.useRef(null);
    const [open, setOpen] = React.useState<boolean>(false);

    const [filename, setFilename] = React.useState<string>("");
    const [accountId, setAccountId] = React.useState<string>("");
    const [fileContent, setFileContent] = React.useState<string>("");

    const handleButtonClick = (event) => {
        fileInputRef.current.click();
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();    
        reader.onload = async (event) => {
            console.log(event)
            const fileContent = event.target.result;
            setFileContent(fileContent.toString());
            setFilename(file.name);
        }

        reader.readAsText(file);
    }

    const handleSubmit = async () => {
        try {
            if (!fileContent || !accountId) {
                toast({
                    title: "Insufficient Data",
                    description: "Please upload file and specify account to submit.",
                    variant: "destructive"
                })
                return;
            }

            const data = await bulkUploadTransactionsService(fileContent, accountId);
            toast({
                title: "Bulk Upload Successful",
                description: "Bulk uploaded transactions successfully"
            })

        } catch (error) {
            toast({
                title: "Request Failed",
                description: "Failed to bulk upload transactions. Please try again later",
                variant: "destructive"
            })
        }
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Bulk Upload Transactions</DialogTitle>
                </DialogHeader>
                <div>
                    <Select value={accountId} onValueChange={setAccountId}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select account" />
                        </SelectTrigger>
                        <SelectContent>
                            {accounts.map((account) => (
                                <SelectItem key={account.uid} value={account.uid.toString()}>
                                    {account.name} ({account.type}) -{" "}
                                    {account.account_no_last_digits}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <div className="space-y-2 mt-2">
                        <Button onClick={handleButtonClick} type="button" variant="outline" className="w-full">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload File
                            <input accept="csv,xlsx" type="file" name="" id="" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                        </Button>
                    </div>
                    <div className="space-y-2 mt-2">
                        {filename.length > 0 && (
                            <div className="w-full px-3 py-2 flex flex-row justify-between items-center">
                                <span className="text-sm">{filename}</span>
                                <Button variant="ghost" onClick={() => {
                                    setFileContent("");
                                    setFilename("");
                                    fileInputRef.current.value = '';
                                }}>X</Button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        variant="default"
                        onClick={handleSubmit}
                    >
                        Upload
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
