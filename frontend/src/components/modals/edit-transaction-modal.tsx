import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Account, Bank, Transaction } from "@/types/transaction";
import { createTransactionService, listAccountsService, listBanksService, listTransactionCategoriesService, listTransactionPaymentMethodsService, listTransactionRecurringFrequenciesService, listTransactionTypesService, updateTransactionService } from "@/services/transaction";
import { notStrictEqual } from "assert";

interface ChoiceTypes {
  value: string;
  label: string;
}

interface EditTransactionModalProps {
  initialValue: Transaction;
  banks: Bank[];
  accounts: Account[];
  types: ChoiceTypes[];
  categories: ChoiceTypes[];
  paymentMethods: ChoiceTypes[];
  recurringFrequencies: ChoiceTypes[];
  children: React.ReactNode;
}

export function EditTransactionModal({ initialValue, banks, accounts, types, categories, paymentMethods, recurringFrequencies, children }: EditTransactionModalProps) {

  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(initialValue.amount);
  const [category, setCategory] = useState(initialValue.category);
  const [description, setDescription] = useState(initialValue.description);
  const [paymentMethod, setPaymentMethod] = useState(initialValue.payment_method);
  const [isRecurring, setIsRecurring] = useState(initialValue.is_recurring);
  const [date, setDate] = useState(initialValue.date.length ? new Date(initialValue.date).toISOString().split('T')[0] : "");
  const [selectedBank, setSelectedBank] = useState(initialValue.account.bank.uid);
  const [selectedAccount, setSelectedAccount] = useState(initialValue.account.uid);
  const [notes, setNotes] = useState(initialValue.notes);


  const { toast } = useToast();

  const filteredAccounts = selectedBank 
    ? accounts.filter(account => account.bank.uid === selectedBank)
    : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !category || !description || !selectedBank || !selectedAccount) {
      toast({
        title: "Error",
        description: "Please fill in all required fields including bank and account.",
        variant: "destructive",
      });
      return;
    }

    const selectedAccountData = accounts.find(acc => acc.uid === selectedAccount);
    const selectedBankData = banks.find(bank => bank.uid === selectedBank);

    try {
      const data = await updateTransactionService(
        initialValue.uid, amount,date, description, selectedAccount, category,
        paymentMethod, notes, isRecurring
      )

      // Mock transaction creation
      toast({
        title: "Transaction Updated",
        description: `Successfully updated ${description} for $${amount} from ${selectedBankData?.name} - ${selectedAccountData?.name}`,
      });

      // Reset form
      setAmount(0);
      setCategory("");
      setDescription("");
      setPaymentMethod("");
      setIsRecurring(false);
      setSelectedBank("");
      setSelectedAccount("");
      setDate(new Date().toISOString().split('T')[0]);
      setOpen(false);
      
      window.location.reload();
    } catch (error) {
      toast({
        title: "Request Failed",
        description: "Failed to update transaction. Please try again later",
        variant: "destructive"
      })
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount *</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Input
              id="description"
              placeholder="Transaction description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bank">Bank *</Label>
              <Select value={selectedBank} onValueChange={(value) => {
                setSelectedBank(value);
                setSelectedAccount(""); // Reset account when bank changes
              }} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select bank" />
                </SelectTrigger>
                <SelectContent>
                  {banks.map(bank => (
                    <SelectItem key={bank.uid} value={bank.uid.toString()}>
                      {bank.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="account">Account *</Label>
              <Select 
                value={selectedAccount} 
                onValueChange={setSelectedAccount} 
                disabled={!selectedBank}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  {filteredAccounts.map(account => (
                    <SelectItem key={account.uid} value={account.uid.toString()}>
                      {account.name} ({account.type}) - {account.account_no_last_digits}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem value={category.value}>{category.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment-method">Payment Method</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map(method => (
                    <SelectItem value={method.value}>{method.value}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Additional notes (optional)"
              className="resize-none"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="recurring"
              checked={isRecurring}
              onCheckedChange={setIsRecurring}
            />
            <Label htmlFor="recurring">Recurring transaction</Label>
          </div>

          <div className="space-y-2">
            <Label>Attach Receipt</Label>
            <Button type="button" variant="outline" className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Upload Receipt
            </Button>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Update Transaction</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}