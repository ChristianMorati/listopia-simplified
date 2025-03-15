import React, { useState } from "react";
import { Pencil, Trash, Check, X, Package, Weight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingItem } from "@/hooks/useShoppingList";

interface ShoppingListItemProps {
  item: ShoppingItem;
  onToggle: (id: string) => void;
  onEdit: (id: string, text: string, quantity: number, unit: string) => void;
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
  const [editQuantity, setEditQuantity] = useState(item.quantity);
  const [editUnit, setEditUnit] = useState(item.unit);

  const handleEditSubmit = () => {
    if (editValue.trim()) {
      onEdit(item.id, editValue, editQuantity, editUnit);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEditSubmit();
    } else if (e.key === "Escape") {
      setEditValue(item.text);
      setEditQuantity(item.quantity);
      setEditUnit(item.unit);
      setIsEditing(false);
    }
  };

  const getQuantityLabel = () => {
    // Guard against undefined quantity
    if (item.quantity === undefined) {
      return "1 x"; // Default to 1 unit if quantity is undefined
    }

    const formattedQuantity = item.unit === 'unit'
      ? Math.round(item.quantity)
      : item.quantity.toFixed(2);

    return `${formattedQuantity} ${item.unit === 'unit' ? 'x' : 'kg'}`;
  };

  return (
    <div
      className={`flex items-center gap-2 p-3 rounded-lg transition-all duration-200 ${item.completed
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
          <div className="flex items-center space-x-2">
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 h-8 text-foreground"
              autoFocus
            />
            <Input
              type="number"
              value={editQuantity}
              onChange={(e) => setEditQuantity(() => {
                if(item.quantity = 0 && e.target.value != ",") {
                  return 
                }
                return Number(e.target.value)
              })}
              onKeyDown={handleKeyDown}
              className="w-20 h-8 text-foreground"
            />
            <select
              value={editUnit}
              onChange={(e) => setEditUnit(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-20 h-8 text-foreground border rounded-md"
            >
              <option value="unit">Unit</option>
              <option value="kilo">Kilo</option>
            </select>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-muted-foreground hover:text-primary"
              onClick={handleEditSubmit}
            >
              <Check className="h-4 w-4 text-green-500 font-bold" />
              <span className="sr-only">Save</span>
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={() => {
                setEditValue(item.text);
                setEditQuantity(item.quantity);
                setEditUnit(item.unit);
                setIsEditing(false);
              }}
            >
              <X className="h-4 w-4 text-red-500 font-bold"/>
              <span className="sr-only">Cancel</span>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col">
            <span
              className={`text-base ${item.completed ? "line-through" : ""
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
        {!isEditing && (
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
