import { useEffect, useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AddTransactionModal } from "@/components/modals/add-transaction-modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
    Search,
    Filter,
    Plus,
    Edit,
    Trash2,
    Download,
    Calendar,
    Tag,
    Settings,
    AlertCircle
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { OptionType } from "@/types/base";
import { Bank, Account } from "@/types/account";
import { CategorizationRule, emptyCategorizationRule, emptyTransaction, ManualCategorizationRequest, Transaction } from "@/types/transaction";
import { listBanksService, listAccountsService } from "@/services/accounts";
import { deleteCategorizationRuleService, deleteTransactionService, listCategorizationRulesService, listMCRService, listTransactionCategoriesService, listTransactionPaymentMethodsService, listTransactionsService, listTransactionTypesService } from "@/services/transaction";
import { AddCategorizationRuleModal } from "@/components/modals/add-categorization-rule-modal";
import { EditTransactionModal } from "@/components/modals/edit-transaction-modal";
import { DeleteModal } from "@/components/modals/delete-modal";
import { EditCategorizationRuleModal } from "@/components/modals/edit-categorization-rule-modal";
import { BulkUploadTransactionModal } from "@/components/modals/bulk-upload-transaction-modal";
import { ResolveCategorizationRequestModal } from "@/components/modals/resolve-mcr-request-modal";
import { useLocation } from "react-router-dom";
import { formatCurrency } from "@/lib/utils";

export default function Transactions() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedType, setSelectedType] = useState("All");
    const [filterStartDate, setFilterStartDate] = useState("");
    const [filterEndDate, setFilterEndDate] = useState("");

    const [banks, setBanks] = useState<Bank[]>([]);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const [types, setTypes] = useState<OptionType[]>([]);
    const [categories, setCategories] = useState<OptionType[]>([]);
    const [paymentMethods, setPaymentMethods] = useState<OptionType[]>([]);
    const [recurringFrequencies, setRecurringFrequencies] = useState<OptionType[]>([]);

    const [categorizationRules, setCategorizationRules] = useState<CategorizationRule[]>([]);
    const [manualCategorizationRequests, setManualCategorizationRequests] = useState<ManualCategorizationRequest[]>([]);

    const { toast } = useToast();

    const filteredTransactions = transactions.filter(transaction => {
        const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || transaction.category === selectedCategory;
        const matchesType = selectedType === "All" || transaction.type === selectedType;
        const matchesStartDate = filterStartDate ? transaction.date >= filterStartDate : true;
        const matchesEndDate = filterEndDate ? transaction.date <= filterEndDate : true;
        return matchesSearch && matchesCategory && matchesType && matchesStartDate && matchesEndDate;
    });

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

    const fetchTransactionTypes = async () => {
        try {
            const data = await listTransactionTypesService();
            setTypes(data);
        } catch (error) {
            toast({
                title: "Failed to fetch types",
                description: "Failed to fetch types",
                variant: "destructive"
            })
        }
    }

    const fetchTransactionCategories = async () => {
        try {
            const data = await listTransactionCategoriesService();
            setCategories(data);
        } catch (error) {
            toast({
                title: "Failed to fetch transaction categories",
                description: "Failed to fetch transaction categories",
                variant: "destructive"
            })
        }
    }

    const fetchTransactionPaymentMethods = async () => {
        try {
            const data = await listTransactionPaymentMethodsService();
            setPaymentMethods(data);
        } catch (error) {
            toast({
                title: "Failed to fetch payment methods",
                description: "Failed to fetch payment methods",
                variant: "destructive"
            })
        }
    }

    const fetchTransactions = async () => {
        try {
            const data = await listTransactionsService();
            setTransactions(data);
        } catch (error) {
            toast({
                title: "Failed to fetch transactions",
                description: "Failed to fetch transactions",
                variant: "destructive"
            })
        }
    }

    const fetchCategorizationRules = async () => {
        try {
            const data = await listCategorizationRulesService();
            setCategorizationRules(data);
        } catch (error) {
            toast({
                title: "Failed to fetch categorization rules",
                description: "Failed to fetch categorization rules",
                variant: "destructive"
            })
        }
    }

    const fetchMCRs = async () => {
        try {
            const data = await listMCRService();
            setManualCategorizationRequests(data);
        } catch (error) {
            toast({
                title: "Failed to fetch requests",
                description: "Failed to fetch manual categorization requests",
                variant: "destructive"
            })
        }
    }

    useEffect(() => {
        fetchBanks();
        fetchAccounts()
        fetchTransactionCategories();
        fetchTransactionPaymentMethods();
        fetchTransactionTypes();

        fetchTransactions();
        fetchCategorizationRules();
        fetchMCRs();
    }, [])

    const onTransactionDelete = (transaction: Transaction) => {
        try {
            deleteTransactionService(transaction.uid);
            toast({
                title: "Transaction deleted successfully!",
                description: "Transaction deleted successfully!",
                variant: "default"
            })
        } catch (error) {
            console.error(error);
            toast({
                title: "Failed to delete transaction",
                description: "Failed to delete transaction",
                variant: "destructive"
            })
        }
    }

    const onRuleDelete = (rule: CategorizationRule) => {
        try {
            deleteCategorizationRuleService(rule.uid);
            toast({
                title: "Rule deleted successfully!",
                description: "Rule deleted successfully!",
                variant: "default"
            })
            fetchCategorizationRules();
        } catch (error) {
            console.error(error);
            toast({
                title: "Failed to delete rule",
                description: "Failed to delete rule",
                variant: "destructive"
            })
        }
    }

    const getTotalAmount = () => {
        let sum = 0;
        for (let transaction of filteredTransactions) sum += transaction.amount
        return sum;
    }

    const location = useLocation();
    const [tab, setTab] = useState<string>("transactions");

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const currentTab = queryParams.get("tab");
        if (!currentTab) {
            setTab("transactions");
            return;
        }
        setTab(currentTab);
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <div className="max-w-7xl mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-foreground">Transactions</h1>
                    <div className="flex flex-row justify-end gap-3">
                        <AddTransactionModal initialValue={emptyTransaction} banks={banks} accounts={accounts} types={types} categories={categories} paymentMethods={paymentMethods} recurringFrequencies={recurringFrequencies}>
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Transaction
                            </Button>
                        </AddTransactionModal>
                        <BulkUploadTransactionModal accounts={accounts}>
                            <Button>
                                Bulk Upload
                            </Button>
                        </BulkUploadTransactionModal>
                    </div>
                </div>

                <Tabs defaultValue="transactions" value={tab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3" >
                        <TabsTrigger value="transactions" onClick={() => setTab("transactions")}>Transactions</TabsTrigger>
                        <TabsTrigger value="rules" onClick={() => setTab("rules")}>Rules</TabsTrigger>
                        <TabsTrigger value="requests" onClick={() => setTab("requests")}>Requests</TabsTrigger>
                    </TabsList>

                    <TabsContent value="transactions">

                        {/* Filters */}
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle className="text-lg">Filters</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Search transactions..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>

                                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                        <SelectTrigger>
                                            <Tag className="h-4 w-4 mr-2" />
                                            <SelectValue placeholder="Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="All">All Categories</SelectItem>
                                            {categories.map(category => (
                                                <SelectItem key={category.value} value={category.value}>
                                                    {category.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <Select value={selectedType} onValueChange={setSelectedType}>
                                        <SelectTrigger>
                                            <Filter className="h-4 w-4 mr-2" />
                                            <SelectValue placeholder="Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="All">All Types</SelectItem>
                                            {types.map(type => (
                                                <SelectItem key={type.label} value={type.value}>{type.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <Input placeholder="Start Date" type="date" value={filterStartDate} onChange={(e) => setFilterStartDate(e.target.value)} />
                                    <Input placeholder="End Date" type="date" value={filterEndDate} onChange={(e) => setFilterEndDate(e.target.value)} />
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>All Transactions ({getTotalAmount()})</CardTitle>
                                <Button variant="outline" size="sm">
                                    <Download className="h-4 w-4 mr-2" />
                                    Export
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {filteredTransactions.map((transaction) => {
                                        const account = accounts.find(acc => acc.uid === transaction.account.uid);
                                        const bank = banks.find(b => b.uid === account?.bank.uid);

                                        return (
                                            <div key={transaction.uid} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-2 h-8 bg-gradient-primary rounded-full" />
                                                    <div>
                                                        <h3 className="font-medium">{transaction.description}</h3>
                                                        <p className="text-sm text-muted-foreground">{transaction.date}</p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {bank?.name} - {account?.name} ({account?.account_no_last_digits})
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-4">
                                                    <Badge variant={transaction.type === "income" ? "default" : "secondary"}>
                                                        {transaction.category}
                                                    </Badge>
                                                    <span className={`font-bold ${transaction.amount > 0 ? "text-green-500" : "text-red-500"}`}>
                                                        {formatCurrency(transaction.amount)}
                                                    </span>
                                                    {/* Edit/Delete Buttons */}
                                                    <EditTransactionModal
                                                        initialValue={transaction}
                                                        banks={banks}
                                                        accounts={accounts}
                                                        types={types}
                                                        categories={categories}
                                                        paymentMethods={paymentMethods}
                                                        recurringFrequencies={recurringFrequencies}
                                                    >
                                                        <Button variant="ghost" size="sm">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </EditTransactionModal>
                                                    <DeleteModal
                                                        title="Delete Transaction"
                                                        message="Are you sure you want to delete this transaction?"
                                                        onDelete={() => onTransactionDelete(transaction)}
                                                    >
                                                        <Button variant="ghost" size="sm">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </DeleteModal>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="rules">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Categorization Rules ({categorizationRules.length})</CardTitle>
                                <AddCategorizationRuleModal categories={categories}>
                                    <Button>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Rule
                                    </Button>
                                </AddCategorizationRuleModal>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-6 p-4 border border-border rounded-lg bg-muted/20">
                                    <h3 className="font-medium mb-4">Create New Rule</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                        <Input
                                            placeholder="Substring (e.g., grocery)"
                                        />
                                        <Input
                                            placeholder="Description"
                                        />
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.filter(cat => cat.value !== "All").map(category => (
                                                    <SelectItem key={category.value} value={category.value}>
                                                        {category.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Input
                                            type="number"
                                            placeholder="Priority"
                                        />
                                        <div className="flex items-center space-x-2">
                                            <Switch
                                            />
                                            <span className="text-sm">Active</span>
                                        </div>
                                    </div>
                                </div>

                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Substring</TableHead>
                                            <TableHead>Description</TableHead>
                                            <TableHead>Category</TableHead>
                                            <TableHead>Priority</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {categorizationRules.map((rule) => (
                                            <TableRow key={rule.uid}>
                                                <TableCell className="font-mono text-sm">{rule.substring}</TableCell>
                                                <TableCell>{rule.description}</TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{rule.category}</Badge>
                                                </TableCell>
                                                <TableCell>{rule.priority}</TableCell>
                                                <TableCell>
                                                    <Badge variant={rule.is_active ? "default" : "secondary"}>
                                                        {rule.is_active ? "Active" : "Inactive"}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex space-x-2">
                                                        <EditCategorizationRuleModal initialValue={rule} categories={categories}>
                                                            <Button variant="ghost" size="sm">
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                        </EditCategorizationRuleModal>
                                                        <DeleteModal 
                                                            title="Delete Rule"
                                                            message="Are you sure you want to delete this rule ?"
                                                            onDelete={() => onRuleDelete(rule)}
                                                        >
                                                            <Button variant="ghost" size="sm">
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </DeleteModal>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="requests">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <AlertCircle className="h-5 w-5 mr-2" />
                                    Manual Categorization Requests ({manualCategorizationRequests.length})
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Transaction</TableHead>
                                            <TableHead>Bank Narration</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {manualCategorizationRequests.map((request) => {
                                            const transaction = transactions.find(t => t.uid === request.transaction);
                                            return (
                                                <TableRow key={request.uid}>
                                                    <TableCell>
                                                        <div>
                                                            <p className="font-medium">{transaction?.description}</p>
                                                            <p className="text-sm text-muted-foreground">{transaction?.date}</p>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="font-mono text-sm">{request.narration}</TableCell>
                                                    <TableCell>
                                                        <Badge variant={request.status === "open" ? "destructive" : "default"}>
                                                            {request.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        {request.status === "open" && (
                                                            <ResolveCategorizationRequestModal mcr={request} categories={categories} transaction={
                                                                transactions.find(tr => tr.uid === request.transaction)
                                                            } refreshData={fetchMCRs}>
                                                                <Button
                                                                    size="sm"
                                                                >
                                                                    <Settings className="h-4 w-4 mr-2" />
                                                                    Categorize
                                                                </Button>
                                                            </ResolveCategorizationRequestModal>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}