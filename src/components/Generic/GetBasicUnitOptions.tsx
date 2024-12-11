export const getBasicUnitOptions = (item?: any): { value: string; label: string }[] => {
    // Example static options (replace with your logic as needed)
    const staticOptions = [
      { value: "pcs", label: "PCs" },
      { value: "dozen", label: "Dozen" },
      { value: "roll", label: "Roll" },
      { value: "cotton", label: "Cotton" },
      { value: "box", label: "Box" },

    ];
  
    // If dynamic options are needed based on the item
    if (item?.Item?.availableUnits) {
      return item.Item.availableUnits.map((unit: string) => ({
        value: unit,
        label: unit.toUpperCase(), // Example transformation, customize as needed
      }));
    }
  
    return staticOptions;
  };
  