import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  CreditCard, 
  Plus,
  Target,
  BarChart3,
  Settings,
  PiggyBank
} from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { Toggle } from "./toggle";
import { Switch } from "./switch";
import { useEffect, useState } from "react";

const navigationItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Transactions", href: "/transactions", icon: CreditCard },
  { name: "Accounts", href: "/accounts", icon: CreditCard },
  { name: "Budgets", href: "/budgets", icon: PiggyBank },
  { name: "Goals", href: "/goals", icon: Target },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Navigation() {

  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    let newTheme = '';
    if (theme === 'light') newTheme = "dark"
    else newTheme = "light"
    
    setTheme(newTheme);
    updateTheme(newTheme);
  }

  const updateTheme = (newTheme: string) => {
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.body.classList.add("dark");
    }
    else {
      document.body.classList.remove("dark");
    }
  }

  useEffect(() => {
    const storageTheme = localStorage.getItem("theme");
    if (storageTheme === "dark" || storageTheme === "light") {
      setTheme(storageTheme);
      updateTheme(storageTheme);
    }
  }, []);

  return (
    <nav className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-primary">FinanceTracker</h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors",
                      isActive
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
                    )
                  }
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.name}
                </NavLink>
              ))}
            </div>
            <div className="flex justify-center items-center px-5">
                <Switch checked={theme === "dark"} onClick={toggleTheme} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}