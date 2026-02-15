import { useEffect, useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Building2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

import { createAccountService, updateAccountService } from "@/services/accounts";
import { listBanksService, listAccountsService, listAccountTypesService } from "@/services/accounts";

import { OptionType } from "@/types/base";
import { Bank, Account, emptyAccount } from "@/types/account";

import { formatCurrency } from "@/lib/utils";

export default function Accounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [accountTypes, setAccountTypes] = useState<OptionType[]>([]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [formData, setFormData] = useState({
    name: "", type: "", bank_id: "", balance: 0, account_no_last_digits: ""
  });

  const { toast } = useToast();

  const fetchBanks = async () => {
    try {
      const data = await listBanksService();
      setBanks(data);
    } catch (error) {
      toast({
        title: "Failed to fetch banks",
        description: "Failed to fetch banks",
        variant: "destructive"
      })
    }
  }

  const fetchAccounts = async () => {
    try {
      const data = await listAccountsService();
      setAccounts(data);
    } catch (error) {
      toast({
        title: "Failed to fetch accounts",
        description: "Failed to fetch accounts",
        variant: "destructive"
      })
    }
  }

  const fetchAccountTypes = async () => {
    try {
      const data = await listAccountTypesService();
      setAccountTypes(data);
    } catch (error) {
      toast({
        title: "Failed to fetch account types",
        description: "Failed to fetch account types",
        variant: "destructive"
      })
    }
  }

  const handleAddAccount = async () => {
    const selectedBank = banks.find(b => b.uid === formData.bank_id);
    if (!selectedBank) return;

    const newAccount: Account = {
      uid: Date.now().toString(),
      name: formData.name,
      type: formData.type as Account["type"],
      bank: selectedBank,
      account_no_last_digits: formData.account_no_last_digits,
      balance: formData.balance || 0
    };

    try {
      const response = await createAccountService(newAccount.name, newAccount.type, selectedBank.uid, newAccount.balance, newAccount.account_no_last_digits);
      if (!response) {
        toast({
        title: "Failed to create account",
        description: "Failed to create new account, please try again later",
        variant: 'destructive'
      })
      }
    } catch (error) {
      toast({
        title: "Failed to create account",
        description: "Failed to create new account, please try again later",
        variant: 'destructive'
      })
    }

    setAccounts([...accounts, newAccount]);
    setIsAddDialogOpen(false);
    resetForm();
    toast({
      title: "Account Added",
      description: "New account has been added successfully.",
    });
  };

  const handleEditAccount = async () => {
    if (!editingAccount) return;

    const selectedBank = banks.find(b => b.uid === formData.bank_id);
    if (!selectedBank) return;

    const updatedAccounts = accounts.map(account =>
      account.uid === editingAccount.uid
        ? {
          ...account,
          name: formData.name,
          type: formData.type as Account["type"],
          bank: selectedBank,
          accountNumber: formData.account_no_last_digits,
          balance: formData.balance || 0,
        }
        : account
    );

    try {
      const response = await updateAccountService(editingAccount.uid, formData.name, formData.type, selectedBank.uid, formData.balance, formData.account_no_last_digits);
      if (!response) {
        toast({
        title: "Failed to create account",
        description: "Failed to create new account, please try again later",
        variant: 'destructive'
      })
      }
    } catch (error) {
      toast({
        title: "Failed to create account",
        description: "Failed to create new account, please try again later",
        variant: 'destructive'
      })
    }

    setAccounts(updatedAccounts);
    setIsEditDialogOpen(false);
    setEditingAccount(null);
    resetForm();
    toast({
      title: "Account Updated",
      description: "Account has been updated successfully.",
    });
  };

  const handleDeleteAccount = (accountId: string) => {
    setAccounts(accounts.filter(account => account.uid !== accountId));
    toast({
      title: "Account Deleted",
      description: "Account has been deleted successfully.",
    });
  };

  const openEditDialog = (account: Account) => {
    setEditingAccount(account);
    setFormData({
      name: account.name,
      type: account.type,
      bank_id: account.bank.uid,
      account_no_last_digits: account.account_no_last_digits,
      balance: account.balance,
    });
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "", type: "", bank_id: "", balance: 0, account_no_last_digits: ""
    });
  };

  const getAccountTypeColor = (type: Account["type"]) => {
    switch (type) {
      case "savings": return "bg-green-500/10 text-green-500";
      case "current": return "bg-blue-500/10 text-blue-500";
      case "credit_card": return "bg-purple-500/10 text-purple-500";
      case "loan": return "bg-red-500/10 text-red-500";
      default: return "bg-gray-500/10 text-gray-500";
    }
  };

  useEffect(() => {
    fetchBanks();
    fetchAccounts();
    fetchAccountTypes();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Accounts</h1>
            <p className="text-muted-foreground mt-2">
              Manage your bank accounts and credit cards
            </p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Account
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Account</DialogTitle>
                <DialogDescription>
                  Add a new bank account or credit card to track your finances.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="col-span-3"
                    placeholder="Account name"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      {accountTypes.map(type => (
                        <SelectItem value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="bank" className="text-right">Bank</Label>
                  <Select value={formData.bank_id} onValueChange={(value) => setFormData({ ...formData, bank_id: value })}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select bank" />
                    </SelectTrigger>
                    <SelectContent>
                      {banks.map((bank) => (
                        <SelectItem key={bank.uid} value={bank.uid}>
                          {bank.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="accountNumber" className="text-right">Account Number</Label>
                  <Input
                    id="accountNumber"
                    value={formData.account_no_last_digits}
                    onChange={(e) => setFormData({ ...formData, account_no_last_digits: e.target.value })}
                    className="col-span-3"
                    placeholder="Account number (masked)"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="balance" className="text-right">Balance</Label>
                  <Input
                    id="balance"
                    type="number"
                    value={formData.balance}
                    onChange={(e) => setFormData({ ...formData, balance: parseFloat(e.target.value) })}
                    className="col-span-3"
                    placeholder="Current balance"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="submit" onClick={handleAddAccount}>Add Account</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              All Accounts
            </CardTitle>
            <CardDescription>
              Overview of all your bank accounts and credit cards
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Bank</TableHead>
                  <TableHead>Account Number</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accounts.map((account) => (
                  <TableRow key={account.uid}>
                    <TableCell className="font-medium">{account.name}</TableCell>
                    <TableCell>
                      <Badge className={getAccountTypeColor(account.type)}>
                        {account.type.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>{account.bank.name}</TableCell>
                    <TableCell>****{account.account_no_last_digits}</TableCell>
                    <TableCell className={account.balance < 0 ? "text-red-500" : "text-green-500"}>
                      {formatCurrency(account.balance)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditDialog(account)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteAccount(account.uid)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Account</DialogTitle>
              <DialogDescription>
                Update account information.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">Name</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-type" className="text-right">Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {accountTypes.map(type => (
                      <SelectItem value={type.value}>{type.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-bank" className="text-right">Bank</Label>
                <Select value={formData.bank_id} onValueChange={(value) => setFormData({ ...formData, bank_id: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {banks.map((bank) => (
                      <SelectItem key={bank.uid} value={bank.uid}>
                        {bank.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-accountNumber" className="text-right">Account Number</Label>
                <Input
                  id="edit-accountNumber"
                  value={formData.account_no_last_digits}
                  onChange={(e) => setFormData({ ...formData, account_no_last_digits: e.target.value })}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-balance" className="text-right">Balance</Label>
                <Input
                  id="edit-balance"
                  type="number"
                  value={formData.balance}
                  onChange={(e) => setFormData({ ...formData, balance: parseFloat(e.target.value) })}
                  className="col-span-3"
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" onClick={handleEditAccount}>Update Account</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}