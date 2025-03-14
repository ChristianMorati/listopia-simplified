
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import ShoppingListItem from "./ShoppingListItem";
import ConfirmDialog from "./ConfirmDialog";
import AddItemForm from "./AddItemForm";
import { useShoppingList, ShoppingItem } from "@/hooks/useShoppingList";
import { toast } from "sonner";

const ShoppingList: React.FC = () => {
  const { items, addItem, toggleItem, editItem, deleteItem, clearItems } = useShoppingList();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleAddItem = (text: string) => {
    addItem(text);
    toast.success("Item added to your list");
  };

  const handleToggleItem = (id: string) => {
    toggleItem(id);
    
    const item = items.find(item => item.id === id);
    if (item) {
      toast.info(
        item.completed ? "Item marked as not purchased" : "Item marked as purchased"
      );
    }
  };

  const handleEditItem = (id: string, text: string) => {
    editItem(id, text);
    toast.success("Item updated");
  };

  const handleDeleteItem = (id: string) => {
    deleteItem(id);
    toast.info("Item removed from your list");
  };

  const handleClearItems = () => {
    clearItems();
    setIsConfirmOpen(false);
    toast.info("Shopping list cleared");
  };

  const sortedItems = [...items].sort((a, b) => {
    // Sort completed items to the bottom
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    // Otherwise maintain their original order
    return 0;
  });

  return (
    <div className="w-full max-w-lg mx-auto">
      <AddItemForm onAddItem={handleAddItem} className="mb-6" />

      {items.length > 0 ? (
        <>
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-sm font-medium text-muted-foreground">
                {items.filter(item => !item.completed).length} items remaining
              </span>
            </div>
            {items.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                className="text-muted-foreground hover:text-destructive border-none bg-transparent hover:bg-destructive/10 transition-colors duration-200"
                onClick={() => setIsConfirmOpen(true)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>

          <div className="space-y-2">
            {sortedItems.map((item) => (
              <ShoppingListItem
                key={item.id}
                item={item}
                onToggle={handleToggleItem}
                onEdit={handleEditItem}
                onDelete={handleDeleteItem}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-muted-foreground animate-fade-in">
          <p className="text-lg font-medium mb-2">Your shopping list is empty</p>
          <p className="text-sm">Add some items to get started</p>
        </div>
      )}

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleClearItems}
        title="Clear Shopping List"
        description="Are you sure you want to remove all items from your shopping list? This action cannot be undone."
        confirmText="Clear All"
        cancelText="Cancel"
      />
    </div>
  );
};

export default ShoppingList;
