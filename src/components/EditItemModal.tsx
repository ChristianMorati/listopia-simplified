import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Package, Weight } from "lucide-react";

interface EditItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (text: string, quantity: number, unit: string) => void;
  initialText: string;
  initialQuantity: number;
  initialUnit: string;
  isEditing?: boolean;
}

const EditItemModal: React.FC<EditItemModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialText,
  initialQuantity,
  initialUnit,
  isEditing = false,
}) => {
  const [text, setText] = useState(initialText);
  const [quantity, setQuantity] = useState(initialQuantity);
  const [unit, setUnit] = useState(initialUnit);

  useEffect(() => {
    setText(initialText);
    setQuantity(initialQuantity);
    setUnit(initialUnit);
  }, [initialText, initialQuantity, initialUnit]);

  const handleSave = () => {
    if (text.trim()) {
      onSave(text, quantity, unit);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Item" : "Add Quantity for " + initialText}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {isEditing && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item-name" className="text-right">
                Item Name
              </Label>
              <Input
                id="item-name"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Item name"
                className="col-span-3"
              />
            </div>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="unit-type" className="text-right">
              Measurement
            </Label>
            <div className="col-span-3 p-5">
              <Select
                value={unit}
                onValueChange={setUnit}
              >
                <SelectTrigger id="unit-type">
                  <SelectValue placeholder="Select measurement type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unit">
                    <div className="flex items-center">
                      <Package className="mr-2 h-4 w-4" />
                      <span>Unit(s)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="kg">
                    <div className="flex items-center">
                      <Weight className="mr-2 h-4 w-4" />
                      <span>Kilogram(s)</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min={unit === "unit" ? 1 : 0.01}
              step={unit === "unit" ? 1 : 0.01}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditItemModal;
