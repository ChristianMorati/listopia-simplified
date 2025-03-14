
import React, { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Package, Weight } from "lucide-react";

interface QuantityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (quantity: number, unit: string) => void;
  itemName: string;
}

const QuantityModal: React.FC<QuantityModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm,
  itemName
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [unit, setUnit] = useState<string>("unit");

  const handleConfirm = () => {
    onConfirm(quantity, unit);
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setQuantity(isNaN(value) ? 0 : value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Quantity for {itemName}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="unit-type" className="text-right">
              Measurement
            </Label>
            <div className="col-span-3">
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
              onChange={handleInputChange}
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
          <Button onClick={handleConfirm}>
            Add to List
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuantityModal;
