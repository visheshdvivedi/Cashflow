import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExportReportModalProps {
  children: React.ReactNode;
}

export function ExportReportModal({ children }: ExportReportModalProps) {
  const [open, setOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState("pdf");
  const [dateRange, setDateRange] = useState("current-month");
  const [includeTransactions, setIncludeTransactions] = useState(true);
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeBudgets, setIncludeBudgets] = useState(true);
  const [includeGoals, setIncludeGoals] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExport = async () => {
    if (!exportFormat || !dateRange) {
      toast({
        title: "Error",
        description: "Please select export format and date range.",
        variant: "destructive",
      });
      return;
    }

    setIsExporting(true);

    // Mock export process
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing time
      
      toast({
        title: "Export Successful",
        description: `Your ${exportFormat.toUpperCase()} report has been generated and downloaded.`,
      });

      setOpen(false);
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error generating your report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const getFormatIcon = () => {
    switch (exportFormat) {
      case "pdf": return <FileText className="h-4 w-4" />;
      case "csv": return <Download className="h-4 w-4" />;
      case "custom": return <BarChart3 className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Export Report</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Export Format</Label>
            <Select value={exportFormat} onValueChange={setExportFormat}>
              <SelectTrigger>
                <div className="flex items-center space-x-2">
                  {getFormatIcon()}
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF Report (Detailed)</SelectItem>
                <SelectItem value="csv">CSV Data (Raw Data)</SelectItem>
                <SelectItem value="custom">Custom Report (Interactive)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Date Range</Label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current-month">Current Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="current-quarter">Current Quarter</SelectItem>
                <SelectItem value="last-quarter">Last Quarter</SelectItem>
                <SelectItem value="current-year">Current Year</SelectItem>
                <SelectItem value="last-year">Last Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>Include in Report</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="transactions"
                  checked={includeTransactions}
                  onCheckedChange={(checked) => setIncludeTransactions(checked === true)}
                />
                <Label htmlFor="transactions" className="text-sm font-normal">
                  Transaction History
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="charts"
                  checked={includeCharts}
                  onCheckedChange={(checked) => setIncludeCharts(checked === true)}
                />
                <Label htmlFor="charts" className="text-sm font-normal">
                  Charts & Visualizations
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="budgets"
                  checked={includeBudgets}
                  onCheckedChange={(checked) => setIncludeBudgets(checked === true)}
                />
                <Label htmlFor="budgets" className="text-sm font-normal">
                  Budget Analysis
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="goals"
                  checked={includeGoals}
                  onCheckedChange={(checked) => setIncludeGoals(checked === true)}
                />
                <Label htmlFor="goals" className="text-sm font-normal">
                  Savings Goals Progress
                </Label>
              </div>
            </div>
          </div>

          {exportFormat === "pdf" && (
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">
                PDF reports include formatted charts, tables, and summaries optimized for printing and sharing.
              </p>
            </div>
          )}

          {exportFormat === "csv" && (
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">
                CSV exports contain raw transaction data that can be imported into spreadsheet applications.
              </p>
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleExport} disabled={isExporting}>
              {isExporting ? "Exporting..." : "Export Report"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}