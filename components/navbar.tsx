"use client"

import { useState } from "react"
import Link from "next/link"
import { BarChart3, DollarSign, PlusCircle, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  
  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <nav className="border-b bg-background sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <DollarSign className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg hidden sm:inline-block">Finance Visualizer</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <Link 
            href="/" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          <Link 
            href="/transactions" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Transactions
          </Link>
          <ModeToggle />
          <Link href="/transactions/new">
            <Button size="sm" className="gap-1">
              <PlusCircle className="h-4 w-4" /> Add Transaction
            </Button>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden gap-2">
          <ModeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div 
        className={cn(
          "md:hidden absolute w-full bg-background border-b transform transition-transform duration-200 ease-in-out",
          isOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="px-4 py-3 space-y-3">
          <Link 
            href="/" 
            className="block px-2 py-1 text-sm font-medium hover:text-primary"
            onClick={closeMenu}
          >
            Dashboard
          </Link>
          <Link 
            href="/transactions" 
            className="block px-2 py-1 text-sm font-medium hover:text-primary"
            onClick={closeMenu}
          >
            Transactions
          </Link>
          <Link 
            href="/transactions/new"
            onClick={closeMenu}
          >
            <Button size="sm" className="w-full justify-start gap-1">
              <PlusCircle className="h-4 w-4" /> Add Transaction
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}