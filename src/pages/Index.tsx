
import React from "react";
import ShoppingList from "@/components/ShoppingList";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <div className="container px-4 py-12 sm:py-20">
        <header className="text-center mb-10 animate-fade-in">
          <div className="inline-block mb-2 px-3 py-1 bg-blue-50 rounded-full text-blue-600 text-xs font-medium">
            Simple & Efficient
          </div>
          <h1 className="text-3xl sm:text-4xl font-medium text-foreground mb-4">
            Shopping List
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Keep track of what you need to buy with this simple shopping list app
          </p>
        </header>

        <div className="glass-morphism max-w-xl mx-auto rounded-xl p-6 sm:p-8 shadow-sm animate-scale-in">
          <ShoppingList />
        </div>

        <footer className="mt-12 text-center text-sm text-muted-foreground animate-fade-in">
          <p>
            Your shopping list is saved automatically and will be here when you return.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
