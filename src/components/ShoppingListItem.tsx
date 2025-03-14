
import React, { useState } from "react";
import { Pencil, Trash, Check, X, Package, Weight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingItem } from "@/hooks/useShoppingList";

interface ShoppingListItemProps {
  item: ShoppingItem;
  onToggle: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

const ShoppingListItem: React.FC<ShoppingListItemProps> = ({
  item,
  onToggle,
  onEdit,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(item.text);

  const handleEditSubmit = () => {
    if (editValue.trim()) {
      onEdit(item.id, editValue);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEditSubmit();
    } else if (e.key === "Escape") {
      setEditValue(item.text);
      setIsEditing(false);
    }
  };

  const getQuantityLabel = () => {
    const formattedQuantity = item.unit === 'unit' 
      ? Math.round(item.quantity) 
      : item.quantity.toFixed(2);
    
    return `${formattedQuantity} ${item.unit === 'unit' ? 'x' : 'kg'}`;
  };

  return (
    <div
      className={`flex items-center gap-2 p-3 rounded-lg transition-all duration-200 ${
        item.completed
          ? "bg-muted/50 text-muted-foreground"
          : "bg-card text-card-foreground"
      } shadow-sm hover:shadow`}
    >
      <div className="flex-1 flex items-center gap-3">
        <div>
          <input
            type="checkbox"
            className="h-5 w-5 rounded border-2 border-primary/50 
            text-primary focus:ring-primary cursor-pointer transition-colors"
            checked={item.completed}
            onChange={() => onToggle(item.id)}
          />
        </div>

        {isEditing ? (
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              setEditValue(item.text);
              setIsEditing(false);
            }}
            className="flex-1 h-8 text-foreground"
            autoFocus
          />
        ) : (
          <div className="flex flex-col">
            <span
              className={`text-base ${
                item.completed ? "line-through" : ""
              }`}
              onClick={() => onToggle(item.id)}
            >
              {item.text}
            </span>
            <span className="text-xs flex items-center text-muted-foreground">
              {item.unit === 'unit' ? 
                <Package className="mr-1 h-3 w-3" /> : 
                <Weight className="mr-1 h-3 w-3" />
              }
              {getQuantityLabel()}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1">
        {isEditing ? (
          <>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={() => {
                setEditValue(item.text);
                setIsEditing(false);
              }}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Cancel</span>
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-muted-foreground hover:text-primary"
              onClick={handleEditSubmit}
            >
              <Check className="h-4 w-4" />
              <span className="sr-only">Save</span>
            </Button>
          </>
        ) : (
          <>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-muted-foreground hover:text-primary"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={() => onDelete(item.id)}
            >
              <Trash className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ShoppingListItem;
